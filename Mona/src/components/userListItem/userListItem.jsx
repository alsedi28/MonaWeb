import React from 'react';
import { Link } from 'react-router-dom';

import styles from './userListItem.module.css';

import blankProfileIcon from '../../../public/icons/blankProfileIcon.png';

const UserListItem = ({ userIcon, userLogin, userName, userId, externalClass = "" }) => (
    <div className={`${styles.container} ${externalClass}`}>
        <div className={styles.userIcon}>
            <Link to={`/profile/${userId}`}>
                <div style={{ background: `url(${userIcon ? userIcon : blankProfileIcon}) 50% 10% no-repeat` }}>
                </div>
            </Link>
        </div>
        <div className={styles.userInfo}>
            <p><Link to={`/profile/${userId}`}>{userName}</Link></p>
            <p><Link to={`/profile/${userId}`}>{userLogin}</Link></p>
        </div>
    </div>
);

export default UserListItem;