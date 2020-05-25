import React from 'react';

import styles from './profileUserInfo.module.css';

import blankProfileIcon from '../../../public/icons/blankProfileIcon.png';
import shapeDark from '../../../public/icons/shapeDark.png';

const ProfileUserInfo = ({ profile, clickFollowers, clickFollowing, externalClass = "" }) => (
    <div className={`${styles.container} ${externalClass}`}>
        <div className={styles.userIconBlock}>
            <div>
                <div style={{ background: `url(${profile.avatar ? profile.avatar : blankProfileIcon}) 50% 10% no-repeat` }}>
                </div>
            </div>
        </div>
        <div className={styles.userInfoBlock}>
            <p className={styles.login}>{profile.login}</p>
            <p className={styles.userName}>{profile.name}</p>
            <div className={styles.userCounters}>
                <div onClick={clickFollowing}>
                    <p>{profile.amountFollowing}</p>
                    <p>подписчик</p>
                    <img src={shapeDark} width="35px" />
                </div>
                <div onClick={clickFollowers}>
                    <p>{profile.amountFollowers}</p>
                    <p>подписок</p>
                    <img src={shapeDark} width="35px" />
                </div>
            </div>
        </div>
    </div>
);

export default ProfileUserInfo;