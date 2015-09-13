import React, { Component } from 'react';

export class Form extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(e) {
        e.preventDefault();

        // When input field is empty
        if (!this.props.projectName) {
            this.props.createNotification(
                'OOPS!',
                'Please enter project name.',
                'images/caution.png',
                true
            );
        } else {
            this.props.toggleButtonValue();
        }
    }

    handleChange(e) {
        var projectName = e.target.value;
        this.props.addProject(projectName);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input
                    type="text"
                    ref="myTextInput"
                    value={this.props.projectName}
                    onChange={this.handleChange.bind(this)} />
                <input
                    type="submit"
                    value={this.props.running ? 'PAUSE' : 'START'} />
            </form>
        );
    }
}