import { CHANGE_SANDBOX } from "../types.ts";

const initialState = {sandboxOn: true, label: 'Sandbox is on'};

export const sandboxReducer = (state=initialState, action) => {
    switch (action.type) {
        case CHANGE_SANDBOX:
            return {...state, sandboxOn: !state.sandboxOn, label: state.sandboxOn ? 'Sandbox is off' : 'Sandbox is on'}
        default:
            return state
    }
}