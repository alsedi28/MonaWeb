import React from 'react';

import styles from './profileUserInfo.module.css';

import blankProfileIcon from '../../../public/icons/blankProfileIcon.png';

const ProfileUserInfo = ({ profile, externalClass = "" }) => (
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
                <div>
                    <p>{profile.amountViewedMovies}</p>
                    <p>фильмов просмотрено</p>
                </div>
                <div>
                    <p>{profile.amountWillWatchMovies}</p>
                    <p>фильмов в закладках</p>
                </div>
                <div>
                    <p>{profile.amountFollowing}</p>
                    <p>подписки</p>
                </div>
                <div>
                    <p>{profile.amountFollowers}</p>
                    <p>подписчиков</p>
                </div>
            </div>
        </div>
    </div>
);

export default ProfileUserInfo;