/**
 * Created by kxrr on 17/2/1.
 */

import { combineReducers } from 'redux';
import {Filters, ADD_TASK, DELETE_TASK, REQUEST_TASKS, RECEIVE_TASKS, SET_FILTER} from './actions'

let globalID = 0;
const initialState = {
    tasks: [],
    filter: Filters.SHOW_ALL
};


export function task(state={
    isFetching: false,
    items: [],
}, action) {
    // state: array<Task>

    switch (action.type) {
        case ADD_TASK:
            return [
                ...state,
                {url: action.url, id: globalID++}
            ];
        case DELETE_TASK:
            return state.filter((task, i) => (task.id != action.id));
        case REQUEST_TASKS:
            return Object.assign(state, {isFetching: true});
        case RECEIVE_TASKS:
            return Object.assign(state, {isFetching: false, items: action.items});
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

export function pdoApp(state=initialState, action) {
    // state: Object
    return {
        task: task(state.task, action),
        filter: filter(state.filter, action)
    };
}


// const app = combineReducers({
//     tasks,
//     filter,
// });

