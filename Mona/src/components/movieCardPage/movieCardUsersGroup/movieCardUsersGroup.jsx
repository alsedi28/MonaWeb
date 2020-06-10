import React from 'react';

import UserAvatar from '../../userAvatar/userAvatar';

import styles from './movieCardUsersGroup.module.css';

const MovieCardUsersGroup = ({ users, totalNumberUsers, label, click, externalClass = "" }) => {
    let usersBlocks = [];
    const avatarSize = 30;

    if (totalNumberUsers === 0) {
        usersBlocks.push(<p>&mdash;</p>);
    }
    else if (totalNumberUsers === 1) {
        usersBlocks.push(<UserAvatar avatar={users[0].AvatarPath} size={avatarSize} withWhiteBorder={true}/>);
    }
    else if (totalNumberUsers === 2) {
        usersBlocks.push(<UserAvatar avatar={users[0].AvatarPath} size={avatarSize} withWhiteBorder={true} externalClass={styles.leftIcon} />);
        usersBlocks.push(<UserAvatar avatar={users[1].AvatarPath} size={avatarSize} withWhiteBorder={true} externalClass={styles.rightIcon} />);
    }
    else if (totalNumberUsers === 3) {
        usersBlocks.push(<UserAvatar avatar={users[0].AvatarPath} size={avatarSize} withWhiteBorder={true} externalClass={styles.leftIconMax} />);
        usersBlocks.push(<UserAvatar avatar={users[1].AvatarPath} size={avatarSize} withWhiteBorder={true} externalClass={styles.centerIcon} />);
        usersBlocks.push(<UserAvatar avatar={users[2].AvatarPath} size={avatarSize} withWhiteBorder={true} externalClass={styles.rightIconMax} />);
    }
    else if (totalNumberUsers > 3) {
        usersBlocks.push(<UserAvatar avatar={users[0].AvatarPath} size={avatarSize} withWhiteBorder={true} externalClass={styles.leftIconMax} />);
        usersBlocks.push(<UserAvatar avatar={users[1].AvatarPath} size={avatarSize} withWhiteBorder={true} externalClass={styles.centerIcon} />);
        usersBlocks.push(<div className={`${styles.blockCounters} ${styles.rightIconMax}`}><p>+{totalNumberUsers - 2}</p></div>);
    }

    return (
        <div className={`${styles.container} ${externalClass}`}>
            <div onClick={totalNumberUsers > 0 ? click : () => ({})}>
                {usersBlocks}
            </div>
            <p>{label}</p>
        </div>
    );
};

export default MovieCardUsersGroup;