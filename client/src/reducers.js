/**
 * Created by kxrr on 17/2/1.
 */

import {
    Filters, REQUEST_TASKS, RECEIVE_TASKS, INVALIDATE_TASK, UPDATE_TASK,
    OPEN_TASK_ADD, CLOSE_TASK_ADD, SHOW_MESSAGE
} from './actions'
import {merge} from './core/item'
import {reducer as formReducer} from 'redux-form'


// Define all initial state here
const initialState = {
    tasks: {
        isFetching: false,
        items: []
    },
    modal: {
        showTaskAdd: false
    },
    filter: Filters.SHOW_ALL,
    form: {},
    properties: {
        'message': 'Hello',
    },


};


export function properties(state, action) {
    switch (action.type) {
        case SHOW_MESSAGE:
            return Object.assign({}, state, {message: action.message});
        default:
            return state;
    }

}


export function modal(state, action) {
    switch (action.type) {
        case OPEN_TASK_ADD:
            return Object.assign({}, state, {showTaskAdd: true});
        case CLOSE_TASK_ADD:
            return Object.assign({}, state, {showTaskAdd: false});
        default:
            return state;
    }
}


export function tasks(state, action) {
    switch (action.type) {
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


export function pdoApp(state = initialState, action) {
    return {
        "tasks": tasks(state.tasks, action),
        "form": formReducer(state.form, action),
        "modal": modal(state.modal, action),
        "properties": properties(state.properties, action)
    }
}
