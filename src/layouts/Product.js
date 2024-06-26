"use client";

import React from 'react';
import "../styles/product.scss";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ViewProduct from '@/utils/ViewProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux'
import { ADD__COMMENT } from '../redux/reduccer/counterReducer';

const Product = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const handleRating = (rating) => {
        let htmlToReturn = "";
        const maximumRatingStars = 5;
        
        for (let i = 0; i < rating; i++) {
            htmlToReturn += "⭐";
        }
        
        for (let j = 0; j < maximumRatingStars - rating; j++) {
            htmlToReturn += " ✩";
        }
        return htmlToReturn;
    }
    const addWL = (data) => {
        const temp = {
            id: Math.random() * 10000,
            img: data.img,
            name: data.name,
            rating: data.rating,
            text: data.text,
            menu: data.menu,
            prId: data.id
        }
        dispatch(ADD__COMMENT(temp));
        router.push("/wishlist")
    }
    // const handlePrice = (price, discount = false) => {
    //     if (discount) {
    //         price *= 0.9;
    //     }
    //     return price.toLocaleString("pt-BR", {
    //         style: "currency",
    //         currency: "BRL",
    //     });
    // }
    var settings = {
        dots: false,
        infinite: true,
        speed: 300,
        arrows: false,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1260,
                settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                },
            },
            {
                breakpoint: 1000,
                settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                },
            },
            {
                breakpoint: 740,
                settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                },
            },
        ],
    }
    const data = props.data;
    return (
        <div className='Product maxWidth1400px'>
            <h2><b>APPRE</b>CIATE</h2>
            <Slider {...settings} className="slider js-slider">
                {data.map((item) => {
                    return(
                        <div className="card" key={item.id}>
                            <img className="product"
                                src={item.img} alt={`Foto do produtos - ${item.name}`}/>
                            <h4 className="title" title={item.name} style={{textAlign: "center", cursor:"pointer"}}
                            ><ViewProduct name={item.name} id={item.id} menu={item.menu} text={item.text}></ViewProduct></h4>
                            <div className="rating">
                                {handleRating(item.rating)}
                            </div>
                            {/* <div className="price">
                                <h5>{handlePrice(item.price)}</h5>
                                <h5>{handlePrice(item.price, true)}</h5>
                            </div> */}
                            <div className='data-card_btn'>
                                {item.menu === "comic" ?
                                <a className="button" onClick={() => addWL(item)}>
                                    Add to wishlist
                                </a>
                                :
                                <a href={item.text} className="button"><FontAwesomeIcon icon={faBook} /></a>
                                }
                            </div>
                        </div>
                    )
                })}
            </Slider>
        </div>
    );
};

export default Product;