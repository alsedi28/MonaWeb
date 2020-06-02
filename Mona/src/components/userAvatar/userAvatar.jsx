import React from 'react';

import styles from './userAvatar.module.css';

import blankProfileIcon from '../../../public/icons/blankProfileIcon.png';

const UserAvatar = ({ avatar, size, withGrayBorder = false, withOrangeBorder = false, externalClass = "" }) => {
    let borderClass = `${withGrayBorder ? styles.grayBorder : ''} ${withOrangeBorder ? styles.orangeBorder : ''}`;

    return (
        <div className={`${styles.container} ${externalClass} ${borderClass}`}
            style={{ background: `url(${avatar ? avatar : blankProfileIcon}) 50% 10% no-repeat`, width: size, height: size }} />
    );
};

export default UserAvatar;