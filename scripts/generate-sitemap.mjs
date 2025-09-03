import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** ===== CONFIG ===== */
const BASE_URL = "https://www.fajargrafika.com"; // your domain
// products.json located in public/assets/products.json
const PRODUCTS_JSON = path.resolve(__dirname, "../public/assets/products.json");
const OUT_DIR = path.resolve(__dirname, "../public");

// If product pages live under /produk/[slug]/ set to "/produk/"
const PRODUCT_PREFIX = "/"; 

const STATIC_PATHS = [
  { loc: "/", priority: 1.0, changefreq: "weekly" },
  { loc: "/produk/", priority: 0.9, changefreq: "weekly" },
  { loc: "/tentang-kami/", priority: 0.7, changefreq: "monthly" },
  { loc: "/kontak/", priority: 0.7, changefreq: "monthly" },
];

/** ===== UTIL ===== */
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
   .replace(/"/g, "&quot;").replace(/'/g, "&apos;");

function slugify(name) {
  return name
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

function absolutizeAsset(p) {
  const clean = p.startsWith("/") ? p : `/${p}`;
  const parts = clean.split("/").map((seg, i) => (i === 0 ? seg : encodeURIComponent(seg)));
  return `${BASE_URL}${parts.join("/")}`;
}

async function getLastmodFromFile(file) {
  try {
    const st = await stat(file);
    return new Date(st.mtime).toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

async function run() {
  const lastmod = await getLastmodFromFile(PRODUCTS_JSON);
  const raw = await readFile(PRODUCTS_JSON, "utf8");
  const products = JSON.parse(raw);

  const productUrls = products.map((p) => {
    const slug = p.slug ? p.slug : slugify(p.name);
    const pagePath = `${PRODUCT_PREFIX}${slug}/`;
    const firstImage = Array.isArray(p.image) && p.image.length > 0 ? p.image[0] : null;
    const absImage = firstImage ? absolutizeAsset(firstImage) : null;

    return {
      loc: pagePath,
      lastmod,
      changefreq: "weekly",
      priority: 0.8,
      image: absImage,
    };
  });

  const urls = [...STATIC_PATHS.map((u) => ({ ...u, lastmod })), ...productUrls];

  const urlset = urls
    .map((u) => {
      const locAbs = `${BASE_URL}${u.loc}`;
      const imageTag = u.image
        ? `
    <image:image>
      <image:loc>${esc(u.image)}</image:loc>
    </image:image>`
        : "";
      return `
  <url>
    <loc>${esc(locAbs)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>${imageTag}
  </url>`;
    })
    .join("");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlset}
</urlset>`;

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(path.join(OUT_DIR, "sitemap.xml"), sitemapXml, "utf8");

  console.log(`✅ Generated sitemap.xml with ${urls.length} URLs (including first product images)`);
}

run().catch((e) => {
  console.error("❌ Failed generating sitemap:", e);
  process.exit(1);
});
