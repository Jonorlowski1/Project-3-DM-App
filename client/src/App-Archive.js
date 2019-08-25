import React, { Component } from 'react';
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
import NavTabs from 'components/navTabs';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdmin: false,
      currentUser: null,
      role: null,
      authenticated: false
    };
  }

  componentDidMount = () => {
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser !== null && isAdmin) {
      this.setState({ role: Role.Admin, isAdmin, currentUser, authenticated: true });
    } else if (currentUser !== null) {
      this.setState({ role: Role.User, isAdmin, currentUser, authenticated: true });
    }
  }

  updateLocation() {
    console.log('Test:', this.state.role)
  }

  render() {
    const { authenticated } = this.state;
    return (
      <Router>
        {this.updateLocation()}
        {/* {isAdmin}
        <NavTabs></NavTabs> */}
        <React.Fragment>
          <Switch>
            <PrivateRoute
              roles={[Role.Admin, Role.User]}
              comparison={this.state.role}
              isAuth={authenticated}
              exact path="/game"
              component={GamePage}
            />
            <PrivateRoute
              roles={[Role.User]}
              comparison={this.state.role}
              isAuth={authenticated}
              exact path="/init"
              component={InitPage}
            />
            <PrivateRoute
              roles={[Role.Admin]}
              comparison={this.state.role}
              isAuth={authenticated}
              exact path="/initadmin"
              component={InitAdminPage}
            />
            <PrivateRoute
              roles={[Role.Admin]}
              comparison={this.state.role}
              isAuth={authenticated}
              exact path="/hue"
              component={HuePage}
            />
            <PrivateRoute
              roles={[Role.Admin, Role.User]}
              comparison={this.state.role}
              isAuth={authenticated}
              exact path="/creategame"
              component={CreateGamePage}
            />
            <PrivateRoute
              roles={[Role.Admin, Role.User]}
              comparison={this.state.role}
              isAuth={authenticated}
              exact path="/createcharacter"
              component={CreateCharacterPage}
            />
            <Route path="/" component={PublicRoutes} isAuth={authenticated} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;