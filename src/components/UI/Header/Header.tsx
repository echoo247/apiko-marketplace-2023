import React from 'react';
import styled from './Header.module.css'
import HeaderNav from "./HeaderNav/HeaderNav";
import HeaderSearch from "./HeaderSearch/HeaderSearch";

const Header = () => {

    return (
        <div className={styled.header}>
            <HeaderNav/>
            {window.location.pathname !== "/upload" ? <HeaderSearch/> : ''}
        </div>
    );
};

export default Header;
