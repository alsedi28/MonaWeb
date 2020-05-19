import React from 'react';
import styles from './header.module.css';
import appNameIcon from '../../../public/icons/appNameIcon.jpg';

const Header = ({ externalClass = "" }) => {
    let scrollPageUp = () => window.scrollTo(0, 0);

    return (
        <header className={`${styles.container} ${externalClass}`}>
            <div className={styles.centerContainer}>
                <img className={styles.icon} src={appNameIcon} width="130px" height="40px" onClick={scrollPageUp} />
            </div>
        </header>
    )
};

export default Header;