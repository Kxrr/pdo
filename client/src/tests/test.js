/**
 * Created by kxrr on 17/2/1.
 */


import { addTask, updateTask } from '../actions'
import {store} from '../configStore'



export const loadTestData = function () {
    store.dispatch(addTask('http://kxrr.us/a.dmg'));
    store.dispatch(addTask('http://kxrr.us/b.dmg'));
};


// store.dispatch(fetchTasks());

store.dispatch(
    updateTask({id: 1})
);
