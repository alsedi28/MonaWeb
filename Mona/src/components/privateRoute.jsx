import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated, componentProps = {}, ...rest }) => (
    <Route {...rest} render={(props) => (
        isAuthenticated === true
            ? <Component {...props} {...componentProps} />
            : <Redirect to='/login'/>
    )} />
);

export default PrivateRoute;