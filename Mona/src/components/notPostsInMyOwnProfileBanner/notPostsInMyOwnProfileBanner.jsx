import React from 'react';

import styles from './notPostsInMyOwnProfileBanner.module.css';

import blogging from '../../../public/icons/blogging.png';

const NotPostsInMyOwnProfileBanner = ({ show, externalClass = "" }) => (
    <div className={`${styles.container} ${externalClass}`} style={{ display: show ? "block" : "none" }}>
        <img src={blogging} width="195px" />
        <p>Делитесь фильмами!</p>
        <p>Публикуйте фильмы, которые посмотрели или собираетесь посмотреть!</p>
    </div>
);

export default NotPostsInMyOwnProfileBanner;