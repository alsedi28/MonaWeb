import React from 'react';

import styles from './horizontalTabs.module.css';

const HorizontalTabs = ({ tabsSettings, clickTab, tabNumberActive, externalClass = "" }) => {
    const tabs = tabsSettings.map((tab, i) =>
        <a className={`${tabNumberActive === i + 1 ? styles.active : ''}`} onClick={() => clickTab(i + 1)}>{tab.Title}</a>);

    return (
        <div className={`${styles.tabs} ${externalClass}`}>
            {tabs}
            <span className={styles.tabBar} style={{ width: tabsSettings[tabNumberActive - 1].Width, left: tabsSettings[tabNumberActive - 1].Offset }}></span>
        </div>
    );
};

export default HorizontalTabs;