import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// Data layanan Anda, sekarang dengan 6 item
const serviceList = [
  {
    title: "PERCETAKAN & PENERBITAN",
    des: "Solusi lengkap untuk mewujudkan naskah Anda menjadi buku berkualitas, dari proses editorial hingga cetak.",
    img: "assets/img/service/1.png",
    icon: "assets/img/service/service-icon-1.png",
  },
  {
    title: "PENULISAN & DESAIN BUKU",
    des: "Layanan kreatif mulai dari penulisan naskah, layout profesional, hingga desain sampul yang memikat pembaca.",
    img: "assets/img/service/2.png",
    icon: "assets/img/service/service-icon-2.png",
  },
  {
    title: "PRODUKSI VIDEO PEMBELAJARAN",
    des: "Produksi video pembelajaran berkualitas studio untuk materi ajar yang lebih menarik dan interaktif.",
    img: "assets/img/service/3.png",
    icon: "assets/img/service/service-icon-3.png",
  },
  {
    title: "PELATIHAN PROFESIONAL GURU",
    des: "Meningkatkan kompetensi dan metode mengajar para pendidik melalui program pelatihan yang inovatif dan aplikatif.",
    img: "assets/img/service/4.png",
    icon: "assets/img/service/service-icon-4.png",
  },
  {
    title: "BIMBINGAN BELAJAR (SD-SMA)",
    des: "Bimbingan belajar 'Gubuk Belajar' untuk semua jenjang (SD, SMP, SMA) dengan metode yang efektif dan menyenangkan.",
    img: "assets/img/service/5.png",
    icon: "assets/img/service/service-icon-5.png",
  },
  {
    title: "DISTRIBUTOR & GROSIR BUKU",
    des: "Menyediakan semua buku dari seluruh penerbit di Indonesia, termasuk terbitan kami, dengan jaminan harga terbaik.",
    img: "assets/img/service/6.png",
    icon: "assets/img/service/service-icon-6.png",
  },
];


const ServiceOneAll = () => {
  return (
    <>
      {/* service area start */}
      <div className='service-area style-2 pd-top-115 pd-bottom-80' style={{ padding: "0px", background: "url(assets/img/service/bg.png)" }}>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-7'>
              <div className='section-title text-center'>
                <h4 className='subtitle'>LAYANAN KAMI</h4>
                <h2 className='title'>SOLUSI LENGKAP UNTUK ANDA</h2>
                <p>
                  Dari dunia literasi hingga pengembangan pendidikan, kami menyediakan layanan terintegrasi untuk mencetak dan menginspirasi generasi masa depan.
                </p>
              </div>
            </div>
          </div>
          <div className='row justify-content-center'>
            {serviceList.map((service, index) => (
              <div className='col-lg-4' key={index}>
                <div className='single-service-wrap'>
                  <div className='thumb'>
                    <img src={service.img} alt={service.title} />
                    <div className='icon'>
                      <img
                        src={service.icon}
                        alt={`${service.title} icon`}
                      />
                    </div>
                  </div>
                  <div className='details'>
                    <h5>{service.title}</h5>
                    <p>{service.des}</p>
                    <div className='btn-wrap'>
                      <Link className='read-more-text' to='/service-details'>
                        SELENGKAPNYA{" "}
                        <span>
                          <FaArrowRight />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* service area end */}
    </>
  );
};

export default ServiceOneAll;