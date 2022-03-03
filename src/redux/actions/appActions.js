import { HIDE_GET_POOLS_SPINNER, HIDE_SEND_TASKS_SPINNER, RESET_ERROR, SET_ERROR, SET_INITIAL_SPINNER, SHOW_GET_POOLS_SPINNER, SHOW_SEND_TASKS_SPINNER } from "../types"

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
        type: SET_INITIAL_SPINNER,
        payload: spinnerName
    }
}
