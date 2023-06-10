import React, {useState} from 'react';
import styled from './CardItem.module.css'
import {Link} from "react-router-dom";
import unSavedIcon from '../../assets/icons/product-unsaved.svg'
import savedIcon from '../../assets/icons/product-saved.svg'
import {IProduct} from "../../types";
import {useUpdateProductMutation} from "../../store/productAPI";


interface CardItemProps extends Pick<IProduct, "title" | "price" | "photos" | "id" | "saved" | "location">{

}

const CardItem = ({title, price, photos, id, saved, location}: CardItemProps) => {
    const [updateProduct] = useUpdateProductMutation()

    const handleChangeSave = async () => {
        const newObject = {
            id: id,
            saved: !saved
        }
        await updateProduct(newObject)
    }

    return (
        <div className={styled.product_card}>
            <div className={styled.product_card_image_block}>
                <Link to={`/${id}`} >
                    <img className={styled.product_card_image} src={ photos || ''} alt="card"/>
                </Link>
                <div className={styled.product_card_circle}>
                    <img onClick={handleChangeSave} className={styled.product_save_icon} src={saved ? savedIcon : unSavedIcon} alt="liked_product"/>
                </div>
            </div>
            <div className={styled.product_card_info_block}>
                <Link to={`/${id}`}>
                    <h2 className={styled.product_card_title}>{title} {location}</h2>
                </Link>
                <div>
                    <p className={styled.product_card_price}>$ {price}</p>
                </div>
            </div>
        </div>
    );
};

export default CardItem;
