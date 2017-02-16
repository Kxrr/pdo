/**
 * Created by kxrr on 17/2/2.
 */

import ReactDOM from 'react-dom'
import Root from './components/Root'
import { store } from './configStore'

ReactDOM.render(
    Root({ store }),
    document.body.appendChild(document.createElement('div'))
);

