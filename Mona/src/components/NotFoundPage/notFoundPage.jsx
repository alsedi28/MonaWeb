import React from 'react';
import styles from './notFoundPage.module.css';
import notFoundIcon from '../../../public/icons/404notFound.png';

const NotFoundPage = ({ externalClass = "" }) => (
    <div className={`${styles.container} ${externalClass}`}>
        <img src={notFoundIcon} width="250px" />
    </div>
);

export default NotFoundPage;