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
                        <p className={styles.bannerSubtitle}>MONA — социальная сеть про кино! Здесь вы можете найти крутые фильмы для просмотра, почитать отзывы, добавлять фильмы в закладки или делиться ими со своими подписчиками.</p>
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
