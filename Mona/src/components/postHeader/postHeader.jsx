import React from 'react';
import { Link } from 'react-router-dom';

import styles from './postHeader.module.css';

import blankProfileIcon from '../../../public/icons/blankProfileIcon.png';
import { getTimeAgoString } from '../../helpers/timeHelper'
import { getStatusString } from '../../helpers/eventHelper'

const PostHeader = ({ userId, userAvatarPath, login, postType, postDateOfCreation, externalClass = "" }) => {

    return (
        <header className={`${styles.container} ${externalClass}`}>
            <div className={styles.iconWithInfoContainer}>
                <div className={styles.userIcon}>
                    <Link to={`/profile/${userId}`}>
                        <img src={userAvatarPath ? userAvatarPath : blankProfileIcon} className={styles.userLink} width="44px" height="44px" />
                    </Link>
                </div>
                <div className={styles.userInfo}>
                    <span className={styles.userLink}><Link to={`/profile/${userId}`}>{login}</Link></span>
                    <span> {getStatusString(postType)}</span>
                </div>
            </div>
            <div className={styles.date}>
                <span>{getTimeAgoString(postDateOfCreation)}</span>
            </div>
        </header>
    );
};

export default PostHeader;
