import { imageAction } from './../interfaces/imageInterfaces';
import axios from "axios"
import { CHANGE_ALL, 
    CHECK_IMAGES_SIZE, 
    CHECK_NAME_PATTERN, 
    CHECK_WHITE_AREA, 
    READ_IMAGES_FROM_POOL, 
    REMOVE_DUPLICATE_NAMES, 
    SEND_CHECKED_TASKS, 
    SET_COMMENT, 
    SET_DECISION 
} from "../types"
import { hideSpinner, showSpinner } from "./appActions"

export function readImagesFromPool (token : string, sandbox: boolean, pool_id: string) {
    return async dispatch => {
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/read_images_from_pool',
            params : {
                token,
                sandbox,
                pool_id
            }
        }).then(response => {
            const imageData = response.data.items.filter(img => img.status === 'SUBMITTED').map(item => ({...item, fake_name: item.id + '.' + item.name.split('.').reverse()[0]}))
            dispatch(
                {
                    type: READ_IMAGES_FROM_POOL,
                    payload: [
                        ...imageData
                    ]
                }
            )
        })
    }
}

export function removeDuplicates(poolID: string) : imageAction {
    return {
        type: REMOVE_DUPLICATE_NAMES,
        payload: poolID
    }
}

export function checkNamePattern(imageData: Object[]) {
    return async dispatch => {
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/check_name_pattern',
            data: [
                ...imageData
            ]
        }).then(response => {
            dispatch({
                type: CHECK_NAME_PATTERN,
                payload: response.data
            }) 
        }
        )
    }
}

export function checkImageSize(imageData: Object[]) {
    return async dispatch => {
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/check_images_size',
            data: [
                ...imageData
            ]
        }).then(response => {
            dispatch({
                type: CHECK_IMAGES_SIZE,
                payload: response.data
            }) 
        }
        )
    }
}

export function checkWhiteArea(imageData: Object[]) {
    return async dispatch => {
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/check_white_area',
            data: [
                ...imageData
            ]
        }).then(response => {
            dispatch({
                type: CHECK_WHITE_AREA,
                payload: response.data
            }) 
        }
        )
    }
}

export function setDecision(imgId: string, decisionString: string): imageAction {
    return {
        type: SET_DECISION,
        payload: {
            imgId,
            decisionString
        }
    }
}

export function setComment(imgId: string, commentString: string): imageAction {
    return {
        type: SET_COMMENT,
        payload: {
            imgId,
            commentString
        }
    }
}

export function changeAllImages(poolId: string, decisionString: string): imageAction {
    return {
        type: CHANGE_ALL,
        payload: {
            poolId, 
            decisionString
        }
    }
}

export function sendCheckedTasks(
    sandbox: boolean, 
    token: string, 
    items: Object[], 
    pushToDisk: boolean,
    yaDiskToken?: string,
    folderName?: string 
    ) {
    return async dispatch => {
        dispatch(showSpinner('tasksSending'))
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/send_checked_tasks/',
            data: {
                sandbox,
                token,
                items,
                pushToDisk,
                yaDiskToken,
                folderName
            }
        }).then(
            response => {
                dispatch({
                    type: SEND_CHECKED_TASKS,
                    payload: response.data
                })
                dispatch(hideSpinner('tasksSending'))
            }
        )
    } 
}