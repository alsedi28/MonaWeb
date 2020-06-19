import React from 'react';
import { Link } from 'react-router-dom';

import { getReleaseYear } from '../../../helpers/timeHelper';
import { getPosterPath } from '../../../helpers/imagePathHelper';

import styles from './searchMovieItem.module.css';

const SearchMovieItem = ({ movie, externalClass = "" }) => {
    let movieReleaseDate = getReleaseYear(movie.ReleaseDate);
    let blockMovieReleaseDate = "";
    if (movieReleaseDate !== null)
        blockMovieReleaseDate = <span>({movieReleaseDate})</span>;

    let blockProductionCountry = movie.ProductionCountry ? <p className={styles.productionCountry}>{movie.ProductionCountry}</p> : "";

    let movieRating = movie.ImdbRaiting === null ? movie.VoteAverage : movie.ImdbRaiting;

    return (
        <div className={`${styles.container} ${externalClass}`}>
            <div className={styles.posterBlock}>
                <Link to={`/movies/${movie.MovieId}`}>
                    <div>
                        <img src={getPosterPath(movie.PosterPath)} className={styles.posterImage} />
                    </div>
                </Link>
            </div>
            <div className={styles.infoBlock}>
                <p className={styles.title}><Link to={`/movies/${movie.MovieId}`}>{movie.Title}</Link> {blockMovieReleaseDate}</p>
                {blockProductionCountry}
            </div>
            <div>
                <div className={styles.rating}>
                    {movieRating}
                </div>
            </div>
        </div>
    );
};

export default SearchMovieItem;