import React from 'react';
import styles from './loader.module.css';
import loaderIcon from '../../../public/icons/loader.gif';

const Loader = ({ externalClass = "" }) => (
    <div className={`${styles.container} ${externalClass}`}>
        <img src={loaderIcon} height="40px" />
    </div>
);

export default Loader;