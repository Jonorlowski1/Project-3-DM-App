import React, { Component } from 'react';
import InitCard from '../../components/initCard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import { Container, Heading } from 'react-bulma-components';
import MyButton from '../../components/buttons'
import './index.css';
// import NavTabs from "../../components/navTabs";

class InitPage extends Component {
    state = {
        characterList: [],
        game_id: null,
        // endpoint: "localhost:3001"
    }

    constructor() {
        super();
        this.socket = io();
        // this.socket = io.connect(this.state.endpoint);
    }

    componentDidMount() {
        this.loadChars();
        let room = this.props.location.state.game_id;
        this.socket.on('connect', () => {
            this.socket.emit('room', room);
        });
        this.socket.on('listChange', (characterList) => {
            this.setState({ characterList });
        });
    }

    loadGameId = () => {
        let game_id = this.props.location.state.game_id;
        this.setState({ game_id });
    }

    loadChars = async () => {
        await this.loadGameId();
        axios.get('/api/v1/characters/' + this.state.game_id)
            .then(res => {
                let characterList = res.data;
                if (characterList.length === 0) {
                    //Put modal here eventually
                }
                else if (characterList !== this.state.characterList) {
                    this.send(this.setState({ characterList }));
                }
            });
    };

    componentWillUnmount() {
        this.socket.disconnect();
    }

    send = async (func) => {
        await func
        this.socket.emit('listChange', this.state.characterList)
    }

    initSort = (array) => {
        const newArr = array.slice()
        newArr.sort((a, b) => {
            return b.initiative - a.initiative;
        });
        this.turnOrderUpdate(newArr);
    }

    turnOrderUpdate = (array) => {
        for (let i = 0; i < array.length; i++) {
            array[i].turn_order = i + 1;
        }
        axios.put('/api/v1/characters', { array });
        this.send(this.setState((state) => {
            return { characterList: array };
        }));
    }

    turnDone = (id) => {
        const characterList = this.state.characterList.slice();
        characterList.push(...characterList.splice(characterList.findIndex(c => c.id === id), 1))
        this.turnOrderUpdate(characterList);
    }

    editChar = (updatedCharacter) => {
        const updateId = updatedCharacter.id
        axios.post('/api/v1/characters/' + updateId, {
            name: updatedCharacter.name,
            hit_points: updatedCharacter.hit_points,
            initiative: updatedCharacter.initiative,
            armor_class: updatedCharacter.armor_class,
            strength: updatedCharacter.strength,
            dexterity: updatedCharacter.dexterity,
            constitution: updatedCharacter.constitution,
            intelligence: updatedCharacter.intelligence,
            wisdom: updatedCharacter.wisdom,
            charisma: updatedCharacter.charisma
        });
        this.send(this.setState({
            characterList: this.state.characterList
                .map((character) => character.id === updatedCharacter.id ? updatedCharacter : character)
        }));
    }

    removeChar = (id) => {
        let remId = id;
        const characterList = this.state.characterList.slice();
        characterList.splice(characterList.findIndex(c => c.id === id), 1);
        axios.delete('/api/v1/characters/' + remId);
        if (this.state.characterList.length === 0) {
            //don't send anything because no data[0].game_id for transmitting to correct room.
        }
        else {
            this.send(this.setState({ characterList }));
        }
    }

    resetEncounter = () => {
        const characterList = this.state.characterList.slice();
        characterList.map(obj => {
            return obj.initiative = parseInt(0);
        });
        this.turnOrderUpdate(characterList);
    }

    render() {
        return (
            <React.Fragment id="initPageContainer">
                <Heading className="title-1 title-2" size={2}>{this.props.location.state.game_name}</Heading>
                <Heading className="title-2" size={3}>Secret: {this.props.location.state.secret}</Heading>
                <div >
                    {this.state.characterList.map(character => (
                        <InitCard
                            className="card"
                            character={character}
                            id={character.id}
                            key={character.id}
                            image={character.image}
                            armorClass={character.armor_class}
                            strength={character.strength}
                            dexterity={character.dexterity}
                            constitution={character.constitution}
                            intelligence={character.intelligence}
                            wisdom={character.wisdom}
                            charisma={character.charisma}
                            init={character.initiative}
                            name={character.name}
                            health={character.hit_points}
                            turnDone={this.turnDone}
                            editChar={this.editChar}
                            removeChar={this.removeChar}
                            currentOrder={this.state.characterList}
                            isMonster={character.isMonster}
                        />
                    ))}
                </div>
                <Container id="buttons" fluid>
                    <Link to={{
                        pathname: '/createcharacter',
                        state: {
                            game_id: this.props.location.state.game_id,
                            secret: this.props.location.state.secret,
                            game_name: this.props.location.state.game_name
                        }
                    }}>
                        <MyButton static={true} text="Add New Character" primary={false}>
                        </MyButton>
                    </Link>
                </Container>
                <div id="newCharButton"></div>
            </React.Fragment>
        )
    }
}

export default InitPage;
