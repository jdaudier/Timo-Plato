import React, { Component } from 'react';

export class ItemView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: 0,
            running: false
        };
    }

    componentWillMount() {
        this.intervals = [];
        this.timeouts = [];
    }

    setInterval() {
        this.intervals.push(setInterval.apply(null, arguments));
    }

    setTimeout() {
        this.timeouts.push(setTimeout.apply(null, arguments));
    }

    componentWillUnmount() {
        this.intervals.map(clearInterval);
        this.timeouts.map(clearTimeout);
    }

    clearIntervals() {
        this.intervals.map(clearInterval);
    }

    clearTimeouts() {
        this.timeouts.map(clearTimeout);
    }

    createNotification(title, body, icon, isSelfClosing) {
        var options = {
            body: body,
            icon: icon
        };

        var notification = new Notification(title, options);

        if (!isSelfClosing) {
            this.notification = notification;

            notification.onclick = () => this.addTime();
            notification.onshow = () => this.onShow();
            notification.onclose = () => this.onCloseClick();
        } else {
            // For self-closing notifications
            this.setTimeout(() => {
                notification.close();
            }, 3000);
        }
    }

    addTime() {
        this.startTimer();
    }

    onShow() {
        this.clearIntervals();

        if (this.state.running) {
            this.setState({
                running: false
            });
        }
    }

    onCloseClick() {
        if (this.state.running) {
            this.setState({
                running: false
            });
        }
    }

    tick() {
        this.setState({
            time: this.state.time + 1
        });

        if (!this.state.running) {
            this.setState({
                running: true
            });
        }
    }

    createInteractiveNotification() {
        this.createNotification(
            `Still working on ${this.props.projectName}?`,
            `Click this message if YES. Close if NO.`,
            'images/clock.png'
        );
    }

    handleClick() {
        this.setState({
            running: !this.state.running
        }, function() {
            this.toggleNotifications();
        });
    }

    toggleNotifications() {
        if (this.state.running) {
            this.createNotification(
                'IT HAS BEGAN!',
                'Timo Plato has started!.',
                'images/start.png',
                true
            );

            this.startTimer();
        } else {
            this.pauseTimer();
        }
    }

    closeNotification() {
        if (this.notification) {
            this.notification.close();
        }
    }

    startTimer() {
        this.closeNotification();

        this.setInterval(() => this.tick(), 1000);

        this.setTimeout(() => {
            this.createInteractiveNotification();
        }, 900000);
    }

    pauseTimer() {
        this.clearTimeouts();
        this.clearIntervals();

        this.closeNotification();

        this.createNotification(
            'PAUSED!',
            'Click me to un-pause!',
            'images/moon.png'
        );
    }

    onResetClick() {
        this.clearTimeouts();
        this.clearIntervals();
        this.closeNotification();

        this.setState({
            time: 0
        });

        this.setState({
            running: false
        });
    }

    onDeleteClick() {
        this.closeNotification();

        this.props.removeFromProjectList(this.props.projectName);
    }

    render() {
        return (
            <li>
                <h3>{this.props.projectName}</h3>
                <div>TOTAL SECONDS: {this.state.time}</div>
                <button type='button'>Edit</button>
                <button type='button'
                        onClick={this.handleClick.bind(this)}>
                        {this.state.running ? 'PAUSE' : 'START'}</button>
                <button type='button'
                        onClick={this.onResetClick.bind(this)}>Reset</button>
                <button type='button'
                        onClick={this.onDeleteClick.bind(this)}>Delete</button>
            </li>
        );
    }
}
