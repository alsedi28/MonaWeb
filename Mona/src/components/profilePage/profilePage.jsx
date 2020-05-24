import React from 'react';

import styles from './profilePage.module.css';

import InfiniteScroll from "react-infinite-scroll-component";
import PostsFeed from '../postsFeed/postsFeed';
import Post from '../post/post';
import Loader from '../loader/loader';
import ProfileUserInfo from '../profileUserInfo/profileUserInfo';
import Header from '../header/header';
import Footer from '../footer/footer';
import { DataService } from '../../dataService';

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
                amountWillWatchMovies: 0
            },
            feed: {
                posts: [],
                hasMore: false, // Флаг, который показывает есть ли еще посты для загрузки
                lastPostItemId: 0, // Id последнего Event, который загрузили
                isLoading: true // Флаг, который отвечает за отображение/скрытие loader'а при начальной инициализации ленты постов
            }
        };

        this.getProfileInfo = this.getProfileInfo.bind(this);
        this.getUsersPosts = this.getUsersPosts.bind(this);
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
                    amountWillWatchMovies: profile.AmountWillWatchMovies
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

    render() {
        const { location } = this.props;

        return (
            <React.Fragment>
                <Header externalClass="header-external" location={location.pathname} />
                <div className={styles.container}>
                    <div className={styles.userBlock}>
                        <Loader show={this.state.isLoading} externalClass={styles.loader} />
                        <ProfileUserInfo profile={this.state.profile} style={{ display: this.state.isLoading ? "none" : "block" }}/>
                    </div>
                    <p className={styles.postsTitle}>Публикации</p>
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
                <Footer externalClass="footer-external" />
            </React.Fragment>
        );
    }
}

export default ProfilePage;