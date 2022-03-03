import { 
    HIDE_GET_POOLS_SPINNER, 
    HIDE_SEND_TASKS_SPINNER, 
    RESET_ERROR, 
    SET_ERROR, 
    SET_INITIAL_SPINNER, 
    SHOW_GET_POOLS_SPINNER, 
    SHOW_SEND_TASKS_SPINNER 
} from "../types";

const initialState = {poolsLoading: false, latestError: null, tasksSending: false, spinners: {}};

export const appReducer = (state=initialState, action) => {
    switch (action.type) {
        case SHOW_GET_POOLS_SPINNER:
            return {...state, poolsLoading: true}
        case HIDE_GET_POOLS_SPINNER:
            return {...state, poolsLoading: false}
        case SHOW_SEND_TASKS_SPINNER:
            return {...state, tasksSending: true}
        case HIDE_SEND_TASKS_SPINNER:
            return {...state, tasksSending: false}
        case SET_ERROR:
            return {...state, latestError: action.payload}
        case RESET_ERROR:
            return {...state, latestError: null}
        case SET_INITIAL_SPINNER:
            return {...state, spinners: {...state.spinners, [action.payload]: false}}
        default:
            return state
    }
}