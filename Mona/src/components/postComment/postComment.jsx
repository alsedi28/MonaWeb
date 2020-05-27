import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import styles from './postComment.module.css';

import heartIcon from '../../../public/icons/heart.png';
import heartFilledIcon from '../../../public/icons/heartFilled.png';

const PostComment = ({ comment, clickLike, externalClass = "" }) => {

  const imgLike = useRef(null);

  function clickLikeWithAnimation() {
      clickLike();
      imgLike.current.classList.add(styles.likeClickActive);
      setTimeout(() => imgLike.current.classList.remove(styles.likeClickActive), 1000);
  }

  return (
    <div className={`${styles.box} ${styles.commentsBlock}`}>
    <p><span className={styles.userLink}><Link to={`/profile/${comment.UserId}`}>{comment.Username}</Link></span> {comment.Text} </p>
    <img src={comment.IsCurrentUserLiked ? heartFilledIcon : heartIcon} className={styles.like} onClick={clickLikeWithAnimation} ref={imgLike} width="16px" height="16px" />
    </div>
  );
};

export default PostComment;
