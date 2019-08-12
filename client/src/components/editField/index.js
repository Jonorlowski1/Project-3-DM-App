import React, { Component } from 'react'
import EdiText from 'react-editext'
import "./index.css"

export default class EditField extends Component {
    // EdiText onSave is called with an argument of the new value
    onSave = (val, field) => {
        let updateChar = { ...this.props.character };
        field = this.props.field;
        updateChar[field] = parseInt(val);
        this.props.editChar(updateChar);
    }

    render() {
        return (
            <EdiText
                type='number'
                value={this.props.value}
                key={this.props.keyVal}
                onSave={this.onSave}
                buttonsAlign='before'
                editButtonContent={this.props.ebc}
                editButtonClassName="icon"
            />
        )
    }
}