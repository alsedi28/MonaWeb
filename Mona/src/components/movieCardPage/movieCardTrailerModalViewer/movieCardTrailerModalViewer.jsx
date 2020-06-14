import React from 'react';

import ModalDialogBackground from '../../modalDialogBackground/modalDialogBackground';

import styles from './movieCardTrailerModalViewer.module.css';

const MovieCardTrailerModalViewer = ({ videoKey, show, clickClose = ()=>({}) }) => {
    return (
        <ModalDialogBackground show={show} clickClose={clickClose} >
            {show && <div className={`${styles.container} dialog-ev`}>
                <iframe width="650" height="405" src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`} frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen" />
            </div>}
        </ModalDialogBackground>
    );
};

export default MovieCardTrailerModalViewer;