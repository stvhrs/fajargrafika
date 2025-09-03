import React, { Fragment, Suspense } from "react";
import SEO from "../seo";

import Preloader from "../elements/Preloader";
const Breadcrumb = React.lazy(() => import("../components/Breadcrumb"));
const ContactInner = React.lazy(() => import("../components/ContactInner"));
const FooterBottomOne = React.lazy(() =>
  import("../components/FooterBottomOne")
);
const FooterOne = React.lazy(() => import("../components/FooterOne"));
const NavbarOne = React.lazy(() => import("../components/NavbarOne"));
const SearchPopup = React.lazy(() => import("../elements/SearchPopup"));
const Contact = () => {
  return (
    <>

      <Fragment> <SEO title="Contact Us"
        titleTemplate="Hubungi Kami - Fajar Grafika Artha Nusantara"
        description="Plupuh, Sragen, Jawa Tengah, Indonesia"
      />
        <Suspense fallback={<Preloader />}>
          {/* Search Popup */}
          <SearchPopup />

          {/* Navbar One */}
          <NavbarOne />

          {/* Breadcrumb */}
          <Breadcrumb title={"CONTACT US"} />

          {/* Breadcrumb */}
          <ContactInner />

          {/* Footer One */}
          <FooterOne />

          {/* Footer Bottom One */}
          <FooterBottomOne />
        </Suspense>
      </Fragment>
    </>
  );
};

export default Contact;
