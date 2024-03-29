import React from 'react';
import Link from "next/link";
import { convertSlug } from './ViewURL';

const ViewProduct = (props) => {
    return(
        <div>
            <Link style={{textDecoration:"none", color: "black"}} href={`/product/${props.menu}/${convertSlug(props.name)}-${props.id}.html`}>{props.printname ? props.printname : props.name}</Link>
        </div>
    )
};

export default ViewProduct;