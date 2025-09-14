import React, { Fragment, Suspense } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Preloader from "../../elements/Preloader";

import SEOProduct, { ldProduct, ldBreadcrumb } from "./seo_products/seo_p";
import ProductImageDescription from "./ProductImageDescription";
const Breadcrumb = React.lazy(() => import("../Breadcrumb"));

const ORIGIN = "https://www.fajargrafika.com";

// Helper untuk URL absolut
const abs = (rel) => (rel?.startsWith("http") ? rel : `${ORIGIN}${rel}`);

// BARU: Helper untuk mem-parsing berat buku (e.g., "± 200 gram" -> { value: 200, unit: "GRM" })
const parseWeight = (weightString = "") => {
  const match = weightString.match(/(\d+)\s*gram/i);
  if (match) {
    return { value: parseInt(match[1], 10), unit: "GRM" };
  }
  return null;
};

// BARU: Helper untuk memetakan jenis jilid ke tipe schema
const getBookFormat = (bindingString = "") => {
  if (bindingString.toLowerCase().includes("lem panas") || bindingString.toLowerCase().includes("perfect binding")) {
    return "Paperback";
  }
  return null;
};


const Product = () => {
  let { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const product = products.find(p => p.id === id);

  if (!product) {
    return <Preloader />;
  }
  
  // -- Persiapan Data untuk SEO --
  const canonical = `${ORIGIN}/katalog/${product.id}/`;
  const images = (product.image || []).map(abs);
  const bookWeight = parseWeight(product.specifications.weight);
  const bookFormat = getBookFormat(product.specifications.binding);
  
  return (
    <Fragment>
      <SEOProduct
        // --- Meta Tags Dasar ---
        title={`${product.name} | ${product.brand}`}
        description={product.shortDescription}
        keywords={product.keyword.join(", ")}
        image={images[0]}
        author={product.author}
        canonical={canonical}
        url={canonical}
        
        // --- JSON-LD Structured Data ---
        jsonLd={[
          ldBreadcrumb([
            { name: "Beranda", url: `${ORIGIN}/` },
            { name: "Katalog", url: `${ORIGIN}/katalog/` },
            { name: product.name, url: canonical }
          ]),
          ldProduct({
            // Data Umum
            name: product.name,
            description: product.fullDescription,
            images,
            sku: product.sku,
            brand: product.brand,
            url: canonical,
            
            // Harga (termasuk harga diskon)
            price: product.price,
            salePrice: product.salePrice,
            
            // Rating
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
            
            // Ketersediaan
            availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            
            // Data Spesifik Buku
            authorName: product.author,
            publisherName: product.publisher,
            isbn: product.specifications.isbn,
            numberOfPages: product.specifications.pageCount,
            weight: bookWeight,
            bookFormat: bookFormat,
          }),
        ]}
      />
      
      <Suspense fallback={<Preloader />}>
        <Breadcrumb title={product.name} useKatalog={true} />
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
        />
      </Suspense>
    </Fragment>
  );
};

export default Product;