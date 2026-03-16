#!/usr/bin/env python3
"""
Fetch real product images from Amazon.es for all ASINs in MDX articles.
Uses requests session with cookies to bypass CAPTCHA.
"""

import re
import time
import random
import json
import requests
from pathlib import Path

ROOT = Path(r"c:/Users/David/Proyectos/patasyhogar")
ARTICULOS_DIR = ROOT / "src" / "content" / "articulos"

TARGET_ARTICLES = [
    "mejor-arnes-gato-pasear",
    "mejor-cama-antiansiedad-perro",
    "mejor-cama-elevada-perro",
    "mejor-circuito-agilidad-perros",
    "mejor-comedero-lento-perros",
    "mejor-juguete-rellenable-perros",
    "mejor-pienso-gato-pelo-largo",
    "mejor-rascador-esquina-gatos",
]


def create_session():
    """Create a requests session with browser-like headers."""
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
    })
    # Visit homepage first to get cookies
    try:
        session.get('https://www.amazon.es', timeout=15)
        time.sleep(1)
    except Exception:
        pass
    return session


def fetch_amazon_image(session, asin, retries=2):
    """Fetch the main product image URL from Amazon.es."""
    url = f"https://www.amazon.es/dp/{asin}"

    for attempt in range(retries + 1):
        try:
            resp = session.get(url, timeout=15)
            html = resp.text

            if 'captcha' in html.lower() and len(html) < 20000:
                if attempt < retries:
                    time.sleep(random.uniform(5, 10))
                    continue
                return None

            # Pattern 1: colorImages JSON - hiRes
            match = re.search(r'"hiRes"\s*:\s*"(https://m\.media-amazon\.com/images/I/[^"]+)"', html)
            if match:
                return normalize_image_url(match.group(1))

            # Pattern 2: colorImages JSON - large
            match = re.search(r'"large"\s*:\s*"(https://m\.media-amazon\.com/images/I/[^"]+)"', html)
            if match:
                return normalize_image_url(match.group(1))

            # Pattern 3: data-old-hires
            match = re.search(r'data-old-hires="(https://m\.media-amazon\.com/images/I/[^"]+)"', html)
            if match:
                return normalize_image_url(match.group(1))

            # Pattern 4: landingImage src
            match = re.search(r'id="landingImage"[^>]*src="(https://m\.media-amazon\.com/images/I/[^"]+)"', html)
            if match:
                return normalize_image_url(match.group(1))

            # Pattern 5: imgTagWrapperId with image
            match = re.search(r'id="imgTagWrapperId"[^>]*>.*?src="(https://m\.media-amazon\.com/images/I/[^"]+)"', html, re.DOTALL)
            if match:
                return normalize_image_url(match.group(1))

            # Pattern 6: main image from imageGalleryData or colorImages
            match = re.search(r'"mainUrl"\s*:\s*"(https://m\.media-amazon\.com/images/I/[^"]+)"', html)
            if match:
                return normalize_image_url(match.group(1))

            # Pattern 7: any product image in the imageBlock
            matches = re.findall(r'(https://m\.media-amazon\.com/images/I/[A-Za-z0-9+_-]+)\._[^"\']+\.jpg', html)
            # Filter for real product images (not icons/CSS)
            product_imgs = [m for m in matches if len(m.split('/')[-1]) > 10 and not m.endswith('L')]
            if product_imgs:
                img_id = product_imgs[0]
                return f"{img_id}._AC_SL1500_.jpg"

            if attempt < retries:
                time.sleep(random.uniform(3, 6))
                continue

            return None

        except Exception as e:
            if attempt < retries:
                time.sleep(random.uniform(3, 6))
                continue
            return None

    return None


def normalize_image_url(url):
    """Normalize Amazon image URL to consistent _AC_SL1500_ format."""
    # Extract the image ID
    match = re.match(r'(https://m\.media-amazon\.com/images/I/[A-Za-z0-9+_%-]+)', url)
    if match:
        base = match.group(1)
        # Ensure it ends with .jpg extension for the ID part
        if not base.endswith('L'):
            base = base.rstrip('.')
        return f"{base}._AC_SL1500_.jpg"
    return url


def extract_asins_from_mdx(filepath):
    """Extract all unique Amazon /dp/ ASINs from an MDX file."""
    content = filepath.read_text(encoding="utf-8")
    asin_pattern = re.findall(r'/dp/([A-Z0-9]{10})', content)
    return list(dict.fromkeys(asin_pattern))


def update_images_in_content(content, asin_to_image):
    """Replace image URLs in MDX content based on ASIN context."""
    for asin, new_image in asin_to_image.items():
        if not new_image:
            continue

        # Find objects in ComparisonTable containing this ASIN and replace their imagen
        # Handle both orderings: imagen before or after enlaceAmazon

        def replace_imagen_in_block(block_text):
            if f"/dp/{asin}" not in block_text:
                return block_text
            return re.sub(
                r'(imagen[=:]\s*")https://m\.media-amazon\.com/images/I/[^"]+(")',
                lambda m: m.group(1) + new_image + m.group(2),
                block_text
            )

        # TopPick component (single line or multiline)
        tp_blocks = list(re.finditer(r'<TopPick\b[^>]*/>', content, re.DOTALL))
        for tp in tp_blocks:
            old_block = tp.group(0)
            if f"/dp/{asin}" in old_block:
                new_block = replace_imagen_in_block(old_block)
                if new_block != old_block:
                    content = content.replace(old_block, new_block)

        # ComparisonTable product objects
        # Find each { ... } object that contains this ASIN
        obj_pattern = re.compile(r'\{[^{}]*?/dp/' + asin + r'[^{}]*?\}', re.DOTALL)
        for obj_match in obj_pattern.finditer(content):
            old_obj = obj_match.group(0)
            new_obj = replace_imagen_in_block(old_obj)
            if new_obj != old_obj:
                content = content.replace(old_obj, new_obj)

        # Also handle objects where imagen comes before enlaceAmazon
        obj_pattern2 = re.compile(r'\{[^{}]*?imagen:\s*"[^"]*"[^{}]*?/dp/' + asin + r'[^{}]*?\}', re.DOTALL)
        for obj_match in obj_pattern2.finditer(content):
            old_obj = obj_match.group(0)
            new_obj = replace_imagen_in_block(old_obj)
            if new_obj != old_obj:
                content = content.replace(old_obj, new_obj)

    return content


def main():
    # Collect all unique ASINs
    print("Scanning articles for ASINs...")
    all_asins = {}
    for slug in TARGET_ARTICLES:
        filepath = ARTICULOS_DIR / f"{slug}.mdx"
        if not filepath.exists():
            print(f"  WARNING: {filepath} not found")
            continue
        asins = extract_asins_from_mdx(filepath)
        print(f"  {slug}: {len(asins)} ASINs")
        for asin in asins:
            if asin not in all_asins:
                all_asins[asin] = []
            all_asins[asin].append(slug)

    unique_asins = list(all_asins.keys())
    print(f"\nTotal unique ASINs: {len(unique_asins)}")

    # Create session and fetch images
    print("\nCreating session...")
    session = create_session()

    print("Fetching images from Amazon.es...\n")
    asin_to_image = {}
    success = 0
    fail = 0

    for i, asin in enumerate(unique_asins):
        print(f"  [{i+1}/{len(unique_asins)}] {asin}...", end=" ", flush=True)
        image = fetch_amazon_image(session, asin)
        if image:
            asin_to_image[asin] = image
            success += 1
            print(f"OK -> {image}")
        else:
            fail += 1
            print("FAILED")

        # Rate limiting
        if i < len(unique_asins) - 1:
            time.sleep(random.uniform(2.0, 4.0))

        # Refresh session every 10 requests
        if (i + 1) % 10 == 0:
            print("  [Refreshing session...]")
            session = create_session()
            time.sleep(2)

    print(f"\nResults: {success} OK, {fail} FAILED out of {len(unique_asins)}")

    # Update MDX files
    print("\nUpdating MDX files...")
    files_changed = 0
    for slug in TARGET_ARTICLES:
        filepath = ARTICULOS_DIR / f"{slug}.mdx"
        if not filepath.exists():
            continue

        content = filepath.read_text(encoding="utf-8")
        new_content = update_images_in_content(content, asin_to_image)

        if content != new_content:
            filepath.write_text(new_content, encoding="utf-8")
            files_changed += 1
            print(f"  UPDATED: {slug}.mdx")
        else:
            print(f"  No changes: {slug}.mdx")

    print(f"\n{files_changed} files updated.")

    # Report failures
    failed = [a for a in unique_asins if a not in asin_to_image]
    if failed:
        print(f"\nFailed ASINs ({len(failed)}):")
        for a in failed:
            print(f"  https://www.amazon.es/dp/{a} -> {', '.join(all_asins[a])}")


if __name__ == "__main__":
    main()
