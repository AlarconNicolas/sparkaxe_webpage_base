import React from "react";
import Slider from "react-slick";
import "./BannerTienda.css";

const Banner = ({ slides }) => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <section className="home-slider">
            <Slider {...settings} className="home_banner_main">
                {slides.map(slide => (
                    <div key={slide.id} className="home_banner">
                        <img 
                            src={`${slide.image}`}
                          alt={slide.title} 
                        />
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default Banner;
