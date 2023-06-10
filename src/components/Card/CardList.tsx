import React, {FC} from 'react';
import styled from './Card.module.css'
import CardItem from "./CardItem";
import {IProduct} from "../../types";

interface CardListProps{
    data: IProduct[] | undefined
}

const CardList: FC<CardListProps> = ({data}) => {

    return (
        <div className={styled.product_wrapper_all_card}>
            { data?.map((prod) =>
                <CardItem location={prod.location} saved={prod.saved} photos={prod.photos} id={prod.id} title={prod.title} price={prod.price} key={prod.id}/>
            )}
        </div>
    );
};

export default CardList;

