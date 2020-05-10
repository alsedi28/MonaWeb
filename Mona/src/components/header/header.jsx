import React from 'react';
import styles from './header.module.css';
import appIcon from '../../../public/icons/app-icon.jpg';

const Header = ({ externalClass = "" }) => (
    <header className={`${styles.container} ${externalClass}`}>
        <div className={styles.centerContainer}>
            <img className={styles.icon} src={appIcon} width="130px" height="40px" />
        </div>
    </header>
);

export default Header;