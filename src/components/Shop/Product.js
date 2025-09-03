import React, { Fragment } from "react"; 
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import SEO from "../../seo";

import RelatedProductSlider from "./RelatedProductSlider";
import ProductDescriptionTab from "./ProductDescriptionTab";
import ProductImageDescription from "./ProductImageDescription";

const Product = () => {
  let { pathname } = useLocation();
  let { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const product = products.find(product => product.id === id);
  

  return (
    <Fragment>
      <SEO
        titleTemplate={product.name}canonical={pathname}
        description={product.fullDescription}
      />

     
       

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={product.fullDescription}
        />

        {/* related product slider */}
        <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={product.category[0]}
        />
     
    </Fragment>
  );
};

export default Product;
