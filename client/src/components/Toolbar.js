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
                <Button onClick={this.props.openTaskAdd}>Create Task</Button>
                <Button onClick={this.props.onRefreshClick}>Refresh All Task</Button>
                {/*<Button onClick={this.props.testFlash}>Flash!</Button>*/}
            </div>

        )
    }
}

Toolbar.propTypes = {
    onRefreshClick: React.PropTypes.func
};
