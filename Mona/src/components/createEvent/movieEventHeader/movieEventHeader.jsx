import React from 'react';

import styles from './movieEventHeader.module.css';

import { getPosterPath } from '../../../helpers/imagePathHelper';

function MovieEventHeader(props) {
    return (
        <header className={styles.movieInfo}>

            <div className={styles.poster}>
                <img
                    src={getPosterPath(props.movieInfo.posterPath)}
                    className={styles.posterImage}
                />
            </div>

            <div className={styles.movieTitles}>
                <p className={styles.title}>{props.movieInfo.title} <span>({props.movieInfo.year})</span></p>
                <p className={styles.subtitle}>Рейтинг: {props.movieInfo.rating}</p>
            </div>

        </header>
    );
}

export default MovieEventHeader;
