import React from 'react';
import { Route } from "react-router-dom";
import InitPage from '../Pages/initPage';
import InitAdminPage from '../Pages/initAdminPage';
import HuePage from '../Pages/huePage';
import GamePage from '../Pages/gamePage';
import CreateGamePage from '../Pages/createGamePage';
import CreateCharacterPage from '../Pages/createCharacterPage';

const PrivateRoutes = ({match}) => (
<div>
  <Route
   path={`${match.path}init`}
   component={InitPage} 
  />
  <Route
   path={`${match.path}initadmin`} 
   component={InitAdminPage} 
  />
  <Route 
   path={`${match.path}hue`}
   exact component={HuePage} 
  />
  <Route 
   path={`${match.path}game`}
   exact component={GamePage} 
  />
  <Route 
   path={`${match.path}creategame`}
   exact component={CreateGamePage} 
  />
  <Route 
   path={`${match.path}createcharacter`}
   exact component={CreateCharacterPage} 
  />
  
</div>
);

export default PrivateRoutes;