import React, { Component } from 'react/addons';
import { NICE, SUPER_NICE } from './colors';
import { Form } from './Form';
import { CollectionView } from './CollectionView';

export class App extends Component {
    constructor(props) {
        super(props);
        Notification.requestPermission();

        this.state = {
            currentlyRunning: '',
            projects: [],
            projectName: '',
            time: 0,
            running: false,
            intervalID: undefined
        };
    }

    addProject(projectName) {
        this.setState({
            projectName: projectName
        });
    }

    addToProjectList() {
        var newProjectsArray = React.addons.update(this.state.projects, {
            $push: [this.state.projectName]
        });

        this.setState({
            projects: newProjectsArray
        });

        this.clearProjectName();
    }

    clearProjectName() {
        this.setState({
            projectName: ''
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

        if (!this.state.running) {
            this.setState({
                running: true
            });
        }
    }

    createNotification(title, body, icon, isSelfClosing, isPaused) {
        var options = {
            body: body,
            icon: icon
        };

        var notification = new Notification(title, options);

        if (!isSelfClosing && !isPaused) {
            this.notification = notification;

            notification.onclick = () => this.addTime();
            notification.onshow = () => clearInterval(this.timerIntervalID);
            notification.onclose = () => this.onCloseClick();
        } else if (isPaused) {
            this.notification = notification;

            notification.onclick = () => this.addTime();
            notification.onshow = () => clearInterval(this.timerIntervalID);
        } else {
            // For self-closing notifications
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
            });
        }
    }

    createInteractiveNotification() {
        return this.createNotification(
            `Still working on ${this.state.projectName}?`,
            `Click this message if YES. Close if NO.`,
            'images/clock.png'
        );
    }

    toggleButtonValue() {
        this.setState({
            running: !this.state.running
        }, function() {
            this.toggleNotifications();
        });

        this.addToProjectList();
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

    startTimer() {
        if (this.notification) {
            this.notification.close();
        }

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
            'Click me to un-pause!',
            'images/moon.png',
            false,
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
                      createNotification={this.createNotification.bind(this)} />

                <CollectionView projects={this.state.projects} />
            </div>
        );
    }
}