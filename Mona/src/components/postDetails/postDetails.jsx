import React from 'react';
import { Link } from 'react-router-dom';

import styles from './postDetails.module.css';

import PostDetailsComment from './postDetailsComment/postDetailsComment';
import PostDetailsInputField from './postDetailsInputField/postDetailsInputField';
import PostDetailsInfo from './postDetailsInfo/postDetailsInfo';
import ModalDialog from '../modalDialog/modalDialog';
import Loader from '../loader/loader';
import { getStatusString } from '../../helpers/eventHelper';
import { getPosterPath, getBackdropUrl, getAvatarPath } from '../../helpers/imagePathHelper';

import { DataService } from '../../dataService';
import { RemoveScroll } from 'react-remove-scroll';

class PostDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            post: props.post, // Пост
            comments: [], // Лист комментариев
            modalDialog: { // Состояние объекта модального окна для текущего поста
                show: false, // Показывать или нет модальное окно
                isLoading: false, // Отображать Loader в модальном окне или нет
                title: "", // Заголовок модального окна
                items: [] // Данные, которые необходимо отобразить в модальном окне
            },
            handleClickLike: this.clickLikePost, // Обработчик события click по "Сердцу"
            handleClickLikeComment: this.clickLikeComment, // Обработчик события click по "Сердцу" в комментарии
            handleClickPublishComment: this.clickPublishComment, // Обработчик события click по кнопке «Опубликовать»
            inputComment: "",
            isLoading: true,
            paddingForInputField: 0
        };

        this.handleInputHeightChange = this.handleInputHeightChange.bind(this);
        this.handleInputCommentChange = this.handleInputCommentChange.bind(this);
        this.clickPublishComment = this.clickPublishComment.bind(this);
        this.clickLikePost = this.clickLikePost.bind(this);
        this.clickLikeComment = this.clickLikeComment.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.setModalDialogState = this.setModalDialogState.bind(this);
        this.showModalDialog = this.showModalDialog.bind(this);
        this.hideModalDialog = this.hideModalDialog.bind(this);

        this.containerRef = React.createRef();
        this.postDetailsRef = React.createRef();
    }

    componentDidMount() {
        this.getCommentsList();
    }

    getCommentsList() {
        let callback = (commentsList) => {
            this.setState({
                ...this.state,
                isLoading: false,
                comments: commentsList
            });
        };

        let eventId = this.state.post.EventId
        let movieId = this.state.post.MovieId
        DataService.getPostComments(eventId, movieId, callback);
    }

    handleInputCommentChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    handleInputHeightChange(height) {
        this.setState({
            paddingForInputField: height
        })
    }

    clickPublishComment(eventId, movieId) {
        let comment = this.state.inputComment;
        let trimmedValue = comment.trim();
        if (!trimmedValue.length)
            return;

        // Снимаем обработчик click, пока не обновится состояние после текущего клика
        this.setState({ handleClickPublishComment: () => ({})});

        let callback = _ => {
            this.getCommentsList();
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
            this.getCommentsList();
            // Возвращаем обработчик click
            this.setState({ handleClickLikeComment: this.clickLikeComment });
        };

        let comment = this.state.comments.find(item => item.CommentId === commentId);

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

    clickBackground(event) {
        let target = event.target;
        console.error(target, target.closest(".dialog-ev"));

        if (target.closest(".dialog-ev")) {
            event.stopPropagation();
            return;
        }

        this.props.clickClose();
    }

    render() {
        let post = this.state.post;

        let commentsBlock = "";
        if (this.state.isLoading) {
            commentsBlock = <Loader show={this.state.isLoading} externalClass={styles.loader}/>
        } else {
            commentsBlock = this.state.comments.map(comment => <PostDetailsComment comment={comment} clickLike={this.state.handleClickLikeComment.bind(this, post.EventId, post.MovieId, comment.CommentId)} />);
        }

        let containerHeight = this.containerRef.clientHeight > 0 ? this.containerRef.clientHeight : 511;
        let postDetailsHeight = this.postDetailsRef.clientHeight > 0 ? this.postDetailsRef.clientHeight : 100;
        let paddingBottomHeight = this.state.paddingForInputField > 0 ? this.state.paddingForInputField : 46;
        let scrollHeightForComments = containerHeight - 58 - postDetailsHeight - paddingBottomHeight - 8;

        return (
            <React.Fragment>
            <div id="myModal" className={styles.modal} style={{ display: this.props.isDisplay ? "block" : "none" }} onClick={this.clickBackground.bind(this)}>

            <arcticle>
            <div className={`${styles.modalContent} ${`dialog-ev`}`} ref={(elem) => this.containerRef = elem}>

            <div className={styles.posterBox} style={{ background: `${getBackdropUrl(post.MovieBackdropPath)}` }}>
                <div>
                    <div className={styles.poster}>
                        <img src={getPosterPath(post.MoviePosterPath)} className={styles.posterImage} />
                    </div>
                </div>
            </div>

            <div className={styles.rightSideBox}>
                <header className={styles.infoBox}>
                    <div className={styles.iconWithInfoContainer}>
                        <div className={styles.userIcon}>
                            <Link to={`/profile/${post.UserId}`}>
                                <img src={getAvatarPath(post.AvatarPath)} className={styles.userLink} width="32px" height="32px" />
                            </Link>
                        </div>
                        <div className={styles.userInfo}>
                            <span className={styles.userLink}><Link to={`/profile/${post.UserId}`}>{post.Login}</Link></span>
                            <span> {getStatusString(post.EventType)} </span>
                            <span className={styles.userLink}>{post.MovieTitle}</span>
                        </div>
                    </div>
                </header>

                <div className={styles.commentsDiv}>
                    <ul className={styles.commentsSection} style={{ height: `${scrollHeightForComments}px` }}>
                        {commentsBlock}
                    </ul>
                </div>

                <PostDetailsInfo
                    componentRef={(elem) => this.postDetailsRef = elem}
                    isLiked={post.IsCurrentUserLiked}
                    clickLike={this.state.handleClickLike.bind(this, post.EventId, post.MovieId)}
                    userInfoWhoLikesEvent={post.UserInfoWhoLikesEvent}
                    amountEventLikes={post.AmountEventLikes}
                    clickShowUsersWhoLikesPost={this.clickShowUsersWhoLikesPost.bind(this, post.EventId, post.MovieId)}
                    dateOfCreation={post.DateOfCreation}
                    paddingBottom={this.state.paddingForInputField}
                />

                <PostDetailsInputField
                    id={post.EventId}
                    value={this.state.inputComment}
                    handleChange={this.handleInputCommentChange}
                    handleClick={this.state.handleClickPublishComment.bind(this, post.EventId, post.MovieId)}
                    handleHeightChange={this.handleInputHeightChange.bind(this)}
                />

            </div>

            <RemoveScroll enabled={this.state.modalDialog.show}>
                <ModalDialog
                    show={this.state.modalDialog.show}
                    title={this.state.modalDialog.title}
                    isLoading={this.state.modalDialog.isLoading}
                    items={this.state.modalDialog.items}
                    clickClose={this.hideModalDialog}/>
            </RemoveScroll>
            </div>

            </arcticle>

            <div>
                <span className={styles.close} onClick={this.props.clickClose}>&times;</span>
            </div>

            </div>
            </React.Fragment>
        );
    }
}

export default PostDetails;
