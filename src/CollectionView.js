import React, { Component } from 'react';
import { ItemView } from './ItemView';
import { styles } from './styles';

export class CollectionView extends Component {
    constructor(props) {
        super(props);
    }

    removeFromProjectList(projectName) {
        this.props.removeFromProjectList(projectName);
    }

    render() {
        var projects = this.props.projects.map(function(projectName){
            return <ItemView
                key={Math.random()}
                projectName={projectName}
                removeFromProjectList={this.removeFromProjectList.bind(this)} />
        }, this);

        return (
            <ul style={styles.ul}>
                {projects}
            </ul>
        );
    }
}