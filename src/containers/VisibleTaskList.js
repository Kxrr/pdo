/**
 * Created by kxrr on 17/2/2.
 */
import { connect } from 'react-redux'
import { deleteTask } from '../stores/actions'
import * as T from '../components/TaskList.js'

const getVisibleTasks = function(tasks, filter){
    switch (filter){
        case 'SHOW_ALL':
            return tasks;
        case 'SHOW_NOT_COMPLETED':
            return tasks.filter(task => !task.completed);
    }
};


const mapStateToProps = (state) => {
  return {
    tasks: getVisibleTasks(state.tasks, state.filter)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTaskClick: (id) => {
      dispatch(deleteTask(id))
    }
  }
};

export const VisibleTaskList = connect(
    mapStateToProps,
    mapDispatchToProps
)(T.TaskList);
