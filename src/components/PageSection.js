"use client";

import React, { useEffect, useLayoutEffect, useState } from 'react';
import Classify from './Classify';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import ViewProduct from '@/utils/ViewProduct';
import "../styles/pagesection.scss";
import BtnListProduct from './BtnListProduct';
import BtnHome from './BtnHome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faHeart } from '@fortawesome/free-solid-svg-icons';

const PageSection = (props) => {
    const pathname = usePathname();
    const [cooking, setCooking] = useState([]);
    const [comic, setComic] = useState([]);
    const [website, setWebsite] = useState([]);
    const [game, setGame] = useState([]);
    const [calligraphy, setCalligraphy] = useState([]);
    const [product, setProduct] = useState([]);
    const [temp, setTemp] = useState('_sort=id&_order=desc')
    const [resultS, setResultS] = useState(false);
    const [checkReq, setCheckReq] = useState(false);
    const [home, setHome] = useState([]);
    const [Search] = useState(typeof window !== 'undefined' && localStorage.paginateSearch ? localStorage.paginateSearch : 1);
    const [Home] = useState(typeof window !== 'undefined' && localStorage.paginateHome ? localStorage.paginateHome : 1);
    const [Cooking, setCookingPage] = useState(typeof window !== 'undefined' && localStorage.paginateCooking ? localStorage.paginateCooking : 1);
    const [Comic, setComicPage] = useState(typeof window !== 'undefined' && localStorage.paginateComic ? localStorage.paginateComic : 1);
    const [Game, setGamePage] = useState(typeof window !== 'undefined' && localStorage.paginateGame ? localStorage.paginateGame : 1);
    const [Calligraphy, setCalligraphyPage] = useState(typeof window !== 'undefined' && localStorage.paginateCalligraphy ? localStorage.paginateCalligraphy : 1);
    const [Website, setWebsitePage] = useState(typeof window !== 'undefined' && localStorage.paginateWebsite ? localStorage.paginateWebsite : 1);
    const paragraph = props.name;

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
    const handlePrice = (price, discount = false) => {
        if (discount) {
            price = price * 0.9;
        }
        return price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }

    const productPage = (Children) => {
        localStorage.setItem("paginateSearch", Children)
        axios.get(`https://zfakeapi.vercel.app/product?_page=${Children}&_limit=24&q=${paragraph}&${temp}`).then((res) => {
            if(res.data.length > 0){
                setProduct(res.data);
            }else{
                axios.get(`https://zfakeapi.vercel.app/product?_page=1&_limit=24&q=${paragraph}&${temp}`).then((res) => {
                    if(res.data.length > 0){
                        setProduct(res.data);
                    }else{
                        setResultS(true);
                    }       
                })
            }
        })
    }
    const homePage = (Children) => {
        localStorage.setItem("paginateHome", Children)
        axios.get(`https://zfakeapi.vercel.app/product?_page=${Children}&_limit=24&${temp}`).then((res) => {
            setHome(res.data)
        })
    }
    const cookingPage = (Children) => {
        localStorage.setItem("paginateCooking", Children)
        axios.get(`https://zfakeapi.vercel.app/product?menu=cooking&_page=${Children}&_limit=24&${temp}`).then((res) => {
            setCooking(res.data)
        })
    }
    const comicPage = (Children) => {
        localStorage.setItem("paginateComic", Children)
        axios.get(`https://zfakeapi.vercel.app/product?menu=comic&_page=${Children}&_limit=24&${temp}`).then((res) => {
            setComic(res.data)
        })
    }
    const gamePage = (Children) => {
        localStorage.setItem("paginateGame", Children)
        axios.get(`https://zfakeapi.vercel.app/product?menu=game&_page=${Children}&_limit=24&${temp}`).then((res) => {
            setGame(res.data)
        })
    }
    const websitePage = (Children) => {
        localStorage.setItem("paginateWebsite", Children)
        axios.get(`https://zfakeapi.vercel.app/product?menu=website&_page=${Children}&_limit=24&${temp}`).then((res) => {
            setWebsite(res.data)
        })
    }
    const calligraphyPage = (Children) => {
        localStorage.setItem("paginateCalligraphy", Children)
        axios.get(`https://zfakeapi.vercel.app/product?menu=calligraphy&_page=${Children}&_limit=24&${temp}`).then((res) => {
            setCalligraphy(res.data)
        })
    } 
    const newReq = (Children) => {
        setTemp(Children);
        setCheckReq(true);
        axios.get(`https://zfakeapi.vercel.app/product?menu=comic&_page=${Comic}&_limit=24&${Children}`).then((res) => {
            if(res.data.length > 0){
                setComic(res.data)
            }else{
                axios.get(`https://zfakeapi.vercel.app/product?menu=comic&_page=1&_limit=24&${Children}`).then((res) => {
                    setComic(res.data)
                })
            }
        })
        axios.get(`https://zfakeapi.vercel.app/product?menu=game&_page=${Game}&_limit=24&${Children}`).then((res) => {
            setGame(res.data)
        })
        axios.get(`https://zfakeapi.vercel.app/product?menu=calligraphy&_page=${Calligraphy}&_limit=24&${Children}`).then((res) => {
            setCalligraphy(res.data)
        })
        axios.get(`https://zfakeapi.vercel.app/product?menu=website&_page=${Website}&_limit=24&${Children}`).then((res) => {
            if(res.data.length > 0){
                setWebsite(res.data)
            }else{
                axios.get(`https://zfakeapi.vercel.app/product?menu=website&_page=1&_limit=24&${Children}`).then((res) => {
                    setWebsite(res.data)
                })
            }
        })
        axios.get(`https://zfakeapi.vercel.app/product?menu=cooking&_page=${Cooking}&_limit=24&${Children}`).then((res) => {
            if(res.data.length > 0){
                setCooking(res.data)
            }else{
                axios.get(`https://zfakeapi.vercel.app/product?menu=cooking&_page=1&_limit=24&${Children}`).then((res) => {
                    setCooking(res.data)
                })
            }
        })
    }
    const ratingReq = (Children) => {
        setTemp(Children);
        setCheckReq(true);
        axios.get(`https://zfakeapi.vercel.app/product?menu=comic&_page=${Comic}&_limit=24&${Children}`).then((res) => {
            setComic(res.data)
        })
        axios.get(`https://zfakeapi.vercel.app/product?menu=game&_page=${Game}&_limit=24&${Children}`).then((res) => {
            setGame(res.data)
        })
        axios.get(`https://zfakeapi.vercel.app/product?menu=calligraphy&_page=${Calligraphy}&_limit=24&${Children}`).then((res) => {
            setCalligraphy(res.data)
        })
        axios.get(`https://zfakeapi.vercel.app/product?menu=website&_page=${Website}&_limit=24&${Children}`).then((res) => {
            setWebsite(res.data)
        })
        axios.get(`https://zfakeapi.vercel.app/product?menu=cooking&_page=${Cooking}&_limit=24&${Children}`).then((res) => {
            setCooking(res.data)
        })
    }
    const total = (Children) => {
        setTemp(Children);
        setCheckReq(true);
        axios.get(`https://zfakeapi.vercel.app/product?menu=comic&_page=${Comic}&_limit=24&${Children}`).then((res) => {
            setComic(res.data)
        })
        axios.get(`https://zfakeapi.vercel.app/product?menu=game&_page=${Game}&_limit=24&${Children}`).then((res) => {
            setGame(res.data)
        })
        axios.get(`https://zfakeapi.vercel.app/product?menu=calligraphy&_page=${Calligraphy}&_limit=24&${Children}`).then((res) => {
            setCalligraphy(res.data)
        })
        axios.get(`https://zfakeapi.vercel.app/product?menu=website&_page=${Website}&_limit=24&${Children}`).then((res) => {
            setWebsite(res.data)
        })
        axios.get(`https://zfakeapi.vercel.app/product?menu=cooking&_page=${Cooking}&_limit=24&${Children}`).then((res) => {
            setCooking(res.data)
        })
    }
    const addWishlist = (item) => {
        const data = {
            imgOne: item.imgOne,
            imgTwo: item.imgTwo,
            imgThree: item.imgThree,
            menu: item.menu,
            name: item.name,
            rating: item.rating,
            price: item.price,
            text: item.text,
            user: sessionStorage.user
        }
        axios.post("http://localhost:4000/wishlist", data, {
            headers: {
                accessToken: sessionStorage.getItem("accessToken")
            }
        }).then((res) => {
            if(res.data.error){
                alert("User not logged in!")
            }else{
                location.reload();
            }
        })
    }
    useEffect(() => {
        //Search
        axios.get(`https://zfakeapi.vercel.app/product?_page=${Search}&_limit=24&q=${paragraph}&${temp}`).then((res) => {
            if(res.data.length > 0){
                setProduct(res.data);
            }else{
                axios.get(`https://zfakeapi.vercel.app/product?_page=1&_limit=24&q=${paragraph}&${temp}`).then((res) => {
                    if(res.data.length > 0){
                        setProduct(res.data);
                    }else{
                        setResultS(true);
                    }       
                })
            }
        })
        //Home
        axios.get(`https://zfakeapi.vercel.app/product?_page=${Home}&_limit=24&${temp}`).then((res) => {
            setHome(res.data);
        })
        //Cooking
        axios.get(`https://zfakeapi.vercel.app/product?menu=cooking&_page=${Cooking}&_limit=24&${temp}`).then((res) => {
            setCooking(res.data);
        })
        //Comic
        axios.get(`https://zfakeapi.vercel.app/product?menu=comic&_page=${Comic}&_limit=24&${temp}`).then((res) => {
            setComic(res.data)
        })
        //Game
        axios.get(`https://zfakeapi.vercel.app/product?menu=game&_page=${Game}&_limit=24&${temp}`).then((res) => {
            setGame(res.data);
        })
        //Web
        axios.get(`https://zfakeapi.vercel.app/product?menu=website&_page=${Website}&_limit=24&${temp}`).then((res) => {
            setWebsite(res.data);
        })
        //Calli
        axios.get(`https://zfakeapi.vercel.app/product?menu=calligraphy&_page=${Calligraphy}&_limit=24&${temp}`).then((res) => {
            setCalligraphy(res.data);
        })
    }, [])
    useLayoutEffect(() => {
        setCookingPage(typeof window !== 'undefined' && localStorage.paginateCooking ? localStorage.paginateCooking : 1);
        setComicPage(typeof window !== 'undefined' && localStorage.paginateComic ? localStorage.paginateComic : 1);
        setCalligraphyPage(typeof window !== 'undefined' && localStorage.paginateCalligraphy ? localStorage.paginateCalligraphy : 1);
        setGamePage(typeof window !== 'undefined' && localStorage.paginateGame ? localStorage.paginateGame : 1);
        setWebsitePage(typeof window !== 'undefined' && localStorage.paginateWebsite ? localStorage.paginateWebsite : 1)
    })
    return (
        <div className='PageSection'>
            {pathname === `/` && 
                <>
                    <h2 className='PageSection_title'><b>LAT</b>EST</h2>
                    <section className='PageSection-section'>
                        <div className='PageSection-section_data'>
                            {home.map((item) => {
                                return(
                                    <div className='PageSection-section_data-card' key={item.id}>
                                        <img className="data-card_product"
                                            src={item.imgOne} alt={`Foto do produtos - ${item.name}`}/>
                                        <h4 className="data-card_title" title={item.name} style={{textAlign: "center", cursor:"pointer"}}><ViewProduct name={item.name} id={item.id} menu={item.menu}></ViewProduct></h4>
                                        <div className="data-card_rating">
                                            {handleRating(item.rating)}
                                        </div>
                                        <div className="data-card_price">
                                            <h5>{handlePrice(item.price)}</h5>
                                            <h5>{handlePrice(item.price, true)}</h5>
                                        </div>
                                        <div className='data-card_btn'>
                                            <a className="button" onClick={() => addWishlist(item)}><FontAwesomeIcon icon={faHeart} /></a>
                                            <a className="button"><FontAwesomeIcon icon={faBook} /></a>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                    {home.length === 0 ? "" :
                        <BtnHome numberPage={homePage} active={parseInt(Home)}/>
                    }
                </>
            }
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
                                                src={item.imgOne} alt={`Foto do produtos - ${item.name}`}/>
                                            <h4 className="data-card_title" title={item.name} style={{textAlign: "center", cursor:"pointer"}}><ViewProduct name={item.name} id={item.id} menu={item.menu}></ViewProduct></h4>
                                            <div className="data-card_rating">
                                                {handleRating(item.rating)}
                                            </div>
                                            <div className="data-card_price">
                                                <h5>{handlePrice(item.price)}</h5>
                                                <h5>{handlePrice(item.price, true)}</h5>
                                            </div>
                                            <div className='data-card_btn'>
                                                <a className="button" onClick={() => addWishlist(item)}><FontAwesomeIcon icon={faHeart} /></a>
                                                <a className="button"><FontAwesomeIcon icon={faBook} /></a>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </section>
                        {product.length === 0 ? "" :
                            <BtnListProduct numberPage={productPage} namePage={paragraph} active={parseInt(Search)} />
                        }
                    </div>
                    <div style={{display: resultS ? "flex" : "none", alignItems: "center", justifyContent: 'center'}}>
                        <p style={{fontSize: "20px", margin: "10px"}}><b>404</b> | Không tìm thấy kết quả tìm kiếm</p>
                    </div>
                </>
            }
            {pathname === "/product/cooking" && 
                <>
                    <Classify new={newReq} rating={ratingReq} totalPage={total}/>
                    <section className='PageSection-section'>
                        <div className='PageSection-section_data'>
                            {cooking.map((item, index) => {
                                return(
                                    <div className='PageSection-section_data-card' key={item.id}> 
                                        <img className="data-card_product"
                                            src={item.imgOne} alt={`Foto do produtos - ${item.name}`}/>
                                        <h4 className="data-card_title" title={item.name} style={{textAlign: "center", cursor:"pointer"}}><ViewProduct name={item.name} id={item.id} menu={item.menu}></ViewProduct></h4>
                                        <div className="data-card_rating">
                                            {handleRating(item.rating)}
                                        </div>
                                        <div className="data-card_price">
                                            <h5>{handlePrice(item.price)}</h5>
                                            <h5>{handlePrice(item.price, true)}</h5>
                                        </div>
                                        <div className='data-card_btn'>
                                            <a className="button" onClick={() => addWishlist(item)}><FontAwesomeIcon icon={faHeart} /></a>
                                            <a className="button"><FontAwesomeIcon icon={faBook} /></a>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                    {cooking.length === 0  ? "" :
                        <BtnListProduct page={"cooking"} numberPage={cookingPage} check={checkReq} filter={temp} active={parseInt(Cooking)} />
                    }
                </>
            }
            {pathname === "/product/comic" && 
                <>
                    <Classify new={newReq} rating={ratingReq} totalPage={total}/>
                    <section className='PageSection-section'>
                        <div className='PageSection-section_data'>
                            {comic.map((item, index) => {
                                return(
                                    <div className='PageSection-section_data-card' key={item.id}>
                                        <img className="data-card_product"
                                            src={item.imgOne} alt={`Foto do produtos - ${item.name}`}/>
                                        <h4 className="data-card_title" title={item.name} style={{textAlign: "center", cursor:"pointer"}}><ViewProduct name={item.name} id={item.id} menu={item.menu}></ViewProduct></h4>
                                        <div className="data-card_rating">
                                            {handleRating(item.rating)}
                                        </div>
                                        <div className="data-card_price">
                                            <h5>{handlePrice(item.price)}</h5>
                                            <h5>{handlePrice(item.price, true)}</h5>
                                        </div>
                                        <div className='data-card_btn'>
                                            <a className="button" onClick={() => addWishlist(item)}><FontAwesomeIcon icon={faHeart} /></a>
                                            <a className="button"><FontAwesomeIcon icon={faBook} /></a>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                    {comic.length === 0  ? "" :
                        <BtnListProduct page={"comic"} numberPage={comicPage} check={checkReq} filter={temp} active={parseInt(Comic)} />
                    }
                </>
            }
            {pathname === "/product/website" && 
                <>
                    <Classify new={newReq} rating={ratingReq} totalPage={total}/>
                    <section className='PageSection-section'>
                        <div className='PageSection-section_data'>
                            {website.map((item, index) => {
                                return(
                                    <div className='PageSection-section_data-card' key={item.id}>
                                        <img className="data-card_product"
                                            src={item.imgOne} alt={`Foto do produtos - ${item.name}`}/>
                                        <h4 className="data-card_title" title={item.name} style={{textAlign: "center", cursor:"pointer"}}><ViewProduct name={item.name} id={item.id} menu={item.menu}></ViewProduct></h4>
                                        <div className="data-card_rating">
                                            {handleRating(item.rating)}
                                        </div>
                                        <div className="data-card_price">
                                            <h5>{handlePrice(item.price)}</h5>
                                            <h5>{handlePrice(item.price, true)}</h5>
                                        </div>
                                        <div className='data-card_btn'>
                                            <a className="button" onClick={() => addWishlist(item)}><FontAwesomeIcon icon={faHeart} /></a>
                                            <a className="button"><FontAwesomeIcon icon={faBook} /></a>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                    {website.length === 0  ? "" :
                        <BtnListProduct page={"website"} numberPage={websitePage} check={checkReq} filter={temp} active={parseInt(Website)} />
                    }
                </>
            }
            {pathname === "/product/game" && 
                <>
                    <Classify new={newReq} rating={ratingReq} totalPage={total}/>
                    <section className='PageSection-section'>
                        <div className='PageSection-section_data'>
                            {game.map((item, index) => {
                                return(
                                    <div className='PageSection-section_data-card' key={item.id}>
                                        <img className="data-card_product"
                                            src={item.imgOne} alt={`Foto do produtos - ${item.name}`}/>
                                        <h4 className="data-card_title" title={item.name} style={{textAlign: "center", cursor:"pointer"}}><ViewProduct name={item.name} id={item.id} menu={item.menu}></ViewProduct></h4>
                                        <div className="data-card_rating">
                                            {handleRating(item.rating)}
                                        </div>
                                        <div className="data-card_price">
                                            <h5>{handlePrice(item.price)}</h5>
                                            <h5>{handlePrice(item.price, true)}</h5>
                                        </div>
                                        <div className='data-card_btn'>
                                            <a className="button" onClick={() => addWishlist(item)}><FontAwesomeIcon icon={faHeart} /></a>
                                            <a className="button"><FontAwesomeIcon icon={faBook} /></a>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                    {game.length === 0  ? "" :
                        <BtnListProduct page={"game"} numberPage={gamePage} active={parseInt(Game)} />
                    }
                </>
            }
            {pathname === "/product/calligraphy" && 
                <>
                    <Classify new={newReq} rating={ratingReq} totalPage={total}/>
                    <section className='PageSection-section'>
                        <div className='PageSection-section_data'>
                            {calligraphy.map((item, index) => {
                                return(
                                    <div className='PageSection-section_data-card' key={item.id}>   
                                        <img className="data-card_product"
                                            src={item.imgOne} alt={`Foto do produtos - ${item.name}`}/>
                                        <h4 className="data-card_title" title={item.name} style={{textAlign: "center", cursor:"pointer"}}><ViewProduct name={item.name} id={item.id} menu={item.menu}></ViewProduct></h4>
                                        <div className="data-card_rating">
                                            {handleRating(item.rating)}
                                        </div>
                                        <div className="data-card_price">
                                            <h5>{handlePrice(item.price)}</h5>
                                            <h5>{handlePrice(item.price, true)}</h5>
                                        </div>
                                        <div className='data-card_btn'>
                                            <a className="button" onClick={() => addWishlist(item)}><FontAwesomeIcon icon={faHeart} /></a>
                                            <a className="button"><FontAwesomeIcon icon={faBook} /></a>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                    {calligraphy.length === 0  ? "" :
                        <BtnListProduct page={"calligraphy"} numberPage={calligraphyPage} active={parseInt(Calligraphy)} />
                    }
                </>
            }
        </div>
    );
};

export default PageSection;