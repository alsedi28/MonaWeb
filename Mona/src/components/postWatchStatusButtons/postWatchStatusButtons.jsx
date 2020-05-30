import React, { useRef } from 'react';

import styles from './postWatchStatusButtons.module.css';
import checkMarkIcon from '../../../public/icons/checkMark.png';

function PostWatchStatusButtons(props) {
    let willWatch = "WillWatch";
    let noViewed = "NoViewed";
    let viewed = "Viewed";

    let statusBlock = "";
    switch (props.status) {
        case willWatch:
            statusBlock =
                <div className={`${styles.selected} ${styles.common}`}>
                    <p>В закладках
                    <img src={checkMarkIcon} width="20px" />
                    </p>
                </div>
            break;
        case viewed:
            statusBlock =
                <div className={`${styles.selected} ${styles.common}`}>
                    <p>Просмотрен
                    <img src={checkMarkIcon} width="16px" />
                    </p>
                </div>
            break;
    }

    let noViewedStatus = { display: props.status === noViewed ? "block" : "none" };

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
