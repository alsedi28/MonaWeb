import React from 'react';

import styles from './verticalTabs.module.css';

const VerticalTabs = ({ tabs, clickTab, tabNumberActive, externalClass = "" }) => {
    return (
        <div className={`${styles.tabs} ${externalClass}`}>
            <a className={`${styles.tabFirst} ${tabNumberActive === 1 ? styles.active : ''}`} onClick={() => clickTab(1)}>{tabs[0]}</a>
            <a className={`${styles.tabSecond} ${tabNumberActive === 2 ? styles.active : ''}`} onClick={() => clickTab(2)}>{tabs[1]}</a>
            <span className={styles.tabBar}></span>
        </div>
    );
};

export default VerticalTabs;