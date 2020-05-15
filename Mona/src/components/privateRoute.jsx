import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, hasAuthorization, componentProps = {}, ...rest }) => (
    <Route {...rest} render={(props) => (
        hasAuthorization === true
            ? <Component {...props} {...componentProps} />
            : <Redirect to='/login'/>
    )} />
);

export default PrivateRoute;