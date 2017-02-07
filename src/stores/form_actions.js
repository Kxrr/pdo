/**
 * Created by kxrr on 17/2/7.
 */

export const UPDATE = 'UPDATE';
export const RESET = 'RESET';


export function update(name, value) {
    return {
        type: UPDATE,
        name,
        value
    }

}

export function reset() {
    return {
        type: RESET,
    }
}
