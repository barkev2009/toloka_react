import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'
import { setYaDiskToken } from '../../../redux/actions/tokenActions'

const GetPoligonToken = () => {

    const dispatch = useDispatch()
    const yaDiskToken: any = useSelector<RootState>(state => state.token.yaDiskToken)

    const [tempToken, setTempToken] = useState(yaDiskToken)

    return (
        <div className='column'>
            <div className="row mb10">
                <a
                    className='btn btn-warning'
                    href='https://oauth.yandex.ru/authorize?response_type=token&client_id=f53cfda9e2ad4769863f72f63b959a3f'
                    target="_blank"
                    rel="noreferrer"
                >
                    Get Yandex Poligon Token
                </a>
            </div>
            <div className="row">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Your Yandex Polygon Token here"
                        aria-label="Yandex Polygon Token"
                        aria-describedby="button-addon2"
                        value={tempToken}
                        onChange={e => setTempToken(e.target.value)}
                    />
                    <button className="btn btn-outline-warning" type="button" id="button-addon2" onClick={() => dispatch(setYaDiskToken(tempToken))}>
                        Submit Token
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GetPoligonToken