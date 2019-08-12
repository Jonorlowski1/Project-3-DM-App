import React, { Component } from 'react';
import history from './_helpers/history';
import Role from './_helpers/role';
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import PublicRoutes from './routes/PublicRoutes.js';
import PrivateRoute from './routes/PrivateRoutes';
import InitPage from './Pages/initPage';
import InitAdminPage from './Pages/initAdminPage';
import HuePage from './Pages/huePage';
import GamePage from './Pages/gamePage';
import CreateGamePage from './Pages/createGamePage';
import CreateCharacterPage from './Pages/createCharacterPage';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


class App extends Component {

  state = {
    isAdmin: false,
    currentUser: null
  }

  componentDidMount = async () => {
    const isAdmin = await JSON.parse(localStorage.getItem("isAdmin"));
    const currentUser = await JSON.parse(localStorage.getItem("currentUser"));
    this.setState({ isAdmin: currentUser && isAdmin === Role.Admin, currentUser });
  }

  render() {
    const { currentUser, isAdmin } = this.state;
    return (
      <Router history={history}>
        <React.Fragment>
          <Switch>
            <PrivateRoute path="/game" component={GamePage} />
            <PrivateRoute path="/init" component={InitPage} />
            <PrivateRoute roles={[Role.Admin]} path="/initadmin" component={InitAdminPage} />
            <PrivateRoute roles={[Role.Admin]} path="/hue" component={HuePage} />
            <PrivateRoute path="/creategame" component={CreateGamePage} />
            <PrivateRoute path="/createcharacter" component={CreateCharacterPage} />
            <Route path="/" component={PublicRoutes} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;