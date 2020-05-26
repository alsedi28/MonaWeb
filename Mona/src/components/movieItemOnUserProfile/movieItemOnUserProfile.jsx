import React from 'react';

import styles from './movieItemOnUserProfile.module.css';

import bookMarkIcon from '../../../public/icons/bookMark.png';
import bookMarkMiniIcon from '../../../public/icons/bookMarkMini.png';
import viewIcon from '../../../public/icons/view.png';
import framePlaceholder from '../../../public/icons/framePlaceholder.png';

const MovieItemOnUserProfile = ({ movie, isViewed, externalClass = "" }) => {
    let blockProductionCountry = movie.ProductionCountry ? <p className={styles.productionCountries}>{movie.ProductionCountry}</p> : "";
    let movieRaiting = movie.ImdbRaiting === null ? movie.VoteAverage : movie.ImdbRaiting;

    let movieReleaseDate = movie.ReleaseDate !== null ? new Date(Date.parse(movie.ReleaseDate)) : null;
    let blockMovieReleaseDate = "";
    if (movieReleaseDate !== null)
        blockMovieReleaseDate = <span>({movieReleaseDate.getFullYear()})</span>;

    let blockUserRaiting = "";
    if (isViewed)
        blockUserRaiting = <p className={styles.userRaiting}>Оценка: <span>{movie.UserRaiting}</span></p>;

    return (
        <article className={`${styles.container} ${externalClass}`}>
            <div className={styles.posterContainer}>
                <div>
                    <img src={movie.PosterPath ? `https://image.tmdb.org/t/p/w342${movie.PosterPath}` : framePlaceholder} width="168px" />
                    <img src={bookMarkIcon} width="34px" style={{ display: isViewed ? "none" : "block" }}/>
                </div>
            </div>
            <div className={styles.infoContainer}>
                <p className={styles.movieTitle}>{movie.Title} {blockMovieReleaseDate}</p>
                {blockProductionCountry}
                {blockUserRaiting}
                <p className={styles.movieRaiting}>Рейтинг: <span>{movieRaiting}</span></p>
                <div className={styles.counterContainer}>
                    <img src={bookMarkMiniIcon} width="18px" />
                    <p>{movie.AmountUsersWhoWillWatchMovie}</p>
                </div>
                <div className={styles.counterContainer}>
                    <img src={viewIcon} className={styles.viewIcon} width="18px" />
                    <p>{movie.AmountUsersWhoViewedMovie}</p>
                </div>
            </div>
        </article>
    );
};

export default MovieItemOnUserProfile;