/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from "react-router-dom";
import MyButton from '../../components/buttons'
import { Form, Container } from 'react-bulma-components'
import Modal from 'react-modal';

const loading = {
    margin: '1em',
    fontSize: '24px',
};


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

export default class ResetPasswordPage extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            updated: false,
            isLoading: true,
            error: false,
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    async componentDidMount() {
        const {
            match: {
                params: { token },
            },
        } = this.props;
        console.log(token);
        try {
            const response = await axios.get('/api/v1/resetpassword/' + token);
            console.log(response);
            if (response.data.message === 'password reset link a-ok') {
                this.setState({
                    email: response.data.email,
                    updated: false,
                    isLoading: false,
                    error: false,
                });
            }
        } catch (error) {
            console.log(error.response.data);
            this.setState({
                updated: false,
                isLoading: false,
                error: true,
            });
        }
    }

    handleChange = name => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    updatePassword = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        const {
            match: {
                params: { token },
            },
        } = this.props;
        try {
            const response = await axios.put(
                '/api/v1/updatepassword',
                {
                    email,
                    password,
                    resetPasswordToken: token,
                },
            );
            console.log(response.data);
            if (response.data.message === 'password updated') {
                this.openModal();
                this.setState({
                    updated: true,
                    error: false,
                });
            } else {
                this.setState({
                    updated: false,
                    error: true,
                });
            }
        } catch (error) {
            console.log(error.response.data);
        }
    };

    render() {
        const {
            password, error, isLoading, updated
        } = this.state;

        if (error) {
            return (
                <div>
                    <h1 className="title-1 title-2">Password Reset</h1>
                    <div style={loading}>
                        <h4 className="title-2">Problem resetting password. Please send another reset link.</h4>
                        <Container id="buttons" fluid>
                            <Link to="/">
                                <MyButton static={true} text="Go Home"></MyButton>
                            </Link>
                            <Link to="/forgotpassword">
                                <MyButton static={true} primary={true} text="Forgot Password?"></MyButton>
                            </Link>
                        </Container>
                    </div>
                </div>
            );
        }
        if (isLoading) {
            return (
                <div>
                    <h1 className="title-1 title-2">Password Reset</h1>
                    <div className="title-2" style={loading}>Loading User Data...</div>
                </div>
            );
        }
        return (
            <div className="passwordReset">
                <h1 className="title-1 title-2">Password Reset</h1>
                <form onSubmit={this.updatePassword}>
                    <Container id="formContainer">
                        <Form.Label>New Password</Form.Label>
                        <Form.Input
                            value={password}
                            type="password"
                            onChange={this.handleChange('password')}
                            className="input"
                            id="password"
                            label="password"
                            placeholder="password"
                        />
                    </Container>
                    <Container id="buttons" fluid>
                        <MyButton
                            static={true}
                            text="Update Password"
                            type='submit'
                        />
                        <Link to="/">
                            <MyButton static={true} primary={true} text="Login Page"></MyButton>
                        </Link>
                    </Container>
                </form>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Email Response"
                >
                    {updated && (
                        <div className="title-2">
                            <p>Your password has been successfully reset, please try logging in again.</p>
                        </div>
                    )}
                    <Container id="buttons" fluid>
                        <Link to="/">
                            <MyButton static={true} text="Login Page"></MyButton>
                        </Link>
                    </Container>
                </Modal>
            </div >
        );
    }
}

ResetPasswordPage.propTypes = {
    // eslint-disable-next-line react/require-default-props
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired,
        }),
    }),
};