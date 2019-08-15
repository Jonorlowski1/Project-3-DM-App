import React from 'react';
import { Card, Media, Image, Content, Columns } from 'react-bulma-components';
import './index.css';
import MyButton from '../buttons'
import EditField from 'components/editField';
import Name from '../name/index';

const InitCard = (props) => {

  let currentOrder = props.currentOrder;
  const checkForTop = id => {
    const index = currentOrder.findIndex(c => c.id === id)
    if (index === 0) {
      return <Card.Footer.Item><MyButton primary={true} text="Turn Done" onClick={() => props.turnDone(props.id)}></MyButton></Card.Footer.Item>
    }
    else {
      return null;
    }
  }

  const charRename = () => {
    if (!props.isMonster) {
      return (<Name {...props} />);
    }
    else {
      return (props.name);
    }
  }

  const checkForDeath = health => {
    if (health <= 0) {
      return <Card.Footer.Item>
        <MyButton text="Remove Character" onClick={() => props.removeChar(props.id)}></MyButton></Card.Footer.Item>
    }
    else {
      return null;
    }
  }

  const checkForMonster = () => {
    if (props.isMonster) {
      let index = currentOrder.findIndex(c => c.id === props.id)
      return (
        <Card className={index === 0 && props.init > 0 ? "init-blinking" : "init-card"}>
          <Card.Content>
            <Media>
              <Media.Item position="left">
                <Image size={64} alt={props.name} src={props.image} />
              </Media.Item>
              <Media.Item>
                <h2 className="character-names" size={3}>{props.name}</h2>
              </Media.Item>
            </Media>
            <Content>
              <div className="statHeader" id="monsterInitHeader">Initiative: {props.init}</div>
            </Content>
          </Card.Content>
          {/* <Card.Footer>
            {checkForTop(props.id)}
            {checkForDeath(props.health)}
          </Card.Footer> */}
        </Card>
      );
    }
    else {
      let index = currentOrder.findIndex(c => c.id === props.id)
      return (
        <Card className={index === 0 && props.init > 0 ? 'init-blinking' : 'init-card'}>
          <Card.Content>
            <Media>
              <Media.Item position="left">
                <Image size={64} alt={props.name} src={props.image} />
              </Media.Item>
              <Media.Item>
                <h2 className="character-names" size={3}>{charRename()}</h2>
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
  }

  return (
    checkForMonster()
  );
}

export default InitCard;
