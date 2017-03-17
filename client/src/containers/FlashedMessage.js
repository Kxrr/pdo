/**
 * Created by kxrr on 17/3/17.
 */

import {connect} from 'react-redux'
import Flash from '../components/Flash.js'


const mapStateToProps = (state) => {
    return {message: state.properties.message}
};


const FlashedMessage = connect(mapStateToProps)(Flash);

export default FlashedMessage;
