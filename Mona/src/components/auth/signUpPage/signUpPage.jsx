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
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    clickRegister() {
        if (!this.state.formValid) {
            return;
        }
        this.props.register(this.state.email, this.state.nickname, this.state.name, this.state.password);
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.clickRegister()
        }
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
                passwordValid = value.length >= Constants.MIN_PASSWORD_LENGTH;
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
        let displayRegistrationError = { display: this.props.registrationError != null ? "block" : "none"  };
        let registrationErrorText = this.props.registrationError != null ? this.props.registrationError.toString() : "неизвестная ошибка";

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

                            {/* uncomment when auth with social networks will be implemented
                                <div className={styles.dividerContainer}>
                                    <div className={styles.dividerLine}></div>
                                    <div className={styles.dividerText}>или</div>
                                    <div className={styles.dividerLine}></div>
                                </div>
                             */}

                            <div className={styles.formsContainer}>
                                <form>
                                    <input className={styles.formInput}
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange}
                                        onKeyPress={this.handleKeyPress}
                                        required
                                    />

                                    <div className={styles.warning} style={displayEmailError}>
                                        <p>Пример правильного email: ivan.ivanov@mail.ru</p>
                                    </div>

                                    <input className={styles.formInput}
                                        type="text"
                                        name="nickname"
                                        placeholder="Никнейм"
                                        value={this.state.nickname}
                                        onChange={this.handleInputChange}
                                        onKeyPress={this.handleKeyPress}
                                        required
                                    />

                                    <input className={styles.formInput}
                                        type="text"
                                        name="name"
                                        placeholder="Ваше имя"
                                        value={this.state.name}
                                        onChange={this.handleInputChange}
                                        onKeyPress={this.handleKeyPress}
                                        required
                                    />

                                    <input
                                        className={styles.formInput}
                                        type="password"
                                        name="password"
                                        placeholder="Пароль (мин. 8 символов)"
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                        onKeyPress={this.handleKeyPress}
                                        required
                                    />

                                    <div className={styles.warning} style={displayPasswordError}>
                                        <p>Пароль должен содержать минимум 8 символов</p>
                                    </div>
                                </form>

                                <div className={styles.error} style={displayRegistrationError}>
                                    <p>Возникла ошибка при регистрации: {registrationErrorText}</p>
                                </div>

                                <CommonButton
                                    externalClass="filledButton"
                                    secondaryExternalClass="formButton"
                                    title="Создать аккаунт"
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
