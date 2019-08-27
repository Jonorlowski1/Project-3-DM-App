import React, { Component } from 'react';
import './index.css'
class MyTertiaryButton extends Component {
  render() {
    return (
      <button id={this.props.id}
        type={this.props.type}
        className='mybutton-tertiary'
        onClick={this.props.static ? undefined : this.props.onClick}
        disabled={this.props.disabled}>
        {this.props.text}
      </button>
    );
  }
}
export default MyTertiaryButton;