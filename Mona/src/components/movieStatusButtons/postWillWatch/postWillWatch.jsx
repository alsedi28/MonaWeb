import React from 'react';

import styles from './postWillWatch.module.css';

import Constants from '../../../constants';
import CloseButton from '../../buttons/closeButton/closeButton';
import CommonButton from '../../buttons/commonButton/commonButton';
import EventCommentField from '../eventCommentField/eventCommentField';
import ModalDialogBackground from '../../modalDialogBackground/modalDialogBackground';
import { getPosterPath } from '../../../helpers/imagePathHelper';

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

                <div className={styles.publicSettingContainer}>
                    <p>Поделиться публикацией с подписчиками</p>
                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            id="checkbox"
                            name="isEventPublic"
                            checked={props.isPublic}
                            onChange={handleInputChange}
                        />
                        <span className={`${styles.slider} ${styles.round}`}></span>
                    </label>
                </div>

                <p className={styles.headerTitle} style={displayCommentBlock}>Комментарий</p>

                <EventCommentField
                    placeholder="Напишите свой комментарий тут…"
                    value={props.comment}
                    onChange={handleInputChange}
                    isPublic={props.isPublic}
                />

                <CommonButton
                    externalClass="filledButton createEventButton"
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
