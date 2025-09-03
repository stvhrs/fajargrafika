import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { getDiscountPrice } from "./func/product";
import ProductImageGallery from "../Shop/ProductImageGallery";
import ProductDescriptionInfo from "./ProductDescriptionInfo";
import ProductImageGallerySideThumb from "./ProductImageGallerySideThumb";
import ProductImageFixed from "../Shop/ProductImageFixed";

const ProductImageDescription = ({ spaceTopClass, spaceBottomClass, galleryType, product }) => {
  const currency = useSelector((state) => state.currency);
const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const { wishlistItems } = useSelector((state) => state.wishlist)||[];
  const { compareItems } = useSelector((state) => state.compare||[]);
  


  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * 1).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * 1
  ).toFixed(2);

  return (
    <div className={clsx("shop-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            {/* product image gallery */}
            {galleryType === "leftThumb" ? (
              <ProductImageGallerySideThumb
                product={product}
                thumbPosition="left"
              />
            ) : galleryType === "rightThumb" ? (
              <ProductImageGallerySideThumb product={product} />
            ) : galleryType === "fixedImage" ? (
              <ProductImageFixed product={product} />
            ) : (
              <ProductImageGallery product={product} />
            )}
          </div>
          <div className="col-lg-6 col-md-6">
            {/* product description info */}
            <ProductDescriptionInfo
              product={product}
              discountedPrice={discountedPrice}
              currency={currency}
              finalDiscountedPrice={finalDiscountedPrice}
              finalProductPrice={finalProductPrice}
              cartItems={cartItems}
             
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  galleryType: PropTypes.string,
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default ProductImageDescription;
