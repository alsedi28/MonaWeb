import React from 'react';

import ModalDialog from '../modalDialog/modalDialog';
import PostButtonBar from '../postButtonBar/postButtonBar';
import PostHeader from '../postHeader/postHeader';
import Constants from '../../constants';

import styles from './post.module.css';

import shapeIcon from '../../../public/icons/shape.png';
import checkMarkIcon from '../../../public/icons/checkMark.png';
import bookMarkIcon from '../../../public/icons/bookMark.png';
import framePlaceholder from '../../../public/icons/framePlaceholder.png';

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.MovieStatusWillWatchForUser = "WillWatch";
        this.MovieStatusNoViewedForUser = "NoViewed";

        this.state = {
            post: props.post, // Текущий пост
            modalDialog: { // Состояние объекта модального окна для текущего поста
                show: false, // Показывать или нет модальное окно
                isLoading: false, // Отображать Loader в модальном окне или нет
                title: "", // Заголовок модального окна
                items: [] // Данные, которые необходимо отобразить в модальном окне
            },
            handleClickLike: this.clickLikePost // Обработчик события click по "Сердцу"
        };

        this.usersWhoLikesPost = {
            isLoaded: false,
            items: []
        };

        this.usersWhoViewedMovie = {
            isLoaded: false,
            items: []
        };

        this.usersWhoWillWatchMovie = {
            isLoaded: false,
            items: []
        };

        this.showAllCommentsTextElement = React.createRef(null);

        this.clickShowAllComments = this.clickShowAllComments.bind(this);
        this.clickShowUsersWhoViewedMovie = this.clickShowUsersWhoViewedMovie.bind(this);
        this.clickShowUsersWhoWillWatchMovie = this.clickShowUsersWhoWillWatchMovie.bind(this);
        this.clickLikePost = this.clickLikePost.bind(this);
        this.setModalDialogState = this.setModalDialogState.bind(this);
        this.showModalDialog = this.showModalDialog.bind(this);
        this.hideModalDialog = this.hideModalDialog.bind(this);
        this.updatePost = this.updatePost.bind(this);
    }

    clickShowUsersWhoLikesPost(eventId, movieId) {
        let title = "Лайкнули публикацию";
        let urlPath = `/movies/${movieId}/events/${eventId}/likes`;

        this.showModalDialog(title, this.usersWhoLikesPost, urlPath);
    }

    clickShowUsersWhoWillWatchMovie(movieId) {
        let title = "Будут смотреть";
        let urlPath = `/movies/${movieId}/willwatch`;

        this.showModalDialog(title, this.usersWhoWillWatchMovie, urlPath);
    }

    clickShowUsersWhoViewedMovie(movieId) {
        let title = "Уже смотрели";
        let urlPath = `/movies/${movieId}/viewed`;

        this.showModalDialog(title, this.usersWhoViewedMovie, urlPath);
    }

    showModalDialog(title, storage, urlPath) {
        // Данные уже загружали
        if (storage.isLoaded) {
            this.setModalDialogState(true, false, title, storage.items);

            return;
        }

        this.setModalDialogState(true, true, title, []);

        let url = `${Constants.DOMAIN}/api${urlPath}`;

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
                storage.items = items.map(item => ({
                    icon: item.AvatarPath,
                    login: item.Login,
                    name: item.Name
                }));

                storage.isLoaded = true;

                this.setModalDialogState(true, false, title, storage.items);
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

    clickLikePost(eventId, movieId) {
        let url = `${Constants.DOMAIN}/api/movies/${movieId}/events/${eventId}/likes`;

        // Снимаем обработчик click, пока не обновится состояние после текущего клика
        this.setState({ handleClickLike: () => ({})});

        fetch(url, {
            method: this.state.post.IsCurrentUserLiked ? 'DELETE' : 'POST',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem(Constants.TOKEN_COOKIE_KEY),
                'Content-Type': 'application/json'
            }
        })
            .then(_ => {
                this.updatePost(eventId, movieId);
                // Возвращаем обработчик click
                this.setState({ handleClickLike: this.clickLikePost });
            });
    }

    updatePost(eventId, movieId) {
        let url = `${Constants.DOMAIN}/api/v2/movies/${movieId}/events/${eventId}`;

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

                return Promise.reject(new Error());
            })
            .then(response => response.json())
            .then(item => {
                this.setState({ post: item });

                // Сбрасываем значения. После обновления могло измениться количество.
                this.usersWhoLikesPost.isLoaded = false;
                this.usersWhoViewedMovie.isLoaded = false;
                this.usersWhoWillWatchMovie.isLoaded = false;
            })
            .catch((error) => {
                if (error)
                    alert("Произошла ошибка при загрузке данных.");
            });
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

    render() {
        const { externalClass = "" } = this.props;

        let post = this.state.post;

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
                blockWithInfoAboutLikes = <p>Нравится <span>{userNameWhoLikesPost}</span> и <span className={styles.moreLikes} onClick={this.clickShowUsersWhoLikesPost.bind(this, post.EventId, post.MovieId)}>ещё</span> {post.AmountEventLikes - 1} пользователям</p>;
            else
                blockWithInfoAboutLikes = <p>Нравится <span>{userNameWhoLikesPost}</span></p>;
        }

        return (
            <article className={`${styles.container} ${externalClass}`} id={`post-${post.EventId}`}>
                <PostHeader userAvatarPath={post.AvatarPath} login={post.Login} postType={post.EventType} postDateOfCreation={post.DateOfCreation}/>
                <div className={styles.main} style={{ background: `url(https://image.tmdb.org/t/p/w780${post.MovieBackdropPath}) 100% 100% no-repeat` }}>
                    <div>
                        <div className={styles.posterBlock}>
                            <div>
                                <img src={post.MoviePosterPath ? `https://image.tmdb.org/t/p/w342${post.MoviePosterPath}` : framePlaceholder} height="460px" />
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
                            <div className={styles.numberUsers} onClick={post.AmountUsersWhoWillWatchMovie > 0 ? this.clickShowUsersWhoWillWatchMovie.bind(this, post.MovieId) : () => ({})}>
                                <img src={shapeIcon} width="20px" />
                                <p>{post.AmountUsersWhoWillWatchMovie}</p>
                                <p>будут смотреть</p>
                            </div>
                            <div className={styles.numberUsers} onClick={post.AmountUsersWhoViewedMovie > 0 ? this.clickShowUsersWhoViewedMovie.bind(this, post.MovieId) : () => ({})}>
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
                <PostButtonBar isActiveLike={post.IsCurrentUserLiked} clickLike={this.state.handleClickLike.bind(this, post.EventId, post.MovieId)} />
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