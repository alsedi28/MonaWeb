import React from 'react';

import Header from '../../header/header';
import Footer from '../../footer/footer';
import CommonButton from '../../buttons/commonButton/commonButton';
import AppLinkComponent from '../../appLinkComponent/appLinkComponent';

import styles from './loginPage.module.css';

import appIcon from '../../../../public/icons/appIcon.png';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nickname: "",
            password: "",
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    clickLogin() {
        if (!this.canBeSubmitted()) {
            return;
        }
        this.props.login(this.state.nickname, this.state.password);
    }

    showAlert() {
        console.error("In progress");
    }

    canBeSubmitted() {
        const { nickname, password } = this.state;
        return (nickname.length > 0 && password.length > 0);
    }

    handleInputChange() {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        const isSignInDisabled = !this.canBeSubmitted();

        return (
            <React.Fragment>
                <Header externalClass="header-external" onSignUp={this.showAlert}/>
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
                                        placeholder="Введите никнейм..."
                                        value={this.state.nickname}
                                        onChange={this.handleInputChange}
                                        required
                                    />

                                    <label className={styles.formLabel} for="lname">Пароль</label>
                                    <input
                                        className={styles.formInput}
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Введите пароль..."
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                        required
                                    />

                                    <div className={styles.error} style={{ display: this.props.showError ? "block" : "none" }}>
                                        <p>Имя пользователя или пароль указаны неправильно.</p>
                                    </div>
                                </form>

                                <button className={styles.forgotPasswordButton} onClick={this.showAlert}>Забыли пароль?</button>

                                <CommonButton
                                    externalClass="filledButton"
                                    title="Войти"
                                    style={{ width: `80%`, height: `56px` }}
                                    onClick={this.clickLogin.bind(this)}
                                    isDisabled={isSignInDisabled}
                                />
                            </div>
                        </div>

                        <AppLinkComponent />
                    </div>
                </div>
                <Footer externalClass="footer-external" />
            </React.Fragment>);
    }
};

export default LoginPage;
