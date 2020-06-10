import React from 'react';
import { Route } from "react-router-dom";
import IntroPage from './auth/introPage/introPage';

const IntroRoute = ({ signInClick, signUpClick, componentProps = {}, ...rest }) => (
    <Route {...rest} render={(props) => (
        <IntroPage {...props} signInClick={signInClick} signUpClick={signUpClick}/>
    )} />
);

export default IntroRoute;
