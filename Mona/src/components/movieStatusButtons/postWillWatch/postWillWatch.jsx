import React from 'react';

import styles from './postWillWatch.module.css';

import Constants from '../../../constants';
import CloseButton from '../../buttons/closeButton/closeButton';
import CreateEventButton from '../../buttons/createEventButton/createEventButton';
import EventCommentField from '../eventCommentField/eventCommentField';
import EventPublicityStatus from '../eventPublicityStatus/eventPublicityStatus';
import MovieEventHeader from '../movieEventHeader/movieEventHeader';
import ModalDialogBackground from '../../modalDialogBackground/modalDialogBackground';

function PostWillWatch(props) {

    function handleInputChange(event) {
        const {name, value, type, checked} = event.target;
        if (type === "checkbox") {
            props.handleChange(name, checked);
        } else {
            props.handleChange(name, value);
        }
    }

    let isCreateEnabled = true;
    if (props.isPublic === true && props.comment.length === 0) {
        isCreateEnabled = false;
    }

    let buttonTitle = "Опубликовать";
    if (!props.isPublic) {
        buttonTitle = "Добавить в закладки";
    }

    let displayCommentBlock = { display: props.isPublic ? "block" : "none" }

    return (
        <ModalDialogBackground show={props.isDisplay} clickClose={props.clickClose} >

            <article className={`${styles.modalContent} ${`dialog-ev`}`}>
                <MovieEventHeader
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

            <CloseButton onClick={props.clickClose}/>

        </ModalDialogBackground>
    );
}

export default PostWillWatch;
