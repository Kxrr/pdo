/**
 * Created by kxrr on 17/2/24.
 */


import {SERVER_PORT, SERVER_HOST} from '../../config'

export const api = `http://${SERVER_HOST}:${SERVER_PORT}`;
export const socketApi = api;

export function makeBody(data) {
    let formData = new FormData();
    for (let key of Object.keys(data)) {
        formData.append(key, data[key]);
    }
    return formData
}