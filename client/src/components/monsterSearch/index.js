import React, { Component } from 'react';
import axios from 'axios';
import Autocomplete from 'react-autocomplete';
import MyButton from '../buttons'
import Downshift from 'downshift';


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
    const items = [
      { value: 'apple' }
    ];
    return (
      <div id="monsterSearch">
        {/* <Autocomplete
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
        /> */}
        {/* <MyButton className="searchbutton" id="monsterSearchButton" text="Add Monster" primary={false} onClick={() => this.addMonster(this.state.game_id)}></MyButton> */}

        <Downshift
          onChange={selection => alert(
            selection ? `You selected ${selection.value}` : 'Selection Cleared'
          )}
          itemToString={item => (item ? item.value : '')}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
          }) => (
              <div>
                <label {...getLabelProps()}>Enter a fruit</label>
                <input {...getInputProps()} />
                <ul {...getMenuProps()}>
                  {isOpen
                    ? items
                      .filter(item => !inputValue || item.value.includes(inputValue))
                      .map((item, index) => (
                        <li
                          {...getItemProps({
                            key: item.value,
                            index,
                            item,
                            style: {
                              backgroundColor:
                                highlightedIndex === index ? 'lightgray' : 'white',
                              fontWeight: selectedItem === item ? 'bold' : 'normal',
                            },
                          })}
                        >
                          {item.value}
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            )}
        </Downshift>,
          {/* document.getElementById('root'), */}


      </div>
    );
  }
}

export default MonsterSearch;
