import React from 'react';

import styles from './movieCardRating.module.css';

import starIcon from '../../../../public/icons/orangeStar.png';

const MovieCardRating = ({ movie, externalClass = ""}) => {
    let rating = movie.VoteAverage || 0;
    let sourceRating = "MONA";

    if (movie.ImdbRaiting !== null) {
        rating = movie.ImdbRaiting;
        sourceRating = "IMDb";
    }

    return (
        <div className={`${styles.container} ${externalClass}`}>
            <div>
                <img src={starIcon} width="15px" />
                <span>{Number(rating).toFixed(1)}</span>
            </div>
            <p>{sourceRating}</p>
        </div>
    );
};

export default MovieCardRating;