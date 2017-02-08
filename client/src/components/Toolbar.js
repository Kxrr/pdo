/**
 * Created by kxrr on 17/2/2.
 */


import React from 'react'
import Button from './Button'
import TaskAdd from './TaskAdd'


export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <TaskAdd onSubmit={this.props.onTaskAddSubmit}/>
                <Button text="刷新" onClick={this.props.onRefreshClick}/>
            </div>

        )
    }

}



Toolbar.propTypes = {
    onTaskAddSubmit: React.PropTypes.func,
    onRefreshClick: React.PropTypes.func
};
