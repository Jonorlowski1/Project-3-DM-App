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
      game_id: null,
      game_name: null,
      secret: null
    };

  }

  componentWillMount = () => {
    this.sessionCheck();
    this.loadGameId();
    console.log(window.location.href)
  }

  sessionCheck = () => {
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log('Current User:', currentUser)
    if (currentUser !== null && isAdmin) {
      this.setState({ role: Role.Admin, isAdmin, currentUser });
    } else if (currentUser !== null) {
      this.setState({ role: Role.User, isAdmin, currentUser });
    }
  }

  loadGameId = () => {
    let game_id = JSON.parse(localStorage.getItem("gameId"));
    let game_name = JSON.parse(localStorage.getItem("gameName"));
    let secret = JSON.parse(localStorage.getItem("gameSecret"));
    this.setState({ game_id, game_name, secret });
  }

  render() {
    const { role, currentUser, isAdmin, game_id, game_name, secret } = this.state
    return (
      <Router history={history}>
        {console.log(history.location.pathname)}
        {role === Role.User || window.location.pathname === '/' ? null
          : <NavTabs game_id={game_id} game_name={game_name} secret={secret} />
        }
        {/* {isAdmin}
        <NavTabs></NavTabs> */}
        <React.Fragment>
          <Switch>
            <PrivateRoute
              roles={[Role.Admin, Role.User]}
              comparison={role}
              exact path="/"
              isAdmin={isAdmin}
              currentUser={currentUser}
              component={GamePage} />
            <PrivateRoute
              roles={[Role.User]}
              comparison={role}
              exact path="/init"
              currentUser={currentUser}
              component={InitPage} />
            <PrivateRoute
              roles={[Role.Admin]}
              comparison={role}
              exact path="/initadmin"
              isAdmin={isAdmin}
              component={InitAdminPage} />
            <PrivateRoute
              roles={[Role.Admin]}
              comparison={role}
              exact path="/hue"
              isAdmin={isAdmin}
              component={HuePage} />
            <PrivateRoute
              roles={[Role.Admin, Role.User]}
              comparison={role}
              exact path="/creategame"
              isAdmin={isAdmin}
              currentUser={currentUser}
              component={CreateGamePage} />
            <PrivateRoute
              roles={[Role.Admin, Role.User]}
              comparison={role}
              exact path="/createcharacter"
              isAdmin={isAdmin}
              currentUser={currentUser}
              component={CreateCharacterPage} />
            <Route path="/" component={PublicRoutes} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;