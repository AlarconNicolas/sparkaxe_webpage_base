import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './Swiper.module.css';
import { items } from '../../../Nanophos/Items';
import { Link } from 'react-router-dom';
import pants from "../../assets/Category.png";
import ProductCard from '../ProductCard/ProductCard';

// ProductSwiper Component
const ProductSwiper = () => {
  const swiperRef = useRef(null); // Create a reference for Swiper

  const CustomPrevButton = () => (
    <button
      className={`${styles.customButton} ${styles.prevButton}`}
      onClick={() => swiperRef.current.swiper.slidePrev()} // Go to previous slide
    >
      &#10094;
    </button>
  );

  const CustomNextButton = () => (
    <button
      className={`${styles.customButton} ${styles.nextButton}`}
      onClick={() => swiperRef.current.swiper.slideNext()} // Go to next slide
    >
      &#10095;
    </button>
  );

  return (
    <div>
    <div className={styles.productSwiper}>
    <div className={styles.SwiperHead}>
    <h3 className={styles.SwiperdivTitle}>Productos Relacionados</h3>
    </div>
      <Swiper
        ref={swiperRef} // Attach the ref here
        spaceBetween={10}
        slidesPerView={4}
        navigation={false} // Disable default navigation
        loop={true}
        modules={[Navigation]} // Add modules
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
           <ProductCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <CustomPrevButton />
      <CustomNextButton />
    </div>
    </div>
  );
};

export default ProductSwiper;
