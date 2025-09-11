import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { getDiscountPrice } from  "../components/Shop/func/product";


const ProductGridSingleTen = ({
  product,
  currency,

  spaceBottomClass,
  colorClass,
  productGridStyleClass
}) => {
  const [modalShow, setModalShow] = useState(false);
  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);
  const dispatch = useDispatch();

  return (
    <Fragment>
        <div className={clsx("product-wrap-10", spaceBottomClass, colorClass, productGridStyleClass)}>
          <div className="product-img">
            <Link to={process.env.PUBLIC_URL + "/katalog/" + product.id}>
              <img
                className="default-img"
                src={process.env.PUBLIC_URL + product.image[0]}
                alt=""
              />
              {product.image.length !== 1 ? (
                <img
                  className="hover-img"
                  src={process.env.PUBLIC_URL + product.image[1]}
                  alt=""
                />
              ) : (
                ""
              )}
            </Link>
            {product.discount || product.new ? (
              <div className="product-img-badges">
                {product.discount ? <span>-{product.discount}%</span> : ""}
                {product.new ? <span>New</span> : ""}
              </div>
            ) : (
              ""
            )}

          
          </div>
          <div className="product-content-2">
          
                <Link  style={{ 
     
    fontWeight: '600', 
    textDecoration: 'none' 
  }}  to={process.env.PUBLIC_URL + "/katalog/" + product.id}>
                  {product.name}
                </Link>
           
            
           
          </div>
        </div>
      {/* product modal */}
     
    </Fragment>
  );
};

ProductGridSingleTen.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  wishlistItem: PropTypes.shape({})
};

export default ProductGridSingleTen;
