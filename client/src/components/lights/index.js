import React from 'react';
import { Container } from 'react-bulma-components';
import './index.css';
import MyButton from '../../components/buttons'

const Lights = (props) => {
  return (
    <Container id="buttons">
          <MyButton primary={true} text="Light On" onClick={() => props.lightOn()}>
          </MyButton>
          <MyButton primary={true} text="Light Off" onClick={() => props.lightOff()}>
          </MyButton>
          <MyButton primary={true} text="Critical" onClick={() => props.critical()}>
          </MyButton>
          <MyButton primary={true} text="Fade In" onClick={() => props.fadeIn()}>
          </MyButton>
          <MyButton primary={true} text="Fade Out" onClick={() => props.fadeOut()}>
          </MyButton>  
    </Container>
  )
}

export default Lights;