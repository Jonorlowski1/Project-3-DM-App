import React, { Component } from 'react';
import axios from 'axios';
import GameCard from '../../components/gameCard';
import { Form, Container } from 'react-bulma-components';
import { Link } from "react-router-dom";
import MyButton from '../../components/buttons';

class GamePage extends Component {
    state = {
        gameList: [],
        gameKey: ''
    }

    componentDidMount() {
        this.loadGames();
    }

    handleChange = event => {
        const value = event.target.value;
        this.setState({
            [event.target.id]: value
        });
    }

    loadGames = () => {
        axios.get('/api/v1/games/' + this.props.location.state.user_id)
            .then(res => {
                let gameList = res.data;
                if (gameList !== this.state.gameList) {
                    this.setState({ gameList, gameKey: '' });
                }
            });
    };

    checkForAdmin = () => {
        let admin = this.props.location.state.admin;
        if (admin) {
            return (
                <Link to={{
                    pathname: '/creategame',
                    state: {
                        admin: this.props.location.state.admin,
                        user_id: this.props.location.state.user_id
                    }
                }}>
                    <MyButton text="Create New Game" primary={true}></MyButton>
                </Link>
            )
        }
        else return null;
    }

    bindGame = (event) => {
        event.preventDefault();
        axios.post('/api/v1/games/' + this.props.location.state.user_id, {
            secret: this.state.gameKey,
        }).then(res => {
            this.loadGames();
        });
    }

    checkForEmpty = () => {
        if (this.state.gameList.length === 0) {
            return (<div><h1>It doesn't look like you are current playing in any games</h1>
                <h2>Use the form below to join a game that your DM has already created</h2></div>);
        }
        else {
            return (<div >
                {this.state.gameList.map(game => (
                    <GameCard
                        id={game.id}
                        key={game.id}
                        name={game.name}
                        secret={game.secret}
                        admin={this.props.location.state.admin}
                        user_id={this.props.location.state.user_id}
                    />
                ))}
            </div>);
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.checkForEmpty()}
                <form onSubmit={this.handleSubmit}>
                    <Container>
                        <Form.Label>Join an existing game</Form.Label>
                        <Form.Input
                            value={this.state.gameKey}
                            type="text"
                            onChange={this.handleChange}
                            className="input"
                            id="gameKey"
                        />
                        <Form.Help>Please type the secret provided by your DM that is associated with your game</Form.Help>
                    </Container>
                    <MyButton
                        primary={false}
                        text="Bind Game To Your Account"
                        onClick={this.bindGame}
                    >
          </MyButton>
                </form>
                {this.checkForAdmin()}
            </React.Fragment>
        )
    }
}

export default GamePage;
