/**
 * Created by kxrr on 17/2/1.
 */


import { addTask, deleteTask, setFilter } from '../stores/actions'
import {store} from '../stores/store'

let unsubscribeFn = store.subscribe(
    () => (console.log(store.getState()))
);



export const loadTestData = function () {
    store.dispatch(addTask('http://kxrr.us/a.dmg'));
    store.dispatch(addTask('http://kxrr.us/b.dmg'));
};




