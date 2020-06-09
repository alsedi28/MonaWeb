import React from 'react';
import { Link } from 'react-router-dom';

import UserAvatar from '../../userAvatar/userAvatar';
import { getTimeAgoString } from '../../../helpers/timeHelper';

import styles from './movieCardComment.module.css';

import starIcon from '../../../../public/icons/orangeStar.png';
import commentsLightIcon from '../../../../public/icons/commentsLight.png';
import heartLightIcon from '../../../../public/icons/heartLight.png';
import heartFilledIcon from '../../../../public/icons/heartFilled.png';

const MovieCardComment = ({ comment, externalClass = "" }) => {

    return (
        <article className={`${styles.container} ${externalClass}`}>
            <header>
                <Link to={`/profile/${comment.AuthorId}`}>
                    <UserAvatar avatar={comment.AuthorAvatarPath} size={44} />
                </Link>
                <p className={styles.login}><Link to={`/profile/${comment.AuthorId}`}>{comment.AuthorLogin}</Link> <span>&#8226;</span></p>
                <div className={styles.rating}>
                    <img src={starIcon} width="16px" />
                    <span>{comment.AuthorMovieRaiting}</span>
                </div>
                <p className={styles.date}>{getTimeAgoString(comment.DateOfCreation)}</p>
            </header>
            <p className={styles.text}>{comment.CommentText}</p>
            <div className={styles.buttons}>
                {comment.CommentLikesAmount > 0 && <span>{comment.CommentLikesAmount}</span>}
                <img src={comment.IsCurrentUserLikeComment ? heartFilledIcon : heartLightIcon} width="24px" />
                {comment.EventsCommentsAmount > 0 && <span>{comment.EventsCommentsAmount}</span>}
                <img src={commentsLightIcon} width="24px" />
            </div>
        </article>
    );
};

export default MovieCardComment;