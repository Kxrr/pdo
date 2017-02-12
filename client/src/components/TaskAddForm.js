/**
 * Created by kxrr on 17/2/4.
 */
import React from 'react';
import Form from './Form'


export default class TaskAddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render(){
        return (
            <form onSubmit={this.props.onSubmit}>
                <input name="url" />
                <button type="submit" value="submit">submit</button>
            </form>
        )
    }
}


TaskAddForm.propTypes = {
    onSubmit: React.PropTypes.func,
};
