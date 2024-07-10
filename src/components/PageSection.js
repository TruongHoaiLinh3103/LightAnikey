"use client";

import React, { useEffect , useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import ViewProduct from '@/utils/ViewProduct';
import "../styles/pagesection.scss";
import BtnListProduct from './BtnListProduct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux'
import { ADD__COMMENT } from '../redux/reduccer/counterReducer';

const PageSection = (props) => {
    const pathname = usePathname();
    const [document, setDocument] = useState([]);
    const [comic, setComic] = useState([])
    const [product, setProduct] = useState([]);
    const [resultS, setResultS] = useState(false);
    const paragraph = props.name;
    const dispatch = useDispatch();
    const router = useRouter();
    const [Search, setSearch] = useState(1)
    const [Doc, setDoc] = useState(1)
    const [Com, setCom] = useState(1)

    
    const productPage = (Children) => {
        setSearch(Children)
    }

    const documentPage = (Children) => {
        setDoc(Children)
    }

    const comicPage = (Children) => {
        setCom(Children)
    }

    const addWL = (data) => {
        dispatch(ADD__COMMENT(data));
        router.push("/wishlist")
    }

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
    useEffect(() => {
        //Search
        axios.get(`https://zfakeapi.vercel.app/product?_page=${Search}&_limit=24&q=${paragraph}&_sort=id&_order=desc`).then((res) => {
            if(res.data.length > 0){
                setProduct(res.data);
            }else{
                axios.get(`https://zfakeapi.vercel.app/product?_page=1&_limit=24&q=${paragraph}&_sort=id&_order=desc`).then((res) => {
                    if(res.data.length > 0){
                        setProduct(res.data);
                    }else{
                        setResultS(true);
                    }       
                })
            }
        })
        //Document
        axios.get(`https://zfakeapi.vercel.app/product?menu=document&_page=${Doc}&_limit=24&_sort=id&_order=desc`).then((res) => {
            setDocument(res.data);
        })
        //Comic
        axios.get(`https://zfakeapi.vercel.app/product?menu=comic&_page=${Com}&_limit=24&_sort=id&_order=desc`).then((res) => {
            setComic(res.data)
        })
    }, [Search, Doc, Com])
    return (
        <div className='PageSection'>
            {pathname === `/product/${paragraph}` && 
                <>
                    <div style={{display: !resultS ? "block" : "none"}}>
                        <p style={{margin: "0px 10px",fontSize: "20px"}}>Keyword | <b>{decodeURI(paragraph)}</b></p>
                        <section className='PageSection-section'>
                            <div className='PageSection-section_data'>
                                {product.map((item, index) => {
                                    return(
                                        <div className='PageSection-section_data-card' key={item.id}>
                                            <img className="data-card_product"
                                                src={item.img} alt={`Foto do produtos - ${item.name}`}/>
                                            <h4 className="data-card_title" title={item.name} style={{textAlign: "center", cursor:"pointer"}} 
                                            ><ViewProduct name={item.name} id={item.id} menu={item.menu} text={item.text}></ViewProduct></h4>
                                            <div className="data-card_rating">
                                                {handleRating(item.rating)}
                                            </div>
                                            <div className='data-card_btn'>
                                                {item.menu === "comic" ?
                                                <a className="button" onClick={() => addWL(item)}><FontAwesomeIcon icon={faHeart} /></a>
                                                :
                                                <a href={item.text} className="button"><FontAwesomeIcon icon={faBook} /></a>
                                                }
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </section>
                        {product.length === 0 ? "" :
                            <BtnListProduct numberPage={productPage} namePage={paragraph}/>
                        }
                    </div>
                    <div style={{display: resultS ? "flex" : "none", alignItems: "center", justifyContent: 'center'}}>
                        <p style={{fontSize: "20px", margin: "10px"}}><b>404</b> | Không tìm thấy kết quả tìm kiếm</p>
                    </div>
                </>
            }
            {pathname === "/product/document" && 
                <>
                    <section className='PageSection-section'>
                        <div className='PageSection-section_data'>
                            {document.map((item, index) => {
                                return(
                                    <div className='PageSection-section_data-card' key={item.id}> 
                                        <img className="data-card_product"
                                            src={item.img} alt={`Foto do produtos - ${item.name}`}/>
                                        <h4 className="data-card_title" title={item.name} style={{textAlign: "center", cursor:"pointer"}} 
                                        ><ViewProduct name={item.name} id={item.id} menu={item.menu} text={item.text}></ViewProduct></h4>
                                        <div className="data-card_rating">
                                            {handleRating(item.rating)}
                                        </div>
                                        <div className='data-card_btn'>
                                            <a href={item.text} className="button"><FontAwesomeIcon icon={faBook} /></a>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                    {document.length === 0  ? "" :
                        <BtnListProduct page={"document"} numberPage={documentPage}/>
                    }
                </>
            }
            {pathname === "/product/comic" && 
                <>
                    <section className='PageSection-section'>
                        <div className='PageSection-section_data'>
                            {comic.map((item, index) => {
                                return(
                                    <div className='PageSection-section_data-card' key={item.id}>
                                        <img className="data-card_product"
                                            src={item.img} alt={`Foto do produtos - ${item.name}`}/>
                                        <h4 className="data-card_title" title={item.name} style={{textAlign: "center", cursor:"pointer"}} 
                                        ><ViewProduct name={item.name} id={item.id} menu={item.menu} text={item.text}></ViewProduct></h4>
                                        <div className="data-card_rating">
                                            {handleRating(item.rating)}
                                        </div>
                                        <div className='data-card_btn'>
                                            <a className="button" onClick={() => addWL(item)}><FontAwesomeIcon icon={faHeart} /></a>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                    {comic.length === 0  ? "" :
                        <BtnListProduct page={"comic"} numberPage={comicPage}/>
                    }
                </>
            }
        </div>
    );
};

export default PageSection;