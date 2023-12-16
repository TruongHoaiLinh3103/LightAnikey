"use client";

import React, {useState} from 'react';
import "../styles/classify.scss";


const Classify = () => {
    const max = "Giá ⬆ đến ⬇";
    const min = "Giá ⬇ đến ⬆";
    const [title, setTitle] = useState(max);
    const namePrice = () => {
        if(title === max){
            setTitle(min);
        }else{
            setTitle(max);
        }
    }
    return (
        <div className='Classify'>
            <button>Mới nhất</button>
            <button>Phổ biến</button>
            <button onClick={() => namePrice()}>{title}</button>
        </div>
    );
};

export default Classify;