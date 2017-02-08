/**
 * Created by kxrr on 17/2/1.
 */


import { addTask, deleteTask, setFilter, fetchTasks } from '../stores/actions'
import {store} from '../stores/store'

function callback() {
    let currentState = store.getState();
    console.log(currentState);
}

let unsubscribeFn = store.subscribe(callback);


export const loadTestData = function () {
    store.dispatch(addTask('http://kxrr.us/a.dmg'));
    store.dispatch(addTask('http://kxrr.us/b.dmg'));
};


store.dispatch(fetchTasks());
