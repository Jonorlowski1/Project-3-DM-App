import React, { Component } from 'react';
// import Select from 'react-select';
import axios from 'axios';
import Autocomplete from 'react-autocomplete';
import MyButton from '../buttons'
// import Downshift from 'downshift';

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]

class MonsterSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monsterName: '',
      monsterList: [],
      game_id: null,
      selectedOption: null,
      // results: [],
    };
    this.addMonster = this.addMonster.bind(this);
  }

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

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <div className="monsterSearch">
        <div>
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
              position: 'abosolute',
              top: '35px', // height of input
              left: 0,
              overflow: 'auto',
              width: '250px',
              // maxWidth: '200px',
              // maxHeight: '500px', // TODO: don't cheat, let it flow to the bottom
            }}
          />
        </div>
        <div>
          <MyButton className="searchbutton" id="monsterSearchButton" text="Add Monster" primary={false} onClick={() => this.addMonster(this.state.game_id)}></MyButton>
        </div>


        {/* =================================================================================================================================================== */}
        {/* REACT SELECT AUTOCOMPLETE */}
        {/* <Select value={selectedOption} options={this.state.monsterList.name} className="select-component" /> */}
        {/* =================================================================================================================================================== */}


        {/* =================================================================================================================================================== */}
        {/* DOWNSHIFT AUTCOMPLETE SEARCH */}
        {/* <Downshift
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
                    ? this.state.monsterList
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
        </Downshift>, */}
        {/* document.getElementById('root'), */}
        {/* =================================================================================================================================================== */}

      </div>
    );
  }
}

export default MonsterSearch;
