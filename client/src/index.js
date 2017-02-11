/**
 * Created by kxrr on 17/2/2.
 */

import React from 'react'
import ReactDOM from 'react-dom'

import Root from './components/Root'
import {store} from './stores/store'

ReactDOM.render(
    Root({store}),
    document.body.appendChild(document.createElement('div'))
);

