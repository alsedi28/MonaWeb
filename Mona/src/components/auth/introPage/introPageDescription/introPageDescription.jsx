import React from 'react';

import styles from './introPageDescription.module.css';

import appStoreIcon from '../../../../../public/icons/appStore.png';

function IntroPageDescription(props) {
    return (
        <div className={styles.descriptionContainer}>

            <ol className={styles.descriptionList}>
                <li className={styles.descriptionListItem} style={{ paddingRight: `40px` }}>
                    <p className={styles.title}>Для кого MONA</p>
                    <p className={styles.subtitle}>Для любителей кино!</p>
                </li>

                <li className={styles.descriptionListItem}>
                    <p className={styles.title}>Как мне начать им пользоваться?</p>
                    <p className={styles.subtitle}>Зарегистрируйтесь</p>
                </li>
            </ol>

            <p className={styles.title}>У MONA есть мобильное приложение?</p>
            <p className={styles.subtitle}>Да, вы можете скачать его, нажав на кнопку ниже</p>
            <a href="https://apps.apple.com/ru/app/mona-социальная-сеть-про-кино/id1227526659">
                <img src={appStoreIcon} width="146px" />
            </a>

        </div>
    );
};

export default IntroPageDescription;
