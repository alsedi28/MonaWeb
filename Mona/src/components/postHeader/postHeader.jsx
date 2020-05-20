import React from 'react';
import moment from 'moment';

import styles from './postHeader.module.css';

import blankProfileIcon from '../../../public/icons/blankProfileIcon.png';

const PostHeader = ({ userAvatarPath, login, postType, postDateOfCreation, externalClass = "" }) => {

    function getHumanDateOfPost(dateOfCreationPost) {
        let postDate = Date.parse(dateOfCreationPost);
        let dateNow = Date.now();
        let duration = moment.duration(dateNow - postDate);

        let resultString = "";

        let [years, months, days, hours, minutes, seconds] =
            [duration.years(), duration.months(), duration.days(), duration.hours(), duration.minutes(), duration.seconds()];

        if (years > 0)
            resultString = `${years} г.`;
        else if (months > 0)
            resultString = `${months} мес.`;
        else if (days > 0)
            resultString = `${days} д.`;
        else if (hours > 0)
            resultString = `${hours} ч.`;
        else if (minutes > 0)
            resultString = `${minutes} мин.`;
        else if (seconds > 0)
            resultString = `${seconds} сек.`;
        else
            return "Только что";

        return resultString + " назад";
    }

    return (
        <header className={`${styles.container} ${externalClass}`}>
            <div className={styles.info}>
                <div className={styles.userIcon}>
                    <img src={userAvatarPath ? userAvatarPath : blankProfileIcon} width="32px" height="32px" />
                </div>
                <div className={styles.userInfo}>
                    <span>{login}</span>
                    <span> {postType === 0 ? "посмотрел" : "хочет посмотреть"}</span>
                </div>
            </div>
            <div className={styles.date}>
                <span>{getHumanDateOfPost(postDateOfCreation)}</span>
            </div>
        </header>
    );
};

export default PostHeader;