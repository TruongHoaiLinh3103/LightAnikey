"use client";

import React, { useEffect, useState } from 'react';
import "../styles/slider.scss";
import ic1 from "../../public/ic-1.jpg";
import ic2 from "../../public/ic-2.jpg";
import ic3 from "../../public/ic-3.jpg";
import ic4 from "../../public/ic-4.jpg";
import ic5 from "../../public/ic-5.jpg";
import ic6 from "../../public/ic-6.jpg";
import Image from 'next/image';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { usePathname } from 'next/navigation';

const SliderBanner = () => {
    const pathname = usePathname();
    const [banner, setbanner] = useState([]);
    var settings = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        variableWidth: true,
        draggable: false,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: false
    }
    useEffect(() => {
        axios.get("https://zfakeapi.vercel.app/banner").then((res) => {
            setbanner(res.data)
        });
    })
    return (
        <div className='SliderHeader maxWidth1400px'>
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            width="0" height="0" viewBox="0 0 1366 768">
                <defs>
                    <filter id="blur0">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="0 0" />
                    </filter>
                    <filter id="blur1">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="5 0" />
                    </filter>
                    <filter id="blur2">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="12 0" />
                    </filter>
                    <filter id="blur3">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="20 0" />
                    </filter>
                    <filter id="blur4">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="35 1" />
                    </filter>
                    <filter id="blur5">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="50 1" />
                    </filter>
                </defs>
            </svg>
            {/* <button type='button' className='slick-prev'>Previous</button>
            <button type='button' className='slick-next'>Next</button> */}
            {pathname === "/" && 
            <Slider {...settings} className="SliderCarousel">
                <div>
                    <Image src={ic1} alt='banner'/>
                </div>
                <div>
                    <Image src={ic2} alt='banner'/>
                </div>
                <div>
                    <Image src={ic3} alt='banner'/>
                </div>
                <div>
                    <Image src={ic4} alt='banner'/>
                </div>
                <div>
                    <Image src={ic5} alt='banner'/>
                </div>
                <div>
                    <Image src={ic6} alt='banner'/>
                </div>
            </Slider>}
            {pathname === "/product/comic" && banner[0] &&
            <Slider {...settings} className="SliderCarousel">
                <div>
                    <img src={banner[0].imgOne} alt='Banner'/>
                </div>
                <div>
                    <img src={banner[0].imgTwo} alt='Banner'/>
                </div>
                <div>
                    <img src={banner[0].imgThree} alt='Banner'/>
                </div>
                <div>
                    <img src={banner[0].imgFour} alt='Banner'/>
                </div>
                <div>
                    <img src={banner[0].imgFive} alt='Banner'/>
                </div>
                <div>
                    <img src={banner[0].imgSix} alt='Banner'/>
                </div>
            </Slider>}
            {pathname === "/product/document" && banner[1] &&
            <Slider {...settings} className="SliderCarousel">
                <div>
                    <img src={banner[1].imgOne} alt='Banner'/>
                </div>
                <div>
                    <img src={banner[1].imgTwo} alt='Banner'/>
                </div>
                <div>
                    <img src={banner[1].imgThree} alt='Banner'/>
                </div>
                <div>
                    <img src={banner[1].imgFour} alt='Banner'/>
                </div>
                <div>
                    <img src={banner[1].imgFive} alt='Banner'/>
                </div>
                <div>
                    <img src={banner[1].imgSix} alt='Banner'/>
                </div>
            </Slider>}
        </div>
    );
};

export default SliderBanner;