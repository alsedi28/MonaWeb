import React from 'react';
import { Link } from 'react-router-dom';
import styles from './postTotalLikes.module.css';

function PostTotalLikes(props) {
    let userInfoWhoLikesPost = props.userInfoWhoLikesEvent !== null ? props.userInfoWhoLikesEvent.split('#') : null;

    let blockWithInfoAboutLikes = "";
    if (userInfoWhoLikesPost !== null) {
        if (props.amountEventLikes > 1)
            blockWithInfoAboutLikes = <p className={styles.text}>Нравится <span className={styles.userLink}><Link to={`/profile/${userInfoWhoLikesPost[1]}`}>{userInfoWhoLikesPost[0]}</Link></span> и <span className={styles.moreLikes} onClick={props.clickShowUsersWhoLikesPost}>ещё</span> {props.amountEventLikes - 1} пользователям</p>;
        else
            blockWithInfoAboutLikes = <p className={styles.text}>Нравится <span className={styles.userLink}><Link to={`/profile/${userInfoWhoLikesPost[1]}`}>{userInfoWhoLikesPost[0]}</Link></span></p>;
    }
    return (
        <div className={props.isInDetails ? styles.boxForDetails : styles.box}>
        {blockWithInfoAboutLikes}
        </div>
    );
}

export default PostTotalLikes;
