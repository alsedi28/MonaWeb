import React from 'react';
import styles from './userListItem.module.css';

const UserListItem = ({ userIcon, userLogin, userName, externalClass = "" }) => (
    <div className={`${styles.container} ${externalClass}`}>
        <div className={styles.userIcon}>
            <img src={userIcon} width="45px" height="45px" />
        </div>
        <div className={styles.userInfo}>
            <p>{userName}</p>
            <p>{userLogin}</p>
        </div>
    </div>
);

export default UserListItem;