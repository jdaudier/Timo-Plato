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
            projectName: ''
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

    removeFromProjectList(projectName) {
        var projects = this.state.projects;
        var index = projects.indexOf(projectName);

        this.setState({
            projects: React.addons.update(projects, {$splice: [[index, 1]]})
        })
    }

    createNotification(title, body, icon, isSelfClosing) {
        var options = {
            body: body,
            icon: icon
        };

        var notification = new Notification(title, options);

        if (isSelfClosing) {
            // For self-closing notifications
            setTimeout(() => {
                notification.close();
            }, 3000);
        }
    }

    render() {
        return (
            <div>
                <Form addProject={this.addProject.bind(this)}
                      projectName={this.state.projectName}
                      addToProjectList={this.addToProjectList.bind(this)}
                      createNotification={this.createNotification.bind(this)} />

                <CollectionView projects={this.state.projects}
                      removeFromProjectList={this.removeFromProjectList.bind(this)} />
            </div>
        );
    }
}