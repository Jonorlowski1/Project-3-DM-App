import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Form, Container } from 'react-bulma-components';
import './index.css';
import { Link } from "react-router-dom";
import MyButton from '../../components/buttons';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginSuccess: false,
      isAdmin: false,
      currentUser: null
    };
    // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    // const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    // if (currentUser) {
    //   return <Redirect to={{
    //     pathname: '/game',
    //     state: {
    //       currentUser: currentUser,
    //       isAdmin: isAdmin
    //     }
    //   }} />
    // } else {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    if (currentUser) {
      this.props.history.push({
        pathname: '/game',
        state: {
          currentUser: currentUser,
          isAdmin: isAdmin
        }
      });
    }
    this.handleLogin = this.handleLogin.bind(this);
    // }

  };

  // componentDidMount = () => {
  //   this.checkForSession();
  // }

  // checkForSession = () => {
  //   const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  //   const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  //   console.log(currentUser)
  //   console.log(isAdmin)
  //   if (currentUser > 0) {
  //     return <Redirect to={{
  //       pathname: '/game',
  //       state: {
  //         currentUser: currentUser,
  //         isAdmin: isAdmin
  //       }
  //     }} />
  //   }
  // }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  async handleLogin(event) {
    event.preventDefault();

    try {
      const response = await axios.post('api/v1/auth/login', {
        email: this.state.email,
        password: this.state.password
      });
      if (response.data) {
        const isAdmin = response.data.admin;
        const currentUser = response.data.id;
        localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        this.setState({
          isAdmin,
          currentUser,
          loginSuccess: true
        });
      }
    } catch (err) {
      if (err) throw err;
      this.setState({
        loginSuccess: false,
      })
    }
  };

  render() {
    if (this.state.loginSuccess) {
      return <Redirect to={{
        pathname: '/game',
        state: {
          currentUser: this.state.currentUser,
          isAdmin: this.state.isAdmin
        }
      }} />
    }
    // else if (this.state.loginSuccess) {
    //   return <Redirect to='/game' />
    // }

    return (
      <div className="Login">
        <h1 className="title-1 loginTitle">DM Companion</h1>
        <img width="275px" alt="wyvern" src="/images/wyvern-realistic.png"></img>
        <form onSubmit={this.handleSubmit} className="loginForm">
          <Container>
            <Form.Label>Email</Form.Label>
            <Form.Input
              value={this.state.email}
              type="email"
              onChange={this.handleChange}
              className="input"
              id="email"
            />
          </Container>
          <Container id="passwordInput">
            <Form.Label>Password</Form.Label>
            <Form.Input
              value={this.state.password}
              type="password"
              onChange={this.handleChange}
              className="input"
              id="password"
            />
          </Container>
          <div>
            <Container id="buttons" fluid>
              <MyButton
                text="Login"
                primary={true}
                type="submit"
                disabled={!this.validateForm()}
                onClick={this.handleLogin}
              >
              </MyButton>
              <Link to="/createuser">
                <MyButton static={true} text="Create Account"></MyButton>
              </Link>
            </Container>
          </div>
        </form>
      </div >
    );
  };
}

export default LoginPage;
