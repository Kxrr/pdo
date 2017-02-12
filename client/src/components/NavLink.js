/**
 * Created by kxrr on 17/2/11.
 */

import React from 'react';
import {Link} from 'react-router'


export default class NavLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return (<Link {...this.props} />)
    }

}

