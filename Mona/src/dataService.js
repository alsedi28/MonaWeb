import { useHistory } from "react-router-dom";
import moment from 'moment';

import Constants from './constants';
import { resetUserCookie, getUserToken } from './helpers/cookieHelper';

export class DataService {

    static getPosts(lastPostItemId, callback) {
        let url = `${Constants.DOMAIN}/api/v2/users/eventfeed?start=${lastPostItemId}`;

        this._get(url, callback);
    }

    static getPopularPosts(lastPostItemId, callback) {
        let url = `${Constants.DOMAIN}/api/users/eventfeedpopular?start=${lastPostItemId}`;

        this._get(url, callback);
    }

    static getProfileInfo(userId, callback) {
        let url = `${Constants.DOMAIN}/api/v2/users/${userId}`;

        this._get(url, callback);
    }

    static getUsersPosts(userId, lastPostItemId, callback) {
        let url = `${Constants.DOMAIN}/api/users/${userId}/eventfeed?start=${lastPostItemId}`;

        this._get(url, callback);
    }

    static getUsersWhoLikesPost(eventId, movieId, callback) {
        let url = `${Constants.DOMAIN}/api/movies/${movieId}/events/${eventId}/likes`;

        this._get(url, callback);
    }

    static getUsersWhoWillWatchMovie(movieId, callback) {
        let url = `${Constants.DOMAIN}/api/movies/${movieId}/willwatch`;

        this._get(url, callback);
    }

    static getUsersWhoViewedMovie(movieId, callback) {
        let url = `${Constants.DOMAIN}/api/movies/${movieId}/viewed`;

        this._get(url, callback);
    }

    static getPost(eventId, movieId, callback) {
        let url = `${Constants.DOMAIN}/api/v2/movies/${movieId}/events/${eventId}`;

        this._get(url, callback);
    }

    static getFollowers(userId, callback) {
        let url = `${Constants.DOMAIN}/api/users/${userId}/followers`;

        this._get(url, callback);
    }

    static getFollowing(userId, callback) {
        let url = `${Constants.DOMAIN}/api/users/${userId}/following`;

        this._get(url, callback);
    }

    static searchFollowers(userId, name, callback) {
        let url = `${Constants.DOMAIN}/api/users/${userId}/followers?name=${name}`;

        this._get(url, callback);
    }

    static searchFollowing(userId, name, callback) {
        let url = `${Constants.DOMAIN}/api/users/${userId}/following?name=${name}`;

        this._get(url, callback);
    }

    static getWillWatchMovies(userId, pageNumber, sortType, callback) {
        let url = `${Constants.DOMAIN}/api/users/${userId}/willwatchmovies?page=${pageNumber}&sortedBy=${sortType}`;

        this._get(url, callback);
    }

    static searchUsers(name, callback) {
        let url = `${Constants.DOMAIN}/api/users?name=${name}`;

        this._get(url, callback);
    }

    static searchMovies(title, callback) {
        let url = `${Constants.DOMAIN}/api/movies?title=${title}`;

        this._get(url, callback);
    }

    static search(text, quantity, callback) {
        let url = `${Constants.DOMAIN}/api/search?text=${text}&quantity=${quantity}`;

        this._get(url, callback);
    }

    static getViewedMovies(userId, pageNumber, sortType, callback) {
        let url = `${Constants.DOMAIN}/api/users/${userId}/viewedmovies?page=${pageNumber}&sortedBy=${sortType}`;

        this._get(url, callback);
    }

    static getPostComments(eventId, movieId, callback) {
        let url = `${Constants.DOMAIN}/api/movies/${movieId}/events/${eventId}/comments`;

        this._get(url, callback);
    }

    static getMovie(movieId, callback) {
        let url = `${Constants.DOMAIN}/api/movies/${movieId}`;

        this._get(url, callback);
    }

    static getMoviesComments(movieId, page, date, callback) {
        let paramDate = moment(date).format('YYYY-MM-DDTHH:mm:ss');
        let url = `${Constants.DOMAIN}/api/movies/${movieId}/comments?page=${page}&date=${paramDate}`;

        this._get(url, callback);
    }

    static addLikeToPost(eventId, movieId, callback) {
        let url = `${Constants.DOMAIN}/api/movies/${movieId}/events/${eventId}/likes`;

        this._post(url, callback);
    }

    static deleteLikeFromPost(eventId, movieId, callback) {
        let url = `${Constants.DOMAIN}/api/movies/${movieId}/events/${eventId}/likes`;

        this._delete(url, callback);
    }

    static addLikeToComment(eventId, movieId, commentId, callback) {
        let url = `${Constants.DOMAIN}/api/movies/${movieId}/events/${eventId}/comments/${commentId}/likes`;

        this._post(url, callback);
    }

    static deleteLikeFromComment(eventId, movieId, commentId, callback) {
        let url = `${Constants.DOMAIN}/api/movies/${movieId}/events/${eventId}/comments/${commentId}/likes`;

        this._delete(url, callback);
    }

    static addFollowing(userId, callback) {
        let url = `${Constants.DOMAIN}/api/user/following`;
        let request = { UserId: userId };

        this._post(url, callback, request);
    }

    static deleteFollowing(userId, callback) {
        let url = `${Constants.DOMAIN}/api/user/following`;
        let request = { UserId: userId };

        this._delete(url, callback, request);
    }

    static addCommentToEvent(eventId, movieId, comment, callback) {
        let url = `${Constants.DOMAIN}/api/movies/${movieId}/events/${eventId}/comments`;
        let request = { Comment: comment };

        this._post(url, callback, request);
    }

    static addMovieToWillWatch(movieId, callback) {
        let url = `${Constants.DOMAIN}/api/user/willwatchmovies`;
        let request = { MovieId: movieId };

        this._post(url, callback, request);
    }

    static deleteMovieFromWillWatch(movieId, callback) {
        let url = `${Constants.DOMAIN}/api/user/willwatchmovies/${movieId}`;

        this._delete(url, callback);
    }

    static addMovieToViewed(movieId, rating, callback) {
        let url = `${Constants.DOMAIN}/api/user/viewedmovies`;
        let request = {
            MovieId: movieId,
            Raiting: rating
        };

        this._post(url, callback, request);
    }

    static deleteMovieFromViewed(movieId, callback) {
        let url = `${Constants.DOMAIN}/api/user/viewedmovies/${movieId}`;

        this._delete(url, callback);
    }

    static createEvent(movieId, comment, rating, eventType, tags, callback) {
        let url = `${Constants.DOMAIN}/api/movies/${movieId}/events`;
        let request = {
            Comment: comment,
            Raiting: rating,
            Type: eventType,
            Tags: tags
        };

        this._post(url, callback, request);
    }

    static getMovieTags(callback) {
        let url = `${Constants.DOMAIN}/api/infodata/tags`;

        this._get(url, callback, true);
    }

    static login(login, password, successCallback, failedCallback) {
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
            .then(response => successCallback(response))
            .catch((error) => failedCallback(error));
    }

    static register(email, login, name, password, successCallback, failedCallback) {
        let url = `${Constants.DOMAIN}/api/account/register`;
        let request = { Name: name, Login: login, Password: password, Email: email, Language: 'ru' };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
            .then(response => {
                if (response.ok)
                    return Promise.resolve(response);

                return Promise.reject();
            })
            .then(response => successCallback(response))
            .catch((error) => failedCallback(error));
    }

    static _get(url, callback, withCache = false) {
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + getUserToken(),
                'Content-Type': 'application/json'
            },
            cache: withCache ? 'force-cache' : 'default'
        })
            .then(response => {
                if (response.ok)
                    return Promise.resolve(response);

                if (response.status === 401) {
                    resetUserCookie()

                    let history = useHistory();
                    history.push("/login");

                    return Promise.reject();
                }

                return Promise.reject(new Error());
            })
            .then(response => response.json())
            .then(response => callback(response))
            .catch((error) => {
                if (error)
                    alert("Произошла ошибка при загрузке данных.");
            });
    }

    static _post(url, callback, request = null) {
        fetch(url, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + getUserToken(),
                'Content-Type': 'application/json'
            },
            body: request ? JSON.stringify(request) : null
        })
            .then(_ => callback());
    }

    static _delete(url, callback, request = null) {
        fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + getUserToken(),
                'Content-Type': 'application/json'
            },
            body: request ? JSON.stringify(request) : null
        })
            .then(_ => callback());
    }
}
