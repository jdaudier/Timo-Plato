import React, { Component } from 'react';
import { NICE, SUPER_NICE } from './colors';
import { Form } from './Form';

export class App extends Component {
    constructor(props) {
        super(props);
        Notification.requestPermission();

        this.state = {
            projectName: '',
            time: 0,
            running: false,
            intervalID: undefined,
            notification: {}
        };
    }

    addProject(projectName) {
        this.setState({
            projectName: projectName
        });
    }

    tick() {
        this.setState({
            time: this.state.time + 1
        }, function() {
            console.log('TOTAL SECONDS', this.state.time);

            if (this.state.time >= 60) {
                console.log('TOTAL MINUTES', Math.round(this.state.time / 60));
            }
        });
    }

    createNotification(title, body, icon, alert) {
        var options = {
            body: body,
            icon: icon
        };

        var notification = new Notification(title, options);

        if (!alert) {
            this.notification = notification;

            notification.onclick = () => this.addTime();
            notification.onshow = () => clearInterval(this.timerIntervalID);
            notification.onclose = () => this.onCloseClick();
        } else {
            // For self-closing alerts
            setTimeout(() => {
                notification.close();
            }, 3000);
        }
    }

    addTime() {
        this.startTimer();
    }

    onCloseClick() {
        if (this.state.running) {
            this.setState({
                running: false
            }, function() {
                this.toggleNotifications();
            });
        }
    }

    toggleButtonValue() {
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

    createInteractiveNotification() {
        return this.createNotification(
            `Still working on ${this.state.projectName}?`,
            `Click this message if YES. Close if NO.`,
            'images/clock.png'
        );
    }

    startTimer() {
        this.timerIntervalID = setInterval(() => this.tick(), 1000);

        this.notificationIntervalID = setTimeout(() => {
            this.createInteractiveNotification();
        }, 900000);
    }

    pauseTimer() {
        clearInterval(this.notificationIntervalID);
        clearInterval(this.timerIntervalID);

        if (this.notification) {
            this.notification.close();
        }

        this.createNotification(
            'PAUSED!',
            'Timo Plato is paused!',
            'images/paused.png',
            true
        );
    }

    render() {
        return (
            <div>
                <Form addProject={this.addProject.bind(this)}
                      projectName={this.state.projectName}
                      toggleButtonValue={this.toggleButtonValue.bind(this)}
                      running={this.state.running}
                      createNotification={this.createNotification.bind(this)}
                />
            </div>
        );
    }
}