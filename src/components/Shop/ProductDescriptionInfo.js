import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
}) => {
  // ====== KONFIGURASI WHATSAPP ======
  // Ganti dengan nomor WA tujuan (format internasional tanpa +, mis: 62812xxxx)
  const WA_NUMBER = "6281918201522";
  const waText = encodeURIComponent(
    `Halo Fajar Grafika, saya tertarik dengan produk: ${product?.name}. Apakah masih tersedia?`
  );
  const waHref = `https://wa.me/${WA_NUMBER}?text=${waText}`;

  return (
    <div className="product-details-content ml-70">
      <h2>{product.name}</h2>

      <div className="product-details-price">
        {discountedPrice !== null ? (
          <Fragment>
            <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
            <span className="old">{currency.currencySymbol + finalProductPrice}</span>
          </Fragment>
        ) : (
          <span>{currency.currencySymbol + finalProductPrice} </span>
        )}
      </div>

      {product.rating && product.rating > 0 ? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            {/* <Rating ratingValue={product.rating} /> */}
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="pro-details-list">
        <p dangerouslySetInnerHTML={{ __html: product.shortDescription }}></p>
      </div>

      {/* TOMBOL CHAT WHATSAPP */}
      <div className="pro-details-quality">
        <div className="pro-details-cart ml-0">
          <a
            href={waHref}
            rel="noopener noreferrer"
            target="_blank"
            className="btn-wa"
            aria-label="Chat via WhatsApp"
            title="Chat via WhatsApp"
          >
            <FaWhatsapp style={{ marginRight: 8 }} />
            Chat WhatsApp
          </a>
        </div>
      </div>

      {product.category ? (
        <div className="pro-details-meta">
          <span>Categories :</span>
          <ul>
            {product.category.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/katalog"}>{single}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}

      {product.tag ? (
        <div className="pro-details-meta">
          <span>Mapel :</span>
          <ul>
            {product.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/katalog"}>{single}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}

      <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div>

      {/* Styling tombol WA */}
      <style>{`
        .btn-wa {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #25D366;     /* Hijau WhatsApp */
          color: #fff;
          border: none;
          padding: 12px 20px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          transition: background .2s ease, transform .05s ease;
        }
        .btn-wa:hover,
        .btn-wa:focus {
          background: #1ebe57;     /* sedikit lebih gelap saat hover */
          color: #fff;
          outline: none;
        }
        .btn-wa:active {
          transform: translateY(1px);
        }
      `}</style>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  cartItems: PropTypes.array,
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
};

export default ProductDescriptionInfo;
