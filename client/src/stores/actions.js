/**
 * Created by kxrr on 17/2/1.
 */
import 'babel-polyfill'
import fetch from 'isomorphic-fetch'

// 定义 action.type
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const INVALIDATE_TASK = 'INVALIDATE_TASK';

export const SET_FILTER = 'SET_FILTER';

export const REQUEST_TASKS = 'REQUEST_TASKS';
export const RECEIVE_TASKS = 'RECEIVE_TASKS';

// export const FETCH_TASK_REQUEST = 'FETCH_TASK_REQUEST';
// export const FETCH_TASK_SUCCESS = 'FETCH_TASK_SUCCESS';
// export const FETCH_TASK_FAILURE = 'FETCH_TASK_FAILURE';


// 定义action创建函数
export function addTask(url) {
    return {type: ADD_TASK, url}
}


export function deleteTask(id) {
    return {type: DELETE_TASK, id}
}


export function setFilter(filter) {
    return {type: SET_FILTER, filter}
}


export function invalidateTasks() {
    return {type: INVALIDATE_TASK}
    
}


export function requestTasks() {
    return {
        type: REQUEST_TASKS,
    }

}


export function receiveTasks(json) {
    return {
        type: RECEIVE_TASKS,
        items: json,
        receivedAt: Date.now()
    }

}



// async
export function fetchTasks() {

    function getJson(response) {
        console.log(response);
        return response.json();
    }

    return function (dispatch) {
        // 通知应用请求已经发起
        dispatch(requestTasks());

        // 发起请求
        fetch('http://127.0.0.1:8000/tasks', {mode: 'cors'})
            .then(getJson)
            .then(json => dispatch(receiveTasks(json)))
    }
}


// 定义其它常量
export const Filters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_NOT_COMPLETED: 'SHOW_NOT_COMPLETED'
};