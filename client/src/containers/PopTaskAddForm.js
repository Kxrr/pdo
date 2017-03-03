/**
 * Created by kxrr on 17/2/12.
 */

import TaskAddForm from '../components/TaskAddForm'
import { createTask, closeTaskAdd } from '../actions'


import {connect} from 'react-redux'


const mapStateToProps = (state) => state;


const mapDispatchToProps = (dispatch) => {
    return {
        createTask: function(data) {
            dispatch(createTask(data));
            dispatch(closeTaskAdd());
        },

        closeTaskAdd: function (event) {
            event.preventDefault();
            dispatch(closeTaskAdd());

        }
    }
};

const PopTaskAddForm = connect(mapStateToProps, mapDispatchToProps)(TaskAddForm);
export default PopTaskAddForm;
