import React, { Component } from 'react';
import { styles } from './styles/styles';

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
                'images/caution.png'
            );
        } else {
            this.props.onSubmit();
        }
    }

    handleChange(e) {
        var projectName = e.target.value;
        this.props.addProject(projectName);
    }

    render() {
        return (
            <form style={styles.form} onSubmit={this.handleSubmit.bind(this)}>
                <input
                    placeholder="What are you working on?"
                    style={styles.input}
                    type="text"
                    value={this.props.projectName}
                    onChange={this.handleChange.bind(this)}
                />
            </form>
        );
    }
}