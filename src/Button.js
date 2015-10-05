import React, { Component } from 'react';
import { styles } from './styles/styles';

export class Button extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            hovered: false
        }
    }

    handleMouseEnter() {
        this.setState({
            hovered: true
        });
    }

    handleMouseLeave() {
        this.setState({
            hovered: false
        });
    }

    onClick() {
        this.props.onClick();
    }

    render() {
        return (
            <button style={this.state.hovered ? styles.buttonHover : styles.button}
                    type='button'
                    onMouseEnter={() => this.handleMouseEnter()}
                    onMouseLeave={() => this.handleMouseLeave()}
                    onClick={() => this.onClick()}
            >
                <img style={styles.buttonImage}
                    src={`images/buttons/${this.props.buttonType}.svg`} />
            </button>
        );
    }
}