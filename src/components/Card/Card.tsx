import React, {useEffect} from 'react';
import styled from './Card.module.css'
import CardList from "./CardList";
import {useGetProductsQuery} from "../../store/productAPI";
import {useAppDispatch, useAppSelector} from "../../store/Redux";
import {productsActions} from "../../features/filterSlice";


const Card = () => {
    const {data, isLoading} = useGetProductsQuery();
    const dispatch = useAppDispatch();
    const filter = useAppSelector((state) => state.product.filteredProducts);

    useEffect(() => {
        if(data) {
            dispatch(productsActions.productsSuccess(data));
        }
        if (window.location.pathname === "/saved") {
            dispatch(productsActions.savedList());
        }
    }, [data, dispatch, ]);


    
    if (isLoading) return <h1>Loading...</h1>
    return (
        <div className={styled.wrapper_wrapper_product}>
            <CardList data={filter}/>
        </div>
    );
};

export default Card;
