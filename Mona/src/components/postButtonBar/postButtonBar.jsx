import React from 'react';

import styles from './postButtonBar.module.css';

import heartIcon from '../../../public/icons/heart.png';
import heartFilledIcon from '../../../public/icons/heartFilled.png';
import commentsIcon from '../../../public/icons/comments.png';

const PostButtonBar = ({ isActiveLike, externalClass = "" }) => (
    <div className={`${styles.container} ${externalClass}`}>
        <img src={isActiveLike ? heartFilledIcon : heartIcon} width="30px" />
        <img src={commentsIcon} width="30px" />
    </div>
);

export default PostButtonBar;