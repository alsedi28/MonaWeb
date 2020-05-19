import React from 'react';
import styles from './userListItem.module.css';
import blankProfileIcon from '../../../public/icons/blankProfileIcon.png';

const UserListItem = ({ userIcon, userLogin, userName, externalClass = "" }) => (
    <div className={`${styles.container} ${externalClass}`}>
        <div className={styles.userIcon}>
            <img src={userIcon ? userIcon : blankProfileIcon} width="45px" height="45px" />
        </div>
        <div className={styles.userInfo}>
            <p>{userName}</p>
            <p>{userLogin}</p>
        </div>
    </div>
);

export default UserListItem;