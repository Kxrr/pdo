/**
 * Created by kxrr on 17/2/2.
 */

import {connect} from 'react-redux'
import Toolbar from '../components/Toolbar.js'

import { fetchTasks, openTaskAdd, showMessage} from '../actions'

const mapStateToProps = (state) => state;


const mapDispatchToProps = (dispatch) => {
    return {
        onRefreshClick: () => dispatch(fetchTasks()),
        openTaskAdd: () => dispatch(openTaskAdd()),
        testFlash: () => dispatch(showMessage(Math.random()))
    }
};

const UpperToolbar = connect(mapStateToProps, mapDispatchToProps)(Toolbar);

export default UpperToolbar;

