/**
 * Created by kxrr on 17/2/2.
 */

import React from 'react';
import Task  from './Task'
import {fetchTasks} from '../actions'
import {Table} from 'react-bootstrap'


export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const {dispatch} = this.props;
        this.intervalId = setInterval(() => dispatch(fetchTasks()), 50000000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>URL</th>
                            <th>PROGRESS</th>
                            <th>RETRIEVE</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.props.tasks.items.map(task => <Task key={task.id} task={task}/>)}
                    </tbody>
                </Table>
            </div>
        )
    }
}
