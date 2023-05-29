import React from 'react';
import styled from './Card.module.css'
import CardList from "./CardList";


const Card = () => {

    return (
        <div className={styled.wrapper_wrapper_product}>
            <CardList/>
        </div>
    );
};

export default Card;
