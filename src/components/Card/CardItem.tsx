import React from 'react';
import styled from './CardItem.module.css'
import {Link} from "react-router-dom";
import heart from '../../assets/icons/heart-like-love-favourite-dating.svg'
import {IProduct} from "../../types";


interface CardItemProps extends Pick<IProduct, "title" | "price" | "photos">{

}

const CardItem = ({title, price, photos}: CardItemProps) => {

    const photoSrc = photos || ''


    return (
        <div className={styled.product_card}>
            <div className={styled.product_card_image_block}>
                <Link to='/'>
                    <img className={styled.product_card_image} src={photoSrc} alt="card"/>
                </Link>
                <div className={styled.product_card_circle}>
                    <img className={styled.product_save_icon} src={heart} alt="liked_product"/>
                </div>
            </div>
            <div className={styled.product_card_info_block}>
                <Link to={'/'}>
                    <h2 className={styled.product_card_title}>{title}</h2>
                </Link>
                <div>
                    <p className={styled.product_card_price}>$ {price}</p>
                </div>
            </div>
        </div>
    );
};

export default CardItem;
