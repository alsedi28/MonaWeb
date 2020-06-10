import React from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import InfiniteScroll from "react-infinite-scroll-component";

import Header from '../header/header';
import Footer from '../footer/footer';
import Loader from '../loader/loader';
import ModalDialog from '../modalDialog/modalDialog';
import HorizontalTabs from '../horizontalTabs/horizontalTabs';
import HorizontalScrollContainer from '../horizontalScrollContainer/horizontalScrollContainer';
import MovieCardMainInfo from './movieCardMainInfo/movieCardMainInfo';
import MovieCardPerson from './movieCardPerson/movieCardPerson';
import MovieCardMiniMovie from './movieCardMiniMovie/movieCardMiniMovie';
import MovieCardSideBarInfo from './movieCardSideBarInfo/movieCardSideBarInfo';
import MovieCardComment from './movieCardComment/movieCardComment';
import MovieCardNotCommentsBanner from './movieCardNotCommentsBanner/movieCardNotCommentsBanner';
import PostDetails from '../postDetails/postDetails';
import { DataService } from '../../dataService';

import styles from './movieCardPage.module.css';

class MovieCardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movieId: props.match.params.movieId,
            movie: {
                ReleaseDate: null,
                Runtime: 0,
                VoteAverage: 0,
                ImdbRaiting: 0,
                Raiting: 0,
                PosterPath: null,
                Title: "",
                ProductionCountry: "",
                StatusOfMovieForUser: null,
                CommentsAmount: 0,
                PeopleViewedMovie: {
                    AmountPeople: 0,
                    Peoples: []
                },
                PeopleWillWatchMovie: {
                    AmountPeople: 0,
                    Peoples: []
                },
                Casts: {
                    Amount: 0,
                    Persons: []
                },
                Crews: {
                    Amount: 0,
                    Persons: []
                },
                Tags: [],
                MoviesOfTopActors: [],
                MoviesOfCurrentDirector: []
            },
            comments: {
                items: [],
                hasMore: false, // Флаг, который показывает есть ли еще комментарии для загрузки
                page: 2, // Номер страницы (начинаем с 2-ой, потому что 1-ая приходит вместе с данными о фильме)
                date: new Date() // Дата на которую запрашивать комментарии (текущая)
            },
            isLoading: true,
            tabNumberActive: 1,
            postDetails: {
                post: null,
                show: false
            },
            modalDialog: { // Состояние объекта модального окна
                show: false, // Показывать или нет модальное окно
                isLoading: false, // Отображать Loader в модальном окне или нет
                title: "", // Заголовок модального окна
                items: [] // Данные, которые необходимо отобразить в модальном окне
            },
            handleClickLikeComment: this.clickLikeComment // Обработчик события click по "Сердцу" в комментарии
        };

        this.tabSettings = [
            {
                Title: "Обзор",
                Width: 65,
                Offset: 0
            },
            {
                Title: "Отзывы",
                Width: 71,
                Offset: 111
            },
            {
                Title: "Медиа",
                Width: 61,
                Offset: 223
            }
        ];

        this.getMovieCard = this.getMovieCard.bind(this);
        this.getMoviesComments = this.getMoviesComments.bind(this);
        this.clickLikeComment = this.clickLikeComment.bind(this);
        this.clickShowUsersWhoWillWatchMovie = this.clickShowUsersWhoWillWatchMovie.bind(this);
        this.clickShowUsersWhoViewedMovie = this.clickShowUsersWhoViewedMovie.bind(this);
        this.setModalDialogState = this.setModalDialogState.bind(this);
        this.showModalDialog = this.showModalDialog.bind(this);
        this.hideModalDialog = this.hideModalDialog.bind(this);
        this.showPostDetails = this.showPostDetails.bind(this);
        this.hidePostDetails = this.hidePostDetails.bind(this);
        this.clickTab = this.clickTab.bind(this);
    }

    componentDidMount() {
        // Прокручиваем страницу в самое начало
        window.scrollTo(0, 0);

        this.getMovieCard();
    }

    componentWillReceiveProps(nextProps) {
        // Если переходим на страницу другого фильма, то необходимо обновить страницу.
        if (this.state.movieId !== nextProps.match.params.movieId) {
            window.location.reload();
            this.setState({ isLoading: true });
            window.scrollTo(0, 0);
        }
    }

    getMovieCard() {
        let callback = (movie) => {
            this.setState({
                movie,
                comments: {
                    ...this.state.comments,
                    items: movie.Comments,
                    hasMore: true
                },
                isLoading: false
            });
        };

        DataService.getMovie(this.state.movieId, callback);
    }

    getMoviesComments() {
        let callback = (items) => {
            if (items.length === 0) {
                this.setState({
                    ...this.state,
                    comments: {
                        ...this.state.comments,
                        hasMore: false
                    }
                });
                return;
            }

            this.setState({
                ...this.state,
                comments: {
                    ...this.state.comments,
                    items: this.state.comments.items.concat(items),
                    page: this.state.comments.page + 1,
                    hasMore: true
                }
            });
        };

        DataService.getMoviesComments(this.state.movieId, this.state.comments.page, this.state.comments.date, callback);
    }

    clickLikeComment(eventId, movieId, commentId) {
        // Снимаем обработчик click, пока не обновится состояние после текущего клика
        this.setState({ handleClickLikeComment: () => ({}) });

        let callback = _ => {
            let commentIndex = this.state.comments.items.findIndex(item => item.CommentId === commentId);
            let comments = [...this.state.comments.items]; // Копируем текущий массив комментариев, чтобы изменить состояние конкретного

            // Обновляем состояние комментария в локальной модели. Мб позже будем использовать запрос для обновления данных о комментарии.
            comments[commentIndex].IsCurrentUserLikeComment = !comments[commentIndex].IsCurrentUserLikeComment;
            comments[commentIndex].CommentLikesAmount = comments[commentIndex].IsCurrentUserLikeComment ?
                comments[commentIndex].CommentLikesAmount + 1 :
                comments[commentIndex].CommentLikesAmount - 1;

            this.setState({
                handleClickLikeComment: this.clickLikeComment, // Возвращаем обработчик click
                comments: {
                    ...this.state.comments,
                    items: comments
                }
            });
        };

        let comment = this.state.comments.items.find(item => item.CommentId === commentId);

        if (comment !== null) {
            if (comment.IsCurrentUserLikeComment) {
                DataService.deleteLikeFromComment(eventId, movieId, commentId, callback);
            } else {
                DataService.addLikeToComment(eventId, movieId, commentId, callback);
            }
        }
    }

    clickShowUsersWhoWillWatchMovie(movieId) {
        let title = "Будут смотреть";

        this.showModalDialog(title, DataService.getUsersWhoWillWatchMovie.bind(DataService), movieId);
    }

    clickShowUsersWhoViewedMovie(movieId) {
        let title = "Уже смотрели";

        this.showModalDialog(title, DataService.getUsersWhoViewedMovie.bind(DataService), movieId);
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

    showPostDetails(eventId, movieId) {
        let callback = (item) => {
            this.setState({
                postDetails: {
                    ...this.state.postDetails,
                    post: item,
                    show: true
                }
            });
        };

        DataService.getPost(eventId, movieId, callback);
    }

    hidePostDetails() {
        this.setState({
            postDetails: {
                ...this.state.postDetails,
                post: null,
                show: false
            }
        });
    }

    clickTab(tabNumber) {
        this.setState({ tabNumberActive: tabNumber });
    }

    render() {
        const { location } = this.props;

        return (
            <React.Fragment>
                <Header externalClass="header-external" location={location.pathname} />
                <div className={styles.container}>
                    <Loader show={this.state.isLoading} externalClass={styles.loader} />
                    <MovieCardMainInfo movie={this.state.movie} clickUsersWhoWillWatchMovie={this.clickShowUsersWhoWillWatchMovie} clickUsersWhoViewedMovie={this.clickShowUsersWhoViewedMovie} externalClass={`${this.state.isLoading ? styles.hideBlock : ''}`} />
                    <HorizontalTabs tabsSettings={this.tabSettings} tabNumberActive={this.state.tabNumberActive} clickTab={this.clickTab} externalClass={styles.tabsExternal} />
                    <div className={`${styles.tabData} ${styles.tabOverview}`} style={{ display: this.state.tabNumberActive === 1 ? "flex" : "none" }}>
                        <div>
                            <HorizontalScrollContainer title="Актеры" externalClass={`${styles.horizontalScrollContainerExternal} ${this.state.movie.Casts.Persons.length > 0 ? styles.showBlock : styles.hideBlock}`}>
                                {this.state.movie.Casts.Persons.map(p => <MovieCardPerson name={p.Name} role={p.Character} photoPath={p.AvatarPath} externalClass={styles.scrollContainerItemExternal} />)}
                            </HorizontalScrollContainer>
                            <HorizontalScrollContainer title="Команда" externalClass={`${styles.horizontalScrollContainerExternal} ${this.state.movie.Crews.Persons.length > 0 ? styles.showBlock : styles.hideBlock}`}>
                                {this.state.movie.Crews.Persons.map(p => <MovieCardPerson name={p.Name} role={p.Department} photoPath={p.AvatarPath} externalClass={styles.scrollContainerItemExternal} />)}
                            </HorizontalScrollContainer>
                            <HorizontalScrollContainer title="Фильмы с этими актерами" externalClass={`${styles.horizontalScrollContainerExternal} ${this.state.movie.MoviesOfTopActors.length > 0 ? styles.showBlock : styles.hideBlock}`}>
                                {this.state.movie.MoviesOfTopActors.map(m => <MovieCardMiniMovie movieId={m.MovieId} movieTitle={m.Title} posterPath={m.PosterPath} externalClass={styles.scrollContainerItemExternal} />)}
                            </HorizontalScrollContainer>
                            <HorizontalScrollContainer title="Фильмы этого режиссера" externalClass={`${styles.horizontalScrollContainerExternal} ${this.state.movie.MoviesOfCurrentDirector.length > 0 ? styles.showBlock : styles.hideBlock}`}>
                                {this.state.movie.MoviesOfCurrentDirector.map(m => <MovieCardMiniMovie movieId={m.MovieId} movieTitle={m.Title} posterPath={m.PosterPath} externalClass={styles.scrollContainerItemExternal} />)}
                            </HorizontalScrollContainer>
                        </div>
                        <div>
                            <MovieCardSideBarInfo movie={this.state.movie} externalClass={styles.movieCardSideBarInfoExternal} />
                        </div>
                    </div>
                    <div className={`${styles.tabData} ${styles.tabComments}`} style={{ display: this.state.tabNumberActive === 2 ? "block" : "none" }}>
                        <MovieCardNotCommentsBanner show={this.state.comments.items.length === 0}/>
                        <div style={{ display: this.state.comments.items.length > 0 ? "block" : "none" }}>
                            <p className={styles.titleComments}>Всего отзывов: {this.state.movie.CommentsAmount}</p>

                            <InfiniteScroll
                                dataLength={this.state.comments.items.length}
                                next={this.getMoviesComments}
                                hasMore={this.state.comments.hasMore}
                                loader={<Loader />}
                            >
                                {this.state.comments.items.map(comment =>
                                    (<MovieCardComment comment={comment} clickLike={this.state.handleClickLikeComment.bind(this, comment.EventId, comment.MovieId, comment.CommentId)}
                                        clickComments={this.showPostDetails.bind(this, comment.EventId, comment.MovieId)} externalClass={styles.movieCardCommentExternal} />))}
                            </InfiniteScroll>
                        </div>
                        {this.state.postDetails.post !== null &&
                            <RemoveScroll enabled={this.state.postDetails.show}>
                                <PostDetails
                                    isDisplay={this.state.postDetails.show}
                                    post={this.state.postDetails.post}
                                    clickClose={this.hidePostDetails}
                                    handlerExternal={() => ({})}
                                />
                            </RemoveScroll>}
                    </div>

                    <RemoveScroll enabled={this.state.modalDialog.show}>
                        <ModalDialog
                            show={this.state.modalDialog.show}
                            title={this.state.modalDialog.title}
                            isLoading={this.state.modalDialog.isLoading}
                            items={this.state.modalDialog.items}
                            clickClose={this.hideModalDialog}
                        />
                    </RemoveScroll>
                </div>
                <Footer externalClass="footer-external" />
            </React.Fragment>
        );
    }
}

export default MovieCardPage;