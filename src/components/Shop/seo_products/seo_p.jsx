// src/components/SEOProduct.jsx
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

/**
 * Helper: stringify JSON-LD safely
 */
const toJson = (obj) => JSON.stringify(obj, null, 0);

/**
 * Helper: drop empty/undefined fields (agar JSON-LD bersih)
 */
const prune = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null && v !== "")
  );

/**
 * JSON-LD: BreadcrumbList
 * items = [{ name, url }]
 */
export const ldBreadcrumb = (items = []) =>
  prune({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) =>
      prune({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        item: it.url,
      })
    ),
  });

/**
 * JSON-LD: Product
 * options:
 * - name, description, images[], sku, brand, url
 * - price (number), priceCurrency (default "IDR"), availability, condition
 * - ratingValue (1..5), reviewCount (int)
 * - category (array of strings) -> goes to "category" & "additionalProperty"
 */
export const ldProduct = ({
  name,
  description,
  images = [],
  sku,
  brand,
  url,
  price,
  priceCurrency = "IDR",
  availability = "https://schema.org/InStock",
  condition = "https://schema.org/NewCondition",
  ratingValue,
  reviewCount,
  category = [],
}) =>
  prune({
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    sku,
    image: images,
    brand: brand ? { "@type": "Brand", name: brand } : undefined,
    url,
    category: category.join(" / "),
    additionalProperty:
      category?.length
        ? category.map((c) => ({
            "@type": "PropertyValue",
            name: "Category",
            value: c,
          }))
        : undefined,
    aggregateRating:
      ratingValue !== undefined && reviewCount !== undefined
        ? {
            "@type": "AggregateRating",
            ratingValue,
            ratingCount: reviewCount,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
    offers:
      price !== undefined
        ? {
            "@type": "Offer",
            price: Number(price),
            priceCurrency,
            availability,
            itemCondition: condition,
            url,
          }
        : undefined,
  });

/**
 * Optional JSON-LD helpers (pakai kalau perlu)
 */
export const ldWebsite = ({ name, url, searchUrlPattern } = {}) =>
  prune({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    potentialAction: searchUrlPattern
      ? {
          "@type": "SearchAction",
          target: `${searchUrlPattern}{search_term_string}`,
          "query-input": "required name=search_term_string",
        }
      : undefined,
  });

export const ldOrganization = ({ name, url, logo } = {}) =>
  prune({
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
  });

/**
 * SEOProduct component
 * - set <title> (dengan template)
 * - meta OG/Twitter
 * - <link rel="canonical">
 * - inject JSON-LD (array)
 */
const SEOProduct = ({
  // defaults
  title = "PT. Fajar Grafika Artha Nusantara",
  titleTemplate = "Percetakan dan Penerbit",
  description = "Plupuh, Sragen, Jawa Tengah, Indonesia",
  keywords = "penerbit, percetakan, Fajar Grafika, buku, poster, kalender,pt,fajar,grafika,artha,nusantara",
  canonical = "https://www.fajargrafika.com/",
  image = "https://www.fajargrafika.com/assets/favicon.png",
  url = "https://www.fajargrafika.com/",
  author = "PT. Fajar Grafika Artha Nusantara",

  // JSON-LD array (gunakan ldProduct/ldBreadcrumb/ldWebsite/ldOrganization)
  jsonLd = [],
}) => {
  const fullTitle = title ? `${title} | ${titleTemplate}` : titleTemplate;

  return (
    <Helmet>
      {/* Basic */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{fullTitle}</title>

      {/* Meta */}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      {titleTemplate && <meta property="og:site_name" content={titleTemplate} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {url && <meta property="og:url" content={url} />}
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="og:image:alt" content={title || titleTemplate} />
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}

      {/* JSON-LD (one <script> per item) */}
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

SEOProduct.propTypes = {
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

export default SEOProduct;
