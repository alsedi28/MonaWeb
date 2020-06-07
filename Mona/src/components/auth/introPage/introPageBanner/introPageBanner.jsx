import React from 'react';

import CommonButton from '../../../buttons/commonButton/commonButton';

import styles from './introPageBanner.module.css';

import welcomeIcon from '../../../../../public/icons/welcome.png';

function IntroPageBanner(props) {
    return (
        <React.Fragment>
            <div className={styles.banner}>
                <div className={styles.bannerContainer}>

                    <div className={styles.bannerColumn}>
                        <p className={styles.bannerTitle}>Добро пожаловать в MONA!</p>
                        <p className={styles.bannerSubtitle}>MONA — социальная сеть про кино. Находи крутые фильмы для просмотра, добавляй их в закладки, читай отзывы и делись ими со своими подписчиками!</p>
                            <div className={styles.bannerButtonsContainer}>
                                <div style={{ paddingRight: `24px` }}>
                                    <CommonButton externalClass="borderedButton" onClick={props.onSignIn} title="Войти" />
                                </div>
                                <CommonButton externalClass="filledButton" onClick={props.onSignUp} title="Создать аккаунт" />
                            </div>
                    </div>

                    <div className={styles.bannerColumn}>
                        <img src={welcomeIcon} width="340px" />
                    </div>
                </div>
            </div>
        </React.Fragment>);
};

export default IntroPageBanner;
