import React from 'react';

import MoviePoster from '../../moviePoster/moviePoster';

import styles from './movieEventHeader.module.css';

function MovieEventHeader(props) {
    return (
        <header className={styles.movieInfo}>
            <MoviePoster imageUrl={props.movieInfo.posterPath} movieTitle={props.movieInfo.title} height={64} width={45} borderRadius={6} externalClass={styles.posterExternal} />

            <div className={styles.movieTitles}>
                <p className={styles.title}>{props.movieInfo.title} <span>({props.movieInfo.year})</span></p>
                <p className={styles.subtitle}>Рейтинг: {props.movieInfo.rating}</p>
            </div>

        </header>
    );
}

export default MovieEventHeader;
