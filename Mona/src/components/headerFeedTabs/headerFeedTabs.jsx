import React from 'react';

import styles from './headerFeedTabs.module.css';

const HeaderFeedTabs = ({ clickTabFeed, clickTabFeedPopular, externalClass = "" }) => {
    function clickTab(event, callback) {
        let tabs = document.getElementsByClassName(styles.materialTabs)[0].getElementsByTagName("a");

        for (var i = 0; i < tabs.length; i++)
            tabs[i].classList.remove(styles.active);

        event.target.classList.add(styles.active);

        callback();
    }

    return (
        <header className={`${externalClass}`}>
            <div className={styles.materialTabs}>
                <a className={`${styles.tab1tab} ${styles.active}`} onClick={(e) => clickTab(e, clickTabFeed)}>Подписки</a>
                <a className={styles.tab2tab} onClick={(e) => clickTab(e, clickTabFeedPopular)}>Популярные</a>
                <span className={styles.yellowBar}></span>
            </div>
        </header>
    );
};

export default HeaderFeedTabs;