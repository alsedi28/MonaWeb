import React from 'react';

import Header from '../../header/header';
import Footer from '../../footer/footer';
import IntroPageBanner from './introPageBanner/introPageBanner';
import IntroPageDescription from './introPageDescription/introPageDescription';

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
