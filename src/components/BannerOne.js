import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// Data untuk 6 slide banner sesuai layanan Anda
const bannerData = [
  {
    title: "Percetakan & Penerbitan Buku",
    content: "Wujudkan naskah Anda menjadi buku berkualitas yang siap menginspirasi melalui layanan terpadu dan profesional kami.",
    img: "./assets/img/banner/1.png",
  },
  {
    title: "Penulisan & Desain Buku",
    content: "Ubah ide cemerlang menjadi karya tulis profesional dengan layanan penulisan fleksibel dan desain sampul yang memikat.",
    img: "./assets/img/banner/2.png",
  },
  {
    title: "Produksi Video Pembelajaran",
    content: "Hadirkan materi ajar yang lebih menarik dan interaktif dengan video pembelajaran berkualitas dari studio kami.",
    img: "./assets/img/banner/3.png",
  },
  {
    title: "Pelatihan Profesional Guru",
    content: "Tingkatkan kompetensi mengajar melalui program pelatihan inovatif yang dirancang untuk dampak nyata di ruang kelas.",
    img: "./assets/img/banner/4.png",
  },
  {
    title: "Bimbingan Belajar (SD-SMA)",
    content: "Raih prestasi akademik terbaik bersama 'Gubuk Belajar', bimbingan belajar efektif untuk jenjang SD hingga SMA.",
    img: "./assets/img/banner/5.png",
  },
  {
    title: "Distributor & Grosir Buku",
    content: "Akses semua judul buku dari seluruh Indonesia dengan jaminan harga terbaik melalui jaringan distribusi kami yang luas.",
    img: "./assets/img/banner/6.png",
  },
];


const BannerOne = () => {
  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return <FaArrowRight className={className} onClick={onClick} />;
  }
  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return <FaArrowLeft className={className} onClick={onClick} />;
  }
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    fade: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <>
      {/* banner start */}
      <div className='banner-area banner-area-1'>
        <div className='banner-slider owl-carousel'>
          <Slider {...settings}>
            {bannerData.map((slide, index) => (
              <div key={index}>
                <div
                  className='item'
                  style={{ backgroundImage: `url("${slide.img}")` }}
                >
                  <div className='container'>
                    <div className='row'>
                      <div className='col-lg-7 col-md-8'>
                        <div className='banner-inner style-white'>
                          <h1 className='b-animate-2 title'>
                            {slide.title}
                          </h1>
                          <p className='b-animate-3 content'>
                            {slide.content}
                          </p>
                          <div className='btn-wrap'>
                            <Link
                              className='btn btn-base b-animate-4'
                              to='/service'
                            >
                              Lihat Layanan
                            </Link>
                            <Link
                              className='btn btn-white b-animate-4'
                              to='/contact'
                            >
                              Hubungi Kami
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {/* banner end */}
    </>
  );
};

export default BannerOne;