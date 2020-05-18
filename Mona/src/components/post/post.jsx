import React from 'react';
import moment from 'moment';

import ModalDialog from '../modalDialog/modalDialog';
import Constants from '../../constants';

import styles from './post.module.css';

import shapeIcon from '../../../public/icons/shape.png';
import checkMarkIcon from '../../../public/icons/checkMark.png';
import heartIcon from '../../../public/icons/heart.png';
import heartFilledIcon from '../../../public/icons/heartFilled.png';
import commentsIcon from '../../../public/icons/comments.png';
import bookMarkIcon from '../../../public/icons/bookMark.png';

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.MovieStatusWillWatchForUser = "WillWatch";
        this.MovieStatusNoViewedForUser = "NoViewed";

        this.state = {
            modalDialog: {
                show: false,
                isLoading: false,
                title: "",
                items: []
            }
        };

        this.usersWhoViewedMovie = null;

        this.showAllCommentsTextElement = React.createRef(null);

        this.clickShowAllComments = this.clickShowAllComments.bind(this);
        this.clickShowUsersWhoViewedMovie = this.clickShowUsersWhoViewedMovie.bind(this);
        this.setModalDialogState = this.setModalDialogState.bind(this);
        this.hideModalDialog = this.hideModalDialog.bind(this);
        this.getDateOfPost = this.getDateOfPost.bind(this);
    }

    clickShowUsersWhoViewedMovie(movieId) {
        let title = "Уже смотрели";

        // Данные уже загружали
        if (this.usersWhoViewedMovie !== null) {
            this.setModalDialogState(true, false, title, this.usersWhoViewedMovie);

            return;
        }

        this.setModalDialogState(true, true, title, []);

        let url = `${Constants.DOMAIN}/api/movies/${movieId}/viewed`;

        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem(Constants.TOKEN_COOKIE_KEY),
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok)
                    return Promise.resolve(response);

                return Promise.reject(new Error("Произошла ошибка при загрузке данных."));
            })
            .then(response => response.json())
            .then(items => {
                this.usersWhoViewedMovie = items.map(item => ({
                    icon: item.AvatarPath,
                    login: item.Login,
                    name: item.Name    
                }));

                this.setModalDialogState(true, false, title, this.usersWhoViewedMovie);
            })
            .catch((error) => {
                if (error)
                    alert(error);
            });
    }

    hideModalDialog() {
        this.setModalDialogState(false, false, "", []);
    }

    clickShowAllComments(comments) {
        let currentElement = this.showAllCommentsTextElement.current;
        let parent = currentElement.parentElement;

        for (var i = 1; i < comments.length; i++) {
            let element = document.createElement('p');
            element.innerHTML = `<span>${comments[i].Username}</span> ${comments[i].Text}`;
            parent.append(element);
        }

        currentElement.remove();
    }

    setModalDialogState(show, isLoading, title, items) {
        this.setState({
            ...this.state,
            modalDialog: {
                ...this.state.modalDialog,
                show,
                isLoading,
                title,
                items
            }
        });
    }

    getDateOfPost(dateOfCreationPost) {
        let postDate = Date.parse(dateOfCreationPost);
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

    render() {
        const { post, externalClass = "" } = this.props;

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
                        <span>{this.getDateOfPost(post.DateOfCreation)}</span>
                    </div>
                </header>
                <div className={styles.main} style={{ background: `url(https://image.tmdb.org/t/p/w780${post.MovieBackdropPath}) 100% 100% no-repeat` }}>
                    <div>
                        <div className={styles.posterBlock}>
                            <div>
                                <img src={`https://image.tmdb.org/t/p/w342${post.MoviePosterPath}`} height="460px" />
                                <img src={bookMarkIcon} width="50px" style={{ display: post.StatusOfMovieForUser === this.MovieStatusWillWatchForUser ? "block" : "none" }} />
                            </div>
                        </div>
                        <div className={styles.movieInfoBlock}>
                            <p className={styles.movieTitle}>{post.MovieTitle} {blockMovieReleaseDate}</p>
                            <p className={styles.userRaiting} style={{ display: userRaiting === null ? "none" : "block" }}>Оценка: <span>{userRaiting}</span></p>
                            <div className={styles.movieRaiting}>
                                <p>{movieRaiting}</p>
                                <p>рейтинг</p>
                            </div>
                            <div className={styles.numberUsers}>
                                <img src={shapeIcon} width="20px" />
                                <p>{post.AmountUsersWhoWillWatchMovie}</p>
                                <p>будут смотреть</p>
                            </div>
                            <div className={styles.numberUsers} onClick={this.clickShowUsersWhoViewedMovie.bind(this, post.MovieId)}>
                                <img src={shapeIcon} width="20px" />
                                <p>{post.AmountUsersWhoViewedMovie}</p>
                                <p>посмотрели</p>
                            </div>
                        </div>
                        <div className={styles.movieStatusForUser} style={{ display: post.StatusOfMovieForUser === this.MovieStatusNoViewedForUser ? "none" : "block" }}>
                            <p>{post.StatusOfMovieForUser === this.MovieStatusWillWatchForUser ? "В закладках" : "Просмотрен"}
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
                    <p className={styles.showAllComments} onClick={this.clickShowAllComments.bind(this, post.Comments)} ref={this.showAllCommentsTextElement}
                        style={{ display: post.AmountEventComments > 1 ? "block" : "none" }}>
                        Посмотреть {post.AmountEventComments} комментария
                </p>
                </div>
                <ModalDialog show={this.state.modalDialog.show} title={this.state.modalDialog.title} isLoading={this.state.modalDialog.isLoading}
                    items={this.state.modalDialog.items} clickClose={this.hideModalDialog}/>
            </article>
        );
    }
}

export default Post;