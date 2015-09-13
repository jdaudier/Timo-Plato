import React, { Component } from 'react';
import { ItemView } from './ItemView';

export class CollectionView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var projects = this.props.projects.map(function(project, index){
            return <ItemView
                key={index}
                project={project} />
        }, this);


        return (
            <ul className="tbd">
                {projects}
            </ul>
        );
    }
}