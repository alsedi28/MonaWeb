import React from 'react';

import { getPosterPath } from '../../helpers/imagePathHelper';

import framePlaceholder from '../../../public/icons/framePlaceholder.png';

import styles from './moviePoster.module.css';

const MoviePoster = ({ imageUrl, width, height, borderRadius, movieTitle, externalClass = "" }) => {
    return (
        <div className={`${styles.container} ${externalClass}`} title={movieTitle} style={{ width: width, height: height, borderRadius: borderRadius }}>
            <img src={getPosterPath(imageUrl)} onError={(e) => { e.target.onerror = null; e.target.src = framePlaceholder; }} />
        </div>
    );
};

export default MoviePoster;