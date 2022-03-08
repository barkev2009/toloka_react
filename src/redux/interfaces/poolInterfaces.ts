export interface poolState {
    pools: poolObject[],
    activePool: string
}

export interface poolObject {
    id : string,
    all_tasks_done: boolean,
    tasks_done: number,
    [key: string]: any
}

export interface poolAction {
    type: string,
    payload: any
}