import React from 'react';

import Constants from '../../../constants';

import styles from './profileMoviesSort.module.css';

import arrowDown from '../../../../public/icons/arrowDown.png';
import selectionCheckmark from '../../../../public/icons/selectionCheckmark.png';

function ProfileMoviesSort(props) {

    function handleSortChange(sortType) {
        props.onSortTypeSelect(sortType);
    }

    function getSelectedSortName() {
        switch(props.selectedSort) {
            case Constants.MOVIES_SORT_TYPE_DATE_DESC:
                return "От нового к старому";
                break;
            case Constants.MOVIES_SORT_TYPE_DATE:
                return "От старого к новому";
                break;
            case Constants.MOVIES_SORT_TYPE_RATING_DESC:
                return "По убыванию оценки";
                break;
            case Constants.MOVIES_SORT_TYPE_RATING:
                return "По возрастанию оценки";
                break;
            default:
                return "";
        }
    }

    return (
        <div className={styles.dividerContainer}>
            <div className={styles.sortContainer}>
                <div>
                    <p>{getSelectedSortName()}</p>
                    <img src={arrowDown} width="12px" height="8px" />
                    <ul className={styles.sortDropdown}>
                        <li className={styles.dropdownContent} onClick={() => handleSortChange(Constants.MOVIES_SORT_TYPE_DATE_DESC)}>
                            <p>От нового к старому</p>
                            <img src={selectionCheckmark} style={{ display: props.selectedSort === Constants.MOVIES_SORT_TYPE_DATE_DESC ? "block" : "none" }} width="16px" height="12px" />
                        </li>
                        <li className={styles.dropdownContent} onClick={() => handleSortChange(Constants.MOVIES_SORT_TYPE_DATE)}>
                            <p>От старого к новому</p>
                            <img src={selectionCheckmark} style={{ display: props.selectedSort === Constants.MOVIES_SORT_TYPE_DATE ? "block" : "none" }} width="16px" height="12px" />
                        </li>
                        <li className={styles.dropdownContent} style={{ display: props.movieType === Constants.MOVIE_STATUS_VIEWED ? "flex" : "none" }} onClick={() => handleSortChange(Constants.MOVIES_SORT_TYPE_RATING_DESC)}>
                            <p>По убыванию оценки</p>
                            <img src={selectionCheckmark} style={{ display: props.selectedSort === Constants.MOVIES_SORT_TYPE_RATING_DESC ? "block" : "none" }} width="16px" height="12px" />
                        </li>
                        <li className={styles.dropdownContent} style={{ display: props.movieType === Constants.MOVIE_STATUS_VIEWED ? "flex" : "none" }} onClick={() => handleSortChange(Constants.MOVIES_SORT_TYPE_RATING)}>
                            <p>По возрастанию оценки</p>
                            <img src={selectionCheckmark} style={{ display: props.selectedSort === Constants.MOVIES_SORT_TYPE_RATING ? "block" : "none" }} width="16px" height="12px" />
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.dividerLine}></div>
        </div>
    );
};

export default ProfileMoviesSort;
