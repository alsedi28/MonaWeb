import React from 'react';
import { Link } from 'react-router-dom';

import UserAvatar from '../userAvatar/userAvatar';
import Constants from '../../constants';

import styles from './header.module.css';

import appIconNav from '../../../public/icons/appIconNav.png';
import feedIconNav from '../../../public/icons/feedIconNav.png';
import feedIconNavActive from '../../../public/icons/feedIconNavActive.png';

const Header = ({ location = "", externalClass = "", children }) => {
    let scrollPageUp = () => window.scrollTo(0, 0);

    let userId = sessionStorage.getItem(Constants.USER_ID_COOKIE_KEY);
    let userAvatar = sessionStorage.getItem(Constants.USER_AVATAR_COOKIE_KEY);

    let isCurrentProfileUser = location.startsWith(`/profile/${userId}`);

    return (
        <header className={`${styles.container} ${externalClass}`}>
            <div className={styles.centerContainer}>
                <img className={styles.icon} src={appIconNav} width="30px" onClick={scrollPageUp} />
                <p>MONA</p>
                <nav style={{ display: userId ? "block" : "none" }}>
                    <ul>
                        <li>
                            <Link to={`/profile/${userId}`}>
                                <UserAvatar avatar={userAvatar} size={30} withGrayBorder={!isCurrentProfileUser} withOrangeBorder={isCurrentProfileUser} externalClass={`${styles.userAvatarExternal}`} />
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