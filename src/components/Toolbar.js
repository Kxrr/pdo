/**
 * Created by kxrr on 17/2/2.
 */


import React from 'react'


export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<div><button onClick={this.props.onRefreshClick}>刷新</button></div>)
    }


}


