import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../../..'
import { hideSpinner, showSpinner } from '../../../../redux/actions/appActions'
import { setActivePool } from '../../../../redux/actions/poolActions'

const SpinnerImgDownloadButton = ({ poolID }) => {

    const token = useSelector<RootState>(state => state.token.yaToken)
    const sandbox = useSelector<RootState>(state => state.sandbox.sandboxOn)
    const poolImages : any = useSelector<RootState>(state => state.images.images.filter(item => item.details.pool_id === poolID))
    const imagesAvailable = poolImages !== undefined ? poolImages.filter(item => item.status === 'SUBMITTED').length : 0
    const loading = useSelector<RootState>(state => state.app.spinners[`img_${poolID}`])
    const dispatch = useDispatch()
    const navigate = useNavigate()
        

    const downloadImages = async () => {
        dispatch(showSpinner(`img_${poolID}`))
        await axios({
          method: 'POST',
          url: 'http://127.0.0.1:8000/download_images/',
          data: {
            sandbox,
            token,
            imageData: poolImages
          }
        })

    await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/download_images/',
      data: {
        sandbox,
        token,
        imageData: poolImages
      }
    })

    dispatch(setActivePool(poolID));
    dispatch(hideSpinner(`img_${poolID}`));
    navigate('/images', { replace: true });
  }
  return (
    <button type="button" className='btn btn-warning' onClick={downloadImages} disabled={loading ? true : false}>
      {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : ''}
      {loading ? ' Loading...' : imagesAvailable + ' images available'}
    </button>
  )
}

export default SpinnerImgDownloadButton