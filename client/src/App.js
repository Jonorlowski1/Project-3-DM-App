import React, { Component } from 'react';
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import PublicRoutes from './routes/PublicRoutes.js';
import PrivateRoutes from './config/roles.js';
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
            <Route path="/game" component={PrivateRoutes} />
            <Route path="/" component={PublicRoutes} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;