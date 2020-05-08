import React from 'react';
import styles from './header.module.css';

const Header = ({ externalClass = "" }) => (
    <header className={`${styles.container} ${externalClass}`}></header>
);

export default Header;