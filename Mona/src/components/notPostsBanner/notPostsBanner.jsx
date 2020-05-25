import React from 'react';

import styles from './notPostsBanner.module.css';

import errorColored from '../../../public/icons/errorColored.png';

const NotPostsBanner = ({ username, show, externalClass = "" }) => (
    <div className={`${styles.container} ${externalClass}`} style={{ display: show ? "block" : "none" }}>
        <img src={errorColored} width="195px" />
        <p>Пока нет публикаций</p>
        <p>У {username} пока нет ни одной публикации.</p>
    </div>
);

export default NotPostsBanner;