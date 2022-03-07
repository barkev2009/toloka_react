export interface appState {
    latestError: string | null,
    spinners : {
        poolsLoading: boolean,
        tasksSending: boolean,
        [key: string] : boolean
    }
}

export interface appAction {
    type: string,
    [payload: string]: string
}