/**
 * Created by kxrr on 17/2/2.
 */
import { connect } from 'react-redux'
import { deleteTask } from '../stores/actions'
import TaskList from '../components/TaskList.js'


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
    tasks: getVisibleTasks(state.task.items, state.filter)
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    onTaskClick: (id) => {
      dispatch(deleteTask(id))
    }
  }
};


const VisibleTaskList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList);

export default VisibleTaskList;
