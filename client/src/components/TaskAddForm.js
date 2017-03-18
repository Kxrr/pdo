/**
 * Created by kxrr on 17/2/4.
 */


import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button as PButton, Modal } from 'react-bootstrap';


class TaskAddForm extends Component {
    render() {
        console.log('close task', this.props.closeTaskAdd);
        const { handleSubmit, submitting } = this.props;
        return (
            <Modal show={this.props.modal.showTaskAdd} >

                <Modal.Header>
                    Create Task
                </Modal.Header>

                <Modal.Body>
                    <form >
                        <div>
                            <label htmlFor="url">url</label>
                            <Field name="url" component="input" type="text"/>
                        </div>
                        <div>
                            <label htmlFor="cookies">cookies</label>
                            <Field name="cookies" component="input" type="text"/>
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                        <PButton disabled={submitting} onClick={handleSubmit(this.props.createTask)}>Submit</PButton>
                        <PButton onClick={this.props.closeTaskAdd}>Cancel</PButton>
                </Modal.Footer>

            </Modal>
        );
    }
}

// Decorate the form component
TaskAddForm = reduxForm({
    form: 'taskAddForm' // a unique name for this form
})(TaskAddForm);

export default TaskAddForm;

