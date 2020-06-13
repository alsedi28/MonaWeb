import React from 'react';

import styles from './movieCardTrailer.module.css';

import playVideoIcon from '../../../../public/icons/playVideo.png';

const MovieCardTrailer = ({ videoInfo, clickPlay = () => ({}), externalClass = "" }) => (
    <div className={`${styles.container} ${externalClass}`}>
        <div>
            <img src={`https://img.youtube.com/vi/${videoInfo.Key}/hqdefault.jpg`} />
            <img src={playVideoIcon} width="63px" onClick={clickPlay} />
        </div>
        <p>{videoInfo.Name}</p>
    </div>
);

export default MovieCardTrailer;