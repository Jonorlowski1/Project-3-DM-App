import React, { Component } from 'react';
import { Heading, Card } from 'react-bulma-components';
import Lights from '../../components/lights';
import axios from 'axios';
import './index.css';
import NavTabs from "../../components/navTabs";
import { Redirect } from 'react-router-dom';
import MyButton from '../../components/buttons';

class HuePage extends Component {
  state = {
    user: '',
    lights: [],
    lightId: [],
    isReachable: [],
    selectedLight: null,
    access_token: '',
    username: '',
    game_id: null,
    game_name: '',
    secret: '',
    redirect: false,
    expired: true,
    isLoading: false,
  }

  componentDidMount() {
    // const { redirect } = this.state;
    // if (redirect) {
    //   localStorage.removeItem("not_redirected");
    // }
    const currentUser = JSON.parse(localStorage.getItem("user_id"));
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    window.addEventListener("beforeunload", this.onUnload);
    const stateObject = JSON.parse(localStorage.getItem("state"));
    this.setState(stateObject);
    this.loadGameId();
    this.checkForAuthCode();
  }

  checkForAuthCode = () => {
    const url = window.location.href;
    if (url.includes('code')) {
      this.setState({ isLoading: true })
      const code = url.split('.com/hue?code=')[1].split('&state=none')[0];
      const hueState = url.split('&state=')[1];
      axios.post('/api/v1/huelights/connect', {
        code: code
      }).then(res => {
        const accessToken = res.data;
        this.setState({ access_token: accessToken });
        this.setState({ expired: false });
        this.setState({ redirect: hueState });
        this.connectionHandler();

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

  onUnload = () => {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload)
  }

  redirect = () => {
    const { redirect } = this.state
    localStorage.setItem("not_redirected", JSON.stringify(redirect));
    axios.get('/api/v1/huelights/url').then(res => {
      const url = res.data;
      window.location.href = url;
    }).catch(err => { console.log(err); });
  };

  loadGameId = () => {
    let game_id = JSON.parse(localStorage.getItem("gameId"));
    let game_name = JSON.parse(localStorage.getItem("gameName"));
    let secret = JSON.parse(localStorage.getItem("gameSecret"));
    this.setState({ game_id, game_name, secret });
  }

  connectionHandler = () => {
    this.setState({ isLoading: true })
    const accessToken = this.state.access_token;
    axios.post('/api/v1/huelights/bridge', {
      accessToken: accessToken
    }).then(res => {
      const username = res.data;
      this.setState({
        username,
        isLoading: false,
        expired: false
      });
      this.findAllLights();
    }).catch(
      this.setState({ expired: true })
    )
  };

  findAllLights = () => {
    axios.post('/api/v1/huelights/alllights', {
      user: this.state.username,
      token: this.state.access_token
    }).then(res => {
      const lights = res.data.map(lights => lights[1].name)
      // I only want lights to be selectable if they are reachable
      const isReachable = res.data.map(lights => !lights[1].state.reachable) // Yields an inverted boolean to be passed into the <select> disabled value
      const lightId = res.data.map(lights => lights[0]);
      this.setState({ lights });
      this.setState({ lightId });
      this.setState({ isReachable })
      localStorage.setItem("state", JSON.stringify(this.state));
    });

  };

  handleChange = (event) => {
    this.setState({ selectedLight: event.target.value })
  };

  lightOn = async (res, req) => {
    try {
      await axios.post('/api/v1/huelights/controllights', {
        light: this.state.selectedLight,
        user: this.state.username,
        token: this.state.access_token,
        hueState: 'on'
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  lightOff = async (res, req) => {
    try {
      await axios.post('/api/v1/huelights/controllights', {
        light: this.state.selectedLight,
        user: this.state.username,
        token: this.state.access_token,
        hueState: 'off'
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  lightning = async (res, req) => {
    try {
      await axios.post('/api/v1/huelights/controllights', {
        light: this.state.selectedLight,
        user: this.state.username,
        token: this.state.access_token,
        hueState: 'lightning'
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  criticalRoll = async (req, res) => {
    try {
      await axios.post('/api/v1/huelights/controllights', {
        light: this.state.selectedLight,
        user: this.state.username,
        token: this.state.access_token,
        hueState: 'critical'
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  fadeOut = async (res, req) => {
    try {
      axios.post('/api/v1/huelights/controllights', {
        light: this.state.selectedLight,
        user: this.state.username,
        token: this.state.access_token,
        hueState: 'fadeOut'
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  fadeIn = async (res, req) => {
    try {
      axios.post('/api/v1/huelights/controllights', {
        light: this.state.selectedLight,
        user: this.state.username,
        token: this.state.access_token,
        hueState: 'fadeIn'
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <React.Fragment>
          <NavTabs game_id={this.state.game_id} game_name={this.state.game_name} secret={this.state.secret} />
          <Heading className="title-1" size={1}>Lanterns</Heading>
          <Card id="huebox">
          <h1>Loading...</h1>
          </Card>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <NavTabs game_id={this.state.game_id} game_name={this.state.game_name} secret={this.state.secret} />
        <Heading className="title-1" size={1}>Lanterns</Heading>
        <Card id="huebox">
          {!this.state.expired && !isLoading ?
            <div>
              {this.resetUrl()}
              <div className="select" onClick={this.findAllLights}>
                <select onChange={this.handleChange} value={this.state.selectedLight}>
                  <option selected="selected">Select A Light</option>
                  {this.state.lights.map((lights, index) => (
                    <option disabled={this.state.isReachable[index]} value={this.state.lightId[index]} key={this.state.lightId[index]}>{lights}</option>
                  ))}
                </select>
              </div>
              <Lights
                lightOn={this.lightOn}
                lightOff={this.lightOff}
                critical={this.criticalRoll}
                fadeOut={this.fadeOut}
                fadeIn={this.fadeIn}>
              </Lights></div> : <div><MyButton text="Connect To Hue" onClick={this.redirect}></MyButton></div>}

        </Card>

      </React.Fragment>
    );
  }
}

export default HuePage;
