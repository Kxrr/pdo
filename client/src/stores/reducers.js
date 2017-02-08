/**
 * Created by kxrr on 17/2/1.
 */

import { combineReducers } from 'redux';
import {Filters, ADD_TASK, DELETE_TASK, REQUEST_TASKS, RECEIVE_TASKS, SET_FILTER, INVALIDATE_TASK} from './actions'
import * as f from './form_actions'

let globalID = 0;
const initialState = {
    tasks: [],
    filter: Filters.SHOW_ALL
};

const initialFormState = { values: {} };

export function task(state={
    isFetching: false,
    items: [],
}, action) {
    // state: array<Task>

    switch (action.type) {
        case ADD_TASK:
            let new_task = {url: action.url, id: globalID++};
            let new_state = Object.assign({}, state);
            new_state.items.push(new_task);
            return new_state;
        case DELETE_TASK:
            return state.filter((task, i) => (task.id != action.id));
        case REQUEST_TASKS:
            return Object.assign(state, {isFetching: true});
        case RECEIVE_TASKS:
            return Object.assign(state, {isFetching: false, items: action.items});
        case INVALIDATE_TASK:
            // TODO: didn't work
            return state;
        default:
            return state;
    }
}


export function filter(state = Filters.SHOW_ALL, action) {
    // state: string
    switch (action.type) {
        case SET_FILTER:
            return action.filter;
        default:
            return state

    }
}


export function form(state=initialFormState, action) {
    // state: object
    switch (action.type){
        case f.UPDATE:
            return Object.assign({}, state.values, {[action.name]: action.value})
        case f.RESET:
            return initialFormState;
        default:
            return state;
    }

}


export function pdoApp(state=initialState, action) {
    // state: Object
    return {
        task: task(state.task, action),
        filter: filter(state.filter, action),
        // form: form(state.form)
    };
}


// const app = combineReducers({
//     tasks,
//     filter,
// });
