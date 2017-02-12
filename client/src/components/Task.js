/**
 * Created by kxrr on 17/2/2.
 */

import React from 'react';


export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        const task = this.props.task;
        return (
            <div>
                {task.id} {task.url} {task.progress}
            </div>
        )
    }

}

Task.propTypes = {
    task: React.PropTypes.object
};