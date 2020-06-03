import React from 'react';

import { getAvatarPath } from '../../helpers/imagePathHelper';

import styles from './userAvatar.module.css';

const UserAvatar = ({ avatar, size, withGrayBorder = false, withOrangeBorder = false, externalClass = "" }) => {
    let borderClass = `${withGrayBorder ? styles.grayBorder : ''} ${withOrangeBorder ? styles.orangeBorder : ''}`;

    return (
        <div className={`${styles.container} ${externalClass} ${borderClass}`}
            style={{ background: `url(${getAvatarPath(avatar)}) 50% 10% no-repeat`, width: size, height: size }} />
    );
};

export default UserAvatar;