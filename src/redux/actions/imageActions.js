import axios from "axios"
import { READ_IMAGES_FROM_POOL } from "../types"

export function readImagesFromPool (token, sandbox, pool_id) {
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
            dispatch(
                {
                    type: READ_IMAGES_FROM_POOL,
                    payload: {
                        pool_id,
                        images: response.data.items
                    }
                }
            )
        })
    }
}