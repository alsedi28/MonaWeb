import React, { useRef } from 'react';
import Constants from '../../constants';

import styles from './postWatchStatusButtons.module.css';
import checkMarkIcon from '../../../public/icons/checkMark.png';

function PostWatchStatusButtons(props) {
    let statusBlock = "";
    switch (props.status) {
        case Constants.MOVIE_STATUS_WILL_WATCH:
            statusBlock =
                (<div className={`${styles.selected} ${styles.common}`}>
                    <p>В закладках
                    <img src={checkMarkIcon} width="20px" />
                    </p>
                </div>);
            break;
        case Constants.MOVIE_STATUS_VIEWED:
            statusBlock =
                (<div className={`${styles.selected} ${styles.common}`}>
                    <p>Просмотрен
                    <img src={checkMarkIcon} width="16px" />
                    </p>
                </div>);
            break;
    }

    let noViewedStatus = { display: props.status === Constants.MOVIE_STATUS_NO_VIEWED ? "block" : "none" };

    return (
        <div className={`${styles.box} ${props.externalClass}`}>
            {statusBlock}

            <div className={`${styles.unselected} ${styles.common}`} style={noViewedStatus}>
                <p>Буду смотреть</p>
            </div>
            <div className={`${styles.selected} ${styles.common}`} style={noViewedStatus}>
                <p>Уже смотрел</p>
            </div>
        </div>
    );
}

export default PostWatchStatusButtons;
