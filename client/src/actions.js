/**
 * Created by kxrr on 17/2/1.
 */

import 'babel-polyfill'
import fetch from 'isomorphic-fetch'
import {makeBody, api} from './core/request'
import {browserHistory} from 'react-router'


// 定义 action.type
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const INVALIDATE_TASK = 'INVALIDATE_TASK';

export const SET_FILTER = 'SET_FILTER';

export const REQUEST_TASKS = 'REQUEST_TASKS';
export const UPDATE_TASK = 'UPDATE_TASK';  // action for message pushed by server
export const RECEIVE_TASKS = 'RECEIVE_TASKS';  //

export const CLOSE_TASK_ADD = 'CLOSE_TASK_ADD';
export const OPEN_TASK_ADD = 'OPEN_TASK_ADD';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';

export const SHOW_MESSAGE = 'SHOW_MESSAGE';


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

export function updateTask(item) {
    return {
        type: UPDATE_TASK,
        item: item
    }
}

export function receiveTasks(json) {
    return {
        type: RECEIVE_TASKS,
        items: json.data,
        receivedAt: Date.now()
    }
}


export function closeTaskAdd() {
    return {type: CLOSE_TASK_ADD}
}


export function openTaskAdd() {
    return {type: OPEN_TASK_ADD}
}


export function showMessage(message) {
    return {type: SHOW_MESSAGE, message}

}


// async
export function fetchTasks() {

    function getJson(response) {
        return response.json();
    }

    function onReceive(json, dispatch) {
        dispatch(receiveTasks(json));
        const taskNum = json.data.length;
        dispatch(showMessage(`${taskNum} ${taskNum >0 ? 'tasks' : 'task'} loaded`));
    }

    return function (dispatch) {
        // 通知应用请求已经发起
        dispatch(showMessage('Loading tasks'));
        dispatch(requestTasks());

        // 发起请求
        fetch(`${api}/tasks`, {mode: 'cors'})
            .then(getJson)
            .then(json => onReceive(json, dispatch))
    }
}


export function createTaskSuccess() {
    return showMessage('Task created');
}


export function createTask(data) {
    return function (dispatch) {
        console.log(data);
        fetch(`${api}/tasks`, {mode: 'cors', method: 'POST', body: makeBody(data)})
            .then(dispatch(createTaskSuccess()))
            .then(browserHistory.push('/'))
    }
}


// 定义其它常量
export const Filters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_NOT_COMPLETED: 'SHOW_NOT_COMPLETED'
};