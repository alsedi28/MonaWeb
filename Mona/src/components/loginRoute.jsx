import React from 'react';
import { Route } from "react-router-dom";
import LoginPage from './loginPage/loginPage';

const LoginRoute = ({ component: Component, hasAuthorization, login, componentProps = {}, ...rest }) => (
    <Route {...rest} render={(props) => (
        hasAuthorization === true
            ? <Component {...props} {...componentProps} />
            : <LoginPage {...props} login={login} />
    )} />
);

export default LoginRoute;