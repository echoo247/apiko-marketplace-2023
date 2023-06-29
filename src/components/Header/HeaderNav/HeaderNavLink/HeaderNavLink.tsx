import React from 'react';
import styled from './HeaderNavLinks.module.css'
import {Link, useNavigate} from "react-router-dom";
import heartWhite from "../../../../assets/icons/heart-outline-white.svg"
import heartBlack from "../../../../assets/icons/heart-outline-black.svg"
import {useAppSelector} from "../../../../features/redux-hooks";
import Button from "../../../UI/Common/Button/Button";
import {useFetchUserQuery} from "../../../../features/userAPI";
import {auth} from "../../../../firebase-config/firebase";
import {signOut} from "firebase/auth";
import {useLocation} from "react-router";



const HeaderNavLinks = () => {
    const location = useLocation()
    const link = location.pathname === "/register"  || location.pathname === "/login"
    const navigation = useNavigate()
    const {isAuth, id: userId} = useAppSelector(state => state.auth)
    const {data: user} = useFetchUserQuery(userId)

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log("error log out: ", error)
        });
    }

    const initials = user && user.fullName.split(' ').map((word: string )=> word.charAt(0)).join('')

    return (
        <div className={styled.header_nav_links}>
            <Button onClick={() => navigation('/upload')} className={styled.buttonSell}>
                Sell
            </Button>
            {isAuth
                ? <div className={`${styled.buttonLogin} ${styled.popup_position}`}>
                    <div className={styled.avatar_block_popup}>
                        <div className={styled.avatar_popup_wrapper}>
                            <div className={styled.popup_header}>
                                {user?.avatar ? <img style={{borderRadius: "50%", width: '4.5em', height: '4.5em',}} src={user.avatar} alt={'Avatar'}/>
                                    :
                                    <div className={`${styled.avatar_text_wrapper} ${styled.avatar_text_hover}`}>
                                        {initials}
                                    </div>
                                }
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
                    {user?.avatar ? <img style={{borderRadius: "50%", width: '3.7em', height: '3.7em',}} src={user.avatar} alt={'avatar'}/>
                        : <div className={`${styled.avatar_text_wrapper} ${styled.avatar_text}`}>{initials}</div>
                    }

            </div>
                : <Button onClick={() => navigation('/login')} className={link ?
                    `${styled.buttonLogin} ${styled.buttonLogin_state}` : styled.buttonLogin}>
                    LOGIN
                </Button>
            }
            <Link to="/saved">
                <img src={link ? heartBlack : heartWhite} alt='Heart'/>
            </Link>
        </div>
    );
};

export default HeaderNavLinks;
