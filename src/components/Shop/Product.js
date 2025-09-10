import React, { Fragment, Suspense } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import SEO from "../../seo";
import Preloader from "../../elements/Preloader";

import SEOProduct, { ldProduct, ldBreadcrumb } from "./seo_products/seo_p";

import ProductImageDescription from "./ProductImageDescription";
const Breadcrumb = React.lazy(() => import("../Breadcrumb"));
const ORIGIN = "https://www.fajargrafika.com";
const abs = (rel) => (rel?.startsWith("http") ? rel : `${ORIGIN}${rel}`);
const stripHtml = (html = "") =>
  html.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]*>/g, "").trim();
const Product = () => {
  let { pathname } = useLocation();
  let { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const product = products.find(product => product.id === id);
  const canonical = `${ORIGIN}/katalog/${product.id}/`;
  const images = (product.image || []).map(abs);
  const descPlain = stripHtml(product.shortDescription || "");
const NavbarOne = React.lazy(() => import("../NavbarOne"));


  return (
    <Fragment>
      <SEOProduct
        title={product.name}
        description={descPlain}               // deskripsi dari produk
        keywords={`${product.name}, ${product.category.join(", ")}, Fajar Grafika`} // keyword dari produk
        image={product.image[0]} // image produk
        canonical={canonical}                 // canonical sesuai id produk
        url={canonical}
        jsonLd={[
          ldBreadcrumb([
            { name: "Beranda", url: `${ORIGIN}/` },
            { name: "Katalog", url: `${ORIGIN}/katalog/` },
            { name: product.name, url: canonical }
          ]),
          ldProduct({
            name: product.name,
            description: descPlain,
            images,
            sku: product.sku,
            brand: "Elkapede",
            url: canonical,
            price: product.price,
            priceCurrency: "IDR",
            availability:
              product.stock > 0
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            condition: "https://schema.org/NewCondition",
            ratingValue: 5,   // ★★★★★
            reviewCount: 45,  // contoh: 45 review
            category: product.category,
          }),
        ]}
      />
      <Suspense fallback={<Preloader />}>
        <Breadcrumb title={product.name} useKatalog={true} />

  {/* <NavbarOne /> */}

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
        />

        {/* product description tab */}
        {/* <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={product.fullDescription}
        /> */}

        {/* related product slider */}
        {/* <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={product.category[0]}
        /> */}
      </Suspense>
    </Fragment>
  );
};

export default Product;
