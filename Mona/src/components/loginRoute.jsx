import React from 'react';
import { Route } from "react-router-dom";
import LoginPage from './auth/loginPage/loginPage';

const LoginRoute = ({ component: Component, isAuthenticated, login, showError, componentProps = {}, ...rest }) => (
    <Route {...rest} render={(props) => (
        isAuthenticated === true
            ? <Component {...props} {...componentProps} />
            : <LoginPage {...props} login={login} showError={showError}/>
    )} />
);

export default LoginRoute;
