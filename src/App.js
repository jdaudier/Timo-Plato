import React, { Component } from 'react';
import update from 'react-addons-update';
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

    verifyProjectNameIsUnique() {
        var sameNames = this.state.projects.filter(function(project){
            return project === this.state.projectName;
        }, this);

        if (sameNames.length > 0) {
            this.createNotification(
                'TRY AGAIN!',
                'Project names must be unique.',
                'images/sad_woman.png',
                true
            );
        } else {
            this.addToProjectList();
        }
    }

    addToProjectList() {
        var newProjectsArray = update(this.state.projects, {
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

    deleteProject(projectName) {
        var projects = this.state.projects.filter(function(project){
            return project !== projectName;
        });

        this.setState({
            projects: projects
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
                      onSubmit={() => this.verifyProjectNameIsUnique()}
                      createNotification={this.createNotification.bind(this)}
                />

                <CollectionView projects={this.state.projects}
                                onDelete={this.deleteProject.bind(this)}
                />
            </div>
        );
    }
}