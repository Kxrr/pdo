/**
 * Created by kxrr on 17/2/24.
 */


// Defined by environment variables which are passed by webpack
const SERVER_API_HOST = process.env.SERVER_API_HOST;
const SERVER_API_PORT = process.env.SERVER_API_PORT;

export const socketApi = `${SERVER_API_HOST}:${SERVER_API_PORT}`;
export const api = `http://${socketApi}`;


export function makeBody(data) {
    let formData = new FormData();
    for (let key of Object.keys(data)) {
        formData.append(key, data[key]);
    }
    return formData
}
