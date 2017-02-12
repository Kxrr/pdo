/**
 * Created by kxrr on 17/2/2.
 */


import React from 'react';
import {IndexLink} from 'react-router'


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1><IndexLink to="/">PDO</IndexLink></h1>
                {this.props.children}
            </div>
        )
    }

}

