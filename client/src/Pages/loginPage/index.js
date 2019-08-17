import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Form, Container } from 'react-bulma-components';
import './index.css';
import { Link } from "react-router-dom";
import MyButton from '../../components/buttons';
import Modal from 'react-modal';

Modal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginSuccess: false,
      isAdmin: false,
      currentUser: null,
      modalIsOpen: false
    };
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    const { pathname } = this.props.location;
    console.log(pathname)
    if (currentUser) {
      this.props.history.push({
        pathname: '/',
        state: {
          currentUser: currentUser,
          isAdmin: isAdmin
        }
      });
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

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
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        this.props.history.push({
          pathname: '/',
          currentUser: currentUser,
          isAdmin: isAdmin,
        });
      }
    } catch (err) {
      if (err) {
        this.openModal();
      }
      this.setState({
        loginSuccess: false,
      })
    }
  };

  render() {
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

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Failed Login"
        >
          <h2 className="title-2">Login failed, incorrect e-mail or password</h2>
          <Container id="buttons" fluid>
            <MyButton
              text="Close"
              primary={true}
              type="submit"
              onClick={this.closeModal}
            />
          </Container>
        </Modal>

      </div >
    );
  };
}

export default LoginPage;
