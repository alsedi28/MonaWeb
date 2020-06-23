import React from 'react';
import { Link } from 'react-router-dom';

import ModalDialog from '../modalDialog/modalDialog';
import PostButtonBar from './postButtonBar/postButtonBar';
import PostHeader from './postHeader/postHeader';
import PostComment from './postComment/postComment';
import PostCommentInput from './postCommentInput/postCommentInput';
import MovieStatusButtons from '../movieStatusButtons/movieStatusButtons';
import PostDetails from '../postDetails/postDetails';
import PostTotalLikes from '../postTotalLikes/postTotalLikes';
import MoviePoster from '../moviePoster/moviePoster';
import { DataService } from '../../dataService';
import Constants from '../../constants';
import { getReleaseYear } from '../../helpers/timeHelper';
import { getBackdropUrl } from '../../helpers/imagePathHelper';
import { getMovieInfoFromPost } from '../../helpers/movieInfoHelper';
import { getMovieRating } from '../../helpers/eventHelper';

import styles from './post.module.css';

import shapeIcon from '../../../public/icons/shape.png';
import bookMarkIcon from '../../../public/icons/bookMark.png';

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post: props.post, // Текущий пост
            modalDialog: { // Состояние объекта модального окна для текущего поста
                show: false, // Показывать или нет модальное окно
                isLoading: false, // Отображать Loader в модальном окне или нет
                title: "", // Заголовок модального окна
                items: [] // Данные, которые необходимо отобразить в модальном окне
            },
            showAllComments: false, // Показать все комментарии
            handleClickLike: this.clickLikePost, // Обработчик события click по "Сердцу"
            handleClickLikeComment: this.clickLikeComment, // Обработчик события click по "Сердцу" в комментарии
            handleClickPublishComment: this.clickPublishComment, // Обработчик события click по кнопке «Опубликовать»
            inputComment: ""
        };

        this.handleInputCommentChange = this.handleInputCommentChange.bind(this);
        this.clickPublishComment = this.clickPublishComment.bind(this);
        this.clickShowAllComments = this.clickShowAllComments.bind(this);
        this.clickShowUsersWhoViewedMovie = this.clickShowUsersWhoViewedMovie.bind(this);
        this.clickShowUsersWhoWillWatchMovie = this.clickShowUsersWhoWillWatchMovie.bind(this);
        this.clickLikePost = this.clickLikePost.bind(this);
        this.clickLikeComment = this.clickLikeComment.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.setModalDialogState = this.setModalDialogState.bind(this);
        this.showModalDialog = this.showModalDialog.bind(this);
        this.hideModalDialog = this.hideModalDialog.bind(this);
        this.hidePostDetails = this.hidePostDetails.bind(this);
    }

    handleInputCommentChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    clickPublishComment(eventId, movieId) {
        let comment = this.state.inputComment;
        let trimmedValue = comment.trim();
        if (!trimmedValue.length)
            return;

        // Снимаем обработчик click, пока не обновится состояние после текущего клика
        this.setState({ handleClickPublishComment: () => ({})});

        let callback = _ => {
            this.updatePost(eventId, movieId);
            // Возвращаем обработчик click
            this.setState({
                handleClickPublishComment: this.clickPublishComment,
                inputComment: ""
            });
        };
        DataService.addCommentToEvent(eventId, movieId, comment, callback);
    }

    clickShowUsersWhoLikesPost(eventId, movieId) {
        let title = "Лайкнули публикацию";

        this.showModalDialog(title, DataService.getUsersWhoLikesPost.bind(DataService), eventId, movieId);
    }

    clickShowUsersWhoWillWatchMovie(movieId) {
        let title = "Будут смотреть";

        this.showModalDialog(title, DataService.getUsersWhoWillWatchMovie.bind(DataService), movieId);
    }

    clickShowUsersWhoViewedMovie(movieId) {
        let title = "Уже смотрели";

        this.showModalDialog(title, DataService.getUsersWhoViewedMovie.bind(DataService), movieId);
    }

    clickLikePost(eventId, movieId) {
        // Снимаем обработчик click, пока не обновится состояние после текущего клика
        this.setState({ handleClickLike: () => ({})});

        let callback = _ => {
            this.updatePost(eventId, movieId);
            // Возвращаем обработчик click
            this.setState({ handleClickLike: this.clickLikePost });
        };

        if (this.state.post.IsCurrentUserLiked)
            DataService.deleteLikeFromPost(eventId, movieId, callback);
        else
            DataService.addLikeToPost(eventId, movieId, callback);
    }

    clickLikeComment(eventId, movieId, commentId) {
        // Снимаем обработчик click, пока не обновится состояние после текущего клика
        this.setState({ handleClickLikeComment: () => ({}) });

        let callback = _ => {
            this.updatePost(eventId, movieId);
            // Возвращаем обработчик click
            this.setState({ handleClickLikeComment: this.clickLikeComment });
        };

        let comment = this.state.post.Comments.find(item => item.CommentId === commentId);

        if (comment !== null) {
            if (comment.IsCurrentUserLiked) {
                DataService.deleteLikeFromComment(eventId, movieId, commentId, callback);
            } else {
                DataService.addLikeToComment(eventId, movieId, commentId, callback);
            }
        }
    }

    updatePost(eventId, movieId) {
        let callback = (item) => {
            this.setState({ post: item });
        };

        DataService.getPost(eventId, movieId, callback);
    }

    showModalDialog(title, getter, ...args) {
        this.setModalDialogState(true, true, title, []);

        let callback = (response) => {
            let items = response.map(item => ({
                id: item.UserId,
                icon: item.AvatarPath,
                login: item.Login,
                name: item.Name,
                isFollowing: item.IsFollowing
            }));

            this.setModalDialogState(true, false, title, items);
        };

        getter(...args, callback);
    }

    hideModalDialog() {
        this.setModalDialogState(false, false, "", []);
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

    showPostDetails() {
        this.setState({
            showAllComments: true
        });
    }

    hidePostDetails() {
        this.setState({
            showAllComments: false
        });
    }

    clickShowAllComments() {
        this.showPostDetails();
    }

    render() {
        const { externalClass = "", handlerExternal = () => ({}) } = this.props;

        let post = this.state.post;

        let movieRaiting = getMovieRating(post);
        let userRaiting = post.EventType === 0 ? post.UserRaiting : null;

        let movieReleaseDate = getReleaseYear(post.MovieReleaseDate);
        let blockMovieReleaseDate = "";
        if (movieReleaseDate !== null)
            blockMovieReleaseDate = <span>({movieReleaseDate})</span>;

        let comment = post.Comments.length > 0 ? post.Comments[0] : null;
        let blockWithMainComment = "";
        if (comment !== null)
            blockWithMainComment = <PostComment comment={comment} clickLike={this.state.handleClickLikeComment.bind(this, post.EventId, post.MovieId, comment.CommentId)} />

        let commentsExcludingMain = post.Comments.filter((comment, i) => i !== 0).map(comment => <PostComment comment={comment} clickLike={this.state.handleClickLikeComment.bind(this, post.EventId, post.MovieId, comment.CommentId)} />);
        let displayBookmarkBlock = { display: post.StatusOfMovieForUser === Constants.MOVIE_STATUS_WILL_WATCH ? "block" : "none" };
        let displayBookmarkIconBlock = { display: userRaiting === null ? "none" : "block" };
        let displayAllCommentsBlock = { display: post.AmountEventComments > 1 ? "block" : "none" };

        return (
            <article className={`${styles.container} ${externalClass}`} id={`post-${post.EventId}`}>
                <PostHeader userId={post.UserId} userAvatarPath={post.AvatarPath} login={post.Login} postType={post.EventType} postDateOfCreation={post.DateOfCreation}/>
                <div className={styles.main} style={{ background: `${getBackdropUrl(post.MovieBackdropPath)}` }}>
                    <div>
                        <div className={styles.posterBlock}>
                            <Link to={`/movies/${post.MovieId}`}>
                                <div>
                                    <MoviePoster imageUrl={post.MoviePosterPath} movieTitle={post.MovieTitle} height={452} width={318} borderRadius={15} externalClass={styles.posterExternal} />
                                    <img src={bookMarkIcon} width="50px" style={displayBookmarkBlock} />
                                </div>
                            </Link>
                        </div>
                        <div className={styles.movieInfoBlock}>
                            <p className={styles.movieTitle}><Link to={`/movies/${post.MovieId}`}>{post.MovieTitle}</Link> {blockMovieReleaseDate}</p>

                            <MovieStatusButtons
                                status={post.StatusOfMovieForUser}
                                movieInfo={getMovieInfoFromPost(post)}
                                handlerExternal={this.updatePost.bind(this, post.EventId, post.MovieId)}
                            />

                            <p className={styles.userRaiting} style={displayBookmarkIconBlock}>Оценка: <span>{userRaiting}</span></p>
                            <div className={styles.movieRaiting}>
                                <p>{movieRaiting}</p>
                                <p>рейтинг</p>
                            </div>
                            <div className={styles.numberUsers} onClick={post.AmountUsersWhoWillWatchMovie > 0 ? this.clickShowUsersWhoWillWatchMovie.bind(this, post.MovieId) : () => ({})}>
                                <img src={shapeIcon} width="16px" />
                                <p>{post.AmountUsersWhoWillWatchMovie}</p>
                                <p>будут смотреть</p>
                            </div>
                            <div className={styles.numberUsers} onClick={post.AmountUsersWhoViewedMovie > 0 ? this.clickShowUsersWhoViewedMovie.bind(this, post.MovieId) : () => ({})}>
                                <img src={shapeIcon} width="16px" />
                                <p>{post.AmountUsersWhoViewedMovie}</p>
                                <p>посмотрели</p>
                            </div>
                        </div>
                    </div>
                </div>

                <PostButtonBar
                    isActiveLike={post.IsCurrentUserLiked}
                    clickLike={this.state.handleClickLike.bind(this, post.EventId, post.MovieId)}
                    clickComment={this.clickShowAllComments.bind(this)}
                />

                <div className={styles.commentsBlock}>
                    <PostTotalLikes
                        userInfoWhoLikesEvent={post.UserInfoWhoLikesEvent}
                        amountEventLikes={post.AmountEventLikes}
                        clickShowUsersWhoLikesPost={this.clickShowUsersWhoLikesPost.bind(this, post.EventId, post.MovieId)}
                        isInDetails={false}
                    />

                    {blockWithMainComment}

                    <p className={styles.showAllComments} onClick={this.clickShowAllComments.bind(this)} style={displayAllCommentsBlock}>
                        Посмотреть {post.AmountEventComments} комментария
                    </p>

                    {commentsExcludingMain}
                </div>

                <PostCommentInput
                    value={this.state.inputComment}
                    handleChange={this.handleInputCommentChange}
                    handleClick={this.state.handleClickPublishComment.bind(this, post.EventId, post.MovieId)}
                />

                <PostDetails
                    isDisplay={this.state.showAllComments}
                    post={this.state.post}
                    clickClose={this.hidePostDetails}
                    handlerExternal={this.updatePost.bind(this, post.EventId, post.MovieId)}
                />

                <ModalDialog
                    show={this.state.modalDialog.show}
                    title={this.state.modalDialog.title}
                    isLoading={this.state.modalDialog.isLoading}
                    items={this.state.modalDialog.items}
                    clickClose={this.hideModalDialog}
                    handlerExternal={handlerExternal}
                />
            </article>
        );
    }
}

export default Post;
