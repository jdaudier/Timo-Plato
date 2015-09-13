import React, { Component } from 'react';

export class ItemView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                <h3>{this.props.project}</h3>
                <div></div>
            </li>
        );
    }
}
