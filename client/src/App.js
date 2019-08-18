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
   this.sessionCheck();
  }

  sessionCheck = () => {
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser !== '' && isAdmin) {
      this.setState({ role: Role.Admin, isAdmin, currentUser });
    } else if (currentUser !== '') {
      this.setState({ role: Role.User, isAdmin, currentUser });
    }
  }

  render() {
    return (
      <Router history={history}>
        {/* {isAdmin}
        <NavTabs></NavTabs> */}
        <React.Fragment>
          <Switch>
            <PrivateRoute
              roles={[Role.Admin, Role.User]}
              comparison={this.state.role}
              exact path="/"
              isAdmin={this.state.isAdmin}
              currentUser={this.state.currentUser}
              component={GamePage} />
            <PrivateRoute
              roles={[Role.User]}
              comparison={this.state.role}
              exact path="/init"
              currentUser={this.state.currentUser}
              component={InitPage} />
            <PrivateRoute
              roles={[Role.Admin]}
              comparison={this.state.role}
              exact path="/initadmin"
              isAdmin={this.state.isAdmin}
              component={InitAdminPage} />
            <PrivateRoute
              roles={[Role.Admin]}
              comparison={this.state.role}
              exact path="/hue"
              isAdmin={this.state.isAdmin}
              component={HuePage} />
            <PrivateRoute
              roles={[Role.Admin, Role.User]}
              comparison={this.state.role}
              exact path="/creategame"
              isAdmin={this.state.isAdmin}
              currentUser={this.state.currentUser}
              component={CreateGamePage} />
            <PrivateRoute
              roles={[Role.Admin, Role.User]}
              comparison={this.state.role}
              exact path="/createcharacter"
              isAdmin={this.state.isAdmin}
              currentUser={this.state.currentUser}
              component={CreateCharacterPage} />
            <Route path="/" component={PublicRoutes} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;