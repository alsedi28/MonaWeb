import React from 'react';

import Loader from '../../loader/loader';
import UserListItem from '../../userListItem/userListItem';
import SearchMovieItem from '../SearchMovieItem/SearchMovieItem';

import styles from './searchResult.module.css';

const SearchResult = ({ data, isLoading, show, externalClass = "" }) => (
    <div className={`${styles.container} ${externalClass}`} style={{ display: show ? "block" : "none" }}>
        <Loader show={isLoading} />
        <div className={styles.notFound} style={{ display: show && !isLoading && data.movies.length === 0 && data.users.length === 0 ? "block" : "none" }}>
            <p>Фильмов или пользователей по этому поисковому запросу не найдено</p>
            <p>Проверьте правильность написания или попробуйте ввести другой запрос</p>
        </div>
        <div className={styles.movies} style={{ display: data.movies.length > 0 ? "block" : "none" }}>
            <p className={styles.title}>Фильмы</p>
            {data.movies.map(movie =>
                <SearchMovieItem movie={movie} />)}
        </div>
        <div className={styles.users} style={{ display: data.users.length > 0 ? "block" : "none" }}>
            <p className={styles.title}>Пользователи</p>
            {data.users.map(user =>
                <UserListItem userIcon={user.icon} userLogin={user.login} userName={user.name} userId={user.id} isFollowing={user.isFollowing} externalClass={styles.userListItemExternal} />)}
        </div>
    </div>
);

export default SearchResult;