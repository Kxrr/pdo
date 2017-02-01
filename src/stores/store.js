/**
 * Created by kxrr on 17/2/1.
 */


import * as reducers from './reducers';
import { createStore } from 'redux';

console.log(createStore);
console.log(reducers.pdoApp);
export let store = createStore(reducers.pdoApp);

