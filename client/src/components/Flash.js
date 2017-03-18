/**
 * Created by kxrr on 17/3/17.
 */

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import '../csses/main.css'

export default class Flash extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="flash-container">
                <ReactCSSTransitionGroup
                    transitionName="trans"
                    transitionEnterTimeout={2000}
                    transitionLeaveTimeout={100}>
                    <div key={this.props.message} className="message">{this.props.message}</div>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}
