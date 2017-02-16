/**
 * Created by kxrr on 17/2/2.
 */

import React from 'react'

import NavLink from './NavLink'
import Button from './Button'


export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <NavLink to="addTask" ><Button>添加任务</Button></NavLink>
                <Button onClick={this.props.onRefreshClick}>刷新任务</Button>
            </div>

        )
    }
}

Toolbar.propTypes = {
    onTaskAddSubmit: React.PropTypes.func,
    onRefreshClick: React.PropTypes.func
};
