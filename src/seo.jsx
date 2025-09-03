import PropTypes from "prop-types";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SEO = ({ title, titleTemplate, description }) => {
    return (
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    {title} | {titleTemplate}
                </title>
                <meta name="description" content={description} />
                <meta name="keywords" content="penerbit, percetakan, Fajar Grafika, buku, poster, kalender" />
                <meta name="author" content="PT. Fajar Grafika Artha Nusantara" />
            </Helmet>
        </HelmetProvider>
    );
};

SEO.propTypes = {
    title: PropTypes.string,
    titleTemplate: PropTypes.string,
    description: PropTypes.string,
}

SEO.defaultProps = {
    title: "PT. Fajar Grafika Artha Nusantara",
    titleTemplate: "Percetakan dan Peneribit",
    description: "Plupuh, Sragen, Jawa Tengah, Indonesia",
};

export default SEO;