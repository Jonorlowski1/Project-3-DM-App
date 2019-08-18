import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, roles, comparison, isAdmin, currentUser, ...rest }) => (
    <Route {...rest} render={props => {
        if (comparison === null) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location.pathname } }} />
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(comparison) === -1) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/'}} />
        }

        // authorised so return component
        return <Component isAdmin={isAdmin} currentUser={currentUser} gameList={gameList} gameKey={gameKey} {...props} />
    }} />
)

export default PrivateRoute;