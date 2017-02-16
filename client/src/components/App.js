/**
 * Created by kxrr on 17/2/2.
 */


import React from 'react';
import {IndexLink} from 'react-router'
import {PageHeader} from 'react-bootstrap'


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <PageHeader><IndexLink to="/">PDO</IndexLink></PageHeader>
                {this.props.children}
            </div>
        )
    }
}
