// src/components/SEO.jsx
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

// Helper untuk mengubah objek menjadi string JSON (lebih efisien tanpa spasi di production)
const toJson = (obj) => JSON.stringify(obj, null, 0);

// Helper untuk menghapus properti yang kosong dari objek JSON-LD
const prune = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null && v !== "")
  );

// --- Helper untuk Membuat JSON-LD ---

export const ldWebsite = ({ name, url, alternateName }) =>
  prune({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    alternateName,
    url,
  });

export const ldOrganization = ({ name, url, logo }) =>
  prune({
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
  });

// --- Komponen Utama SEO ---

const SEO = ({
  // defaults
  title = "Percetakan dan Penerbit",
  titleTemplate = "PT. Fajar Grafika Artha Nusantara", // Diubah agar lebih konsisten
  description = "Plupuh, Sragen, Jawa Tengah, Indonesia",
  keywords = "penerbit, percetakan, Fajar Grafika, buku, poster, kalender,pt,fajar,grafika,artha,nusantara",
  canonical = "https://www.fajargrafika.com/",
  image = "https://www.fajargrafika.com/assets/favicon.png",
  url = "https://www.fajargrafika.com/",
  author = "PT. Fajar Grafika Artha Nusantara",

  // Prop baru untuk menerima array objek JSON-LD
  jsonLd = [],
}) => {
  const fullTitle = title ? `${title} | ${titleTemplate}` : titleTemplate;

  return (
    <Helmet>
      {/* Meta tag dasar */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonical} />

      {/* --- Open Graph (Lengkap) --- */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title || titleTemplate} />
      {/* TAMBAHKAN INI: Menetapkan nama situs secara eksplisit */}
      <meta property="og:site_name" content={titleTemplate} />

      {/* --- Twitter Card (Lengkap) --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Menyuntikkan JSON-LD */}
      {jsonLd
        .filter(Boolean)
        .map((obj, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: toJson(obj) }}
          />
        ))}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  titleTemplate: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  canonical: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  author: PropTypes.string,
  jsonLd: PropTypes.arrayOf(PropTypes.object),
};

export default SEO;