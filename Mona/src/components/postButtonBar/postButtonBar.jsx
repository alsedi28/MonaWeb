import React, { useRef } from 'react';

import styles from './postButtonBar.module.css';

import heartIcon from '../../../public/icons/heart.png';
import heartFilledIcon from '../../../public/icons/heartFilled.png';
import commentsIcon from '../../../public/icons/comments.png';

const PostButtonBar = ({ isActiveLike, clickLike, externalClass = "" }) => {
    const imgLike = useRef(null);

    function clickLikeWithAnimation() {
        clickLike();

        // Добавляем анимацию клика по лайку
        imgLike.current.classList.add(styles.likeClickActive);
        setTimeout(() => imgLike.current.classList.remove(styles.likeClickActive), 1000);
    }

    return (
        <div className={`${styles.container} ${externalClass}`}>
            <img src={isActiveLike ? heartFilledIcon : heartIcon} className={styles.like} onClick={clickLikeWithAnimation} ref={imgLike} width="32px" />
            <img src={commentsIcon} width="32px" />
        </div>
    );
};

export default PostButtonBar;
