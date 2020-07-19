import React from 'react';

import CloseButton from '../../buttons/closeButton/closeButton';
import PostWillWatchContent from './postWillWatchContent/postWillWatchContent';
import ModalDialogBackground from '../../modalDialogBackground/modalDialogBackground';

function PostWillWatch(props) {
    return (
        <ModalDialogBackground show={props.isDisplay} clickClose={props.clickClose} >

            <PostWillWatchContent
                isModal={true}
                movieInfo={props.movieInfo}
                isPublic={props.isPublic}
                comment={props.comment}
                handleChange={props.handleChange}
                onEventCreate={props.onEventCreate}
            />

            <CloseButton onClick={props.clickClose}/>

        </ModalDialogBackground>
    );
}

export default PostWillWatch;
