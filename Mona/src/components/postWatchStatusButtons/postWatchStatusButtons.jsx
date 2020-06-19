import React, { useRef } from 'react';
import Constants from '../../constants';

import styles from './postWatchStatusButtons.module.css';
import checkMarkIcon from '../../../public/icons/checkMark.png';

function PostWatchStatusButtons(props) {

    function handleChangeStatusAction(newStatus) {

    }

    let statusBlock = "";
    switch (props.status) {
        case Constants.MOVIE_STATUS_WILL_WATCH:
            statusBlock =
                (
                <React.Fragment>
                    <div className={`${styles.selected} ${styles.common}`}>
                        <p>В закладках
                        <img src={checkMarkIcon} width="20px" />
                        </p>
                    </div>

                    <ul className={styles.sortDropdown}>
                        <li className={styles.dropdownContent} onClick={() => handleChangeStatusAction(Constants.MOVIES_SORT_TYPE_DATE_DESC)}>
                            <p>Переместить в просмотренные</p>
                        </li>
                        <li className={`${styles.dropdownContent} ${styles.deleteAction}`} onClick={() => handleChangeStatusAction(Constants.MOVIES_SORT_TYPE_DATE)}>
                            <p>Удалить из закладок</p>
                        </li>
                    </ul>
                </React.Fragment>);
            break;
        case Constants.MOVIE_STATUS_VIEWED:
            statusBlock =
                (
                <React.Fragment>
                    <div className={`${styles.selected} ${styles.common}`}>
                        <p>Просмотрен
                        <img src={checkMarkIcon} width="16px" />
                        </p>
                    </div>
                    <ul className={styles.sortDropdown}>
                        <li className={styles.dropdownContent} onClick={() => handleChangeStatusAction(Constants.MOVIES_SORT_TYPE_RATING_DESC)}>
                            <p>Переместить в закладки</p>
                        </li>
                        <li className={`${styles.dropdownContent} ${styles.deleteAction}`} onClick={() => handleChangeStatusAction(Constants.MOVIES_SORT_TYPE_RATING)}>
                            <p>Удалить из просмотренных</p>
                        </li>
                    </ul>
                </React.Fragment>);
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
