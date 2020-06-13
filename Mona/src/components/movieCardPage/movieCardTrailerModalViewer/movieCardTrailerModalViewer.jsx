import React from 'react';

import styles from './movieCardTrailerModalViewer.module.css';

const MovieCardTrailerModalViewer = ({ videoKey, show, clickClose = ()=>({}) }) => {
    function clickBackground(event) {
        let target = event.target;

        if (target.closest(".dialog-ev")) {
            event.stopPropagation();
            return;
        }

        clickClose();
    }

    return (
        <div className={`${styles.background}`} style={{ display: show ? "flex" : "none" }} onClick={clickBackground}>
            {show && <div className={`${styles.container} dialog-ev`}>
                <iframe width="650" height="405" src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`} frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen" />
            </div>}
        </div>
    );
};

export default MovieCardTrailerModalViewer;