import React from 'react';

import styles from './profilePage.module.css';

import InfiniteScroll from "react-infinite-scroll-component";
import PostsFeed from '../postsFeed/postsFeed';
import Post from '../post/post';
import Loader from '../loader/loader';
import ProfileUserInfo from '../profileUserInfo/profileUserInfo';
import Header from '../header/header';
import Footer from '../footer/footer';
import MovieItemOnUserProfile from '../movieItemOnUserProfile/movieItemOnUserProfile';
import ModalDialog from '../modalDialog/modalDialog';
import NotPostsBanner from '../notPostsBanner/notPostsBanner';
import NotPostsInMyOwnProfileBanner from '../notPostsInMyOwnProfileBanner/notPostsInMyOwnProfileBanner';
import NotMoviesWillWatchBanner from '../notMoviesWillWatchBanner/notMoviesWillWatchBanner';
import NotMoviesWillWatchInMyOwnProfileBanner from '../notMoviesWillWatchInMyOwnProfileBanner/notMoviesWillWatchInMyOwnProfileBanner';
import NotMoviesViewedBanner from '../notMoviesViewedBanner/notMoviesViewedBanner';
import NotMoviesViewedInMyOwnProfileBanner from '../notMoviesViewedInMyOwnProfileBanner/notMoviesViewedInMyOwnProfileBanner';
import { DataService } from '../../dataService';
import Constants from '../../constants';

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
                page: 1 // Номер страницы
            },
            moviesViewed: {
                items: [],
                hasMore: false, // Флаг, который показывает есть ли еще фильмы для загрузки
                page: 1 // Номер страницы
            },
            modalDialog: { // Состояние объекта модального окна
                show: false, // Показывать или нет модальное окно
                isLoading: false, // Отображать Loader в модальном окне или нет
                title: "", // Заголовок модального окна
                items: [] // Данные, которые необходимо отобразить в модальном окне
            },
            tabNumberActive: 1, // Номер Tab'а, который активный. 1 - Tab "Публикации", 2 - Tab "В закладках", 3 - Tab "Просмотрено"
            handleClickFollowUser: this.clickFollowUser // Обработчик события click по кнопке Подписаться/Подписки
        };

        // Подписки
        this.followers = {
            isLoaded: false,
            items: []
        };

        // Подписчики
        this.following = {
            isLoaded: false,
            items: []
        };

        this.getProfileInfo = this.getProfileInfo.bind(this);
        this.updatePartlyProfileInfo = this.updatePartlyProfileInfo.bind(this);
        this.getUsersPosts = this.getUsersPosts.bind(this);
        this.getWillWatchMovies = this.getWillWatchMovies.bind(this);
        this.getViewedMovies = this.getViewedMovies.bind(this);
        this.clickShowFollowers = this.clickShowFollowers.bind(this);
        this.clickShowFollowing = this.clickShowFollowing.bind(this);
        this.clickFollowUser = this.clickFollowUser.bind(this);
        this.setModalDialogState = this.setModalDialogState.bind(this);
        this.showModalDialog = this.showModalDialog.bind(this);
        this.hideModalDialog = this.hideModalDialog.bind(this); 
        this.renderMoviesForView = this.renderMoviesForView.bind(this);
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
                }
            });
        };

        DataService.getProfileInfo(this.state.profile.id, callback);
    }

    updatePartlyProfileInfo() {
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

            // Сбрасываем значения. После обновления могло измениться количество.
            this.followers.isLoaded = false;
            this.following.isLoaded = false;
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
                        isLoading: false
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
                    isLoading: false
                }
            });
        };

        DataService.getWillWatchMovies(this.state.profile.id, this.state.moviesWillWatch.page, callback);
    }

    getViewedMovies() {
        let callback = (items) => {
            if (items.length === 0) {
                this.setState({
                    ...this.state,
                    moviesViewed: {
                        ...this.state.moviesViewed,
                        hasMore: false,
                        isLoading: false
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
                    isLoading: false
                }
            });
        };

        DataService.getViewedMovies(this.state.profile.id, this.state.moviesViewed.page, callback);
    }

    clickShowFollowers() {
        let title = "Подписки";

        this.showModalDialog(title, this.followers, DataService.getFollowers.bind(DataService), this.state.profile.id);
    }

    clickShowFollowing() {
        let title = "Подписчики";

        this.showModalDialog(title, this.following, DataService.getFollowing.bind(DataService), this.state.profile.id);
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

    showModalDialog(title, storage, getter, ...args) {
        // Данные уже загружали
        if (storage.isLoaded) {
            this.setModalDialogState(true, false, title, storage.items);

            return;
        }

        this.setModalDialogState(true, true, title, []);

        let callback = (items) => {
            storage.items = items.map(item => ({
                id: item.UserId,
                icon: item.AvatarPath,
                login: item.Login,
                name: item.Name
            }));

            storage.isLoaded = true;

            this.setModalDialogState(true, false, title, storage.items);
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

    clickTab(event, tabNumber) {
        let tabs = document.getElementsByClassName(styles.tabs)[0].getElementsByTagName("a");

        for (var i = 0; i < tabs.length; i++)
            tabs[i].classList.remove(styles.active);

        event.target.classList.add(styles.active);

        this.setState({ ...this.state, tabNumberActive: tabNumber });
    }

    renderMoviesForView(movies, isViewed) {
        let result = [];

        // Группируем фильмы в блок по два для вывода на страницу
        for (var i = 0; i < movies.items.length; i += 2) {
            if (i === movies.items.length - 1)
                result.push(
                    <div className={styles.moviesContainer}>
                        <MovieItemOnUserProfile movie={movies.items[i]} isViewed={isViewed} externalClass={styles.movieBlockExternal} />
                    </div>);
            else
                result.push(
                    <div className={styles.moviesContainer}>
                        <MovieItemOnUserProfile movie={movies.items[i]} isViewed={isViewed} externalClass={styles.movieBlockExternal} />
                        <MovieItemOnUserProfile movie={movies.items[i + 1]} isViewed={isViewed} externalClass={styles.movieBlockExternal} />
                    </div>);
        }

        return result;
    }

    render() {
        const { location } = this.props;

        let currentUserId = sessionStorage.getItem(Constants.USER_ID_COOKIE_KEY);

        return (
            <React.Fragment>
                <Header externalClass="header-external" location={location.pathname} />
                <div className={styles.container}>
                    <div className={styles.userBlock}>
                        <Loader show={this.state.isLoading} externalClass={styles.loader} />
                        <ProfileUserInfo profile={this.state.profile} clickFollowButton={this.state.handleClickFollowUser.bind(this)}
                            clickFollowers={this.clickShowFollowers} clickFollowing={this.clickShowFollowing} style={{ display: this.state.isLoading ? "none" : "block" }} />
                    </div>
                    <div className={styles.tabs}>
                        <a className={`${styles.tabPosts} ${styles.active}`} onClick={(e) => this.clickTab(e, 1)}>Публикации ({this.state.profile.amountPosts})</a>
                        <a className={styles.tabMoviesWillWatch} onClick={(e) => this.clickTab(e, 2)}>В закладках ({this.state.profile.amountWillWatchMovies})</a>
                        <a className={styles.tabMoviesViewed} onClick={(e) => this.clickTab(e, 3)}>Просмотрено ({this.state.profile.amountViewedMovies})</a>
                        <span className={styles.tabBar}></span>
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
                                {this.state.feed.posts.map(post => <Post post={post} externalClass="post-external" />)}
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
                    <ModalDialog show={this.state.modalDialog.show} title={this.state.modalDialog.title} isLoading={this.state.modalDialog.isLoading}
                        items={this.state.modalDialog.items} clickClose={this.hideModalDialog} />
                </div>
                <Footer externalClass="footer-external" />
            </React.Fragment>
        );
    }
}

export default ProfilePage;