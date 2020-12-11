import React from 'react';

import Constants from '../../../../constants';
import CreateEventButton from '../../../buttons/createEventButton/createEventButton';
import EventCommentField from '../../eventCommentField/eventCommentField';
import EventPublicityStatus from '../../eventPublicityStatus/eventPublicityStatus';
import MovieEventHeader from '../../movieEventHeader/movieEventHeader';

import styles from './postWillWatchContent.module.css';

function PostWillWatchContent(props) {

    function handleInputChange(event) {
        const { name, value, type, checked } = event.target;

        if (type === "checkbox")
            props.handleChange(name, checked);
        else
            props.handleChange(name, value);
    }

    let isCreateEnabled = props.movieInfo.movieId !== 0;

    if (props.isPublic === true && props.comment.length === 0)
        isCreateEnabled = false;

    let buttonTitle = "Опубликовать";

    if (!props.isPublic)
        buttonTitle = "Добавить в закладки";

    const displayCommentBlock = { display: props.isPublic ? "block" : "none" }

    const articleStyle = props.isModal ?  `${`${styles.modalContent} ${`dialog-ev`}`}` : ""

    return (
        <article className={articleStyle}>
            <MovieEventHeader
                selectedEventType={props.eventType}
                onEventTypeClick={props.handleClickOnEventType}
                movieInfo={props.movieInfo}
            />

            <EventPublicityStatus
                checked={props.isPublic}
                onChange={handleInputChange}
            />

            <p className={styles.headerTitle} style={displayCommentBlock}>Комментарий</p>

            <EventCommentField
                placeholder="Напишите свой комментарий тут…"
                value={props.comment}
                onChange={handleInputChange}
                isPublic={props.isPublic}
            />

            <CreateEventButton
                title={buttonTitle}
                isDisabled={!isCreateEnabled}
                onClick={() => props.onEventCreate(Constants.MOVIE_WILL_WATCH_EVENT_TYPE)}
            />

        </article>
    );
}

export default PostWillWatchContent;
