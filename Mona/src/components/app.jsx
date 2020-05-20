import React from 'react';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import PrivateRoute from './privateRoute';
import LoginRoute from './loginRoute';
import Header from './header/header';
import Footer from './footer/footer';
import PostsFeedPage from './postsFeedPage/postsFeedPage';
import NotFoundPage from './notFoundPage/notFoundPage';
import Constants from '../constants';

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
            showLoginError: false // Показать ошибку на странице Login
        };

        this.userHasAuthenticated = this.userHasAuthenticated.bind(this);
        this.showLoginError = this.showLoginError.bind(this);
        this.getPosts = this.getPosts.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        this.getPosts();
    }

    userHasAuthenticated(status) {
        this.setState({ isAuthenticated: status });
    }

    showLoginError(show) {
        this.setState({ showLoginError: show });
    }

    login(login, password) {
        let url = `${Constants.DOMAIN}/token`;

        let body = `username=${encodeURIComponent(login)}&password=${encodeURIComponent(password)}&grant_type=password`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        })
            .then(response => {
                if (response.ok)
                    return Promise.resolve(response);

                return Promise.reject();
            })
            .then(response => response.json())
            .then(response => {
                this.userHasAuthenticated(true);
                sessionStorage.setItem(Constants.TOKEN_COOKIE_KEY, response.access_token);

                this.showLoginError(false);

                this.props.history.push("/feed");
                this.getPosts();
            })
            .catch(() => this.showLoginError(true));
    }

    getPosts() {
        // Если не авторизован, то перенаправляем на страницу Login
        if (!this.state.isAuthenticated) {
            this.props.history.push("/login");
            return;
        }

        let url = `${Constants.DOMAIN}/api/v2/users/eventfeed?start=${this.state.feed.lastPostItemId}`;

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

                if (response.status === 401) {
                    this.userHasAuthenticated(false);
                    sessionStorage.removeItem(Constants.TOKEN_COOKIE_KEY);
                    this.props.history.push("/login");

                    return Promise.reject();
                }

                return Promise.reject(new Error("Произошла ошибка при загрузке данных."));
            })
            .then(response => response.json())
            .then(items => {
                if (items.length === 0) {
                    this.setState({
                        feed: {
                            ...this.state.feed,
                            hasMore: false,
                            isLoading: false
                        }
                    });
                    return;
                }

                this.setState({
                    feed: {
                        lastPostItemId: items[items.length - 1].EventId,
                        posts: this.state.feed.posts.concat(items),
                        hasMore: true,
                        isLoading: false
                    }
                });
            })
            .catch((error) => {
                if (error)
                    alert(error);
            });
    }

    render() {
        const { history } = this.props;

        return (
            <React.Fragment>
                <Header externalClass="header-external" />
                <Switch>
                    <Redirect exact from='/' to='/feed' />
                    <LoginRoute path='/login' history={history} component={PostsFeedPage} isAuthenticated={this.state.isAuthenticated} login={this.login} showError={this.state.showLoginError}
                        componentProps={{ isLoading: this.state.feed.isLoading, posts: this.state.feed.posts, hasMorePosts: this.state.feed.hasMore, getPosts: this.getPosts }} />
                    <PrivateRoute path='/feed' history={history} component={PostsFeedPage} isAuthenticated={this.state.isAuthenticated}
                        componentProps={{ isLoading: this.state.feed.isLoading, posts: this.state.feed.posts, hasMorePosts: this.state.feed.hasMore, getPosts: this.getPosts }} />
                    <Route history={history} component={NotFoundPage} />
                </Switch>
                <Footer externalClass="footer-external"/>
            </React.Fragment>
        );
    }
}

export default withRouter(App);