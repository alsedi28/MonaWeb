import React from 'react';
import { Link } from 'react-router-dom';

import UserAvatar from '../userAvatar/userAvatar';
import Constants from '../../constants';
import { resetUserCookie } from '../../helpers/cookieHelper';
import CommonButton from '../buttons/commonButton/commonButton';

import styles from './header.module.css';

import appIconNav from '../../../public/icons/appIconNav.png';
import feedIconNav from '../../../public/icons/feedIconNav.png';
import feedIconNavActive from '../../../public/icons/feedIconNavActive.png';

const Header = ({ location = "", externalClass = "", children, onSignIn, onSignUp }) => {
    let scrollPageUp = () => window.scrollTo(0, 0);

    let userId = sessionStorage.getItem(Constants.USER_ID_COOKIE_KEY);
    let userAvatar = sessionStorage.getItem(Constants.USER_AVATAR_COOKIE_KEY);

    let isCurrentProfileUser = location.startsWith(`/profile/${userId}`);

    return (
        <header className={`${styles.container} ${externalClass}`}>
            <div className={styles.centerContainer}>
                <img className={styles.icon} src={appIconNav} width="30px" onClick={scrollPageUp} />
                <p>MONA</p>
                <nav className={styles.buttonsWithIconsNav} style={{ display: userId ? "block" : "none" }}>
                    <ul className={styles.buttonsWithIconsUl}>
                        <li className={styles.buttonsWithIconsLi}>
                            <UserAvatar avatar={userAvatar} size={30} withGrayBorder={!isCurrentProfileUser} withOrangeBorder={isCurrentProfileUser} externalClass={`${styles.userAvatarExternal}`} />
                            <ul className={styles.dropdown}>
                                <li className={styles.dropdownContent}>
                                    <Link to={`/profile/${userId}`}>
                                        <p className={styles.menuItemTitle}>Профиль</p>
                                    </Link>
                                    <div className={styles.dividerLine}></div>
                                </li>
                                <li className={styles.dropdownContent} onClick={resetUserCookie}>
                                    <Link to={`/intro`}>
                                        <p className={styles.signOutLink}>Выйти</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className={styles.buttonsWithIconsLi}>
                            <Link to="/feed">
                                <div>
                                    <img src={location === '/feed' ? feedIconNavActive : feedIconNav} width="20px" />
                                    <span>Лента</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <nav className={styles.buttonsNav} style={{ display: userId ? "none" : "block" }}>
                    <ul className={styles.buttonsUl}>
                        <li className={styles.buttonsLi} style={{ display: onSignIn ? "block" : "none" }}>
                            <CommonButton externalClass="borderedButton" title="Войти" onClick={onSignIn} />
                        </li>
                        <li className={styles.buttonsLi} style={{ display: onSignUp ? "block" : "none" }}>
                            <CommonButton externalClass="filledButton" title="Создать аккаунт" onClick={onSignUp} />
                        </li>
                    </ul>
                </nav>
            </div>
            {children}
        </header>
    );
};

export default Header;
