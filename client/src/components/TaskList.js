/**
 * Created by kxrr on 17/2/2.
 */

import React from 'react';
import Task  from './Task'


export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ul>{this.props.tasks.map(
                task => <Task key={task.id} {...task} onClick={()=>this.props.onTaskClick(task.id)} url={task.url}/>
            )}</ul>
        )
    }

}

// TaskList.propTypes = {
//     onTaskClick: React.PropTypes.func.isRequired
// };
