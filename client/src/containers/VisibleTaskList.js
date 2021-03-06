/**
 * Created by kxrr on 17/2/2.
 */
import {connect} from 'react-redux'
import {deleteTask} from '../actions'
import TaskList from '../components/TaskList.js'


const getVisibleTasks = function (tasks, filter) {
    switch (filter) {
        case 'SHOW_ALL':
            return tasks;
        case 'SHOW_NOT_COMPLETED':
            return tasks.filter(task => !task.completed);
    }
};


const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
};


const VisibleTaskList = connect(mapStateToProps)(TaskList);
export default VisibleTaskList;
