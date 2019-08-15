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
import NavTabs from 'components/navTabs';
import { userInfo } from 'os';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdmin: false,
      currentUser: null,
      role: null
    };
  }

  componentDidMount = () => {
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.setState({ isAdmin, currentUser })
    if (currentUser !== '' && isAdmin) {
      this.setState({ role: Role.Admin })
    } else if (currentUser !== '') {
      this.setState({ role: Role.User })
    }
    // const role = [Role.Admin]
    // const roles = [Role.Admin]
    // if (roles && roles.indexOf(role) === null) {
    //   // role not authorised so redirect to home page
    //   console.log('invalid')
    // } else {
    // console.log('valid')
    // }

  }

  render() {
    const { currentUser, isAdmin } = this.state;
    return (
      <Router>
        {/* {isAdmin}
        <NavTabs></NavTabs> */}
        <React.Fragment>
          <Switch>
            <PrivateRoute roles={[Role.Admin, Role.User]} comparison={this.state.role} path="/game" component={GamePage} />
            <PrivateRoute roles={[Role.User]} comparison={this.state.role} path="/init" component={InitPage} />
            <PrivateRoute roles={[Role.Admin]} comparison={this.state.role} path="/initadmin" component={InitAdminPage} />
            <PrivateRoute roles={[Role.Admin]} comparison={this.state.role} path="/hue" component={HuePage} />
            <PrivateRoute roles={[Role.Admin, Role.User]} comparison={this.state.role} path="/creategame" component={CreateGamePage} />
            <PrivateRoute path="/createcharacter" roles={[Role.Admin, Role.User]} comparison={this.state.role} component={CreateCharacterPage} />
            <Route path="/" component={PublicRoutes} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;