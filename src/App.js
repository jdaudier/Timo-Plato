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

    addTime() {
        this.setState({
            time: this.state.time + 15
        }, function() {
            console.log('total time', this.state.time);
        });

        this.startNotifications();
    }

    onCloseClick(e) {
        console.log(e.currentTarget);
        this.setState({
            running: false
        }, function() {
            console.log('onCloseClick');
        });
    }

    createNotification(title, body, icon, alert) {
        var options = {
            body: body,
            icon: icon
        };

        var notification = new Notification(title, options);

        if (!alert) {
            this.setState({
                notification: notification
            });

            notification.onclick = this.addTime.bind(this);
            notification.onclose = this.onCloseClick.bind(this);
        } else {
            // For alerts that self closes
            setTimeout(notification.close.bind(notification), 3000);
        }
    }

    createInteractiveNotification() {
        return this.createNotification(
            `Still working on ${this.state.projectName}?`,
            `Click this message if YES. Close if NO.`,
            'images/clock.png'
        );
    }

    startNotifications() {
        var intervalID = setTimeout(this.createInteractiveNotification.bind(this), 900000);

        this.setState({
            intervalID: intervalID
        });
    }

    pauseNotifications() {
        clearInterval(this.state.intervalID);

        if (typeof this.state.notification.close === 'function') {
            this.state.notification.close();
        }

        this.createNotification(
            'PAUSED!',
            'Timo Plato is paused!',
            'images/paused.png',
            true
        );
    }

    addProject(projectName) {
        this.setState({
            projectName: projectName
        });
    }

    toggleButtonValue() {
        this.setState({
            running: !this.state.running
        }, function() {
            if (this.state.running) {
                this.createNotification(
                    'IT HAS BEGAN!',
                    'Timo Plato has started!.',
                    'images/start.png',
                    true
                );

                this.startNotifications();
            } else {
                this.pauseNotifications();
            }
        });
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