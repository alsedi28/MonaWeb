import React from 'react';
import { Link } from 'react-router-dom';

import MoviePoster from '../../moviePoster/moviePoster';

import styles from './movieCardMiniMovie.module.css';

const MovieCardMiniMovie = ({ movieId, movieTitle, posterPath, externalClass = "" }) => (
    <article className={`${styles.container} ${externalClass}`}>
        <Link to={`/movies/${movieId}`}>
            <MoviePoster imageUrl={posterPath} movieTitle={movieTitle} height={244} width={174} borderRadius={16} externalClass={styles.posterExternal} />
        </Link>
    </article>
);

export default MovieCardMiniMovie;