import React from 'react';

import styles from './followButton.module.css';

import plusIcon from '../../../public/icons/plus.png';

const FollowButton = ({ active, click, externalClass = "" }) => {
    let content = active ?
        <p>Подписки</p> :
        <React.Fragment><img src={plusIcon} width="18px" /><p>Подписаться</p></React.Fragment>;

    return (
        <div className={`${styles.container} ${externalClass} ${active ? styles.active : styles.notActive}`} onClick={click}>
            {content}
        </div>
    );
};

export default FollowButton;