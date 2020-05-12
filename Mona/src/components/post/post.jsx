import React, { useRef } from 'react';
import moment from 'moment';
import styles from './post.module.css';
import shapeIcon from '../../../public/icons/shape.png';
import checkMarkIcon from '../../../public/icons/checkMark.png';
import heartIcon from '../../../public/icons/heart.png';
import heartFilledIcon from '../../../public/icons/heartFilled.png';
import commentsIcon from '../../../public/icons/comments.png';

const Post = ({ post, externalClass = "" }) => {
    let movieRaiting = post.ImdbRaiting === null ? post.VoteAverage : post.ImdbRaiting;
    let userRaiting = post.EventType === 0 ? post.UserRaiting : null;

    let movieReleaseDate = post.MovieReleaseDate !== null ? new Date(Date.parse(post.MovieReleaseDate)) : null;
    let blockMovieReleaseDate = "";
    if (movieReleaseDate !== null)
        blockMovieReleaseDate = <span>({movieReleaseDate.getFullYear()})</span>;

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

    const showAllCommentsTextElement = useRef(null);

    function clickShowAllComments() {
        let currentElement = showAllCommentsTextElement.current;
        let parent = currentElement.parentElement;

        for (var i = 1; i < post.Comments.length; i++) {
            let element = document.createElement('p');
            element.innerHTML = `<span>${post.Comments[i].Username}</span> ${post.Comments[i].Text}`;
            parent.append(element);
        }

        currentElement.remove();
    }

    function getDateOfPost() {
        let postDate = Date.parse(post.DateOfCreation);
        let dateNow = Date.now();
        let duration = moment.duration(dateNow - postDate);

        let resultString = "";

        let [years, months, days, hours, minutes, seconds] =
            [duration.years(), duration.months(), duration.days(), duration.hours(), duration.minutes(), duration.seconds()];

        if (years > 0)
            resultString = `${years} г.`;
        else if (months > 0)
            resultString = `${months} мес.`;
        else if (days > 0)
            resultString = `${days} д.`;
        else if (hours > 0)
            resultString = `${hours} ч.`;
        else if (minutes > 0)
            resultString = `${minutes} мин.`;
        else if (seconds > 0)
            resultString = `${seconds} сек.`;
        else
            return "Только что";

        return resultString + " назад";
    }

    return (
        <article className={`${styles.container} ${externalClass}`} id={`post-${post.EventId}`}>
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
                    <span>{getDateOfPost()}</span>
                </div>
            </header>
            <div className={styles.main} style={{ background: `url(https://image.tmdb.org/t/p/w780${post.MovieBackdropPath}) 100% 100% no-repeat` }}>
                <div>
                    <div className={styles.posterBlock}>
                        <div>
                            <img src={`https://image.tmdb.org/t/p/w342${post.MoviePosterPath}`} height="460px" />
                        </div>
                    </div>
                    <div className={styles.movieInfoBlock}>
                        <p className={styles.movieTitle}>{post.MovieTitle} {blockMovieReleaseDate}</p>
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
                </div>
            </div>
            <div className={styles.buttonsBlock}>
                <img src={post.IsCurrentUserLiked ? heartFilledIcon : heartIcon} width="30px" />
                <img src={commentsIcon} width="30px" />
            </div>
            <div className={styles.commentsBlock}>
                {blockWithInfoAboutLikes}
                {blockWithMainComment}
                <p className={styles.showAllComments} onClick={clickShowAllComments} ref={showAllCommentsTextElement}
                    style={{ display: post.AmountEventComments > 1 ? "display" : "none" }}>
                    Посмотреть {post.AmountEventComments} комментария
                </p>
            </div>
        </article>
    );
};

export default Post;