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

        var avatars = ['bald_man', 'boy', 'boy2', 'face_man', 'face_woman', 'hipster', 'hipster2', 'punk', 'sad_woman'];
        this.avatars = avatars[Math.floor(Math.random()*avatars.length)];
    }

    addProject(projectName) {
        this.setState({
            projectName: projectName
        });
    }

    handleSubmit() {
        if (this.isProjectNameUnique(this.state.projectName)) {
            this.addToProjectList();
        }
    }

    isProjectNameUnique(value) {
        var sameNames = this.state.projects.filter(function(project){
            return project === value;
        }, this);

        if (sameNames.length === 0) {
            return true;
        } else {
            this.createNotification(
                'TRY AGAIN!',
                'Project names must be unique.',
                'images/avatars/' + this.avatars + '.png'
            );

            return false;
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

    editProjectList(state) {
        var i = this.state.projects.indexOf(state.origProjectName);

        if (i !== -1) {
            this.state.projects.splice(i, 1);
        }

        var newProjectsArray = update(this.state.projects, {
            $push: [state.projectName]
        });

        this.setState({
            projects: newProjectsArray
        });
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

    createNotification(title, body, icon, requireInteraction) {
        var options = {
            body: body,
            icon: icon,
            requireInteraction: requireInteraction
        };

        var notification = new Notification(title, options);

        if (!requireInteraction) {
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
                      onSubmit={() => this.handleSubmit()}
                      createNotification={this.createNotification.bind(this)}
                />

                <CollectionView projects={this.state.projects}
                                isProjectNameUnique={this.isProjectNameUnique.bind(this)}
                                editProjectList={this.editProjectList.bind(this)}
                                onDelete={this.deleteProject.bind(this)}
                />
            </div>
        );
    }
}