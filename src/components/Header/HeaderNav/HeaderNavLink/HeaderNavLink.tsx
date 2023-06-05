import React from 'react';
import styled from './HeaderNavLinks.module.css'
import {Link, useNavigate} from "react-router-dom";
import ButtonHeader from "../../../UI/Common/Button/Button";
import heartWhite from "../../../../assets/icons/heart-outline-white.svg"
import heartBlack from "../../../../assets/icons/heart-outline-black.svg"
import {useAppDispatch, useAppSelector} from "../../../../store/Redux";
import {logoutAction} from "../../../../features/authSlice";
import avatar from '../../../../assets/icons/avatar-owner.svg'
import {useGetUserQuery} from "../../../../store/userAPI";
import Button from "../../../UI/Common/Button/Button";


const HeaderNavLinks = () => {
    const link = window.location.pathname === "/register"  || window.location.pathname === "/login"
    const navigation = useNavigate()
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch()
    const userId = Number(window.localStorage.getItem('userId')) ?? 0
    const {data: user} = useGetUserQuery(userId)

    const handleLogout = () => {
        window.localStorage.removeItem('userId')
        navigation('/login', { replace: true })
        dispatch(logoutAction())
    }

    return (
        <div className={styled.header_nav_links}>
            <Link to="/upload">
                <ButtonHeader className={styled.buttonSell}>
                    Sell
                </ButtonHeader>
            </Link>
            {isAuth
                ? <ButtonHeader className={`${styled.buttonLogin} ${styled.popup_position}`}>
                    <div className={styled.avatar_block_popup}>
                        <div className={styled.avatar_popup_wrapper}>
                            <div className={styled.popup_header}>
                                <img src={avatar} alt={'Avatar'}/>
                                <div className={styled.popup_text_wrapper}>
                                    <div>
                                        <div className={styled.popup_text}>
                                            {user && user.fullName}
                                        </div>
                                        <div className={`${styled.popup_email} ${styled.popup_text}`}>
                                            {user && user.email}
                                        </div>
                                    </div>
                                    <Link to={'/profile'} className={`${styled.popup_profile} ${styled.popup_text}`}>Profile</Link>
                                </div>
                            </div>
                            <Button onClick={() => navigation('/profile/edit')} className={`${styled.popup_edit_profile} ${styled.popup_text} ${styled.popup_profile}`}>
                                Edit profile
                            </Button>
                        </div>
                        <div className={styled.popup_line}></div>
                        <div className={styled.popup_logout} onClick={handleLogout}>Logout</div>
                    </div>
                    <img src={avatar} alt={'avatar'}/>
            </ButtonHeader>
                : <Link to="/login">
                        <ButtonHeader className={link ?
                            `${styled.buttonLogin} ${styled.buttonLogin_state}` : styled.buttonLogin}>
                            LOGIN
                        </ButtonHeader>
                    </Link>
            }




            <Link to="/">
                <img src={link ? heartBlack : heartWhite} alt='Heart'/>
            </Link>
        </div>
    );
};

export default HeaderNavLinks;
