import React from 'react';

import styles from './searchInput.module.css';

import magnifyingGlassIcon from '../../../../public/icons/magnifyingGlass.png';

const SearchInput = ({ inputValue = "", handleInputChange = () => ({}), handleInputBlur = () => ({}), handleInputFocus = () => ({}), externalClass = "" }) => (
    <div className={`${styles.container} ${externalClass}`}>
        <input maxLength="30" placeholder="Фильмы, пользователи" value={inputValue} onChange={handleInputChange} onBlur={handleInputBlur} onFocus={handleInputFocus} />
        <img src={magnifyingGlassIcon} width="20px" />
    </div>
);

export default SearchInput;