import React from 'react';
import { Route } from "react-router-dom";
import IntroPage from './auth/introPage/introPage';

const IntroRoute = ({ component: Component, isAuthenticated, login, showError, componentProps = {}, ...rest }) => (
    <Route {...rest} render={(props) => (
        isAuthenticated === true
            ? <Component {...props} {...componentProps} />
            : <IntroPage {...props} login={login} showError={showError}/>
    )} />
);

export default IntroRoute;
