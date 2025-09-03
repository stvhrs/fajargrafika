import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";


import "./index.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";
import store from "./redux/store/store";
import { setProducts } from "./redux/stateSlice/product-slice";
import products from "./data/products.json";
import 'animate.css';
// import 'swiper/swiper-bundle.min.css';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./assets/scss/style.scss";
import { Provider } from "react-redux";
store.dispatch(setProducts(products));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
