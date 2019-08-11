import React, { Component } from 'react';
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
    admin: false,
    user_id: null
  }

  componentDidMount = async () => {
    const admin = await JSON.parse(localStorage.getItem("isAdmin"));
    const user_id = await JSON.parse(localStorage.getItem("user_id"));
    this.setState({ admin, user_id });
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <PrivateRoute path="/game" component={GamePage} />
            <PrivateRoute path="/init" component={InitPage} />
            <PrivateRoute roles={this.state.admin} path="/initadmin" component={InitAdminPage} />
            <PrivateRoute roles={this.state.admin} path="/hue" component={HuePage} />
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