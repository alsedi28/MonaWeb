import React from 'react';
import styles from './loader.module.css';
import loaderIcon from '../../../public/icons/loader.gif';

const Loader = ({ show = true, externalClass = "" }) => (
    <div className={`${styles.container} ${externalClass}`} style={{ display: show ? "flex" : "none" }}>
        <img src={loaderIcon} height="40px" />
    </div>
);

export default Loader;