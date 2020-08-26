import React from 'react';

import styles from './movieEventHeaderButtons.module.css';

import Constants from '../../../../Constants';

function MovieEventHeaderButtons(props) {

    function handleOnClickWillWatch() {
        props.onEventTypeClick(Constants.MOVIE_WILL_WATCH_EVENT_TYPE);
    }

    function handleOnClickAlreadyWatch() {
        props.onEventTypeClick(Constants.MOVIE_WATCHED_EVENT_TYPE);
    }

    let willWatchStyle = "";
    let alreadyWatchedStyle = "";

    if (props.selectedEventType != null) {
        switch(props.selectedEventType) {
            case Constants.MOVIE_WATCHED_EVENT_TYPE:
                willWatchStyle = styles.movieStatusDeselected;
                alreadyWatchedStyle = styles.movieStatusSelected;
                break;
            case Constants.MOVIE_WILL_WATCH_EVENT_TYPE:
                willWatchStyle = styles.movieStatusSelected;
                alreadyWatchedStyle = styles.movieStatusDeselected;
                break;
            default:
                break;
        }
    }

    return (
        <div className={styles.movieStatuses}>
            <div className={`${styles.movieStatus} ${willWatchStyle}`} onClick={handleOnClickWillWatch}>
                <p>Буду смотреть</p>
            </div>
            <div className={`${styles.movieStatus} ${alreadyWatchedStyle}`} onClick={handleOnClickAlreadyWatch}>
                <p>Уже смотрел</p>
            </div>
        </div>
    );
}

export default MovieEventHeaderButtons;
