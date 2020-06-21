import React from 'react';

import BorderedButton from '../../../buttons/borderedButton/borderedButton';
import FilledButton from '../../../buttons/filledButton/filledButton';

import styles from './introPageBanner.module.css';

import welcomeIcon from '../../../../../public/icons/welcome.png';

function IntroPageBanner(props) {
    return (
        <div className={styles.banner}>
            <div className={styles.bannerContainer}>

                <div className={styles.bannerColumn}>
                    <p className={styles.bannerTitle}>Добро пожаловать в MONA!</p>
                    <p className={styles.bannerSubtitle}>Добро пожаловать в MONA! Мы — социальная сеть про кино. Ищи фильмы, добавляй в закладки, ставь оценки и обсуждай кино со своими друзьями и подписчиками!</p>
                        <div className={styles.bannerButtonsContainer}>
                            <div className={styles.bannerSignInButtonContainer}>
                                <BorderedButton onClick={props.onSignIn} title="Войти" />
                            </div>
                            <FilledButton onClick={props.onSignUp} title="Создать аккаунт" />
                        </div>
                </div>

                <div className={styles.bannerColumn}>
                    <img src={welcomeIcon} width="340px" />
                </div>
            </div>
        </div>
    );
};

export default IntroPageBanner;
