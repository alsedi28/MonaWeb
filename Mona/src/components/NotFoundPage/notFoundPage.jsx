import React from 'react';

import Header from '../header/header';
import Footer from '../footer/footer';

import styles from './notFoundPage.module.css';

import notFoundIcon from '../../../public/icons/404notFound.png';

const NotFoundPage = ({}) => (
    <React.Fragment>
        <Header externalClass="header-external"/>
        <div className={styles.container}>
            <img src={notFoundIcon} width="250px" />
        </div>
        <Footer externalClass="footer-external" />
    </React.Fragment>
);

export default NotFoundPage;