/**
 * Created by kxrr on 17/3/17.
 */

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class Flash extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    <div key={this.props.message}>{this.props.message}</div>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

