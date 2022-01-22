// import { uuid } from 'uuidv4';
import { v4 as uuid_v4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from './types'

export const setAlert = (msg, alertType) => dispatch => {
    // const id = uuid();
    const id = uuid_v4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });
    setTimeout(() => {
        dispatch({
            type: REMOVE_ALERT,
            payload: id
        })
    }, 2000);
}