import React, { Component } from 'react';
import axios from 'axios';
import GameCard from '../../components/gameCard';
import { Form, Container, Heading } from 'react-bulma-components';
import { Link } from "react-router-dom";
import MyButton from '../../components/buttons';
import './index.css';
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

class GamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameList: [],
            gameKey: '',
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
                    <MyButton text="Create New Game" primary={false}></MyButton>
                </Link>
            )
        }
        else return null;
    }

    bindGame = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/v1/games/' + this.props.location.state.user_id, {
                secret: this.state.gameKey,
            });
            if (response) {
                this.loadGames();
            }
        }
        catch (err) {
            if (err) {
                this.openModal();
                this.setState({ gameKey: '' });
            }
        }
    }

    removeGame = async (id, secretId) => {
        try {
            console.log(secretId);
            const response = await axios.delete('/api/v1/games/' + id, { data: { secret: secretId } });
            if (response) {
                this.loadGames();
            }
        }
        catch (err) {
            if (err) {
                console.log(err);
            }
        }
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
                        admin={this.props.location.state.admin}
                        user_id={this.props.location.state.user_id}
                        removeGame={this.removeGame}
                    />
                ))}
            </div>);
        }
    }

    render() {
        return (
            <React.Fragment>
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

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Failed Game Bind"
                >
                    <h2 className="title-2">Game not found - incorrect secret.</h2>
                    <h2 className="title-2">Please check with your DM again for the correct secret.</h2>
                    <Container id="buttons" fluid>
                        <MyButton
                            text="Close"
                            primary={true}
                            type="submit"
                            onClick={this.closeModal}
                        />
                    </Container>
                </Modal>

            </React.Fragment>
        )
    }
}

export default GamePage;