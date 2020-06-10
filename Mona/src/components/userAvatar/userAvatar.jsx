import React from 'react';

import { getAvatarPath } from '../../helpers/imagePathHelper';

import styles from './userAvatar.module.css';

const UserAvatar = ({ avatar, size, withGrayBorder = false, withOrangeBorder = false, withWhiteBorder = false, externalClass = "" }) => {
    let borderClass = '';

    if (withGrayBorder)
        borderClass = styles.grayBorder;
    else if (withOrangeBorder)
        borderClass = styles.orangeBorder;
    else if (withWhiteBorder)
        borderClass = styles.whiteBorder;

    return (
        <div className={`${styles.container} ${externalClass} ${borderClass}`}
            style={{ background: `url(${getAvatarPath(avatar)}) 50% 10% no-repeat`, width: size, height: size }} />
    );
};

export default UserAvatar;