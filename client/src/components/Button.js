/**
 * Created by kxrr on 17/2/3.
 */
import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';


export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return (<BootstrapButton {...this.props}>{this.props.children}</BootstrapButton>)
    }
}


Button.propTypes = {

};
