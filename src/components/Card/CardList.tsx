import React, {useState} from 'react';
import styled from './Card.module.css'
import CardItem from "./CardItem";
import {useGetProductsQuery} from "../../store/userAPI";



const CardList = () => {

    const {data, error, isLoading} = useGetProductsQuery();

    if (isLoading) return <h1>Loading...</h1>

    return (
        <div className={styled.product_wrapper_all_card}>

            { data?.map((prod) =>
                <CardItem photos={prod.photos} title={prod.title} price={prod.price} key={prod.id}/>
            )}
        </div>
    );
};

export default CardList;
