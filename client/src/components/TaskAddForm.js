/**
 * Created by kxrr on 17/2/4.
 */


import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { Button as PButton } from 'react-bootstrap';


class TaskAddForm extends Component {
    render() {
        const {handleSubmit, submitting} = this.props;
        console.log(this.props);
        return (
            <form onSubmit={handleSubmit(this.props.createTask)}>
                <div>
                    <label htmlFor="url">url</label>
                    <Field name="url" component="input" type="text"/>
                </div>
                <div>
                    <label htmlFor="cookies">cookies</label>
                    <Field name="cookies" component="input" type="text"/>
                </div>
                <PButton type="submit" disabled={submitting}>Submit</PButton>
            </form>
        );
    }
}

// Decorate the form component
TaskAddForm = reduxForm({
    form: 'taskAddForm' // a unique name for this form
})(TaskAddForm);

export default TaskAddForm;

