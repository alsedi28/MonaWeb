import React from 'react';

import CloseButton from '../../buttons/closeButton/closeButton';
import ModalDialogBackground from '../../modalDialogBackground/modalDialogBackground';
import PostWatchedContent from './postWatchedContent/postWatchedContent';

function PostWatched(props) {

    return (
        <ModalDialogBackground show={props.isDisplay} clickClose={props.clickClose}>

            <PostWatchedContent
                isModal={true}
                isPublic={props.isPublic}
                comment={props.comment}
                selectedRating={props.selectedRating}
                selectedTags={props.selectedTags}
                tags={props.tags}
                onTagSelect={props.onTagSelect}
                handleChange={props.handleChange}
                movieInfo={props.movieInfo}
                handleRatingChange={props.handleRatingChange}
                onEventCreate={props.onEventCreate}
            />

            <CloseButton onClick={props.clickClose}/>

        </ModalDialogBackground>
    );
}

export default PostWatched;
