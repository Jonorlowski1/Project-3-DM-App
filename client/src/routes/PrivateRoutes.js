import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const PrivateRoute = ({ component: Component, roles, comparison, isAuth, ...rest }) => (
    <Route {...rest} render={props => {
        if (!isAuth) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(comparison) === -1) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/'}} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)

export default PrivateRoute;