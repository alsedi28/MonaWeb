import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import Header from '../header/header';
import Footer from '../footer/footer';
import Loader from '../loader/loader';
import HorizontalTabs from '../horizontalTabs/horizontalTabs';
import HorizontalScrollContainer from '../horizontalScrollContainer/horizontalScrollContainer';
import MovieCardMainInfo from './movieCardMainInfo/movieCardMainInfo';
import MovieCardPerson from './movieCardPerson/movieCardPerson';
import MovieCardMiniMovie from './movieCardMiniMovie/movieCardMiniMovie';
import MovieCardSideBarInfo from './movieCardSideBarInfo/movieCardSideBarInfo';
import MovieCardComment from './movieCardComment/movieCardComment';
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
            tabNumberActive: 1
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
        this.clickTab = this.clickTab.bind(this);
    }

    componentDidMount() {
        this.getMovieCard();
    }

    componentWillReceiveProps(nextProps) {
        // Если переходим на страницу другого фильма, то необходимо обновить страницу.
        if (this.state.movieId !== nextProps.match.params.movieId) {
            window.location.reload();
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

    clickTab(tabNumber) {
        this.setState({ tabNumberActive: tabNumber });
    }

    render() {
        const { location } = this.props;

        let displayCastsBlock = { display: this.state.movie.Casts.Persons.length > 0 ? "block" : "none" };
        let displayCrewsBlock = { display: this.state.movie.Crews.Persons.length > 0 ? "block" : "none" };
        let displayMoviesOfTopActorsBlock = { display: this.state.movie.MoviesOfTopActors.length > 0 ? "block" : "none" };
        let displayMoviesOfCurrentDirectorBlock = { display: this.state.movie.MoviesOfCurrentDirector.length > 0 ? "block" : "none" };

        return (
            <React.Fragment>
                <Header externalClass="header-external" location={location.pathname} />
                <div className={styles.container}>
                    <Loader show={this.state.isLoading} externalClass={styles.loader} />
                    <MovieCardMainInfo movie={this.state.movie} externalClass={`${this.state.isLoading ? styles.hide : ''}`} />
                    <HorizontalTabs tabsSettings={this.tabSettings} tabNumberActive={this.state.tabNumberActive} clickTab={this.clickTab} externalClass={styles.tabsExternal} />
                    <div className={`${styles.tabData} ${styles.tabOverview}`} style={{ display: this.state.tabNumberActive === 1 ? "flex" : "none" }}>
                        <div>
                            <HorizontalScrollContainer title="Актеры" externalClass={styles.horizontalScrollContainerExternal} style={displayCastsBlock}>
                                {this.state.movie.Casts.Persons.map(p => <MovieCardPerson name={p.Name} role={p.Character} photoPath={p.AvatarPath} externalClass={styles.scrollContainerItemExternal} />)}
                            </HorizontalScrollContainer>
                            <HorizontalScrollContainer title="Команда" externalClass={styles.horizontalScrollContainerExternal} style={displayCrewsBlock}>
                                {this.state.movie.Crews.Persons.map(p => <MovieCardPerson name={p.Name} role={p.Department} photoPath={p.AvatarPath} externalClass={styles.scrollContainerItemExternal} />)}
                            </HorizontalScrollContainer>
                            <HorizontalScrollContainer title="Фильмы с этими актерами" externalClass={styles.horizontalScrollContainerExternal} style={displayMoviesOfTopActorsBlock}>
                                {this.state.movie.MoviesOfTopActors.map(m => <MovieCardMiniMovie movieId={m.MovieId} movieTitle={m.Title} posterPath={m.PosterPath} externalClass={styles.scrollContainerItemExternal} />)}
                            </HorizontalScrollContainer>
                            <HorizontalScrollContainer title="Фильмы этого режиссера" externalClass={styles.horizontalScrollContainerExternal} style={displayMoviesOfCurrentDirectorBlock}>
                                {this.state.movie.MoviesOfCurrentDirector.map(m => <MovieCardMiniMovie movieId={m.MovieId} movieTitle={m.Title} posterPath={m.PosterPath} externalClass={styles.scrollContainerItemExternal} />)}
                            </HorizontalScrollContainer>
                        </div>
                        <div>
                            <MovieCardSideBarInfo movie={this.state.movie} externalClass={styles.movieCardSideBarInfoExternal} />
                        </div>
                    </div>
                    <div className={styles.tabData} style={{ display: this.state.tabNumberActive === 2 ? "block" : "none" }}>
                        <div style={{ display: this.state.comments.items.length > 0 ? "block" : "none" }}>
                            <p className={styles.titleComments}>Всего отзывов: {this.state.movie.CommentsAmount}</p>

                            <InfiniteScroll
                                dataLength={this.state.comments.items.length}
                                next={this.getMoviesComments}
                                hasMore={this.state.comments.hasMore}
                                loader={<Loader />}
                            >
                                {this.state.comments.items.map(comment => <MovieCardComment comment={comment} externalClass={styles.movieCardCommentExternal} />)}
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
                <Footer externalClass="footer-external" />
            </React.Fragment>
        );
    }
}

export default MovieCardPage;