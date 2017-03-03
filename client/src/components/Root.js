/**
 * Created by kxrr on 17/2/4.
 */

import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, hashHistory, IndexRoute, browserHistory} from 'react-router';

import PopTaskAddForm from '../containers/PopTaskAddForm'
import Help from './Help'
import App from './App'
import Home from './Home'

const Root = ({store}) => (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="/help" component={Help}/>
            </Route>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;
