import React from 'react';

import styles from './movieEventHeader.module.css';

import MoviePoster from '../../moviePoster/moviePoster';
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

            <MoviePoster imageUrl={props.movieInfo.posterPath} movieTitle={props.movieInfo.title} height={64} width={45} borderRadius={6} externalClass={styles.posterExternal} />

            <div className={styles.movieTitles}>
                <p className={styles.title}>{props.movieInfo.title} <span>{spanValue}</span></p>
                <p className={styles.subtitle}>{ratingValue}</p>

                {buttonsBlock}
            </div>

        </header>
    );
}

export default MovieEventHeader;
