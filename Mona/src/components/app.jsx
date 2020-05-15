import React from 'react';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import PrivateRoute from './privateRoute';
import LoginRoute from './loginRoute';
import Header from './header/header';
import Footer from './footer/footer';
import PostsFeedPage from './postsFeedPage/postsFeedPage';
import NotFoundPage from './notFoundPage/notFoundPage';
import LoginPage from './loginPage/loginPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.tokenCookieKey = "tokenInfo";

        this.state = {
            hasAuthorization: sessionStorage.getItem(this.tokenCookieKey) ? true : false, // ≈сли cookie с токеном есть, то считаем, что авторизован
            feed: {
                posts: [],
                hasMore: false, // ‘лаг, который показывает есть ли еще посты дл€ загрузки
                lastPostItemId: 0, // Id последнего Event, который загрузили
                isLoading: true // ‘лаг, который отвечает за отображение/скрытие loader'а при начальной инициализации
            }
        };

        this.userHasAuthorization = this.userHasAuthorization.bind(this);
        this.getPosts = this.getPosts.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        this.getPosts();
    }

    userHasAuthorization(status) {
        this.setState({ hasAuthorization: status });
    }

    login(login, password) {
        let url = "http://monamobileapp.ru/MovieMe/token";

        let body = `username=${encodeURIComponent(login)}&password=${encodeURIComponent(password)}&grant_type=password`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        })
            .then(response => response.json())
            .then(response => {
                this.userHasAuthorization(true);
                sessionStorage.setItem(this.tokenCookieKey, response.access_token);
                this.props.history.push("/feed");
                this.getPosts();
            });
    }

    getPosts() {
        // ≈сли не авторизован, то перенаправл€ем на страницу Login
        if (!this.state.hasAuthorization) {
            this.props.history.push("/login");
            return;
        }

        let url = "http://monamobileapp.ru/MovieMe/api/v2/users/eventfeed?start=" + this.state.feed.lastPostItemId;

        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem(this.tokenCookieKey),
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok)
                    return response.json();

                if (response.status === 401) {
                    this.userHasAuthorization(false);
                    sessionStorage.removeItem(this.tokenCookieKey);
                    this.props.history.push("/login");

                    return Promise.reject();
                }

                return Promise.reject(new Error("ѕроизошла ошибка при загрузке данных."));
            })
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
            .catch(function (error) {
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
                    <LoginRoute path='/login' history={history} component={PostsFeedPage} hasAuthorization={this.state.hasAuthorization} login={this.login}
                        componentProps={{ isLoading: this.state.feed.isLoading, posts: this.state.feed.posts, hasMorePosts: this.state.feed.hasMore, getPosts: this.getPosts }} />
                    <PrivateRoute path='/feed' history={history} component={PostsFeedPage} hasAuthorization={this.state.hasAuthorization}
                        componentProps={{ isLoading: this.state.feed.isLoading, posts: this.state.feed.posts, hasMorePosts: this.state.feed.hasMore, getPosts: this.getPosts }} />
                    <Route history={history} component={NotFoundPage} />
                </Switch>
                <Footer externalClass="footer-external"/>
            </React.Fragment>
        );
    }
}

export default withRouter(App);