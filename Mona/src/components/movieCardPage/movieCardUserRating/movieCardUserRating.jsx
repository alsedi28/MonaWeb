import React from 'react';

import styles from './movieCardUserRating.module.css';

const MovieCardUserRating = ({ rating, externalClass = "" }) => {
    let emojiBlock = "";

    switch (rating) {
        case 0:
        case 1:
            emojiBlock = <span>&#129326;</span>;
            break;
        case 2:
        case 3:
            emojiBlock = <span>&#128078;</span>;
            break;
        case 4:
        case 5:
            emojiBlock = <span>&#129300;</span>;
            break;
        case 6:
        case 7:
            emojiBlock = <span>&#128524;</span>;
            break;
        case 8:
            emojiBlock = <span>&#128523;</span>;
            break;
        case 9:
        case 10:
            emojiBlock = <span>&#128525;</span>;
            break;
        default:
            break;
    }

    return (
        <div className={`${styles.container} ${externalClass}`}>
            <div>
                <span>{rating}</span>
                {emojiBlock}
            </div>
            <p>ваша оценка</p>
        </div>
    );
};

export default MovieCardUserRating;