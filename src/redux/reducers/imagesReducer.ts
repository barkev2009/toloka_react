import { imageState, imageAction } from './../interfaces/imageInterfaces';
import { ACCEPT_COMMENT, REJECT_COMMENT } from "../../constants";
import { 
    CHANGE_ALL, 
    CHECK_IMAGES_SIZE, 
    CHECK_NAME_PATTERN, 
    CHECK_WHITE_AREA, 
    READ_IMAGES_FROM_POOL, 
    REMOVE_DUPLICATE_NAMES, 
    SEND_CHECKED_TASKS, 
    SET_COMMENT, 
    SET_DECISION 
} from "../types";

const initialState : imageState = {images: []};

export const imagesReducer = (state : imageState = initialState, action: imageAction) => {
    switch (action.type) {
        case READ_IMAGES_FROM_POOL: // expecting action.payload as [imageData]
            let newImages = []
            action.payload.forEach(
                item => {
                    if (!state.images.map(img => img.id).includes(item.id)) {  // if the image is new 
                        item.decision = 'accept';
                        item.comment = ACCEPT_COMMENT;
                        newImages.push(item);
                    }
                }
            )
            return {...state, images: [...state.images, ...newImages]}
        case REMOVE_DUPLICATE_NAMES: // expecting action.payload as string(pool_id), currently sets 'reject' decision to duplicates from state
            const poolImages = state.images.filter(item => (item.details.pool_id === action.payload) && (item.status === 'SUBMITTED'));
            const otherImages = state.images.filter(item => item.details.pool_id !== action.payload);
            let uniqueNames = [];
            let newData = [];
            poolImages.forEach(
                item => {
                    if (!uniqueNames.includes(item.name)) {
                        uniqueNames.push(item.name);
                        newData.push(item)
                    } else {
                        item.decision = 'reject';
                        item.comment = REJECT_COMMENT;
                        newData.push(item);
                    }
                }
            )
            return {...state, images: [...newData, ...otherImages]}
        case CHECK_NAME_PATTERN: // expecting action.payload as [imageData]
        case CHECK_IMAGES_SIZE:
        case CHECK_WHITE_AREA:
            const otherImagesCheck = state.images.filter(item => item.details.pool_id !== action.payload[0].details.pool_id);
            return {...state, images: [...otherImagesCheck, ...action.payload]}
        case SEND_CHECKED_TASKS:
            const otherImagesSend = state.images.filter(item => item.details.pool_id !== action.payload[0].details.pool_id);
            return {...state, images: [...otherImagesSend]}
        case SET_DECISION: // expecting action.payload as {imgId, decisionString}
            let decisionImage = state.images.filter(item => item.id === action.payload.imgId)[0]
            decisionImage.decision = action.payload.decisionString
            return {...state, images: [...state.images.map(item => item.id !== action.payload.imgId ? item : decisionImage)]}
        case SET_COMMENT: // expecting action.payload as {imgId, commentString}
            let commentImage = state.images.filter(item => item.id === action.payload.imgId)[0]
            commentImage.comment = action.payload.commentString
            return {...state, images: [...state.images.map(item => item.id !== action.payload.imgId ? item : commentImage)]}
        case CHANGE_ALL: // expecting action.payload as {poolId, decisionString}
            const imagesChange = state.images.filter(item => item.details.pool_id === action.payload.poolId);
            const otherImagesChange = state.images.filter(item => item.details.pool_id !== action.payload.poolId);
            const commentForAll = action.payload.decisionString === 'accept' ? ACCEPT_COMMENT : REJECT_COMMENT;
            return {...state, images: [...otherImagesChange, ...imagesChange.map(item => ({...item, decision: action.payload.decisionString, comment: commentForAll}))]}
        default:
            return state
    }
}