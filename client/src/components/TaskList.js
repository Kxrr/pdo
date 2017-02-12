/**
 * Created by kxrr on 17/2/2.
 */

import React from 'react';
import Task  from './Task'
import {fetchTasks} from '../stores/actions'


export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const {dispatch} = this.props;
        this.intervalId = setInterval(()=> dispatch(fetchTasks()), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        return (
            <div>
                <h2>TaskList</h2>
                <ul>
                    {this.props.tasks.items.map(task => <Task key={task.id} task={task} />)}
                </ul>
            </div>

        )
    }
}
