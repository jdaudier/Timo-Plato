import React, { Component } from 'react';
import { Button } from './Button';
import { styles } from './styles/styles';

export class ItemView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            origProjectName: this.props.projectName,
            projectName: this.props.projectName,
            time: 0,
            formattedTime: '00:00:00',
            running: false
        };

        var icons = ['at_sign', 'clock', 'coffee', 'doc', 'download', 'globe', 'heart', 'hi', 'home', 'lightbulb', 'money', 'phone', 'pizza', 'plant', 'play_btn', 'profile', 'rocket', 'settings', 'vader'];
        this.icon = icons[Math.floor(Math.random()*icons.length)];

        var startIcons = ['heart', 'start', 'sun', 'timer', 'traffic-lights'];
        this.startIcons = startIcons[Math.floor(Math.random()*startIcons.length)];
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

    createNotification(title, body, icon, requireInteraction) {
        var options = {
            body: body,
            icon: icon,
            requireInteraction: requireInteraction
        };

        var notification = new Notification(title, options);

        if (requireInteraction) {
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
        }, this.formatTime.bind(this));

        if (!this.state.running) {
            this.setState({
                running: true
            });
        }
    }

    pad(num) {
        var s = '0000' + num;
        return s.substr(s.length - 2);
    }

    formatTime() {
        var unformattedTime = this.state.time;

        var hours = Math.floor((unformattedTime % 86400) / 3600);
        var minutes = Math.floor(((unformattedTime % 86400) % 3600) / 60);
        var seconds = ((unformattedTime % 86400) % 3600) % 60;
        var formattedTime = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;

        this.setState({
            formattedTime: formattedTime
        });
    }

    createInteractiveNotification() {
        this.createNotification(
            `Still working on ${this.state.projectName}?`,
            `Click this message if YES. Close if NO.`,
            'images/clock.png',
            true
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
                'images/start/' + this.startIcons + '.png'
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
            'images/moon.png',
            true
        );
    }

    handleEdit() {
        this.save();
    }

    handleChange(e) {
        this.setState({
            projectName: e.target.value
        });
    }

    handleSubmit(e) {
        if (e.key === 'Enter') {
            this.save();
        }
    }

    save() {
        if (this.state.origProjectName !== this.state.projectName) {
            if (this.props.isProjectNameUnique(this.state.projectName)) {
                this.props.editProjectList(this.state);

                this.setState({
                    editMode: !this.state.editMode
                });
            }
        } else {
            this.setState({
                editMode: !this.state.editMode
            });
        }
    }

    handleReset() {
        this.clearTimeouts();
        this.clearIntervals();
        this.closeNotification();

        this.setState({
            time: 0
        });

        this.setState({
            formattedTime: '00:00:00'
        });

        this.setState({
            running: false
        });
    }

    handleDelete() {
        this.closeNotification();

        this.props.onDelete(this.state.projectName);
    }

    render() {
        return (
            <li style={styles.li}>
                <img style={styles.image} src={'images/icons/' + this.icon + '.png'} />
                <h1 style={this.state.editMode ? styles.hidden : styles.h1}>{this.state.projectName}</h1>
                <input style={this.state.editMode ? styles.projectNameInput : styles.hidden} type='text' name='projectName' value={this.state.projectName}
                       onChange={this.handleChange.bind(this)}
                       onKeyUp={this.handleSubmit.bind(this)}
                />
                <h2 style={styles.h2}>{this.state.formattedTime}</h2>
                <Button onClick={() => this.handleEdit()}
                        buttonText={this.state.editMode ? 'save' : 'edit'}
                />
                <Button onClick={() => this.handleClick()}
                        buttonText={this.state.running ? 'pause' : 'start'}
                />
                <Button onClick={() => this.handleReset()}
                        buttonText='reset'
                />
                <Button onClick={() => this.handleDelete()}
                        buttonText='delete'
                />
            </li>
        );
    }
}
