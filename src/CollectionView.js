import React, { Component } from 'react';
import { ItemView } from './ItemView';
import { styles } from './styles/styles';

export class CollectionView extends Component {
    constructor(props) {
        super(props);
    }

    isProjectNameUnique(value) {
        return this.props.isProjectNameUnique(value);
    }

    editProjectList(state) {
        this.props.editProjectList(state);
    }

    onDelete(projectName) {
        this.props.onDelete(projectName);
    }

    render() {
        var projects = this.props.projects.map(function(projectName){
            return <ItemView
                key={projectName}
                projectName={projectName}
                isProjectNameUnique={this.isProjectNameUnique.bind(this)}
                editProjectList={this.editProjectList.bind(this)}
                onDelete={this.onDelete.bind(this)} />
        }, this);

        return (
            <ul style={styles.ul}>
                {projects}
            </ul>
        );
    }
}