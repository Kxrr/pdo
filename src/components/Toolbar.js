/**
 * Created by kxrr on 17/2/2.
 */


import React from 'react'
import Button from './Button'


export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<Button text="刷新" onClick={this.props.onRefreshClick}/>)
    }

}


