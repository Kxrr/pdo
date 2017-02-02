/**
 * Created by kxrr on 17/2/2.
 */

import {connect} from 'react-redux'
import {fetchTasks} from '../stores/actions'
import Toolbar from '../components/Toolbar.js'


const mapStateToProps = (state) => {
    return {state}
};


const mapDispatchToProps = (dispatch) => {
    return {
        onRefreshClick: () => {
            dispatch(fetchTasks())
        }
    }
};


const UpperToolbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar);

export default UpperToolbar;
