/**
 * Created by kxrr on 17/2/2.
 */

import React from 'react';
import {ProgressBar, OverlayTrigger, Tooltip} from 'react-bootstrap'


export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        const task = this.props.task;
        const _progress = task.progress * 100;
        const tooltip = <Tooltip id={`tooltip-${task.id}`}>{_progress}</Tooltip>;
        const fixedProgress = Math.round(_progress.toFixed(1));
        return (
                <tr>
                    <td>{task.id}</td>
                    <td>{task.url}</td>
                    <td>
                        <OverlayTrigger placement="left" overlay={tooltip}>
                            <ProgressBar now={fixedProgress} label={` ${fixedProgress}% `} />
                        </OverlayTrigger>
                    </td>
                    <td>
                        {/*retrive link*/}
                    </td>
                </tr>
        )
    }

}

Task.propTypes = {
    task: React.PropTypes.object
};