import React from 'react';

import Constants from '../../constants';

import styles from './appLinkComponent.module.css';

import appStoreIcon from '../../../public/icons/appStore.png';

function AppLinkComponent(props) {
    return (
        <div className={styles.linkBlock}>
            <p className={styles.helpText}>Скачать приложение</p>
            <a href={Constants.IOS_APP_LINK}>
                <img src={appStoreIcon} style={{ margin: `auto`, display: `block` }} width="160px" />
            </a>
        </div>
    );
};

export default AppLinkComponent;
