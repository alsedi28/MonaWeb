import React from 'react';

import styles from './movieRatingSelection.module.css';

function MovieRatingSelection(props) {

    function getSelectionStyle(index) {
        if (props.selectedIndex === index) {
            return { backgroundColor: 'rgb(255, 86, 26)' };
        } else {
            return { backgroundColor: 'rgb(203, 209, 223)' };
        }
    }

    let possibleRatings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div className={styles.container}>
        {possibleRatings.map(rating =>
            <div
                className={styles.circle}
                style={getSelectionStyle(rating)}
                onClick={() => props.onChange(rating)}>{rating}
            </div>)
        }
        </div>
    );
}

export default MovieRatingSelection;
