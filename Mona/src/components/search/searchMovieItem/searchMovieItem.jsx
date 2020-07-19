import React from 'react';
import { Link } from 'react-router-dom';

import MoviePoster from '../../moviePoster/moviePoster';
import { getReleaseYear } from '../../../helpers/timeHelper';
import { getMovieRating } from '../../../helpers/eventHelper';

import styles from './searchMovieItem.module.css';

const SearchMovieItem = ({ movie, externalClass = "" }) => {
    let movieReleaseDate = getReleaseYear(movie.ReleaseDate);
    let blockMovieReleaseDate = "";
    if (movieReleaseDate !== null)
        blockMovieReleaseDate = <span>({movieReleaseDate})</span>;

    let blockProductionCountry = movie.ProductionCountry ? <p className={styles.productionCountry}>{movie.ProductionCountry}</p> : "";

    let movieRating = getMovieRating(movie);

    return (
        <div className={`${styles.container} ${externalClass}`}>
            <div className={styles.posterBlock}>
                <Link to={`/movies/${movie.MovieId}`}>
                    <MoviePoster imageUrl={movie.PosterPath} movieTitle={movie.Title} height={56} width={39} borderRadius={6}/>
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
