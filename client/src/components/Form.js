/**
 * Created by kxrr on 17/2/7.
 * https://x-team.com/blog/tutorial-forms-in-react-and-redux/
 */

import React from 'react';


export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        return (
            <form>
                {this.props.children}
            </form>
        )
    }

}


Form.propTypes = {
    children: React.PropTypes.node,
    values: React.PropTypes.object,
    update: React.PropTypes.func,
    reset: React.PropTypes.func,
    onSubmit: React.PropTypes.func
};

