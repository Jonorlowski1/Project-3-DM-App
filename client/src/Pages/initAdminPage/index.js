import React, { Component } from 'react';
import InitCardAdmin from '../../components/initCardAdmin';
import axios from 'axios';
import io from 'socket.io-client';
import MonsterSearch from '../../components/monsterSearch';
import { Container, Heading } from 'react-bulma-components';
import NavTabs from "../../components/navTabs";
import { Link } from 'react-router-dom';
import MyButton from '../../components/buttons'
import MyTertiaryButton from '../../components/otherButtons';
import Select from 'react-select';
import './index.css';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

class InitAdminPage extends Component {
    state = {
        characterList: [],
        game_id: null,
        user_id: null
        // endpoint: "localhost:3001"
    }

    constructor(props) {
        super(props);
        this.socket = io();
        // this.socket = io.connect(this.state.endpoint);
        this.props.history.push({
            pathname: '/initadmin',
            state: 
             this.props.location.state
            
        })
    }

    MyComponent = () => (
        <Select options={options} />
      )

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
        let game_name = this.props.location.state.game_name;
        let secret = this.props.location.state.secret;
        this.setState({ game_id });
        localStorage.setItem("gameId", JSON.stringify(game_id));
        localStorage.setItem("gameName", JSON.stringify(game_name));
        localStorage.setItem("gameSecret", JSON.stringify(secret));
    }

    loadChars = async () => {
        await this.loadGameId();
        axios.get('/api/v1/characters/' + this.state.game_id)
            .then(res => {
                let characterList = res.data;
                if (characterList.length === 0) {
                    //put modal here eventually
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
      <React.Fragment>
        <NavTabs game_id={this.props.location.state.game_id} game_name={this.props.location.state.game_name} secret={this.props.location.state.secret} />
        <Heading className="title-1 title-2" id="gameTitle" size={1}> {this.props.location.state.game_name}</Heading>
        <Heading className="title-2" id="secret" size={6}>Secret: {this.props.location.state.secret}</Heading>
        <div >
          {this.state.characterList.map(character => (
            <InitCardAdmin
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
          <MyTertiaryButton text="Reset Encounter" onClick={this.resetEncounter}></MyTertiaryButton>
          <MyTertiaryButton text="Initiative Sort" onClick={() => this.initSort(this.state.characterList)}></MyTertiaryButton>
        </Container>
        <Container id="npcContainer" fluid>
          <Link to={{
            pathname: '/createcharacter',
            state: {
              game_id: this.props.location.state.game_id,
              secret: this.props.location.state.secret,
              game_name: this.props.location.state.game_name,
              admin: this.props.location.state.admin
            }
          }}>
            <MyButton text="Create NPC" primary={false}>
            </MyButton>
          </ Link>
        </Container>
        {/* <hr id="hr"/> */}
        <Container fluid id="bottomPadding">
          <h1 className="monsterSearch">Monster Creation</h1>

          <MonsterSearch game_id={this.props.location.state.game_id} loadChars={this.loadChars} />
        </Container>
      </React.Fragment>
    )
  }
}

export default InitAdminPage;
