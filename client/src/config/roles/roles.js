import React from 'react';
import { Route, Link } from "react-router-dom";
import { uniqBy } from 'lodash';
import rolesConfig from './rolesConfig.js';
import * as Routes from './index';


// TODO: Replace hardcoded roles with redux, localStorage, or get from server.
const roles = [
 //user roles + concatinate common role
 ...['user', 'admin']
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
              component={Routes[component]}
            />
          ))
        }
      </div>
    </section>
    {/*<Footer> Footer </Footer>*/}
  </div>
);

export default PrivateRoutes;