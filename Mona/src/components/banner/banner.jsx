import React from 'react';

import styles from './banner.module.css';

const Banner = ({ image, headerText, text, show, externalClass = "" }) => (
    <div className={`${styles.container} ${externalClass}`} style={{ display: show ? "block" : "none" }}>
        <img src={image} width="195px" />
        <p>{headerText}</p>
        <p>{text}</p>
    </div>
);

export default Banner;