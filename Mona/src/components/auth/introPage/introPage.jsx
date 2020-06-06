import React from 'react';
import { useHistory } from "react-router-dom";

import Header from '../../header/header';
import Footer from '../../footer/footer';
import CommonButton from '../../buttons/commonButton/commonButton';
import IntroPageBanner from './introPageBanner/introPageBanner';
import IntroPageDescription from './introPageDescription/introPageDescription';

import styles from './introPage.module.css';

function IntroPage(props) {

    return (
        <React.Fragment>
            <Header externalClass="header-external" onSignIn={props.signInClick} onSignUp={props.signUpClick} />
            <IntroPageBanner onSignIn={props.signInClick} onSignUp={props.signUpClick} />
            <IntroPageDescription />
            <Footer externalClass="footer-external" />
        </React.Fragment>);
};

export default IntroPage;
