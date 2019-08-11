import React, { Component } from 'react';
import axios from 'axios';
import GameCard from '../../components/gameCard';
import { Form, Container, Heading } from 'react-bulma-components';
import { Link } from "react-router-dom";
import MyButton from '../../components/buttons';
import NavTabs from '../../components/navTabs';
import './index.css';

const currentUser = JSON.parse(localStorage.getItem("user_id"));
const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

class GamePage extends Component {
    state = {
        gameList: [],
        gameKey: ''
    }

    componentDidMount() {
        if (!currentUser) {
            this.props.history.push('/');
        }

        this.loadGames();
    }

    handleChange = event => {
        const value = event.target.value;
        this.setState({
            [event.target.id]: value
        });
    }

    loadGames = () => {
        axios.get('/api/v1/games/' + currentUser)
            .then(res => {
                let gameList = res.data;
                if (gameList !== this.state.gameList) {
                    this.setState({ gameList, gameKey: '' });
                }
            });
    };

    checkForAdmin = () => {
        let admin = isAdmin;
        if (admin) {
            return (
                <Link to={{
                    pathname: '/creategame',
                    state: {
                        admin: isAdmin,
                        user_id: currentUser
                    }
                }}>
                    <MyButton text="Create New Game" primary={false}></MyButton>
                </Link>
            )
        }
        else return null;
    }

    bindGame = (event) => {
        event.preventDefault();
        axios.post('/api/v1/games/' + currentUser, {
            secret: this.state.gameKey,
        }).then(res => {
            this.loadGames();
        });
    }

    checkForEmpty = () => {
        if (this.state.gameList.length === 0) {
            return (<div><Heading className="title-1 title-2" size={3}>It doesn't look like you are current playing in any games.</Heading>
                <Heading className="title-1 title-2" size={5}>Use the form below to join a game that your DM has already created</Heading><br />
            </div>);
        }
        else {
            return (<div id="gameCard">
                {this.state.gameList.map(game => (
                    <GameCard
                        id={game.id}
                        key={game.id}
                        name={game.name}
                        secret={game.secret}
                        admin={isAdmin}
                        user_id={currentUser}
                    />
                ))}
            </div>);
        }
    }

    render() {
        return (
            <React.Fragment>
                <NavTabs game_id={this.state.game_id} game_name={this.state.game_name} secret={this.state.secret} />
                <h1 className="title-1 loginTitle" style={{ textAlign: 'center' }}>Game List</h1>
                {this.checkForEmpty()}
                <form onSubmit={this.handleSubmit}>
                    <Container id="secretForm" fluid>
                        <Form.Label id="joinHeader">Join an existing game</Form.Label>
                        <Form.Input
                            value={this.state.gameKey}
                            type="text"
                            onChange={this.handleChange}
                            className="input"
                            id="gameKey"
                        />
                        <Form.Help id="formHelp">Please type the secret provided by your Dungeon Master</Form.Help>
                    </Container>
                    <Container
                        id="buttonContainer">
                        <MyButton
                            primary={true}
                            text="Bind Game To Your Account"
                            onClick={this.bindGame}
                        >
                        </MyButton>
                        <div>
                            {this.checkForAdmin()}
                        </div>
                    </Container>
                </form>
            </React.Fragment>
        )
    }
}

export default GamePage;