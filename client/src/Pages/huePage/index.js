import React, { Component } from 'react';
import { Heading, Columns, Button } from 'react-bulma-components';
import Lights from '../../components/lights';
import axios from 'axios';
import './index.css';
import NavTabs from "../../components/navTabs";
import { Redirect } from 'react-router-dom'
// import { all } from 'q';

class HuePage extends Component {
  state = {
    user: '',
    lights: [],
    lightId: [],
    selectedLight: [],
    access_token: '',
    username: '',
    game_id: null,
    redirect: false,
    expired: true
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload);
    const stateObject = JSON.parse(localStorage.getItem("state"));
    this.setState(stateObject);
    this.loadGameId();
    this.checkForAuthCode();
  }

  checkForAuthCode = () => {
    const url = window.location.href;
    if (url.includes('code')) {
      const code = url.split('/hue?code=')[1].split('&state=none')[0]; //.com/hue
      const hueState = url.split('&state=')[1];
      axios.post('/api/v1/huelights/connect', {
        code: code
      }).then(res => {
        const accessToken = res.data;
        console.log(res.data);
        this.setState({ access_token: accessToken });
        this.setState({ expired: false });
        this.setState({ redirect: hueState });
      }).catch(err => {
        console.log(err);
      })
    }
  }

  resetUrl = () => {
    if (this.state.redirect) {
      return <Redirect to='/hue' />
    }
  }

  onUnload = (event) => {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload)
  }

  redirect = () => {
    axios.get('/api/v1/huelights/url').then(res => {
      const url = res.data;
      console.log(url);
      window.location.href = url;
    }).catch(err => { console.log(err) });
  };

  loadGameId = () => {
    let game_id = JSON.parse(localStorage.getItem("state.game_id"));
    this.setState({ game_id });
  }

  connectionHandler = () => {
    const accessToken = this.state.access_token;
    console.log(accessToken)
    axios.post('/api/v1/huelights/bridge', {
      accessToken: accessToken
    }).then(res => {
      const userName = res.data;
      this.setState({ username: userName })
      this.setState({ expired: false })
      this.findAllLights();
      console.log(res.data)
    }).catch(
      this.setState({ expired: true }))
  };

  findAllLights = () => {
    axios.post('/api/v1/huelights/alllights', {
      user: this.state.username,
      token: this.state.access_token
    }).then(res => {
      console.log(res.data)
      const lights = res.data.map(lights => lights[1].name)
      const lightId = res.data.map(lights => lights[0]);
      console.log(lightId)
      console.log(lights);
      this.setState({ lights });
      this.setState({ lightId })
    });

  };

  handleChange = (event) => {
    this.setState({ selectedLight: event.target.value })
  };

  lightOn = () => {
    axios.post('/api/v1/huelights/controllights', {
      light: this.state.selectedLight,
      user: this.state.username,
      token: this.state.access_token,
      hueState: 'on'
    })
      .then(res => {
        console.log(res);
      });
  };

  lightOff = () => {
    axios.post('/api/v1/huelights/controllights', {
      light: this.state.selectedLight,
      user: this.state.username,
      token: this.state.access_token,
      hueState: 'off'
    })
      .then(res => {
        console.log(res);
      });
  };

  criticalRoll = () => {
    axios.post('/api/v1/huelights/controllights', {
      host: this.state.ip,
      username: this.state.user,
      huestate: 'critical',
      light: this.state.selectedLight
    })
      .then(res => {
        console.log(res);
      });
  };

  lightning = () => {
    axios.post('/api/v1/huelights/controllights', {
      light: 7,
      user: this.state.username,
      token: this.state.access_token,
      hueState: 'lightning'
    })
      .then(res => {
        console.log(res);
      });
  };

  render() {
    return (
      <React.Fragment>
        <NavTabs game_id={this.state.game_id} />
        <Columns.Column>
          <Columns id="hue-box">
            <Heading className="title-1">Hue Lights</Heading>
            {!this.state.expired ?
              <div>
                {this.resetUrl()}
                <Heading className="title-2" size={5}>Select a Light:</Heading>
                <div className="select">
                  <select onChange={this.handleChange} value={this.state.selectedLight}>
                    {this.state.lights.map((lights, index) => (
                      <option value={this.state.lightId[index]} key={this.state.lightId[index]}>{lights}</option>
                    ))}
                  </select>
                </div>
                <Lights
                  lightOn={this.lightOn}
                  lightOff={this.lightOff}
                  critical={this.criticalRoll}
                  lightning={this.lightning}
                  connection={this.connectionHandler}>
                </Lights></div> : <div><Button onClick={this.redirect}>Connect To Hue</Button></div>}
          </Columns>
        </Columns.Column>
      </React.Fragment>
    );
  }
}

export default HuePage;
