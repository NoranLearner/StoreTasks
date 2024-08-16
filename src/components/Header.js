import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import './Header.css'
import '../theme.css'

import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config'
import { signOut } from "firebase/auth";

import { useTranslation } from 'react-i18next';

const Header = () => {

    const { theme, toggleTheme } = useContext(ThemeContext);

    const [user, loading, error] = useAuthState(auth);

    const { t, i18n } = useTranslation();

    return (
        <div className="myHeader">

            {/* --------------------------------------------------------------------- */}

            <header className="hide-when-mobile ali">

                <h1 style={{ padding: "0" }}><a href="/" className='logo'>c4a.dev</a></h1>

                {/* <button className="theme-btn" onClick={() => {toggleTheme(theme === "Light" ? "Dark" : "Light")}}>{theme}</button> */}

                <i onClick={() => { toggleTheme(theme === "Light" ? "Dark" : "Light"); }} className="fa-solid fa-moon"></i>

                <i onClick={() => { toggleTheme(theme === "Light" ? "Dark" : "Light"); }} className="fa-solid fa-sun" ></i>

                <ul className="flex">

                    <li className="main-list lang">
                        <p>{t('lang')}</p>
                        <ul className='lang-box'>
                            <li
                                dir="rtl"
                                onClick={() => {
                                    i18n.changeLanguage("ar");
                                }}
                            >
                                <p>العربيه</p>
                                {i18n.language === "ar" && <i className="fa-solid fa-check"></i>}
                            </li>
                            <li onClick={() => {
                                i18n.changeLanguage("en");
                            }}>
                                <p>English</p>
                                {i18n.language === "en" && <i className="fa-solid fa-check"></i>}
                            </li>
                            <li onClick={() => {
                                i18n.changeLanguage("fr");
                            }}>
                                <p>French</p>
                                {i18n.language === "fr" && <i className="fa-solid fa-check"></i>}
                            </li>
                        </ul>
                    </li>

                    {!user && <li className="main-list">
                        <NavLink className="main-link" to="/sign-in">
                            Sign-in
                        </NavLink>

                    </li>}

                    {!user && <li className="main-list">
                        <NavLink className="main-link" to="/sign-up">
                            Sign-up
                        </NavLink>

                    </li>}

                    {user && <li className="main-list" onClick={() => {
                        signOut(auth).then(() => {
                            console.log("Sign-out successful.")
                        }).catch((error) => {
                            // An error happened.
                        });
                    }}>
                        <button className="main-link signout">
                            {t('signout')}
                        </button>
                    </li>}

                    {user && <li className="main-list">
                        <NavLink className="main-link" to="/profile"> {t('account')} </NavLink>
                    </li>}

                    {user && <li className="main-list">
                        <NavLink className="main-link" to="/html"> HTML </NavLink>
                    </li>}

                    {user && <li className="main-list">
                        <NavLink className="main-link" to="/css"> CSS </NavLink>
                    </li>}

                    {user && <li className="main-list">
                        <NavLink className="main-link" to="/javascript"> JavaScript </NavLink>
                    </li>}

                </ul>

            </header>

            {/* --------------------------------------------------------------------- */}

        </div>
    )
}

export default Header;