import React from 'react';
import styles from './footer.module.css';

const Footer = ({ externalClass = "" }) => (
    <footer className={`${styles.container} ${externalClass}`}>
        <div className={styles.centerContainer}>
            <p>&copy; Sergey Ignatushchenko</p>
        </div>
    </footer>
);

export default Footer;