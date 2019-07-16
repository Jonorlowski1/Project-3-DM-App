import React, { Component } from 'react';
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import HuePage from './components/hue_page';
import List from './components/list/index';
import ListItem from './components/listItem/index';
import characterList from './characters.json';
import socketIOClient from 'socket.io-client';

// Create a Connect to Hue button that sends the ip to a createUser post request 
// Text that informs user to hold the link button when pressing connect

class App extends Component {
  state = {
    characterList,
    endpoint: "localhost:3001"
  }

  componentDidMount() {

    window.addEventListener("beforeunload", this.onUnload);
    const stateObject = JSON.parse(localStorage.getItem("state"));
    this.setState(stateObject);

    console.log(this.state.characterList);

    const socket = socketIOClient(this.state.endpoint);
    socket.on('listChange', (characterList) => {
      console.log('Change received');
      this.setState({ characterList });
    });
  }

  onUnload = (event) => {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload)
  }

  send = async (func) => {
    await func
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('listChange', this.state.characterList)
    console.log('Sending List Change');
  }

  initSort = (array) => {
    const newArr = array.slice()
    newArr.sort((a, b) => {
      return b.init - a.init;
    });
    this.send(this.setState((state) => {
      return { characterList: newArr };
    }));
  }

  turnDone = (id) => {
    const characterList = this.state.characterList.slice();
    characterList.push(...characterList.splice(characterList.findIndex(c => c.id === id), 1))
    this.send(this.setState({ characterList }));
  }

  editChar = (updatedCharacter) => {
    console.log(updatedCharacter);
    this.send(this.setState({
      characterList: this.state.characterList
        .map((character) => character.id === updatedCharacter.id ? updatedCharacter : character)
    }));
  }

  removeChar = (id) => {
    const characterList = this.state.characterList.slice();
    characterList.splice(characterList.findIndex(c => c.id === id), 1);
    this.send(this.setState({ characterList }));
  }

  resetEncounter = () => {
    const characterList = this.state.characterList.slice();
    characterList.map(obj => {
      return obj.init = parseInt(0);
    });
    this.send(this.setState({ characterList }));
  }

  render() {
    return (
      <div>
        <List >
          {this.state.characterList.map(character => (
            <ListItem
              character={character}
              id={character.id}
              key={character.id}
              ac={character.ac}
              init={character.init}
              name={character.name}
              health={character.health}
              turnDone={this.turnDone}
              editInit={this.editChar}
              editHealth={this.editChar}
              removeChar={this.removeChar}
              currentOrder={this.state.characterList}
            />
          ))}
        </List>
        <button onClick={this.resetEncounter}>Reset Encounter</button>
        <button onClick={() => this.initSort(this.state.characterList)}>Initiative Sort</button>
        <HuePage />
      </div>
    );
  }
}

export default App;