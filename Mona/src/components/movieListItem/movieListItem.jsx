import React from 'react';
import { Link } from 'react-router-dom';

import ModalDialog from '../modalDialog/modalDialog';
import MoviePoster from '../moviePoster/moviePoster';
import { getMovieRating } from '../../helpers/eventHelper';
import { DataService } from '../../dataService';
import Constants from '../../constants';

import styles from './movieListItem.module.css';

import bookMarkIcon from '../../../public/icons/bookMark.png';
import bookMarkMiniIcon from '../../../public/icons/bookMarkMini.png';
import viewIcon from '../../../public/icons/view.png';


class MovieListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalDialog: { // Состояние объекта модального окна для текущего фильма
                show: false, // Показывать или нет модальное окно
                isLoading: false, // Отображать Loader в модальном окне или нет
                title: "", // Заголовок модального окна
                items: [] // Данные, которые необходимо отобразить в модальном окне
            }
        };

        this.clickShowUsersWhoViewedMovie = this.clickShowUsersWhoViewedMovie.bind(this);
        this.clickShowUsersWhoWillWatchMovie = this.clickShowUsersWhoWillWatchMovie.bind(this);
        this.setModalDialogState = this.setModalDialogState.bind(this);
        this.showModalDialog = this.showModalDialog.bind(this);
        this.hideModalDialog = this.hideModalDialog.bind(this);
    }

    clickShowUsersWhoWillWatchMovie(movieId) {
        const title = "Будут смотреть";

        this.showModalDialog(title, DataService.getUsersWhoWillWatchMovie.bind(DataService), movieId);
    }

    clickShowUsersWhoViewedMovie(movieId) {
        const title = "Уже смотрели";

        this.showModalDialog(title, DataService.getUsersWhoViewedMovie.bind(DataService), movieId);
    }

    showModalDialog(title, getter, ...args) {
        this.setModalDialogState(true, true, title, []);

        const callback = (response) => {
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

    render() {
        const { movie, statusOfMovieForUser, externalClass = "", handlerExternal = () => ({}) } = this.props;

        const blockProductionCountry = movie.ProductionCountry ? <p className={styles.productionCountries}>{movie.ProductionCountry}</p> : "";
        const movieRaiting = getMovieRating(movie);

        const movieReleaseDate = movie.ReleaseDate !== null ? new Date(Date.parse(movie.ReleaseDate)) : null;
        let blockMovieReleaseDate = "";
        if (movieReleaseDate !== null)
            blockMovieReleaseDate = <span>({movieReleaseDate.getFullYear()})</span>;

        let blockUserRaiting = "";
        if (statusOfMovieForUser === Constants.MOVIE_STATUS_VIEWED)
            blockUserRaiting = <p className={styles.userRaiting}>Оценка: <span>{movie.UserRaiting}</span></p>;

        return (
            <article className={`${styles.container} ${externalClass}`}>
                <div className={styles.posterContainer}>
                    <Link to={`/movies/${movie.MovieId}`}>
                        <div>
                            <MoviePoster imageUrl={movie.PosterPath} movieTitle={movie.Title} height={252} width={168} borderRadius={8}/>
                            <img src={bookMarkIcon} width="34px" style={{ display: statusOfMovieForUser === Constants.MOVIE_STATUS_WILL_WATCH ? "block" : "none" }} />
                        </div>
                    </Link>
                </div>
                <div className={styles.infoContainer}>
                    <p className={styles.movieTitle}><Link to={`/movies/${movie.MovieId}`}>{movie.Title}</Link> {blockMovieReleaseDate}</p>
                    {blockProductionCountry}
                    {blockUserRaiting}
                    <p className={styles.movieRaiting}>Рейтинг: <span>{movieRaiting}</span></p>
                    <div className={styles.counterContainer} onClick={movie.AmountUsersWhoWillWatchMovie > 0 ? this.clickShowUsersWhoWillWatchMovie.bind(this, movie.MovieId) : () => ({})}>
                        <img src={bookMarkMiniIcon} width="18px" />
                        <p>{movie.AmountUsersWhoWillWatchMovie}</p>
                    </div>
                    <div className={`${styles.counterContainer} ${styles.counterContainerRight}`} onClick={movie.AmountUsersWhoViewedMovie > 0 ? this.clickShowUsersWhoViewedMovie.bind(this, movie.MovieId) : () => ({})}>
                        <img src={viewIcon} className={styles.viewIcon} width="18px" />
                        <p>{movie.AmountUsersWhoViewedMovie}</p>
                    </div>
                </div>

                <ModalDialog
                    show={this.state.modalDialog.show}
                    title={this.state.modalDialog.title}
                    isLoading={this.state.modalDialog.isLoading}
                    items={this.state.modalDialog.items}
                    clickClose={this.hideModalDialog}
                    handlerExternal={handlerExternal}
                />
            </article>
        );
    }
}

export default MovieListItem;
