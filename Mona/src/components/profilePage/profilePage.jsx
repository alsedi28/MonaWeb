import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import styles from './profilePage.module.css';

import PostsFeed from '../postsFeed/postsFeed';
import Post from '../post/post';
import Loader from '../loader/loader';
import ProfileUserInfo from './profileUserInfo/profileUserInfo';
import Header from '../header/header';
import Footer from '../footer/footer';
import HorizontalTabs from '../horizontalTabs/horizontalTabs';
import ProfileMovieItem from './profileMovieItem/profileMovieItem';
import NotPostsBanner from './profileBanners/notPostsBanner/notPostsBanner';
import NotPostsInMyOwnProfileBanner from './profileBanners/notPostsInMyOwnProfileBanner/notPostsInMyOwnProfileBanner';
import NotMoviesWillWatchBanner from './profileBanners/notMoviesWillWatchBanner/notMoviesWillWatchBanner';
import NotMoviesWillWatchInMyOwnProfileBanner from './profileBanners/notMoviesWillWatchInMyOwnProfileBanner/notMoviesWillWatchInMyOwnProfileBanner';
import NotMoviesViewedBanner from './profileBanners/notMoviesViewedBanner/notMoviesViewedBanner';
import NotMoviesViewedInMyOwnProfileBanner from './profileBanners/notMoviesViewedInMyOwnProfileBanner/notMoviesViewedInMyOwnProfileBanner';
import ProfileMoviesSort from './profileMoviesSort/profileMoviesSort';
import { DataService } from '../../dataService';
import Constants from '../../constants';
import { getMainUserId } from '../../helpers/cookieHelper';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true, // Флаг, который отвечает за отображение/скрытие loader'а, связанного с загрузкой данных профиля
            profile: {
                id: props.match.params.userId,
                name: "",
                login: "",
                avatar: null,
                isFollowing: false,
                amountFollowers: 0,
                amountFollowing: 0,
                amountViewedMovies: 0,
                amountWillWatchMovies: 0,
                amountPosts: 0
            },
            feed: {
                posts: [],
                hasMore: false, // Флаг, который показывает есть ли еще посты для загрузки
                lastPostItemId: 0, // Id последнего Event, который загрузили
                isLoading: true // Флаг, который отвечает за отображение/скрытие loader'а при начальной инициализации ленты постов
            },
            moviesWillWatch: {
                items: [],
                hasMore: false, // Флаг, который показывает есть ли еще фильмы для загрузки
                page: 1, // Номер страницы
                sortType: Constants.MOVIES_SORT_TYPE_DATE_DESC // Тип сортировки, по умолчанию по дате убывания
            },
            moviesViewed: {
                items: [],
                hasMore: false, // Флаг, который показывает есть ли еще фильмы для загрузки
                page: 1, // Номер страницы
                sortType: Constants.MOVIES_SORT_TYPE_DATE_DESC // Тип фильтра, по умолчанию по дате убывания
            },
            tabNumberActive: 1, // Номер Tab'а, который активный. 1 - Tab "Публикации", 2 - Tab "В закладках", 3 - Tab "Просмотрено"
            handleClickFollowUser: this.clickFollowUser, // Обработчик события click по кнопке Подписаться/Подписки
            tabSettings: [ // Настройки для табов. Храним в state, т.к. текст заголовка содержит данные из state.
                {
                    Title: 'Публикации',
                    Width: 167,
                    Offset: 12
                },
                {
                    Title: 'В закладках',
                    Width: 167,
                    Offset: 199
                },
                {
                    Title: 'Просмотрено',
                    Width: 181,
                    Offset: 382
                }
            ]
        };

        this.getProfileInfo = this.getProfileInfo.bind(this);
        this.updatePartlyProfileInfo = this.updatePartlyProfileInfo.bind(this);
        this.getUsersPosts = this.getUsersPosts.bind(this);
        this.getWillWatchMovies = this.getWillWatchMovies.bind(this);
        this.getViewedMovies = this.getViewedMovies.bind(this);
        this.clickFollowUser = this.clickFollowUser.bind(this);
        this.clickTab = this.clickTab.bind(this);
        this.renderMoviesForView = this.renderMoviesForView.bind(this);
        this.changedSortType = this.changedSortType.bind(this);
    }

    componentDidMount() {
        // Прокручиваем страницу в самое начало
        window.scrollTo(0, 0);

        this.getProfileInfo();
        this.getUsersPosts();
        this.getWillWatchMovies();
        this.getViewedMovies();
    }

    componentWillReceiveProps(nextProps) {
        // Если переходим на страницу профиля другого пользователя, находясь на странице профиля, то необходимо обновить страницу.
        if (this.state.profile.id !== nextProps.match.params.userId) {
            window.location.reload();
            window.scrollTo(0, 0);
        }
    }

    getProfileInfo() {
        let callback = (profile) => {
            this.setState({
                ...this.state,
                isLoading: false,
                profile: {
                    ...this.state.profile,
                    name: profile.Name,
                    login: profile.Login,
                    avatar: profile.AvatarPath,
                    isFollowing: profile.IsFollowing,
                    amountFollowers: profile.AmountFollowers,
                    amountFollowing: profile.AmountFollowing,
                    amountViewedMovies: profile.AmountViewedMovies,
                    amountWillWatchMovies: profile.AmountWillWatchMovies,
                    amountPosts: profile.AmountEvents
                },
                tabSettings: [ // Обновляем заголовки табов
                    { ...this.state.tabSettings[0], Title: `Публикации (${profile.AmountEvents})` },
                    { ...this.state.tabSettings[1], Title: `В закладках (${profile.AmountWillWatchMovies})` },
                    { ...this.state.tabSettings[2], Title: `Просмотрено (${profile.AmountViewedMovies})` }
                ]
            });
        };

        DataService.getProfileInfo(this.state.profile.id, callback);
    }

    updatePartlyProfileInfo(callFromModalDialog = false) {
        let callback = (profile) => {
            this.setState({
                ...this.state,
                profile: {
                    ...this.state.profile,
                    isFollowing: profile.IsFollowing,
                    amountFollowers: profile.AmountFollowers,
                    amountFollowing: profile.AmountFollowing
                }
            });

            // Если вызываем из модального окна, то необходимо после обновления убрать скролл у страницы
            if (callFromModalDialog)
                document.body.style.overflow = "hidden";
        };

        DataService.getProfileInfo(this.state.profile.id, callback);
    }

    getUsersPosts() {
        let callback = (items) => {
            if (items.length === 0) {
                this.setState({
                    ...this.state,
                    feed: {
                        ...this.state.feed,
                        hasMore: false,
                        isLoading: false
                    }
                });
                return;
            }

            this.setState({
                ...this.state,
                feed: {
                    lastPostItemId: items[items.length - 1].EventId,
                    posts: this.state.feed.posts.concat(items),
                    hasMore: true,
                    isLoading: false
                }
            });
        };

        DataService.getUsersPosts(this.state.profile.id, this.state.feed.lastPostItemId, callback);
    }

    getWillWatchMovies() {
        let callback = (items) => {
            if (items.length === 0) {
                this.setState({
                    ...this.state,
                    moviesWillWatch: {
                        ...this.state.moviesWillWatch,
                        hasMore: false,
                        isLoading: false,
                        sortType: this.state.moviesWillWatch.sortType
                    }
                });
                return;
            }

            this.setState({
                ...this.state,
                moviesWillWatch: {
                    page: this.state.moviesWillWatch.page + 1,
                    items: this.state.moviesWillWatch.items.concat(items),
                    hasMore: true,
                    isLoading: false,
                    sortType: this.state.moviesWillWatch.sortType
                }
            });
        };

        DataService.getWillWatchMovies(this.state.profile.id, this.state.moviesWillWatch.page, this.state.moviesWillWatch.sortType, callback);
    }

    getViewedMovies() {
        let callback = (items) => {
            if (items.length === 0) {
                this.setState({
                    ...this.state,
                    moviesViewed: {
                        ...this.state.moviesViewed,
                        hasMore: false,
                        isLoading: false,
                        sortType: this.state.moviesViewed.sortType
                    }
                });
                return;
            }

            this.setState({
                ...this.state,
                moviesViewed: {
                    page: this.state.moviesViewed.page + 1,
                    items: this.state.moviesViewed.items.concat(items),
                    hasMore: true,
                    isLoading: false,
                    sortType: this.state.moviesViewed.sortType
                }
            });
        };

        DataService.getViewedMovies(this.state.profile.id, this.state.moviesViewed.page, this.state.moviesViewed.sortType, callback);
    }

    clickFollowUser() {
        // Снимаем обработчик click, пока не обновится состояние после текущего клика
        this.setState({ handleClickFollowUser: () => ({}) });

        let callback = _ => {
            this.updatePartlyProfileInfo();
            // Возвращаем обработчик click
            this.setState({ handleClickFollowUser: this.clickFollowUser });
        };

        if (this.state.profile.isFollowing)
            DataService.deleteFollowing(this.state.profile.id, callback);
        else
            DataService.addFollowing(this.state.profile.id, callback);
    }

    clickTab(tabNumber) {
        this.setState({ tabNumberActive: tabNumber });
    }

    renderMoviesForView(movies, isViewed) {
        let result = [];

        // Группируем фильмы в блок по два для вывода на страницу
        for (var i = 0; i < movies.items.length; i += 2) {
            if (i === movies.items.length - 1)
                result.push(
                    <div className={styles.moviesContainer}>
                        <ProfileMovieItem movie={movies.items[i]} isViewed={isViewed} externalClass={styles.movieBlockExternal} handlerExternal={this.updatePartlyProfileInfo.bind(this, true)} />
                    </div>);
            else
                result.push(
                    <div className={styles.moviesContainer}>
                        <ProfileMovieItem movie={movies.items[i]} isViewed={isViewed} externalClass={styles.movieBlockExternal} handlerExternal={this.updatePartlyProfileInfo.bind(this, true)}/>
                        <ProfileMovieItem movie={movies.items[i + 1]} isViewed={isViewed} externalClass={styles.movieBlockExternal} handlerExternal={this.updatePartlyProfileInfo.bind(this, true)}/>
                    </div>);
        }

        return result;
    }

    changedSortType(selectedFilter) {
        console.error(selectedFilter);
        if (this.state.tabNumberActive === 2) {
            this.setState({
                ...this.state,
                moviesWillWatch: {
                    items: [],
                    hasMore: true,
                    page: 1,
                    sortType: selectedFilter
                }
            }, () => {
                this.getWillWatchMovies();
            });
        } else if (this.state.tabNumberActive === 3) {
            this.setState({
                ...this.state,
                moviesViewed: {
                    items: [],
                    hasMore: true,
                    page: 1,
                    sortType: selectedFilter
                }
            }, () => {
                this.getViewedMovies();
            });
        }
    }

    render() {
        const { location } = this.props;

        let currentUserId = getMainUserId();
        let displaySortViewBlock = ""

        if (this.state.tabNumberActive === 2) {
            displaySortViewBlock = { display: this.state.moviesWillWatch.items.lenght > 0 ? "block" : "none" }
        }  else if (this.state.tabNumberActive === 3) {
            displaySortViewBlock = { display: this.state.moviesViewed.items.lenght > 0 ? "block" : "none" }
        }

        return (
            <React.Fragment>
                <Header externalClass="header-external" location={location.pathname} />
                <div className={styles.container}>
                    <div className={styles.userBlock}>
                        <Loader show={this.state.isLoading} externalClass={styles.loader} />
                        <ProfileUserInfo profile={this.state.profile} clickFollowButton={this.state.handleClickFollowUser.bind(this)}
                            clickFollowers={this.clickShowFollowers} clickFollowing={this.clickShowFollowing} style={{ display: this.state.isLoading ? "none" : "block" }} />
                    </div>
                    <HorizontalTabs tabsSettings={this.state.tabSettings} tabNumberActive={this.state.tabNumberActive} clickTab={this.clickTab} externalClass={styles.tabsExternal} />
                    <div className={`${styles.tabDataContainer} ${styles.tabMovies}`} style={{ display: (this.state.tabNumberActive === 2 || this.state.tabNumberActive === 3)  ? "block" : "none" }}>
                        <ProfileMoviesSort
                            style={displaySortViewBlock}
                            selectedSort={this.state.tabNumberActive === 2 ? this.state.moviesWillWatch.sortType : this.state.moviesViewed.sortType}
                            movieType={this.state.tabNumberActive === 2 ? Constants.MOVIE_STATUS_WILL_WATCH : Constants.MOVIE_STATUS_VIEWED}
                            onSortTypeSelect={this.changedSortType}
                        />
                    </div>
                    <div className={styles.tabDataContainer} style={{ display: this.state.tabNumberActive === 1 ? "block" : "none" }}>
                        <NotPostsBanner username={this.state.profile.login} show={currentUserId !== this.state.profile.id && this.state.profile.amountPosts === 0} externalClass={styles.bannerExternal} />
                        <NotPostsInMyOwnProfileBanner show={currentUserId === this.state.profile.id && this.state.profile.amountPosts === 0} externalClass={styles.bannerExternal} />
                        <PostsFeed>
                            <Loader show={this.state.feed.isLoading} externalClass={styles.loader}/>
                            <InfiniteScroll
                                dataLength={this.state.feed.posts.length}
                                next={this.getUsersPosts}
                                hasMore={this.state.feed.hasMore}
                                loader={<Loader />}
                            >
                                {this.state.feed.posts.map(post => <Post post={post} externalClass="post-external" handlerExternal={this.updatePartlyProfileInfo.bind(this, true)}/>)}
                            </InfiniteScroll>
                        </PostsFeed>
                    </div>
                    <div className={`${styles.tabDataContainer} ${styles.tabMovies}`} style={{ display: this.state.tabNumberActive === 2 ? "block" : "none" }}>
                        <NotMoviesWillWatchBanner username={this.state.profile.login} show={currentUserId !== this.state.profile.id && this.state.profile.amountWillWatchMovies === 0} externalClass={styles.bannerExternal} />
                        <NotMoviesWillWatchInMyOwnProfileBanner show={currentUserId === this.state.profile.id && this.state.profile.amountWillWatchMovies === 0} externalClass={styles.bannerExternal} />
                        <InfiniteScroll
                            dataLength={this.state.moviesWillWatch.items.length}
                            next={this.getWillWatchMovies}
                            hasMore={this.state.moviesWillWatch.hasMore}
                            loader={<Loader />}
                        >
                            {this.renderMoviesForView(this.state.moviesWillWatch, false)}
                        </InfiniteScroll>
                    </div>
                    <div className={`${styles.tabDataContainer} ${styles.tabMovies}`} style={{ display: this.state.tabNumberActive === 3 ? "block" : "none" }}>
                        <NotMoviesViewedBanner username={this.state.profile.login} show={currentUserId !== this.state.profile.id && this.state.profile.amountViewedMovies === 0} externalClass={styles.bannerExternal} />
                        <NotMoviesViewedInMyOwnProfileBanner show={currentUserId === this.state.profile.id && this.state.profile.amountViewedMovies === 0} externalClass={styles.bannerExternal} />
                        <InfiniteScroll
                            dataLength={this.state.moviesViewed.items.length}
                            next={this.getViewedMovies}
                            hasMore={this.state.moviesViewed.hasMore}
                            loader={<Loader />}
                        >
                            {this.renderMoviesForView(this.state.moviesViewed, true)}
                        </InfiniteScroll>
                    </div>
                </div>
                <Footer externalClass="footer-external" />
            </React.Fragment>
        );
    }
}

export default ProfilePage;
