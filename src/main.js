/**
 * Created by kxrr on 17/2/2.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import { store } from './stores/store'

// console.log(App);
// console.log(ReactDOM.render);
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);

