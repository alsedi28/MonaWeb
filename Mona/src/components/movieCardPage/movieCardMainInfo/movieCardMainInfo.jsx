import React from 'react';

import MovieCardRating from '../movieCardRating/movieCardRating';
import MovieCardUserRating from '../movieCardUserRating/movieCardUserRating';
import MovieCardUsersGroup from '../movieCardUsersGroup/movieCardUsersGroup';
import MovieStatusButtons from '../../createEvent/movieStatusButtons/movieStatusButtons';
import { getReleaseYear, getHumanRuntime } from '../../../helpers/timeHelper';
import { getPosterPath, getBackdropUrl } from '../../../helpers/imagePathHelper';
import { getMovieInfoFromMovie } from '../../../helpers/movieInfoHelper';
import Constants from '../../../constants';

import styles from './movieCardMainInfo.module.css';

const MovieCardMainInfo = ({ movie, clickUsersWhoWillWatchMovie, clickUsersWhoViewedMovie, requestOnUpdateData, externalClass = "" }) => {
    let backdrop = movie.Backdrops && movie.Backdrops.length > 0 ? movie.Backdrops[0] : null;

    let infoJoinPointBlock =
        [getReleaseYear(movie.ReleaseDate), getHumanRuntime(movie.Runtime), movie.ProductionCountry].filter(i => i !== null).join(" • ");

    let userRatingOrUsersWillWatchBlock = "";
    if (movie.StatusOfMovieForUser === Constants.MOVIE_STATUS_VIEWED)
        userRatingOrUsersWillWatchBlock = <MovieCardUserRating rating={movie.Raiting} externalClass={styles.movieCardUserRatingExternal} />;
    else
        userRatingOrUsersWillWatchBlock = <MovieCardUsersGroup users={movie.PeopleWillWatchMovie.Peoples} totalNumberUsers={movie.PeopleWillWatchMovie.AmountPeople} click={() => clickUsersWhoWillWatchMovie(movie.MovieId)} label="будут смотреть" />;

    return (
        <div className={`${styles.container} ${externalClass}`} style={{ background: `${getBackdropUrl(backdrop)}` }}>
            <div>
                <div className={styles.centerContainer}>
                    <div className={styles.posterBlock}>
                        <div>
                            <img src={getPosterPath(movie.PosterPath)} className={styles.posterImage} height="400px" />
                        </div>
                    </div>
                    <div className={styles.infoBlock}>
                        <p className={styles.title}>{movie.Title}</p>
                        <p className={styles.infoJoinPoint}>{infoJoinPointBlock}</p>
                        <div className={styles.ratingAndUsersBlock}>
                            <MovieCardRating movie={movie} />
                            {userRatingOrUsersWillWatchBlock}
                            <MovieCardUsersGroup users={movie.PeopleViewedMovie.Peoples} totalNumberUsers={movie.PeopleViewedMovie.AmountPeople} click={() => clickUsersWhoViewedMovie(movie.MovieId)} label="посмотрели" />
                        </div>
                        <MovieStatusButtons status={movie.StatusOfMovieForUser} movieInfo={getMovieInfoFromMovie(movie)} handlerExternal={requestOnUpdateData} externalClass={styles.postWatchStatusButtonsExternal} />
                        <p className={styles.overviewTitle} style={{ display: movie.Overview ? "block" : "none" }}>Описание</p>
                        <p className={styles.overview}>{movie.Overview}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCardMainInfo;
