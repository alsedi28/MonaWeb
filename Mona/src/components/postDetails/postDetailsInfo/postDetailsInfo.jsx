import React, { useRef } from 'react';

import styles from './postDetailsInfo.module.css';
import { getTimeAgoString } from '../../../helpers/timeHelper'
import Constants from '../../../constants';

import PostTotalLikes from '../../postTotalLikes/postTotalLikes';

import heartIcon from '../../../../public/icons/heart.png';
import heartFilledIcon from '../../../../public/icons/heartFilled.png';

function PostDetailsInfo(props) {
    const imgLike = useRef(null);
    const defaultBottomInset = 40;

    function clickLikeWithAnimation() {
        props.clickLike();
        imgLike.current.classList.add(styles.likeClickActive);
        setTimeout(() => imgLike.current.classList.remove(styles.likeClickActive), 1000);
    }

    const correctedBottomInset = props.paddingBottom > defaultBottomInset ? props.paddingBottom : defaultBottomInset;
    const correctedMaxInset =  Constants.MAX_INPUT_FIELD_HEIGHT + defaultBottomInset;
    const bottomInsetStyle = { bottom: correctedBottomInset < correctedMaxInset ? `${correctedBottomInset}px` : `${correctedMaxInset}px` };

    return (
        <div className={styles.postInfoContainer} style={bottomInsetStyle} ref={props.componentRef}>
            <div className={styles.buttonsContainer}>
                <img src={props.isLiked ? heartFilledIcon : heartIcon} className={styles.like} onClick={clickLikeWithAnimation} ref={imgLike} width="20px" height="20px" />
            </div>
            <div>
                <PostTotalLikes
                    userInfoWhoLikesEvent={props.userInfoWhoLikesEvent}
                    amountEventLikes={props.amountEventLikes}
                    clickShowUsersWhoLikesPost={props.clickShowUsersWhoLikesPost}
                    isInDetails={true}
                />
                <p className={styles.timeAgo}>{getTimeAgoString(props.dateOfCreation)}</p>
            </div>
        </div>
    );
}

export default PostDetailsInfo;
