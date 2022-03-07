import { CHANGE_SANDBOX } from "../types";

interface sandboxState {
    sandboxOn: boolean,
    label: string
}

interface sandboxAction {
    type: string
}

const initialState : sandboxState = {sandboxOn: true, label: 'Sandbox is on'};

export const sandboxReducer = (state : sandboxState = initialState, action: sandboxAction) : sandboxState => {
    switch (action.type) {
        case CHANGE_SANDBOX:
            return {...state, sandboxOn: !state.sandboxOn, label: state.sandboxOn ? 'Sandbox is off' : 'Sandbox is on'}
        default:
            return state
    }
}