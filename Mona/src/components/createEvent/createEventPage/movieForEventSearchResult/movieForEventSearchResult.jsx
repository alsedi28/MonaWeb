import React from 'react';

import Loader from '../../../loader/loader';
import UserListItem from '../../../userListItem/userListItem';
import MovieForEventItem from '../movieForEventItem/movieForEventItem';
import Constants from '../../../../constants';

import shapeGreyIcon from '../../../../../public/icons/shapeGrey.png';

import styles from './movieForEventSearchResult.module.css';

const MovieForEventSearchResult = ({ movies, isLoading, show, searchText, handleClickOnMovie, externalClass = "" }) => (

    <div className={`${styles.container} ${externalClass}`} style={{ display: show ? "block" : "none" }}>
        <Loader show={isLoading} />
        <div className={styles.notFound} style={{ display: show && !isLoading && movies.length === 0 ? "block" : "none" }}>
            <p>Фильмов по этому поисковому запросу не найдено</p>
            <p>Проверьте правильность написания или попробуйте ввести другой запрос</p>
        </div>
        <div className={styles.movies} style={{ display: movies.length > 0 ? "block" : "none" }}>
            {movies.slice(0, Constants.MAX_QUANTITY_ITEMS_FOR_SEARCH_RESULT_VIEW).map(movie =>
                <MovieForEventItem movie={movie} onClick={handleClickOnMovie} />)}
        </div>
    </div>
);

export default MovieForEventSearchResult;
