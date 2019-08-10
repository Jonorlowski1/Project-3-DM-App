import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Form, Container } from 'react-bulma-components';
import './index.css';
import MyButton from '../../components/buttons'

class CreateUserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            admin: false,
            createSuccess: false,
            user_id: null
        };

        this.handleLogin = this.handleLogin.bind(this);
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
                alert("A user with this e-mail already exists");
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
            </div>
        );
    }
}

export default CreateUserPage;