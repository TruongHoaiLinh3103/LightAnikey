"use client";

import React, { useEffect, useState } from 'react';
import "../styles/profile.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-regular-svg-icons';
import { faBell, faLocationDot, faRightFromBracket, faPencil, faCheck, faBlog } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Bloger from './Bloger';
import Notification from './Notification';

const Profile = () => {
    const [seeMore, setSeeMore] = useState(false);
    const [cancelImg, setCancelImg] = useState(true)
    const [commentsItem, setCommentItem] = useState(true);
    const [notification, setNotification] = useState(false);
    const [profileDetail, setProfileDetail] = useState({});
    const [bio, setBio] = useState("")
    const [company, setCompany] = useState("");
    const [location, setLocatin] = useState("");
    const [avatar, setAvatar] = useState(sessionStorage.avatar);
    const [pronouns, setPronouns] = useState("")
    const router = useRouter();
    const cancel = () => {
        setSeeMore(false)
    }
    const logOutAccount = () => {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("avatar");
        router.push("/");
    }
    const openCMT = () => {
        setCommentItem(true);
        setNotification(false);
    }
    const openNotifi = () => {
        setNotification(true);
        setCommentItem(false);
    }
    const openEditProfile = () => {
        setSeeMore(true);
        setAvatar(profileDetail.img ? profileDetail.img : avatar)
        setBio(profileDetail.bio);
        setCompany(profileDetail.company);
        setLocatin(profileDetail.location);
    }
    const onChangeAVT = (e) => {
        const avatar = e.target.files[0]
        const reader = new FileReader()
        if (avatar && avatar.type.match('image.*')) {
            reader.readAsDataURL(avatar);
            reader.onloadend = function (e) {
                setAvatar(reader.result)
            }
        }
    }
    const editProfile = () => {
        const data = {
            img: avatar,
            bio: bio,
            pronouns: pronouns,
            company: company,
            location: location,
            user: sessionStorage.user
        }
        axios.post("https://server-light-anikey.vercel.app/account", data).then((res) => {
            if(res.data.error){
                alert(res.data.error)
            }else{
                const data = {img: avatar, user: sessionStorage.user}
                axios.patch("https://server-light-anikey.vercel.app/comment/avatar", data, {
                    headers: {
                        accessToken: sessionStorage.getItem("accessToken")
                    }
                })
            }
        })
        setSeeMore(false)
    }
    const openEditAvatar = () => {
        setCancelImg(false)
        setAvatar(profileDetail.img ? profileDetail.img : avatar)
    }
    const editAvatar = () => {
        const data = {
            img: avatar,
            bio: profileDetail.bio ? profileDetail.bio : "",
            pronouns: "",
            company: profileDetail.company ? profileDetail.company : "",
            location: profileDetail.location ? profileDetail.location : "",
            user: sessionStorage.user
        }
        axios.post("https://server-light-anikey.vercel.app/account", data).then((res) => {
            if(res.data.error){
                alert(res.data.error)
            }
        })
        setCancelImg(true)
    }
    useEffect(() => {
        axios.get(`https://server-light-anikey.vercel.app/account/${sessionStorage.user}`).then((res) => {
            if(res && res.data){
                setProfileDetail(res.data);
                sessionStorage.setItem("avatar", res.data.img)
            }
        })
    })
    const Data = Object.keys(profileDetail).length === 0
    return (
        <div className='Profile'>
            <div className='Profile_Deltai'>
                {!Data ? 
                    <>
                        {profileDetail.img ?
                        <img src={profileDetail.img} alt='avatar' onClick={() => openEditAvatar()}/>
                        :
                        <img src={sessionStorage.avatar} alt='avatar' onClick={() => openEditAvatar()}/>
                        }
                        <h3>{profileDetail.user}</h3>
                        {profileDetail.bio &&
                        <p style={{margin: "0px 0px 7px", textAlign: "center", userSelect: "none"}} > <i>{profileDetail.bio}</i></p>}
                        {profileDetail.company &&
                        <p style={{margin: "0px 0px 7px", textAlign: "center", userSelect: "none"}}><FontAwesomeIcon icon={faBuilding} /> <i>{profileDetail.company}</i></p>}
                        {profileDetail.location &&
                        <p style={{margin: "0px 0px 7px", textAlign: "center", userSelect: "none"}}><FontAwesomeIcon icon={faLocationDot} /> <i>{profileDetail.location}</i></p>}
                    </>
                :
                    <>
                        <img src={sessionStorage.avatar} alt='avatar' onClick={() => {setCancelImg(false)}}/>
                        <h3>{sessionStorage.user}</h3>
                    </>
                }
                <div className='Profile_Deltai-modal' style={{display: !cancelImg ? "flex" : "none"}}>
                    <form encType="multipart/form-data">
                        <legend>Edit avatar</legend>
                        <input type="file" name="avatar" accept='image/png, image/jpeg, image/jpg, image/jfif' onChange={(e) => onChangeAVT(e)}/>
                        <img src={avatar} alt='avatar' />
                        <div className='Profile_Deltai-modal_btn'>
                            <input type="button" value="📤" onClick={() => editAvatar()}/>
                            <input type='button' value="❌" onClick={() => {setCancelImg(true)}}/>
                        </div>
                    </form>
                </div>
                {!seeMore ? 
                    <button className='Profile_Deltai-btn' onClick={() => openEditProfile()}><FontAwesomeIcon icon={faPencil} /></button>
                :
                    <form className='Profile_Deltai-form' encType="multipart/form-data">
                        <div className='Profile_Deltai-form_item'>
                            <label htmlFor='avatar'>Avatar</label>
                            <input type="file" name="avatar" accept='image/png, image/jpeg, image/jpg, image/jfif' onChange={(e) => onChangeAVT(e)}/>
                            <img src={avatar} alt='avatar' />
                        </div>
                        <div className='Profile_Deltai-form_item'>
                            <label htmlFor='user'>User</label>
                            <input type="text" name="user" defaultValue={sessionStorage.user} disabled/>
                        </div>
                        <div className='Profile_Deltai-form_item'>
                            <label htmlFor='bio'>Bio</label>
                            <textarea placeholder='Add a bio' name='bio' value={bio} onChange={(e) => setBio(e.target.value)}/>
                        </div>
                        <div className='Profile_Deltai-form_item'>
                            <label htmlFor='pronouns'>Pronouns</label>
                            <select name="pronouns" id="Pronouns">
                                <option value="They/them" onChange={() => setPronouns("They/them")}>They/them</option>
                                <option value="She/her" onChange={() => setPronouns("She/her")}>She/her</option>
                                <option value="He/him" onChange={() => setPronouns("He/him")}>He/him</option>
                                <option value="Custom" onChange={() => setPronouns("Custom")}>Custom</option>
                            </select>
                        </div>
                        <div className='Profile_Deltai-form_other'>
                            <FontAwesomeIcon icon={faBuilding} />
                            <input type='text' placeholder='Company' name='company' value={company} onChange={(e) => setCompany(e.target.value)}/>
                        </div>
                        <div className='Profile_Deltai-form_other'>
                            <FontAwesomeIcon icon={faLocationDot} />
                            <input type='text' placeholder='Location' name='location' value={location} onChange={(e) => setLocatin(e.target.value)}/>
                        </div>
                        <div className='Profile_Deltai-form_btn'>
                            <input type='button' value="Submit" onClick={() => editProfile()}/>
                            <button onClick={() => cancel()}>Cancel</button>
                        </div>
                    </form>
                }
            </div>
            <div className='Profile_Page'>
                <ul>
                    <li onClick={() => openCMT()} title='Comments'><FontAwesomeIcon icon={faBlog} /> <span className='Profile_page-span'>Note</span></li>
                    <li onClick={() => openNotifi()} title='Notification'><FontAwesomeIcon icon={faBell} /> <span className='Profile_page-span'>Notification</span></li>
                    <li onClick={() => logOutAccount()} title='Log out'><FontAwesomeIcon icon={faRightFromBracket} /> <span className='Profile_page-span'>Log out</span></li>
                </ul>
                {commentsItem &&
                    <div>
                        <Bloger/>
                    </div>
                }
                {notification &&
                    <div>
                        <Notification/>
                    </div>
                }
            </div>
        </div>
    );
};

export default Profile;