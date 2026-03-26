import { visit } from 'unist-util-visit';
import { toString } from 'hast-util-to-string';

/**
 * Rehype plugin that wraps task list checkboxes in <label> elements
 * for accessibility. Without this, <input type="checkbox"> inside
 * task lists have no associated label, causing a PageSpeed/Lighthouse
 * accessibility warning.
 */
export default function rehypeTaskListLabels() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (
        node.tagName !== 'li' ||
        !node.properties?.className?.includes('task-list-item')
      ) {
        return;
      }

      const checkboxIndex = node.children.findIndex(
        (child) =>
          child.type === 'element' &&
          child.tagName === 'input' &&
          child.properties?.type === 'checkbox'
      );

      if (checkboxIndex === -1) return;

      const checkbox = node.children[checkboxIndex];
      const labelText = toString(node).trim();

      // Wrap all children after the checkbox into a <label>
      const afterCheckbox = node.children.splice(checkboxIndex + 1);
      // Remove the checkbox from its current position
      node.children.splice(checkboxIndex, 1);

      const label = {
        type: 'element',
        tagName: 'label',
        properties: {},
        children: [checkbox, ...afterCheckbox],
      };

      // If label text is empty, add an aria-label as fallback
      if (!labelText) {
        checkbox.properties = checkbox.properties || {};
        checkbox.properties.ariaLabel = 'Tarea';
      }

      node.children.push(label);
    });
  };
}
