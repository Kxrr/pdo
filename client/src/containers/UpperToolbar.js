/**
 * Created by kxrr on 17/2/2.
 */

import { connect } from 'react-redux'
import { fetchTasks, addTask, invalidateTasks } from '../stores/actions'
import Toolbar from '../components/Toolbar.js'


const mapStateToProps = (state) => {
    return {state}
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onRefreshClick: () => {
            dispatch(fetchTasks())
        },
        onTaskAddSubmit: (e) => {
            e.preventDefault();
            dispatch(addTask('abc'));
            dispatch(invalidateTasks());
        }
    }
};


const UpperToolbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar);

export default UpperToolbar;
