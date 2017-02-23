/**
 * Created by kxrr on 17/2/1.
 */

import { Filters, ADD_TASK, DELETE_TASK, REQUEST_TASKS, RECEIVE_TASKS, INVALIDATE_TASK, UPDATE_TASK } from './actions'
import { merge } from './core/item'
import { reducer as formReducer } from 'redux-form'

let globalID = 0;
const initialState = {
    tasks: {
        isFetching: false,
        items: []
    },
    filter: Filters.SHOW_ALL,
    form: {}
};


export function tasks(state={
    isFetching: false,
    items: [],
}, action) {
    switch (action.type) {
        case ADD_TASK:
            let newItem = {url: action.url, id: globalID++};
            let nextState = Object.assign({}, state);
            nextState.items.push(newItem);
            return nextState;
        case DELETE_TASK:
            return state.filter((task, i) => (task.id != action.id));
        case REQUEST_TASKS:
            return Object.assign({}, state, {isFetching: true});
        case RECEIVE_TASKS:
            return Object.assign({}, state, {isFetching: false, items: action.items});
        case UPDATE_TASK:
            let newState = Object.assign({}, state);
            let items = newState.items;
            newState.items = merge(items, action.item);
            return newState;
        case INVALIDATE_TASK:
            return state;
        default:
            return state;
    }
}



export function pdoApp(state=initialState, action) {
    return {
        "tasks": tasks(state.tasks, action),
        "form": formReducer(state.form, action)
    }
}
