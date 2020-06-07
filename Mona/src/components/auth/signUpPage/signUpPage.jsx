import React from 'react';

import Header from '../../header/header';
import Footer from '../../footer/footer';
import CommonButton from '../../buttons/commonButton/commonButton';
import AppLinkComponent from '../../appLinkComponent/appLinkComponent';
import Constants from '../../../constants';

import styles from './signUpPage.module.css';

class SignUpPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            nickname: "",
            name: "",
            password: "",
            emailValid: false,
            passwordValid: false,
            formValid: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    clickRegister() {
        if (!this.state.formValid) {
            return;
        }
        this.props.register(this.state.email, this.state.nickname, this.state.name, this.state.password);
    }

    handleInputChange() {
        const {name, value} = event.target;
        this.setState({[name]: value},
                () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                break;
            case 'password':
                passwordValid = value.length >= Constants.MIN_PASSWORD_LENGHT;
                break;
            default:
                break;
        }
        this.setState({
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.emailValid
            && this.state.passwordValid
            && this.state.nickname.length > 0
            && this.state.name.length > 0
        });
    }

    render() {
        const isSignInDisabled = !this.state.formValid;

        let displayEmailError = { display: !this.state.emailValid && this.state.email.length > 0 ? "block" : "none" };
        let displayPasswordError = { display: !this.state.passwordValid && this.state.password.length > 0 ? "block" : "none" };

        return (
            <React.Fragment>
                <Header externalClass="header-external" onSignIn={this.props.signInClick}/>
                <div className={styles.container}>
                    <div>
                        <div className={styles.formBlock}>
                            <div className={styles.formTitle}>
                                <p>Регистрация!</p>
                                <p>Зарегистрируйтесь, чтобы видеть рекомендации друзей о фильмах и делиться ими самому!</p>
                            </div>

                            <div className={styles.dividerContainer}>
                                <div className={styles.dividerLine}></div>
                                <div className={styles.dividerText}>или</div>
                                <div className={styles.dividerLine}></div>
                            </div>

                            <div className={styles.formsContainer}>
                                <form>
                                    <input className={styles.formInput}
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                        required
                                    />

                                    <div className={styles.error} style={displayEmailError}>
                                        <p>Пример правильного email: ivan.ivanov@mail.ru</p>
                                    </div>

                                    <input className={styles.formInput}
                                        type="text"
                                        name="nickname"
                                        placeholder="Никнейм"
                                        value={this.state.nickname}
                                        onChange={this.handleInputChange}
                                        required
                                    />

                                    <input className={styles.formInput}
                                        type="text"
                                        name="name"
                                        placeholder="Ваше имя"
                                        value={this.state.name}
                                        onChange={this.handleInputChange}
                                        required
                                    />

                                    <input
                                        className={styles.formInput}
                                        type="password"
                                        name="password"
                                        placeholder="Пароль (мин. 8 символов)"
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                        required
                                    />

                                    <div className={styles.error} style={displayPasswordError}>
                                        <p>Пароль должен содержать минимум 8 символов</p>
                                    </div>
                                </form>

                                <CommonButton
                                    externalClass="filledButton"
                                    title="Создать аккаунт"
                                    style={{ width: `80%`, height: `56px` }}
                                    onClick={this.clickRegister.bind(this)}
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

export default SignUpPage;
