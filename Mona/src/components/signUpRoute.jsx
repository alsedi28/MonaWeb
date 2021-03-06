import React from 'react';
import { Route } from "react-router-dom";
import SignUpPage from './auth/signUpPage/signUpPage';

const SignUpRoute = ({ component: Component, isAuthenticated, signInClick, register, registrationError, componentProps = {}, ...rest }) => (
    <Route {...rest} render={(props) => (
        isAuthenticated === true
            ? <Component {...props} {...componentProps} />
            : <SignUpPage {...props} register={register} registrationError={registrationError} signInClick={signInClick} />
    )} />
);

export default SignUpRoute;
