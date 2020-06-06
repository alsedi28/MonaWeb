import React, { useRef } from 'react';

import Header from '../../header/header';
import Footer from '../../footer/footer';
import CommonButton from '../../buttons/commonButton/commonButton';
import Constants from '../../../constants';

import styles from './loginPage.module.css';

import appStoreIcon from '../../../../public/icons/appStore.png';
import appIcon from '../../../../public/icons/appIcon.png';

const LoginPage = ({ login, showError = false }) => {
    const loginInput = useRef(null);
    const passwordInput = useRef(null);

    function clickLogin() {
        let loginVal = loginInput.current.value;
        let passwordVal = passwordInput.current.value;

        if (!loginVal || !passwordVal)
            return;

        login(loginVal, passwordVal);
    }

    function showAlert() {
        console.error("In progress");
    }

    return (
        <React.Fragment>
            <Header externalClass="header-external" onSignUp={showAlert}/>
            <div className={styles.container}>
                <div>
                    <div className={styles.formBlock}>
                        <div className={styles.formTitle}>
                            <p>Привет!</p>
                            <img src={appIcon} width="60px" />
                        </div>

                        <div className={styles.formsContainer}>
                            <form>
                                <label className={styles.formLabel} for="fname">Никнейм</label>
                                <input className={styles.formInput}
                                    type="text"
                                    id="nickname"
                                    name="nickname"
                                    placeholder="Введите никнейм.."
                                    ref={loginInput}
                                    required
                                />

                                <label className={styles.formLabel} for="lname">Пароль</label>
                                <input
                                    className={styles.formInput}
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Введите пароль.."
                                    ref={passwordInput}
                                    required
                                />

                                <div className={styles.error} style={{ display: showError ? "block" : "none" }}>
                                    <p>Имя пользователя или пароль указаны неправильно.</p>
                                </div>
                            </form>

                            <button className={styles.forgotPasswordButton} onClick={showAlert}>Забыли пароль?</button>

                            <CommonButton
                                externalClass="filledButton"
                                title="Войти"
                                style={{ width: `80%`, height: `56px` }}
                                onClick={clickLogin}
                            />
                        </div>
                    </div>

                    <div className={styles.linkBlock}>
                        <p className={styles.helpText}>Скачать приложение</p>
                        <a href={Constants.IOS_APP_LINK}>
                            <img src={appStoreIcon} style={{ margin: `auto`, display: `block` }} width="160px" />
                        </a>
                    </div>
                </div>
            </div>
            <Footer externalClass="footer-external" />
        </React.Fragment>);
};

export default LoginPage;
