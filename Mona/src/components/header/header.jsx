import React from 'react';
import { Link } from 'react-router-dom';

import Constants from '../../constants';

import styles from './header.module.css';

import appIconNav from '../../../public/icons/appIconNav.png';
import feedIconNav from '../../../public/icons/feedIconNav.png';
import feedIconNavActive from '../../../public/icons/feedIconNavActive.png';
import blankProfileIcon from '../../../public/icons/blankProfileIcon.png';

const Header = ({ location = "", externalClass = "", children }) => {
    let scrollPageUp = () => window.scrollTo(0, 0);

    let userId = sessionStorage.getItem(Constants.USER_ID_COOKIE_KEY);
    let userAvatar = sessionStorage.getItem(Constants.USER_AVATAR_COOKIE_KEY);

    return (
        <header className={`${styles.container} ${externalClass}`}>
            <div className={styles.centerContainer}>
                <img className={styles.icon} src={appIconNav} width="30px" onClick={scrollPageUp} />
                <p>MONA</p>
                <nav style={{ display: userId ? "block" : "none" }}>
                    <ul>
                        <li>
                            <Link to={`/profile/${userId}`}>
                                <div style={{ background: `url(${userAvatar ? userAvatar : blankProfileIcon}) 50% 10% no-repeat` }} className={`${styles.userIcon} ${location.startsWith(`/profile/${userId}`) ? styles.userIconBorder : ''}`}>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/feed">
                                <div>
                                    <img src={location === '/feed' ? feedIconNavActive : feedIconNav} width="20px" />
                                    <span>Лента</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            {children}
        </header>
    );
};

export default Header;