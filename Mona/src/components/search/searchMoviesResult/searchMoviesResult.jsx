import React from 'react';

import styles from './searchMoviesResult.module.css';

import MovieListItem from '../../movieListItem/movieListItem';
import Loader from '../../loader/loader';

const SearchMoviesResult = ({ movies, isLoading, externalClass = "" }) => {

    return (
        <div className={`${styles.container} ${externalClass}`}>
            <Loader show={isLoading} />
            {movies.map(movie =>
                <MovieListItem movie={movie} statusOfMovieForUser={movie.StatusOfMovieForUser} externalClass={styles.profileMovieItemExternal}/>)}
        </div>
    );
};

export default SearchMoviesResult;