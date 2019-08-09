import React from 'react';
import { Route, Link } from "react-router-dom";
import { uniqBy } from 'lodash';
import rolesConfig from './rolesConfig.js';

const admin = JSON.parse(localStorage.getItem("isAdmin"));

// TODO: Replace hardcoded roles with redux, localStorage, or get from server.
const roles = [
 //user roles + concatinate common role
 ...['user', admin]
];

let allowedRoutes = roles.reduce((acc, role) => {
  return [
    ...acc,
    ...rolesConfig[role].routes
  ]
}, []);

// For removing duplicate entries.
allowedRoutes = uniqBy(allowedRoutes, 'component');

const PrivateRoutes = ({match}) => (
  <div>
    {/*<Header> Header </Header>*/}
    <section>
      <div>
        {
          allowedRoutes.map(({component, url}) => (
            <Route
              key={component}
              path={`${match.path}${url}`}
              component={component}
            />
          ))
        }
      </div>
    </section>
    {/*<Footer> Footer </Footer>*/}
  </div>
);

export default PrivateRoutes;