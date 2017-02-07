/**
 * Created by kxrr on 17/2/3.
 */
import React from 'react';


export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return (<button onClick={this.props.onClick}>{this.props.text}</button>)
    }
}


Button.propTypes = {
    text : React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
};

