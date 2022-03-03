import { 
    HIDE_GET_POOLS_SPINNER, 
    HIDE_SEND_TASKS_SPINNER, 
    HIDE_SPINNER, 
    RESET_ERROR, 
    SET_ERROR, 
    SET_SPINNER, 
    SHOW_GET_POOLS_SPINNER, 
    SHOW_SEND_TASKS_SPINNER, 
    SHOW_SPINNER 
} from "../types"

export function showGetPoolsSpinner() {
    return {
        type: SHOW_GET_POOLS_SPINNER
    }
}

export function hideGetPoolsSpinner() {
    return {
        type: HIDE_GET_POOLS_SPINNER
    }
}

export function showSendTasksSpinner() {
    return {
        type: SHOW_SEND_TASKS_SPINNER
    }
}

export function hideSendTasksSpinner() {
    return {
        type: HIDE_SEND_TASKS_SPINNER
    }
}

export function setError(errorMessage) {
    return {
        type: SET_ERROR,
        payload: errorMessage
    }
}

export function resetError(errorMessage) {
    return {
        type: RESET_ERROR
    }
}

export function setInitialSpinner(spinnerName) {
    return {
        type: SET_SPINNER,
        payload: spinnerName
    }
}

export function showSpinner(spinnerName) {
    return {
        type: SHOW_SPINNER,
        payload: spinnerName
    }
}

export function hideSpinner(spinnerName) {
    return {
        type: HIDE_SPINNER,
        payload: spinnerName
    }
}