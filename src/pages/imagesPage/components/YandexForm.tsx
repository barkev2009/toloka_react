import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'
import { setYaDiskID, setYaDiskSecret, setYaDiskUrl, setYaDiskToken } from '../../../redux/actions/tokenActions'
import '../styles/Images.css'

const YandexForm = () => {

    const dispatch = useDispatch()
    const yaDiskID : any = useSelector<RootState>(state => state.token.yaDiskID)
    const yaDiskSecret : any = useSelector<RootState>(state => state.token.yaDiskSecret)
    const yaDiskUrl : any = useSelector<RootState>(state => state.token.yaDiskUrl)

    const [tempCode, setTempCode] = useState('')

    const urlHandler = () => {
        if (yaDiskUrl === null) {
            dispatch(setYaDiskUrl(yaDiskID, yaDiskSecret));
        } else {
            const win = window.open(yaDiskUrl, '_blank');
            win.focus()
        }
    }

    return (
        <div className='container'>
            <p>Seems like the system doesn't know about your Yandex.Disk Token. Please, proceed to acquire.</p>
            <input onChange={e => dispatch(setYaDiskID(e.target.value))} className="form-control mb10" placeholder='Your Yandex ID here' value={yaDiskID} />
            <input onChange={e => dispatch(setYaDiskSecret(e.target.value))} className="form-control mb10" placeholder='Your Yandex Secret here' value={yaDiskSecret} />  
            <button type='button' className='btn btn-warning mb10' onClick={urlHandler}>
                {yaDiskUrl === null ? 'No URL yet' : 'Click to acquire Yandex Token'}
            </button>
            <div className="input-group mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Your temporary code here" 
                    aria-label="TempCode" 
                    aria-describedby="button-addon2" 
                    onChange={e => setTempCode(e.target.value)} 
                    value={tempCode} 
                />
                <button 
                    className="btn btn-outline-warning" 
                    type="button" 
                    id="button-addon2" 
                    onClick={() => dispatch(setYaDiskToken(yaDiskID, yaDiskSecret, tempCode))}
                >
                    Get Yandex Token
                </button>
            </div>
        </div>
    )
}

export default YandexForm