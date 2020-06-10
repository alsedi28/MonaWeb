import React from 'react';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import PrivateRoute from './privateRoute';
import IntroRoute from './introRoute';
import LoginRoute from './loginRoute';
import SignUpRoute from './signUpRoute';
import PostsFeedPage from './postsFeedPage/postsFeedPage';
import ProfilePage from './profilePage/profilePage';
import FollowersPage from './followersPage/followersPage';
import MovieCardPage from './movieCardPage/movieCardPage';
import NotFoundPage from './notFoundPage/notFoundPage';
import Constants from '../constants';
import { DataService } from '../dataService';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: sessionStorage.getItem(Constants.TOKEN_COOKIE_KEY) ? true : false, // Если cookie с токеном есть, то считаем, что авторизован
            feed: {
                posts: [],
                hasMore: false, // Флаг, который показывает есть ли еще посты для загрузки
                lastPostItemId: 0, // Id последнего Event, который загрузили
                isLoading: true // Флаг, который отвечает за отображение/скрытие loader'а при начальной инициализации
            },
            feedPopular: {
                posts: [],
                hasMore: false, // Флаг, который показывает есть ли еще посты для загрузки
                lastPostItemId: 0, // Id последнего Event, который загрузили
                isLoading: true // Флаг, который отвечает за отображение/скрытие loader'а при начальной инициализации
            },
            showLoginError: false, // Показать ошибку на странице Login
            registrationError: null // Ошибка регистрации на странице SignUp
        };

        this.userHasAuthenticated = this.userHasAuthenticated.bind(this);
        this.setUserCookie = this.setUserCookie.bind(this);
        this.resetUserCookie = this.resetUserCookie.bind(this);
        this.showLoginError = this.showLoginError.bind(this);
        this.getPosts = this.getPosts.bind(this);
        this.getPopularPosts = this.getPopularPosts.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.signInClick = this.signInClick.bind(this);
        this.signUpClick = this.signUpClick.bind(this);
    }

    componentDidMount() {
        this.getPosts();
        this.getPopularPosts();
    }

    userHasAuthenticated(status) {
        this.setState({ isAuthenticated: status });
    }

    setUserCookie(token, userId, userAvatar) {
        sessionStorage.setItem(Constants.TOKEN_COOKIE_KEY, token);
        sessionStorage.setItem(Constants.USER_ID_COOKIE_KEY, userId);

        if (userAvatar)
            sessionStorage.setItem(Constants.USER_AVATAR_COOKIE_KEY, userAvatar);
    }

    resetUserCookie() {
        sessionStorage.removeItem(Constants.TOKEN_COOKIE_KEY);
        sessionStorage.removeItem(Constants.USER_ID_COOKIE_KEY);
        sessionStorage.removeItem(Constants.USER_AVATAR_COOKIE_KEY);
    }

    showLoginError(show) {
        this.setState({ showLoginError: show });
    }

    login(login, password, isFromRegistration = false) {
        let successCallback = (response) => {
            this.userHasAuthenticated(true);
            this.setUserCookie(response.access_token, response.userId, response.userAvatar);

            this.showLoginError(false);

            this.props.history.push("/feed");
            this.getPosts();
            this.getPopularPosts();
        };

        let failedCallback = (error) => {
            if (isFromRegistration) {
                this.setState({ registrationError: error });
            } else {
                this.showLoginError(true);
            }
        }

        DataService.login(login, password, successCallback, failedCallback);
    }

    register(email, nickname, name, password) {
        let successCallback = (response) => {
            this.login(nickname, password, true);
        };

        let failedCallback = (error) => {
            this.setState({ registrationError: error });
        };

        DataService.register(email, nickname, name, password, successCallback, failedCallback);
    }

    getPopularPosts() {
        // Если не авторизован, то перенаправляем на страницу Login
        if (!this.state.isAuthenticated) {
            this.props.history.push("/intro");
            return;
        }

        let callback = (items) => {
            if (items.length === 0) {
                this.setState({
                    ...this.state,
                    feedPopular: {
                        ...this.state.feedPopular,
                        hasMore: false,
                        isLoading: false
                    }
                });
                return;
            }

            this.setState({
                ...this.state,
                feedPopular: {
                    lastPostItemId: items[items.length - 1].EventId,
                    posts: this.state.feedPopular.posts.concat(items),
                    hasMore: true,
                    isLoading: false
                }
            });
        };

        DataService.getPopularPosts(this.state.feedPopular.lastPostItemId, callback);
    }

    getPosts() {
        // Если не авторизован, то перенаправляем на страницу Login
        if (!this.state.isAuthenticated) {
            this.props.history.push("/login");
            return;
        }

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

        DataService.getPosts(this.state.feed.lastPostItemId, callback);
    }

    signInClick() {
        this.props.history.push("/login");
    }

    signUpClick() {
        this.props.history.push("/register");
    }

    render() {
        const { history } = this.props;

        return (
            <React.Fragment>
                <Switch>
                    <Redirect exact from='/' to='/feed' />
                    <IntroRoute path='/intro' history={history} signInClick={this.signInClick} signUpClick={this.signUpClick}  />
                    <LoginRoute path='/login' history={history} component={PostsFeedPage} isAuthenticated={this.state.isAuthenticated} login={this.login} showError={this.state.showLoginError} signUpClick={this.signUpClick}
                        componentProps={{ feed: this.state.feed, feedPopular: this.state.feedPopular, getPosts: this.getPosts, getPopularPosts: this.getPopularPosts }} />
                    <SignUpRoute path='/register' history={history} component={PostsFeedPage} isAuthenticated={this.state.isAuthenticated} register={this.register} signInClick={this.signInClick} registrationError={this.state.registrationError}
                        componentProps={{ feed: this.state.feed, feedPopular: this.state.feedPopular, getPosts: this.getPosts, getPopularPosts: this.getPopularPosts }} />
                    <PrivateRoute path='/feed' history={history} component={PostsFeedPage} isAuthenticated={this.state.isAuthenticated}
                        componentProps={{ feed: this.state.feed, feedPopular: this.state.feedPopular, getPosts: this.getPosts, getPopularPosts: this.getPopularPosts}} />
                    <PrivateRoute exact path='/profile/:userId' history={history} component={ProfilePage} isAuthenticated={this.state.isAuthenticated} />
                    <PrivateRoute exact path='/profile/:userId/followers' history={history} component={FollowersPage} isAuthenticated={this.state.isAuthenticated} />
                    <PrivateRoute exact path='/profile/:userId/following' history={history} component={FollowersPage} isAuthenticated={this.state.isAuthenticated} />
                    <PrivateRoute exact path='/movies/:movieId' history={history} component={MovieCardPage} isAuthenticated={this.state.isAuthenticated} />
                    <Route history={history} render={(props) => <NotFoundPage {...props}/>} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default withRouter(App);
