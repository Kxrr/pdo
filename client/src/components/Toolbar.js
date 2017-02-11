/**
 * Created by kxrr on 17/2/2.
 */


import React from 'react'
import {Link} from 'react-router'

import NavLink from './NavLink'


export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h2>Toolbar</h2>
                <NavLink to="addTask" >添加任务</NavLink>
                <NavLink to="#" onClick={this.props.onRefreshClick}>刷新任务</NavLink>
            </div>

        )
    }
}


Toolbar.propTypes = {
    onTaskAddSubmit: React.PropTypes.func,
    onRefreshClick: React.PropTypes.func
};
