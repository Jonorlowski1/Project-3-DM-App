import React, { Component } from 'react';
import axios from 'axios';
import Autocomplete from 'react-autocomplete';
import MyButton from '../buttons'

class MonsterSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monsterName: '',
      monsterList: [],
      game_id: null,
      // results: [],
    };
    this.addMonster = this.addMonster.bind(this);
  }

  // menuStyle = {
  //   borderRadius: '3px',
  //   boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  //   background: 'rgba(255, 255, 255, 0.9)',
  //   padding: '2px 0',
  //   fontSize: '90%',
  //   position: 'fixed',
  //   overflow: 'auto',
  //   maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
  //   "zIndex": 100,
  // };

  componentDidMount() {
    this.loadGameId();
    axios.get('/api/v1/monsters/list')
      .then(({ data: monsterList }) => this.setState({ monsterList }))
      .catch(console.error);
  };

  loadGameId = () => {
    let game_id = this.props.game_id;
    this.setState({ game_id });
  };

  addMonster(game_id) {
    axios.post('api/v1/characters/name/' + this.state.monsterName + '&' + game_id)
      .then(() => {
        this.props.loadChars()
      })
      .catch(console.error);
  }

  render() {
    return (
      <div id="monsterSearch">
        <Autocomplete
          getItemValue={(monster) => monster.name}
          items={this.state.monsterList}
          shouldItemRender={(monster, value) =>
            monster.name.toLowerCase().includes(value.toLowerCase())
          }
          renderItem={(monster, isHighlighted) =>
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
              {monster.name}
            </div>
          }
          value={this.state.monsterName}
          onChange={(e) => this.setState({ monsterName: e.target.value })}
          onSelect={(val) => this.setState({ monsterName: val })}
          menuStyle={{
            borderRadius: '3px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '2px 0',
            fontSize: 'calc(20% + 2.0vh)',
            position: 'fixed',
            overflow: 'auto',
            maxWidth: '200px',
            maxHeight: '200px', // TODO: don't cheat, let it flow to the bottom
          }}
        />
        <MyButton className="searchbutton" id="monsterSearchButton" text="Add Monster" primary={false} onClick={() => this.addMonster(this.state.game_id)}></MyButton>
      </div>
    );
  }
}

export default MonsterSearch;
