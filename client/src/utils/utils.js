/**
 * Created by kxrr on 17/2/12.
 */

export function makeBody(data) {
    let formData = new FormData();
    for (let key of Object.keys(data)) {
        formData.append(key, data[key]);
    }
    return formData
}
