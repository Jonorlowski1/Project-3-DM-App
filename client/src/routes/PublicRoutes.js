import React from 'react';
import { Route } from "react-router-dom";
import LoginPage from '../Pages/loginPage';
import CreateUserPage from '../Pages/createUserPage';
import ForgotPasswordPage from '../Pages/forgotPasswordPage';

const PublicRoutes = ({match}) => (
<div>
  <Route
   path={`${match.path}forgotpassword`}
   component={ForgotPasswordPage} 
  />
  <Route
   path={`${match.path}createuser`} 
   component={CreateUserPage} 
  />
  <Route 
   path='/login'
   exact component={LoginPage} 
  />
</div>
);

export default PublicRoutes;

