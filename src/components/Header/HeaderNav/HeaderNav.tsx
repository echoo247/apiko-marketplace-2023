import React from 'react';
import styled from './HeaderNav.module.css'
import {Link} from "react-router-dom";
import logoWhite from "../../../assets/icons/apiko-white.svg"
import logoBlack from "../../../assets/icons/apiko-black.svg"
import HeaderNavLinks from "./HeaderNavLink/HeaderNavLink";



const HeaderNav = () => {

    const logo = window.location.pathname === "/register"  || window.location.pathname === "/login"

    /*window.location.pathname !== "/login"*/
    return (
        <div className={styled.header_nav}>
            <Link to='/'>
                <img src={logo ? logoBlack : logoWhite} alt="LogoApiko"/>
            </Link>
            <HeaderNavLinks/>
        </div>
    );
};

export default HeaderNav;
