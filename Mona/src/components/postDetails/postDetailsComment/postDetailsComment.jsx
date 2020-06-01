import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import styles from './postDetailsComment.module.css';
import { getTimeAgoString } from '../../../helpers/timeHelper'

import heartIcon from '../../../../public/icons/heart.png';
import heartFilledIcon from '../../../../public/icons/heartFilled.png';

function PostDetailsComment(props) {
    const imgLike = useRef(null);

    function clickLikeWithAnimation() {
        props.clickLike();
        imgLike.current.classList.add(styles.likeClickActive);
        setTimeout(() => imgLike.current.classList.remove(styles.likeClickActive), 1000);
    }

    return (
        <ul className={styles.commentListItem}>
            <div className={styles.commentBox}>
                <div className={styles.userIcon}>
                    <Link to={`/profile/${props.comment.UserId}`}>
                        <img src={props.comment.AvatarPath} className={styles.userLink} width="32px" height="32px" />
                    </Link>
                </div>

                <div className={styles.commentsBlock}>
                    <p className={styles.commentText}><span className={styles.userLink}><Link to={`/profile/${props.comment.UserId}`}>{props.comment.Username}</Link></span> {props.comment.Text} </p>
                    <p className={styles.timeAgo}>{getTimeAgoString(props.comment.DateOfCreation)}</p>
                </div>

                <img src={props.comment.IsCurrentUserLiked ? heartFilledIcon : heartIcon} className={styles.like} onClick={clickLikeWithAnimation} ref={imgLike} width="20px" height="20px" />
            </div>
        </ul>
    );
}

export default PostDetailsComment;
