import React from 'react';

import Constants from '../../../../constants';

import styles from './introPageDescription.module.css';

import appStoreIcon from '../../../../../public/icons/appStore.png';

function IntroPageDescription() {
    return (
        <div className={styles.descriptionContainer}>

            <ol className={styles.descriptionList}>
                <li className={styles.descriptionListItem}>
                    <p className={styles.title}>Для кого MONA</p>
                    <p className={styles.subtitle}>Наша аудитория — это настоящие киноманы</p>
                </li>

                <li className={styles.descriptionListItem}>
                    <p className={styles.title}>Как мне начать пользоваться?</p>
                    <p className={styles.subtitle}>Что надо сделать? Создай аккаунт — это  быстро и легко: просто нажми кнопку «Создать аккаунт» и заполни коротку форму. Ждём тебя в MONA!</p>
                </li>
            </ol>

            <p className={styles.title}>А приложение MONA есть на телефоне?</p>
            <p className={styles.subtitle}>Да, ты можешь скачать его в AppStore, перейдя по ссылке. Тебе у нас понравится!</p>
            <a href={Constants.IOS_APP_LINK}>
                <img src={appStoreIcon} width="146px" />
            </a>

        </div>
    );
};

export default IntroPageDescription;
