// SEO.jsx
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

/**
 * Put <HelmetProvider> ONCE at the app root, e.g.:
 *   <HelmetProvider>
 *     <App />
 *   </HelmetProvider>
 *
 * Then use <SEO .../> anywhere.
 */
const SEO = ({
  // defaults via parameters (modern pattern)
  title = "PT. Fajar Grafika Artha Nusantara",
  titleTemplate = "Percetakan dan Penerbit",
  description = "Plupuh, Sragen, Jawa Tengah, Indonesia",
  keywords = "penerbit, percetakan, Fajar Grafika, buku, poster, kalender",
  canonical = "https://www.fajargrafika.com/",
  image = "https://www.fajargrafika.com/assets/favicon.png",
  url = "https://www.fajargrafika.com/",
  author = "PT. Fajar Grafika Artha Nusantara",
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
};

export default SEO;
