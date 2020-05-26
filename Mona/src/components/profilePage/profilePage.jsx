import React from 'react';

import styles from './profilePage.module.css';

import InfiniteScroll from "react-infinite-scroll-component";
import PostsFeed from '../postsFeed/postsFeed';
import Post from '../post/post';
import Loader from '../loader/loader';
import ProfileUserInfo from '../profileUserInfo/profileUserInfo';
import Header from '../header/header';
import Footer from '../footer/footer';
import ModalDialog from '../modalDialog/modalDialog';
import NotPostsBanner from '../notPostsBanner/notPostsBanner';
import NotPostsInMyOwnProfileBanner from '../notPostsInMyOwnProfileBanner/notPostsInMyOwnProfileBanner';
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
            modalDialog: { // Состояние объекта модального окна
                show: false, // Показывать или нет модальное окно
                isLoading: false, // Отображать Loader в модальном окне или нет
                title: "", // Заголовок модального окна
                items: [] // Данные, которые необходимо отобразить в модальном окне
            },
            tabNumberActive: 1 // Номер Tab'а, который активный. 1 - Tab "Публикации", 2 - Tab "В закладках", 3 - Tab "Просмотрено"
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
        this.getUsersPosts = this.getUsersPosts.bind(this);
        this.clickShowFollowers = this.clickShowFollowers.bind(this);
        this.clickShowFollowing = this.clickShowFollowing.bind(this);
        this.setModalDialogState = this.setModalDialogState.bind(this);
        this.showModalDialog = this.showModalDialog.bind(this);
        this.hideModalDialog = this.hideModalDialog.bind(this);
    }

    componentDidMount() {
        // Прокручиваем страницу в самое начало
        window.scrollTo(0, 0);

        this.getProfileInfo();
        this.getUsersPosts();
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

    clickShowFollowers() {
        let title = "Подписки";

        this.showModalDialog(title, this.followers, DataService.getFollowers.bind(DataService), this.state.profile.id);
    }

    clickShowFollowing() {
        let title = "Подписчики";

        this.showModalDialog(title, this.following, DataService.getFollowing.bind(DataService), this.state.profile.id);
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

    render() {
        const { location } = this.props;

        let currentUserId = sessionStorage.getItem(Constants.USER_ID_COOKIE_KEY);

        return (
            <React.Fragment>
                <Header externalClass="header-external" location={location.pathname} />
                <div className={styles.container}>
                    <div className={styles.userBlock}>
                        <Loader show={this.state.isLoading} externalClass={styles.loader} />
                        <ProfileUserInfo profile={this.state.profile} clickFollowers={this.clickShowFollowers} clickFollowing={this.clickShowFollowing}
                            style={{ display: this.state.isLoading ? "none" : "block" }} />
                    </div>
                    <div className={styles.tabs}>
                        <a className={`${styles.tabPosts} ${styles.active}`} onClick={(e) => this.clickTab(e, 1)}>Публикации ({this.state.profile.amountPosts})</a>
                        <a className={styles.tabMoviesWillWatch} onClick={(e) => this.clickTab(e, 2)}>В закладках ({this.state.profile.amountWillWatchMovies})</a>
                        <a className={styles.tabMoviesViewed} onClick={(e) => this.clickTab(e, 3)}>Просмотрено ({this.state.profile.amountViewedMovies})</a>
                        <span className={styles.tabBar}></span>
                    </div>
                    <div className={`${styles.postsContainer} ${styles.tabDataContainer}`} style={{ display: this.state.tabNumberActive === 1 ? "block" : "none" }}>
                        <NotPostsBanner username={this.state.profile.login} show={currentUserId !== this.state.profile.id && !this.state.feed.hasMore && this.state.feed.posts.length === 0} externalClass={styles.bannerExternal} />
                        <NotPostsInMyOwnProfileBanner show={currentUserId === this.state.profile.id && !this.state.feed.hasMore && this.state.feed.posts.length === 0} externalClass={styles.bannerExternal} />
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
                    <div className={`${styles.moviesWillWatchContainer} ${styles.tabDataContainer}`} style={{ display: this.state.tabNumberActive === 2 ? "block" : "none" }}>
                    </div>
                    <div className={`${styles.moviesWillWatchContainer} ${styles.tabDataContainer}`} style={{ display: this.state.tabNumberActive === 3 ? "block" : "none" }}>
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