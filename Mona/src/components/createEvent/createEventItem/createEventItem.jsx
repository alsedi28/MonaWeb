import React from 'react';

import styles from './createEventItem.module.css';

import Constants from '../../../constants';
import CreateEventButton from '../../buttons/createEventButton/createEventButton';
import EventCommentField from '../eventCommentField/eventCommentField';
import EventPublicityStatus from '../eventPublicityStatus/eventPublicityStatus';
import MovieEventHeader from '../movieEventHeader/movieEventHeader';
import MovieRatingSelection from '../movieRatingSelection/movieRatingSelection';

function CreateEventItem(props) {

    function handleInputChange(event) {
        const {name, value, type, checked} = event.target;
        if (type === "checkbox") {
            props.handleChange(name, checked);
        } else {
            props.handleChange(name, value);
        }
    }

    function getSelectionStyle(tagId) {
        if (props.selectedTags.indexOf(tagId) > -1) {
            return { backgroundColor: 'rgb(255, 86, 26)', color: 'white' };
        } else {
            return { backgroundColor: 'white', color: 'rgb(49, 54, 60)' };
        }
    }

    let isCreateEnabled = true;
    if ((props.isPublic === true && props.comment.length === 0) || props.selectedRating === 0) {
        isCreateEnabled = false;
    }

    let buttonTitle = "Опубликовать";
    if (!props.isPublic) {
        buttonTitle = "Добавить в просмотренные";
    }

    let displayCommentBlock = { display: props.isPublic ? "block" : "none" }
    let displayTagsBlock = { display: props.isPublic ? "flex" : "none" }
    let minHeightStyleBlock = { minHeight: props.isPublic ? '820px' : '300px' }

    return (
        <React.Fragment>
            <article className={`${styles.modalContent} ${`dialog-ev`}`} style={minHeightStyleBlock}>
                <MovieEventHeader
                    movieInfo={props.movieInfo}
                />

                <p className={styles.headerTitle}>Рейтинг</p>

                <MovieRatingSelection
                    selectedIndex={props.selectedRating}
                    onChange={props.handleRatingChange}
                />

                <EventPublicityStatus
                    checked={props.isPublic}
                    onChange={handleInputChange}
                />

                <p className={styles.headerTitle} style={displayCommentBlock}>Комментарий</p>

                <EventCommentField
                    placeholder="Напишите свой отзыв тут…"
                    value={props.comment}
                    onChange={handleInputChange}
                    isPublic={props.isPublic}
                />

                <p className={styles.headerTitle} style={displayCommentBlock}>Теги</p>

                <div className={styles.tags} style={displayTagsBlock}>
                    {props.tags.map(tag =>
                        <span style={getSelectionStyle(tag.TagId)} onClick= {() => props.onTagSelect(tag.TagId)}>{tag.Name}</span>)
                    }
                </div>

                <CreateEventButton
                    title={buttonTitle}
                    isDisabled={!isCreateEnabled}
                    onClick={() => props.onEventCreate(Constants.MOVIE_WATCHED_EVENT_TYPE)}
                />

            </article>
        </React.Fragment>
    );
}

export default CreateEventItem;
