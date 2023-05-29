import React from 'react';
import styled from './HeaderNav.module.css'
import {Link} from "react-router-dom";
import logoWhite from "../../../../assets/icons/apiko-white.svg"
import HeaderNavLinks from "./HeaderNavLink/HeaderNavLink";



const HeaderNav = () => {
    return (
        <div className={styled.header_nav}>
            <Link to='/'>
                <img src={logoWhite} alt="LogoApiko"/>
            </Link>
            <HeaderNavLinks/>
        </div>
    );
};

export default HeaderNav;
