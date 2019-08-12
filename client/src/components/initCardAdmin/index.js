import React from 'react';
import Name from '../name/index';
import { Card, Media, Image, Content, Columns } from 'react-bulma-components';
import './index.css';
import MyButton from '../buttons';
import EditField from 'components/editField';


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
                Initiative: <EditField field={'initiative'} value={props.init.toString()} keyVal={props.init} ebc={<img alt="roll initiative" src="/images/init.png" />} {...props} />
                Armor Class: <EditField field={'armor_class'} value={props.armorClass.toString()} keyVal={props.armorClass} ebc={<img alt="shield" src="/images/shield.png" />} {...props} />
                Health: <EditField field={'hit_points'} value={props.health.toString()} keyVal={props.health} ebc={<img alt="heart" src="/images/heart.png" />} {...props} />
              </Columns.Column>
            </div>
            <div className="init-field-columns">
              <Columns.Column>
                Strength: <EditField field={'strength'} value={props.strength.toString()} keyVal={props.strength} ebc={<img alt="lifting weights" src="/images/strength.png" />} {...props} />
                Dexterity: <EditField field={'dexterity'} value={props.dexterity.toString()} keyVal={props.dexterity} ebc={<img alt="hand" src="/images/dexterity.png" />} {...props} />
                Constitution: <EditField field={'constitution'} value={props.constitution.toString()} keyVal={props.constitution} ebc={<img alt="body" src="/images/constitution.png" />} {...props} />
              </Columns.Column>
            </div>
            <div className="init-field-columns">
              <Columns.Column>
                Intelligence: <EditField field={'intelligence'} value={props.intelligence.toString()} keyVal={props.intelligence} ebc={<img alt="brain" src="/images/intelligence.png" />} {...props} />
                Wisdom: <EditField field={'wisdom'} value={props.wisdom.toString()} keyVal={props.wisdom} ebc={<img alt="spellbook" src="/images/wisdom.png" />} {...props} />
                Charisma: <EditField field={'charisma'} value={props.charisma.toString()} keyVal={props.charisma} ebc={<img alt="speaker" src="/images/charisma.png" />} {...props} />
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
