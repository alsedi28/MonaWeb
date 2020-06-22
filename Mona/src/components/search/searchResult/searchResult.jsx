import React from 'react';
import { Link } from 'react-router-dom';

import Loader from '../../loader/loader';
import UserListItem from '../../userListItem/userListItem';
import SearchMovieItem from '../SearchMovieItem/SearchMovieItem';
import Constants from '../../../constants';

import shapeGreyIcon from '../../../../public/icons/shapeGrey.png';

import styles from './searchResult.module.css';

const SearchResult = ({ data, isLoading, show, searchText, externalClass = "" }) => (
    <div className={`${styles.container} ${externalClass}`} style={{ display: show ? "block" : "none" }}>
        <Loader show={isLoading} />
        <div className={styles.notFound} style={{ display: show && !isLoading && data.movies.length === 0 && data.users.length === 0 ? "block" : "none" }}>
            <p>Фильмов или пользователей по этому поисковому запросу не найдено</p>
            <p>Проверьте правильность написания или попробуйте ввести другой запрос</p>
        </div>
        <div className={styles.movies} style={{ display: data.movies.length > 0 ? "block" : "none" }}>
            <p className={styles.title}>Фильмы</p>
            {data.movies.slice(0, Constants.MAX_QUANTITY_ITEMS_FOR_SEARCH_RESULT_VIEW).map(movie =>
                <SearchMovieItem movie={movie} />)}
        </div>
        <div className={styles.users} style={{ display: data.users.length > 0 ? "block" : "none" }}>
            <p className={styles.title}>Пользователи</p>
            {data.users.slice(0, Constants.MAX_QUANTITY_ITEMS_FOR_SEARCH_RESULT_VIEW).map(user =>
                <UserListItem userIcon={user.icon} userLogin={user.login} userName={user.name} userId={user.id} isFollowing={user.isFollowing} externalClass={styles.userListItemExternal} />)}
        </div>
        <Link to={`/search/${searchText}`} style={{ display: data.users.length > Constants.MAX_QUANTITY_ITEMS_FOR_SEARCH_RESULT_VIEW || data.movies.length > Constants.MAX_QUANTITY_ITEMS_FOR_SEARCH_RESULT_VIEW ? "block" : "none" }}>
            <div className={styles.showAllResult}>
                <p>Посмотреть все результаты</p>
                <img src={shapeGreyIcon} width="7px" height="12px" />
            </div>
        </Link>
    </div>
);

export default SearchResult;