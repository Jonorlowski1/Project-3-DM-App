import React, { Component } from 'react';
import Role from './_helpers/role';
import history from './_helpers/history';
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
import { Router, Route, Switch } from "react-router-dom";
import NavTabs from 'components/navTabs';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdmin: false,
      currentUser: null,
      role: null,
    };

  }

  componentDidMount = () => {
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser !== '' && isAdmin) {
      this.setState({ role: Role.Admin, isAdmin, currentUser });
    } else if (currentUser !== '') {
      this.setState({ role: Role.User, isAdmin, currentUser });
    }
    console.log(isAdmin);
    console.log(currentUser);
  }

  render() {
    return (
      <Router history={history}>
        {/* {isAdmin}
        <NavTabs></NavTabs> */}
        <React.Fragment>
          <Switch>
            <PrivateRoute roles={[Role.Admin, Role.User]} comparison={this.state.role} exact path="/" component={GamePage} />
            <PrivateRoute roles={[Role.User]} comparison={this.state.role} exact path="/init" component={InitPage} />
            <PrivateRoute roles={[Role.Admin]} comparison={this.state.role} exact path="/initadmin" component={InitAdminPage} />
            <PrivateRoute roles={[Role.Admin]} comparison={this.state.role} exact path="/hue" component={HuePage} />
            <PrivateRoute roles={[Role.Admin, Role.User]} comparison={this.state.role} exact path="/creategame" component={CreateGamePage} />
            <PrivateRoute exact path="/createcharacter" roles={[Role.Admin, Role.User]} comparison={this.state.role} component={CreateCharacterPage} />
            <Route path="/" component={PublicRoutes} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;