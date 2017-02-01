/**
 * Created by kxrr on 17/2/2.
 */

import React from 'react';


export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return (
            <li onClick={this.props.onClick}>{this.props.url}</li>
        )
    }

}

Task.propTypes = {
    url: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
};