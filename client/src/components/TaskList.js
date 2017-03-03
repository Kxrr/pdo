/**
 * Created by kxrr on 17/2/2.
 */

import React from 'react';
import { Table } from 'react-bootstrap'
import io from 'socket.io-client'

import Task  from './Task'

import { fetchTasks, updateTask } from '../actions'
import { socketApi } from '../core/request'


export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchTasks());
        this.initSocket();
    }

    initSocket(){
        const { dispatch } = this.props;
        let socket = io.connect(socketApi, {origins: '*'});
        socket.on('updateItem', (item => dispatch(updateTask(item))));
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
                            <th>STATE</th>
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
