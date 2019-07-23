import React, { Component } from 'react'
import EdiText from 'react-editext'

export default class Health extends Component {
    // EdiText onSave is called with an argument of the new value
    onSave = val => {
        this.props.editHealth({
            ...this.props.character,
            hit_points: parseInt(val)
        });
    }

    render() {
        return (
            <EdiText
                type='number'
                value={this.props.health.toString()}
                key={this.props.health}
                onSave={this.onSave}
                buttonsAlign='before'
            />
        )
    }
}