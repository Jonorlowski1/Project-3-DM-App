import React from 'react';
import Initiative from '../initiative/index';
import Health from '../health/index';
import ArmorClass from '../armorClass/index';
import Strength from '../strength/index';
import Dexterity from '../dexterity/index';
import Constitution from '../constitution/index';
import Intelligence from '../intelligence/index';
import Wisdom from '../wisdom/index';
import Charisma from '../charisma/index';
import Name from '../name/index';
import { Card, Media, Image, Content, Columns } from 'react-bulma-components';
import './index.css';
import MyButton from '../buttons';


// const bulmaAccordion = require('bulma-accordion');

const InitCardAdmin = (props) => {

  const currentOrder = props.currentOrder;
  const checkForTop = id => {
    const index = currentOrder.findIndex(c => c.id === id)
    if (index === 0) {
      return <Card.Footer.Item><MyButton primary={true} text="Turn Done" onClick={() => props.turnDone(props.id)}></MyButton></Card.Footer.Item>
    }
    else {
      return null;
    }
  }

  const checkForDeath = () => {
    if (props.isMonster) {
      return <Card.Footer.Item>
        <MyButton primary={false} text="Remove Character" onClick={() => props.removeChar(props.id)}></MyButton></Card.Footer.Item>
    }
    else {
      return null;
    }
  }

  const monsterRename = () => {
    if (props.isMonster) {
      return (<Name {...props} />);
    }
    else {
      return (props.name);
    }
  }

  return (


    // <button class="toggle" aria-label="toggle"></button>
    // <div class="accordion-body">
    //   <div class="accordion-content">
    //     Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
    //   </div>
    // </div>

    <Card className="init-card">
      <Card.Content>
        <Media>
          <Media.Item position="left">
            <Image size={64} alt={props.name} src={props.image} />
          </Media.Item>
          <Media.Item>
            <h2 className="character-names" size={3}>{monsterRename()}</h2>
          </Media.Item>
        </Media>
        <Content>
          <Columns>
            <div className="init-field-columns">
              <Columns.Column>
                <div className="statHeader">Initiative:</div> <Initiative {...props} /> <div className="statHeader">Armor Class:</div> <ArmorClass {...props} />  <div className="statHeader">Health:</div> <Health {...props} />
              </Columns.Column>
            </div>
            <div className="init-field-columns">
              <Columns.Column>
                <div className="statHeader">Strength:</div> <Strength {...props} /> <div className="statHeader">Dexterity:</div> <Dexterity {...props} /> <div className="statHeader">Constitution:</div> <Constitution {...props} />
              </Columns.Column>
            </div>
            <div className="init-field-columns">
              <Columns.Column>
                <div className="statHeader">Intelligence:</div> <Intelligence {...props} /> <div className="statHeader">Wisdom:</div> <Wisdom {...props} /> <div className="statHeader">Charisma:</div> <Charisma {...props} />
              </Columns.Column>
            </div>
          </Columns>
        </Content>
      </Card.Content>
      <Card.Footer>
        {checkForTop(props.id)}
        {checkForDeath(props.health)}
      </Card.Footer>
    </Card>
  );
}

export default InitCardAdmin;
