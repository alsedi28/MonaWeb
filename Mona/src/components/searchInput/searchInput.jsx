import React from 'react';

import styles from './searchInput.module.css';

import magnifyingGlassIcon from '../../../public/icons/magnifyingGlass.png';

const SearchInput = ({ inputValue, handleInputChange, externalClass = "" }) => (
    <div className={`${styles.container} ${externalClass}`}>
        <img src={magnifyingGlassIcon} width="20px" />
        <input maxLength="30" placeholder="Поиск" value={inputValue} onChange={handleInputChange} />
    </div>
);

export default SearchInput;