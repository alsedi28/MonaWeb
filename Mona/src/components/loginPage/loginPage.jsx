import React, { useRef } from 'react';

import Header from '../header/header';
import Footer from '../footer/footer';

import styles from './loginPage.module.css';

import appIcon from '../../../public/icons/appIcon.png';

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

    return (
        <React.Fragment>
            <Header externalClass="header-external" />
            <div className={styles.container}>
                <div className={styles.formBlock}>
                    <form>
                        <div className={styles.formLabel}>
                            <p>Welcome</p>
                            <br />
                            <img src={appIcon} width="60px" />
                        </div>
                        <div className={`${styles.inputWrapper} ${styles.loginWrapper}`}>
                            <input type="text" className={styles.inputText} ref={loginInput} required />
                            <span className={styles.floatingLabel}>Введите свой никнейм</span>
                        </div>
                        <div className={`${styles.inputWrapper} ${styles.passwordWrapper}`}>
                            <input type="password" className={styles.inputText} ref={passwordInput} required />
                            <span className={styles.floatingLabel}>Введите пароль</span>
                        </div>
                        <div className={styles.error} style={{ display: showError ? "block" : "none" }}>
                            <p>Имя пользователя или пароль указаны неправильно.</p>
                        </div>
                        <button onClick={clickLogin} type="button">Войти</button>
                    </form>
                </div>
            </div>
            <Footer externalClass="footer-external" />
        </React.Fragment>);
};

export default LoginPage;