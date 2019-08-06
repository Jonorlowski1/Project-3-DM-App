import React, { Component } from 'react';
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import LoginPage from './Pages/loginPage';
import HuePage from './Pages/huePage';
import InitPage from './Pages/initPage';
import GamePage from './Pages/gamePage';
import CreateUserPage from './Pages/createUserPage';
import CreateGamePage from './Pages/createGamePage';
import ForgotPasswordPage from './Pages/forgotPasswordPage'
import InitAdminPage from './Pages/initAdminPage'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateCharacterPage from './Pages/createCharacterPage'

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
           
           
            <Route exact path='/init' component={InitPage} />
            <Route exact path='/initadmin' component={InitAdminPage} />
            <Route exact path='/hue' component={HuePage} />
            <Route exact path='/game' component={GamePage} />
         
      
            <Route exact path='/creategame' component={CreateGamePage} />
            <Route exact path='/createcharacter' component={CreateCharacterPage} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;