import React from 'react';
import styled from './HeaderNavLinks.module.css'
import {Link} from "react-router-dom";
import ButtonHeader from "../../../Common/Button-Header/ButtonHeader";
import heartWhite from "../../../../../assets/icons/heart-outline-white.svg"


const HeaderNavLinks = () => {
    return (
        <div className={styled.header_nav_links}>
            <Link to="/upload">
                <ButtonHeader className={styled.buttonSell}>
                    Sell
                </ButtonHeader>
            </Link>
            <Link to="/">
                <ButtonHeader className={styled.buttonLogin}>
                    LOGIN
                </ButtonHeader>
            </Link>
            <Link to="/">
                <img src={heartWhite} alt='Heart'/>
            </Link>
        </div>
    );
};

export default HeaderNavLinks;
