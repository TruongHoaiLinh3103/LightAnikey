"use client";

import React, { useEffect, useRef, useState } from 'react';
import "../styles/latestcomments.scss";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart, faPaperPlane, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import "../styles/productid.scss";
import "../styles/comment.scss";
import ViewProduct from '@/utils/ViewProduct';
import { useRouter } from 'next/navigation';

const LatestComments = () => {
    const [comment, setComment] = useState([]);
    const [editComment, setEditComment] = useState(0);
    const [cmtEdit, setCmtEdit] = useState("");
    const [number, setNumber] = useState(0);
    const cmt = useRef("");
    const [unComment, setUnComment] = useState("")
    const router = useRouter();
    const [unChatMap, setUnChatMap] = useState([]);
    const [likeComment, setLikedComment] = useState([]);
    const openUpdateCMT = (item) => {
        setEditComment(item.id);
        setCmtEdit(item.comment);
    }

    const updateComment = (e, id) => {
        if(e.which === 13){
            const data = {comment: cmtEdit}
            axios.patch(`https://server-light-anikey.vercel.app/comment/${id}`, data, {
                headers: {
                    accessToken: sessionStorage.getItem("accessToken")
                }
            }).then((res) => {
                setEditComment(0);
                axios.get(`https://server-light-anikey.vercel.app/comment?keyword=${id}&sortBy=desc&orderBy=id`).then((res) => {
                    if(res && res.data && res.data.data && res.data.data.data){
                        setComment(res.data.data.data)
                    }
                });
            })
        }
    }

    const updateUnComment = (e, id) => {
        if(e.which === 13){
            const data = {comment: cmtEdit}
            axios.patch(`https://server-light-anikey.vercel.app/unchat/${id}`, data, {
                headers: {
                    accessToken: sessionStorage.getItem("accessToken")
                }
            }).then((res) => {
                setEditComment(0);
                let update = unChatMap.filter((item) => item.id === id ? item.comment = cmtEdit : item.comment)
                setUnChatMap(update)
            })
        }
    }

    const deleteComment = (id) => {
        axios.delete(`https://server-light-anikey.vercel.app/comment/${id}`,{
            headers: {
                accessToken: sessionStorage.getItem("accessToken")
            }
        }).then((res) => {
            setComment(comment.filter(item => item.id !== id))
        })
    }

    const deleteUnComment = (id) => {
        axios.delete(`https://server-light-anikey.vercel.app/unchat/${id}`,{
            headers: {
                accessToken: sessionStorage.getItem("accessToken")
            }
        }).then((res) => {
            setUnChatMap(unChatMap.filter(item => item.id !== id))
        })
    }

    const addComment = () => {
        if(cmt.current.value === ""){
            cmt.current.focus();
        }
        else{
            const data = {
                img: sessionStorage.avatar,
                user: sessionStorage.user,
                comment: cmt.current.value,
                productId: 0,
                productName: "Vô mục",
                menu: "Không có thành phân"
            }
            axios.post("https://server-light-anikey.vercel.app/comment", data, 
            {
                headers: {
                    accessToken: sessionStorage.getItem("accessToken")
                }
            }
            ).then((res) => {
                if(res.data.error){
                    alert("User not logged in!")
                }else{
                    cmt.current.value = "";
                    cmt.current.focus();
                }
            })
        }
    }

    const addCommentEnter = (e) => {
        if(e.which === 13){
            if(cmt.current.value === ""){
                cmt.current.focus();
            }
            else{
                const data = {
                    img: sessionStorage.avatar,
                    user: sessionStorage.user,
                    comment: cmt.current.value,
                    productId: 0,
                    productName: "Vô mục",
                    menu: "Không có thành phân"
                }
                axios.post("https://server-light-anikey.vercel.app/comment", data, 
                {
                    headers: {
                        accessToken: sessionStorage.getItem("accessToken")
                    }
                }
                ).then((res) => {
                    if(res.data.error){
                        alert("User not logged in!")
                    }else{
                        cmt.current.value = "";
                        cmt.current.focus();
                    }
                })
            }
        }
    }

    const itemProductName = (name) => {
        const str = name.slice(0,20);
        if(name === "Vô mục"){
            return name;
        }else{
            if(name.length <= str.length){
                return name;
            }
            else{
                const result = str.trim() + "...";
                return result;
            }
        }
    }

    const itemProductTime = (time) => {
        return time;
    }

    const likeAComment = (item) => {
        if(sessionStorage.user){
            axios.post(
                "https://server-light-anikey.vercel.app/likes",{ commentId: item.id }, {
                    headers: {
                        accessToken: sessionStorage.getItem("accessToken")
                    }
                }
            ).then((res) => {
                setLikedComment(
                    likeComment.map((cmt) => {
                        if (cmt.id === item.id) {
                            if (res.data.liked) {
                                return { ...cmt, Likes: [...cmt.Likes, 0] };
                            } else {
                                const likesArray = cmt.Likes;
                                likesArray.pop();
                                return { ...cmt, Likes: likesArray };
                            }
                        } else {
                            return cmt;
                        }
                    })
                )
            })
        }else{
            alert("User not logged in!");
            router.push("/user")
        }
    };

    const likeAUnChatComment = (unchatId) => {
        if(sessionStorage.user){
            axios.post(
                "https://server-light-anikey.vercel.app/likes",{ unchatId: unchatId }, {
                    headers: {
                        accessToken: sessionStorage.getItem("accessToken")
                    }
                }
            ).then((res) => {
                axios.get(`https://server-light-anikey.vercel.app/unchat/${unchatId}`).then((res) => {
                    if(res && res.data){
                        setUnChatMap(res.data)
                    }
                });
            });
        }else{
            alert("User not logged in!");
            router.push("/user")
        }
    };

    const unChat = (item) => {
        setNumber(item.id);
        setUnComment(`@${item.user}`);
        axios.get(`https://server-light-anikey.vercel.app/unchat/${item.id}`).then((res) => {
            if(res && res.data){
                setUnChatMap(res.data)
            }
        });
    }

    const addUnComment = (item) => {
        if(unComment !== ""){
            const data = {
                img: sessionStorage.avatar,
                user: sessionStorage.user,
                comment: unComment,
                productId: item.productId,
                productName: item.productName,
                menu: item.menu,
                CommentId: item.id
            }
            const notification = {
                user: sessionStorage.user === item.user ? "Bạn" : sessionStorage.user,
                img: sessionStorage.avatar,
                name: item.productName,
                notification: "đã phản hồi bình luận của bạn tại",
                CommentId: item.id,
                auth: item.user
            }
            axios.post("https://server-light-anikey.vercel.app/unchat", data, 
            {
                headers: {
                    accessToken: sessionStorage.getItem("accessToken")
                }
            }
            ).then((res) => {
                if(res.data.error){
                    alert("User not logged in!")
                }else{
                    setUnComment("");
                    axios.get(`https://server-light-anikey.vercel.app/unchat/${item.id}`).then((res) => {
                        if(res && res.data){
                            setUnChatMap(res.data)
                        }
                    });
                    axios.post("https://server-light-anikey.vercel.app/notification", notification, {
                        headers: {
                            accessToken: sessionStorage.getItem("accessToken")
                        }
                    }).then((res) => {
                        if(res.data.error){
                            console.log(res.data.error)
                        }
                    })
                }
            })
        }
    }

    const addUnCommentEnter = (e, item) => {
        if(e.which === 13){
            if(unComment !== ""){
                const data = {
                    img: sessionStorage.avatar,
                    user: sessionStorage.user,
                    comment: unComment,
                    productId: item.productId,
                    productName: item.productName,
                    menu: item.menu,
                    CommentId: item.id
                }
                const notification = {
                    user: sessionStorage.user === item.user ? "Bạn" : sessionStorage.user,
                    img: sessionStorage.avatar,
                    name: item.productName,
                    notification: "đã phản hồi bình luận của bạn tại",
                    CommentId: item.id,
                    auth: item.user
                }
                axios.post("https://server-light-anikey.vercel.app/unchat", data, 
                {
                    headers: {
                        accessToken: sessionStorage.getItem("accessToken")
                    }
                }
                ).then((res) => {
                    if(res.data.error){
                        alert("User not logged in!")
                    }else{
                        setUnComment("");
                        axios.get(`https://server-light-anikey.vercel.app/unchat/${item.id}`).then((res) => {
                            if(res && res.data){
                                setUnChatMap(res.data)
                            }
                        });
                        axios.post("https://server-light-anikey.vercel.app/notification", notification, {
                            headers: {
                                accessToken: sessionStorage.getItem("accessToken")
                            }
                        }).then((res) => {
                            if(res.data.error){
                                console.log(res.data.error)
                            }
                        })
                    }
                })
            }
        }
    }
    useEffect(() => {
        axios.get("https://server-light-anikey.vercel.app/comment?page=1&limit=24&sortBy=desc&orderBy=id").then((res) => {
            if(res && res.data && res.data.data && res.data.data.data){
                setComment(res.data.data.data)
            }
        });
    })
    return (
        <div className='LatestComments'>
            <h2><b>COMM</b>ENTS</h2>
            <div className='ProductID-cmt-add'>
                <input type='text' placeholder='Thêm bình luận...' ref={cmt} onKeyDown={(e) => addCommentEnter(e)}/>
                <FontAwesomeIcon icon={faPaperPlane} onClick={() => addComment()}/>
            </div>
            <div className='LatestComments-cmt-box'>
                {comment.map((item) => {
                    return(
                        <div className='cmt-box_item' key={item.id}>
                            <div className='avatarAndAuth'>
                                <img src={item.img} alt='Avatar' className="avatarAndAuth-img"/>
                                <div className='Auth'>
                                    <h3>{item.user}</h3>
                                    <div style={{margin: "5px 0px"}}>
                                        {itemProductName(item.productName) === "Vô mục" ?
                                            itemProductName(item.productName)
                                                :
                                            <ViewProduct 
                                                name={item.productName} 
                                                id={item.productId} 
                                                menu={item.menu} 
                                                printname={itemProductName(item.productName)}  
                                            />
                                        }
                                    </div>
                                    <div style={{margin: "0px"}}>{itemProductTime(item.updatedAt)}</div>
                                </div>
                            </div>
                            <div className='cmtAndLike'>
                                {editComment !== item.id ?
                                    <p>{item.comment}</p>
                                    :
                                    <input type='text' autoFocus value={cmtEdit} onChange={(e) => {setCmtEdit(e.target.value)}} onKeyDown={(e) => updateComment(e, item.id)} style={{
                                        padding: "5px", fontSize: "15px", border: "none", outline: "none", color: "green"
                                    }}/>
                                }
                                <div className='LikeAndDislike'>
                                    <div>
                                        <span onClick={() => likeAComment(item)}><FontAwesomeIcon icon={faHeart} /> {item.Likes.length}</span>
                                        <span onClick={() => unChat(item)}><FontAwesomeIcon icon={faComment} /> trả lời({item.Unchats.length})</span>
                                        {sessionStorage.user === item.user &&
                                            <>
                                                <span onClick={() => openUpdateCMT(item)}><FontAwesomeIcon icon={faPencil} /> sửa</span>
                                                <span onClick={() => deleteComment(item.id)}><FontAwesomeIcon icon={faTrash} /> xóa</span>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='unchat_box' style={{display: item.id === number ? "block" : "none", paddingLeft: "30px"}}>
                                <div className='ProductID-cmt-add'>
                                    <input type='text' placeholder='Thêm bình luận...' value={unComment} 
                                        onKeyDown={(e) => addUnCommentEnter(e, item)} 
                                        onChange={(e) => setUnComment(e.target.value)}
                                    />
                                    <FontAwesomeIcon icon={faPaperPlane} onClick={() => addUnComment(item)}/>
                                </div>
                                <div className='unchat_box-cmt'>
                                    {unChatMap.map((temp) => {
                                        return(
                                            <div className='cmt-box_item' key={temp.id}>
                                                <div className='avatarAndAuth'>
                                                    <img src={temp.img} alt='Avatar' className="avatarAndAuth-img"/>
                                                    <div className='Auth'>
                                                        <h3>{temp.user}</h3>
                                                        <div style={{margin: "5px 0px"}}>
                                                            {itemProductName(temp.productName) === "Vô mục" ?
                                                                itemProductName(temp.productName)
                                                                    :
                                                                <ViewProduct 
                                                                    name={temp.productName} 
                                                                    id={temp.productId} 
                                                                    menu={temp.menu} 
                                                                    printname={itemProductName(temp.productName)}  
                                                                />
                                                            }
                                                        </div>
                                                        <div style={{margin: "0px"}}>{itemProductTime(temp.updatedAt)}</div>
                                                    </div>
                                                </div>
                                                <div className='cmtAndLike'>
                                                    {editComment !== temp.id ?
                                                        <p>{temp.comment}</p>
                                                        :
                                                        <input type='text' autoFocus value={cmtEdit} onChange={(e) => {setCmtEdit(e.target.value)}} onKeyDown={(e) => updateUnComment(e, temp.id)} style={{
                                                            padding: "5px", fontSize: "15px", border: "none", outline: "none", color: "green"
                                                        }}/>
                                                    }
                                                    <div className='LikeAndDislike'>
                                                        <div>
                                                            <span onClick={() => likeAUnChatComment(temp.id)}><FontAwesomeIcon icon={faHeart} /> {temp.Likes.length}</span>
                                                            <span onClick={() => setUnComment(`@${temp.user}`)}><FontAwesomeIcon icon={faComment} /> trả lời</span>
                                                            {sessionStorage.user === temp.user &&
                                                                <>
                                                                    <span onClick={() => openUpdateCMT(temp)}><FontAwesomeIcon icon={faPencil} /> sửa</span>
                                                                    <span onClick={() => deleteUnComment(temp.id)}><FontAwesomeIcon icon={faTrash} /> xóa</span>
                                                                </>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default LatestComments;