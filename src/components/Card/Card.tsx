import React, {useEffect} from 'react';
import styled from './Card.module.css'
import CardList from "./CardList";
import {useFetchProductsQuery} from "../../features/productAPI";
import {useAppDispatch, useAppSelector} from "../../features/redux-hooks";
import {productsActions} from "../../features/filterSlice";
import {useLocation} from "react-router";


const Card = () => {
    const {data, isLoading} = useFetchProductsQuery();
    const location = useLocation()
    const dispatch = useAppDispatch();
    const filter = useAppSelector((state) => state.product.filteredProducts);

    useEffect(() => {
        if(data) {
            dispatch(productsActions.productsSuccess(data));
        }
        if (location.pathname === "/saved") {
            dispatch(productsActions.savedList());
        }
    }, [data, location, dispatch]);


    if (isLoading) return <h1>Loading...</h1>

    return (
        <div className={styled.wrapper_wrapper_product}>
            <CardList data={filter}/>
        </div>
    );
};

export default Card;
