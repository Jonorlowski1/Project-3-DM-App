/* eslint-disable no-console */
import React, { Component } from 'react';
import { Form, Container } from 'react-bulma-components';
import axios from 'axios';
import { Link } from "react-router-dom";
import MyButton from '../../components/buttons'
import Modal from 'react-modal';
import "./index.css"

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



class ForgotPasswordPage extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      showError: false,
      messageFromServer: '',
      showNullError: false,
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendEmail = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    if (email === '') {
      this.openModal();
      this.setState({
        showError: false,
        messageFromServer: '',
        showNullError: true,
      });
    } else {
      try {
        const response = await axios.post(
          'api/v1/forgotpassword',
          {
            email,
          },
        );
        if (response.data === 'recovery email sent') {
          this.openModal();
          this.setState({
            showError: false,
            messageFromServer: 'recovery email sent',
            showNullError: false,
          });
        }
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === 'email not in db') {
          this.openModal();
          this.setState({
            showError: true,
            messageFromServer: '',
            showNullError: false,
          });
        }
      }
    }
  };

  emailError = () => {
    if (this.state.showError) {
      return (<Link to="/createuser">
        <MyButton static={true} text="Create Account"></MyButton>
      </Link>);
    }
  }

  render() {
    const {
      email, messageFromServer, showNullError, showError
    } = this.state;

    return (
      <div className="passwordReset">
        <h1 className="title-1 title-2">Forgot your password?</h1>
        <form onSubmit={this.sendEmail}>
          <Container>
            <Form.Label>Email</Form.Label>
            <Form.Input
              value={email}
              type="email"
              onChange={this.handleChange('email')}
              className="input"
              id="email"
              placeholder="Email Address"
            />
          </Container>
          <Container id="buttons" fluid>
            <MyButton
              primary={true}
              onClick={this.sendEmail}
              text="Send Password Reset Email"
              type='submit'
            />
          </Container>
        </form>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Email Response"
        >
          {showNullError && (
            <div className="title-2">
              <p>The email address cannot be empty.</p>
            </div>
          )}
          {showError && (
            <div className="title-2">
              <p>
                That email address isn&apos;t recognized. Please try again or
                register for a new account.
            </p>
            </div>
          )}
          {messageFromServer === 'recovery email sent' && (
            <div className="title-2">
              <h3>Password Reset Email Successfully Sent!</h3>
            </div>
          )}
          <Container id="buttons" fluid>
            {this.emailError()}
            <MyButton
              text="Close"
              primary={true}
              type="submit"
              onClick={this.closeModal}
            />
          </Container>
        </Modal>

      </div>
    );
  }
}

export default ForgotPasswordPage;