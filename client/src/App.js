import React, { Component } from 'react';
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import LoginPage from './Pages/loginPage';
import HuePage from './Pages/huePage';
import InitPage from './Pages/initPage';
import CreateUserPage from './Pages/createUserPage';
import ForgotPasswordPage from './Pages/forgotPasswordPage'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  state = {
    gameId: 1
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path='/createuser' component={CreateUserPage} />
            <Route exact path='/' component={LoginPage} />
            <Route exact path='/init' render={() => <InitPage gameId={this.state.gameId} />} />
            <Route exact path='/hue' component={HuePage} />
            <Route exact path='/forgotpassword' component={ForgotPasswordPage} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;