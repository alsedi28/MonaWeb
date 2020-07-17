import React from 'react';

import { getReleaseYear } from '../../../../helpers/timeHelper';
import { getPosterPath } from '../../../../helpers/imagePathHelper';
import { getMovieRating } from '../../../../helpers/eventHelper';

import styles from './movieForEventItem.module.css';

const MovieForEventItem = ({ movie, onClick, externalClass = "" }) => {

    function handleOnClick() {
        onClick(movie);
    }

    let movieReleaseDate = getReleaseYear(movie.ReleaseDate);
    let blockMovieReleaseDate = "";
    if (movieReleaseDate !== null)
        blockMovieReleaseDate = <span>({movieReleaseDate})</span>;

    let blockProductionCountry = movie.ProductionCountry ? <p className={styles.productionCountry}>{movie.ProductionCountry}</p> : "";

    let movieRating = getMovieRating(movie);

    return (
        <div className={`${styles.container} ${externalClass}`} onClick={handleOnClick}>
            <div className={styles.posterBlock}>
                <div>
                    <img src={getPosterPath(movie.PosterPath)} className={styles.posterImage} />
                </div>
            </div>
            <div className={styles.infoBlock}>
                <p className={styles.title}>{movie.Title} {blockMovieReleaseDate}</p>
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

export default MovieForEventItem;
