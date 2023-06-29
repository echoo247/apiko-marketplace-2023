import React from 'react';
import styled from './Header.module.css'
import HeaderNav from "./HeaderNav/HeaderNav";
import HeaderSearch from "../HeaderSearch/HeaderSearch";
import {useLocation} from "react-router";


const Header = () => {
    const location = useLocation()

    const isSearch: boolean = location.pathname === "/upload"  || location.pathname === "/login"
        || location.pathname === "/register" || location.pathname === "/profile/edit"

    const isLog = location.pathname === "/register"  || location.pathname === "/login"

    const  log = !isLog ? styled.header : `${styled.header_log} ${styled.header}`

    return (
        <div className={log}>
            <HeaderNav/>
            {isSearch ? '' : <HeaderSearch/>}
        </div>
    );
};

export default Header;
