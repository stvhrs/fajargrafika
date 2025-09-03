import { HelmetProvider } from "react-helmet-async";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeOne from "./pages/HomeOne";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Product from "./components/Shop/Product";
import ScrollToTop from "react-scroll-to-top";
// import HomeTwo from "./pages/HomeTwo";
import About from "./pages/About";
import Service from "./pages/Service";
import ServiceDetails from "./pages/ServiceDetails";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import Pricing from "./pages/Pricing";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import RouteScrollToTop from "./elements/RouteScrollToTop";
import ShopGridTwoColumn from "./pages/ShopGridTwoColumn";
// import HomeThree from "./pages/HomeThree";
// import HomeFour from "./pages/HomeFour";
// import HomeFive from "./pages/HomeFive";

function App() {
  useEffect(() => {
    AOS.init({
      offset: 0,
      easing: "ease",
      once: true,
    });
    AOS.refresh();
  }, []);
  return (
    <HelmetProvider>
      <BrowserRouter>
        <RouteScrollToTop />
        <Routes>
          <Route
            path={process.env.PUBLIC_URL + "/katalog/:id"}
            element={<Product />}
          />
          <Route
            path={process.env.PUBLIC_URL + "/katalog"}
            element={<ShopGridTwoColumn />}
          />
          <Route exact path='/' element={<HomeOne />} />
          {/* <Route exact path='/about' element={<About />} />
          <Route exact path='/service' element={<Service />} />
          <Route exact path='/service-details' element={<ServiceDetails />} />
          <Route exact path='/blog' element={<Blog />} />
          <Route exact path='/blog-details' element={<BlogDetails />} />
          <Route exact path='/pricing' element={<Pricing />} />
          <Route exact path='/faq' element={<Faq />} /> */}
          <Route exact path='/contact' element={<Contact />} />
        </Routes>
        <ScrollToTop smooth color='#FA4318' />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
