import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Form, Container } from 'react-bulma-components';
import './index.css';
import MyButton from '../../components/buttons'
import Modal from 'react-modal';

const currentUser = JSON.parse(localStorage.getItem("user_id"));
const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

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

class CreateUserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            admin: false,
            createSuccess: false,
            user_id: null,
            modalIsOpen: false
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

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
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({
            [event.target.id]: value
        });
    }

    // validateEmail = email => {
    //     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return re.test(String(email).toLowerCase());
    // }

    async handleLogin(event) {
        event.preventDefault();


        try {
            const newUser = await axios.get('api/v1/users/' + this.state.email);
            if (newUser.data) {
                this.openModal();
            }
            else {
                const response = await axios.post('api/v1/users', {
                    email: this.state.email,
                    password: this.state.password,
                    admin: this.state.admin
                });
                if (response.data) {
                    const admin = response.data.admin;
                    const user_id = response.data.id;
                    this.setState({
                        createSuccess: true,
                        admin,
                        user_id
                    });
                }
            }
        } catch (err) {
            if (err) throw err;
            this.setState({
                createSuccess: false,
            })
        }
    }

    render() {
        if (this.state.createSuccess) {
            return <Redirect to={{
                pathname: '/game',
                state: {
                    user_id: this.state.user_id,
                    admin: this.state.admin,
                }
            }} />
        }

        return (
            <div className="createUser">
                <h1 className="title-1">Create New User</h1>
                <form onSubmit={this.handleSubmit}>
                    <Container>
                        <Form.Label>Email</Form.Label>
                        <Form.Input
                            value={this.state.email}
                            onChange={this.handleChange}
                            className="input"
                            type="email"
                            id="email"
                        />
                    </Container>
                    <Container>
                        <Form.Label>Password</Form.Label>
                        <Form.Input
                            value={this.state.password}
                            onChange={this.handleChange}
                            className="input"
                            type="password"
                            id="password"
                        />
                    </Container>
                    <Container id="checkContainer" breakpoint='fullhd'>
                        <Form.Checkbox onChange={this.handleChange} id="admin" checked={this.state.admin}>
                            <span>Are you the dungeon master for a game?</span>
                        </Form.Checkbox>
                    </Container>
                    <Container id="buttons" fluid>
                        <MyButton
                            primary={true}
                            disabled={!this.validateForm()}
                            onClick={this.handleLogin}
                            text="Create User"
                        />
                    </Container>
                </form>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Failed User Create"
                >
                    <h2 className="title-2">A user with this e-mail already exists.</h2>
                    <p className="title-2">Would you like to reset your password?</p>
                    <Container id="buttons" fluid>
                        <MyButton
                            text="Close"
                            primary={true}
                            type="submit"
                            onClick={this.closeModal}
                        />
                        <Link to="/forgotpassword">
                            <MyButton static={true} text="Forgot Password?"></MyButton>
                        </Link>
                    </Container>
                </Modal>
            </div>
        );
    }
}

export default CreateUserPage;