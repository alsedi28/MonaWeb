import React from 'react';
import { Link } from 'react-router-dom';

import { getPosterPath } from '../../../helpers/imagePathHelper';

import styles from './movieCardMiniMovie.module.css';

const MovieCardMiniMovie = ({ movieId, movieTitle, posterPath, externalClass = "" }) => (
    <article className={`${styles.container} ${externalClass}`}>
        <Link to={`/movies/${movieId}`}>
            <div title={movieTitle}>
                <img src={getPosterPath(posterPath)} />
            </div>
        </Link>
    </article>
);

export default MovieCardMiniMovie;