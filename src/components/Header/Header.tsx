import React from 'react';
import styled from './Header.module.css'
import HeaderNav from "./HeaderNav/HeaderNav";
import HeaderSearch from "../HeaderSearch/HeaderSearch";


const Header = () => {

    const isSearch: boolean = window.location.pathname === "/upload"  || window.location.pathname === "/login"
        || window.location.pathname === "/register" || window.location.pathname === "/profile/edit"

    const isLog = window.location.pathname === "/register"  || window.location.pathname === "/login"

    //: `${styled.header_log} ${styled.header}`
    const  log = !isLog ? styled.header : `${styled.header_log} ${styled.header}`
    return (
        <div className={log}>
            <HeaderNav/>
            {isSearch ? '' : <HeaderSearch/>}
        </div>
    );
};

export default Header;
