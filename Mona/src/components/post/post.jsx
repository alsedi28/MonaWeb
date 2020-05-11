import React from 'react';
import styles from './post.module.css';
import shapeIcon from '../../../public/icons/shape.png';
import checkMarkIcon from '../../../public/icons/checkMark.png';
import heartIcon from '../../../public/icons/heart.png';
import heartFilledIcon from '../../../public/icons/heartFilled.png';
import commentsIcon from '../../../public/icons/comments.png';

const Post = ({ post, externalClass = "" }) => {
    let movieRaiting = post.ImdbRaiting === null ? post.VoteAverage : post.ImdbRaiting;
    let userRaiting = post.EventType === 0 ? post.UserRaiting : null;

    let comment = post.Comments.length > 0 ? post.Comments[0] : null;
    let blockWithMainComment = "";
    if (comment !== null)
        blockWithMainComment = <p><span>{comment.Username}</span> {comment.Text}</p>;

    let userNameWhoLikesPost = post.UserInfoWhoLikesEvent !== null ? post.UserInfoWhoLikesEvent.split('#')[0] : null;
    let blockWithInfoAboutLikes = "";
    if (userNameWhoLikesPost !== null) {
        if (post.AmountEventLikes > 1)
            blockWithInfoAboutLikes = <p>Нравится <span>{userNameWhoLikesPost}</span> и <span>ещё</span> {post.AmountEventLikes - 1} пользователям</p>;
        else
            blockWithInfoAboutLikes = <p>Нравится <span>{userNameWhoLikesPost}</span></p>;
    }

    return (
        <article className={`${styles.container} ${externalClass}`}>
            <header className={styles.header}>
                <div className={styles.postInfoHeader}>
                    <div className={styles.postUserIcon}>
                        <img src={post.AvatarPath} width="32px" height="32px" />
                    </div>
                    <div className={styles.postUserInfo}>
                        <span>{post.Login}</span>
                        <span> {post.EventType === 0 ? "посмотрел" : "хочет посмотреть"}</span>
                    </div>
                </div>
                <div className={styles.datePost}>
                    <span>8 ч. назад</span>
                </div>
            </header>
            <div className={styles.main} style={{ background: `url(https://image.tmdb.org/t/p/w780${post.MovieBackdropPath}) 100% 100% no-repeat` }}>
                <div>
                    <div className={styles.posterBlock}>
                        <div>
                            <img src={`https://image.tmdb.org/t/p/w342${post.MoviePosterPath}`} width="342px" />
                        </div>
                    </div>
                    <div className={styles.movieInfoBlock}>
                        <p className={styles.movieTitle}>{post.MovieTitle} <span>({post.MovieReleaseDate.substring(0, 4)})</span></p>
                        <p className={styles.userRaiting} style={{ display: userRaiting === null ? "none" : "display" }}>Оценка: <span>{userRaiting}</span></p>
                        <div className={styles.movieRaiting}>
                            <p>{movieRaiting}</p>
                            <p>рейтинг</p>
                        </div>
                        <div className={styles.numberUsers}>
                            <img src={shapeIcon} width="20px" />
                            <p>{post.AmountUsersWhoWillWatchMovie}</p>
                            <p>будут смотреть</p>
                        </div>
                        <div className={styles.numberUsers}>
                            <img src={shapeIcon} width="20px" />
                            <p>{post.AmountUsersWhoViewedMovie}</p>
                            <p>посмотрели</p>
                        </div>
                    </div>
                    <div className={styles.movieStatusForUser} style={{ display: post.StatusOfMovieForUser === "NoViewed" ? "none" : "display" }}>
                        <p>{post.StatusOfMovieForUser === "WillWatch" ? "В закладках" : "Просмотрен"}
                            <img src={checkMarkIcon} width="20px" />
                        </p>
                    </div>
                    <div className={styles.viewUsersBlock}>
                    </div>
                </div>
            </div>
            <div className={styles.buttonsBlock}>
                <img src={post.IsCurrentUserLiked ? heartFilledIcon : heartIcon} width="30px" />
                <img src={commentsIcon} width="30px" />
            </div>
            <div className={styles.commentsBlock}>
                {blockWithInfoAboutLikes}
                {blockWithMainComment}
                <p className={styles.showAllComments} style={{ display: post.AmountEventComments > 1 ? "display" : "none" }}>Посмотреть {post.AmountEventComments} комментария</p>
            </div>
        </article>
    );
};

export default Post;