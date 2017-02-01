/**
 * Created by kxrr on 17/2/1.
 */

// 定义 action.type
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const SET_FILTER = 'SET_FILTER';


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


// 定义其它常量
export const Filters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_NOT_COMPLETED: 'SHOW_NOT_COMPLETED'
};