/**
 * Created by kxrr on 17/2/2.
 */

import React from 'react';
import {ProgressBar, OverlayTrigger, Tooltip} from 'react-bootstrap'

import {api} from '../core/request'


export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        const task = this.props.task;

        const progress = task.current_size / task.total_size * 100;
        const progressTooltip = <Tooltip id={`progress-tooltip-${task.id}`}>{`${task.current_size} / ${task.total_size}`}</Tooltip>;
        const fixedProgress = Math.round(progress.toFixed(1));

        const success = <a href={ task.filename ? `${api}/retrieve/${task.filename}` : '#'}>success</a>;
        // const stateTooltip  = <Tooltip id={`state-tooltip-${task.id}`}>{`${task.state}`}</Tooltip>;
        return (
                <tr>
                    <td>{task.id}</td>
                    <td>{task.url}</td>
                    <td>
                        <OverlayTrigger placement="left" overlay={progressTooltip}>
                            <ProgressBar now={fixedProgress} label={` ${fixedProgress}% `} />
                        </OverlayTrigger>
                    </td>
                    <td>
                        {task.state == 'success' ? success : <span>{task.state}</span>}
                    </td>
                </tr>
        )
    }

}

Task.propTypes = {
    task: React.PropTypes.object
};