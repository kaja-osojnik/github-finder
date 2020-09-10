import React, {useReducer} from 'react';
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';
import { SET_ALERT, REMOVE_ALERT} from "../types";

const AlertState = props => {
    const initialState = {
        alert: null
    }

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    //set Alert
    const setAlert = (msg, type) => {
        dispatch({
            type: SET_ALERT,
            payload: { msg: msg, type: type }
        })
        setTimeout(() => dispatch({type: REMOVE_ALERT}), 5000)
    }

    return <AlertContext.Provider
        value={{
            alert: state,
            setAlert
        }}
    >
        {props.children}

    </AlertContext.Provider>
}

export default AlertState;