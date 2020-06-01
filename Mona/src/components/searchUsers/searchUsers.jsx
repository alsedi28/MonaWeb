import React from 'react';

import UserListItem from '../userListItem/userListItem';
import Loader from '../loader/loader';

import styles from './searchUsers.module.css';

import magnifyingGlassIcon from '../../../public/icons/magnifyingGlass.png';

const SearchUsers = ({ items, isLoading, handleInputChange, externalClass = "" }) => (
    <div className={`${styles.container} ${externalClass}`}>
        <div className={styles.inputBlock}>
            <img src={magnifyingGlassIcon} width="20px" />
            <input maxLength="30" placeholder="Поиск" onChange={handleInputChange}/>
        </div>
        <div className={styles.searchResult}>
            <Loader show={isLoading} externalClass={styles.loader} />
            {items.map(item =>
                <UserListItem userIcon={item.icon} userLogin={item.login} userName={item.name} userId={item.id} isFollowing={item.isFollowing} externalClass={styles.userListItemExternal}/>)}
        </div>
    </div>
);

export default SearchUsers;