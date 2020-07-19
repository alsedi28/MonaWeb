import React from 'react';

import styles from './movieEventHeader.module.css';

import MovieEventHeaderButtons from './movieEventHeaderButtons/movieEventHeaderButtons';
import Constants from '../../../Constants';
import { getPosterPath } from '../../../helpers/imagePathHelper';

function MovieEventHeader(props) {

    let height = "120px";
    let buttonsBlock = "";
    if (props.selectedEventType != null) {
        buttonsBlock = <MovieEventHeaderButtons
            selectedEventType={props.selectedEventType}
            onEventTypeClick={props.onEventTypeClick}
        />;
        height = "136px";
    }

    let spanValue = (props.movieInfo.year != null && props.movieInfo.year.length > 0) ? `(${props.movieInfo.year})` : ""
    let ratingValue = props.movieInfo.rating != null ? `Рейтинг: ${props.movieInfo.rating}` : ""

    return (
        <header className={styles.movieInfo} style={{ height: height }}>

            <div className={styles.poster}>
                <img
                    src={getPosterPath(props.movieInfo.posterPath)}
                    className={styles.posterImage}
                />
            </div>

            <div className={styles.movieTitles}>
                <p className={styles.title}>{props.movieInfo.title} <span>{spanValue}</span></p>
                <p className={styles.subtitle}>{ratingValue}</p>

                {buttonsBlock}
            </div>

        </header>
    );
}

export default MovieEventHeader;
