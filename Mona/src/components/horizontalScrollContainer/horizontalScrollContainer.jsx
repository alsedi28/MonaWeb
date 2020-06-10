import React from 'react';

import styles from './horizontalScrollContainer.module.css';

const HorizontalScrollContainer = ({ title, children, externalClass = "" }) => (
    <section className={`${styles.container} ${externalClass}`}>
        <p>{title}</p>
        <div className={`${children.length > 3 ? styles.shadow : ''}`}>
            {children}
        </div>
    </section>
);

export default HorizontalScrollContainer;