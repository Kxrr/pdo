/**
 * Created by kxrr on 17/2/12.
 */

import TaskAddForm from '../components/TaskAddForm'
import {createTask} from '../actions'


import {connect} from 'react-redux'


const mapStateToProps = (state) => state;


const mapDispatchToProps = (dispatch) => {
    return {
        createTask: (data) => dispatch(createTask(data))
    }
};

const PopTaskAddForm = connect(mapStateToProps, mapDispatchToProps)(TaskAddForm);
export default PopTaskAddForm;
