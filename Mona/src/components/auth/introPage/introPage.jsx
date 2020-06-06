import React, { useRef } from 'react';

import Header from '../../header/header';
import Footer from '../../footer/footer';
import CommonButton from '../../buttons/commonButton/commonButton';
import IntroPageBanner from './introPageBanner/introPageBanner';
import IntroPageDescription from './introPageDescription/introPageDescription';

import styles from './introPage.module.css';

function IntroPage(props) {
    const loginInput = useRef(null);
    const passwordInput = useRef(null);

    function clickLogin() {
        let loginVal = loginInput.current.value;
        let passwordVal = passwordInput.current.value;

        if (!loginVal || !passwordVal)
            return;

        props.login(loginVal, passwordVal);
    }

    return (
        <React.Fragment>
            <Header externalClass="header-external" />
            <IntroPageBanner />
            <IntroPageDescription />
            <Footer externalClass="footer-external" />
        </React.Fragment>);
};

export default IntroPage;
