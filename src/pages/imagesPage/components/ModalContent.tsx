import React, { useState } from 'react'
import SpinnerSendTasksButton from '../../main/components/SpinnerButtons/SpinnerSendTasksButton'
import { useDispatch, useSelector } from 'react-redux'
import { sendCheckedTasks } from '../../../redux/actions/imageActions'
import { setYaDiskToken } from '../../../redux/actions/tokenActions'
import { RootState } from '../../../index'
import GetPoligonToken from './GetPoligonToken'

const ModalContent = ({ images }) => {

  const dispatch = useDispatch()
  const token: any = useSelector<RootState>(state => state.token.yaToken)
  const sandbox: any = useSelector<RootState>(state => state.sandbox.sandboxOn)
  const yaDiskToken: any = useSelector<RootState>(state => state.token.yaDiskToken)
  const [pushToDisk, setPushToDisk] = useState(false)


  const sendTasks = () => {
    dispatch(sendCheckedTasks(sandbox, token, images, pushToDisk, yaDiskToken, 'Data from Toloka Pools'))

  }

  return (
    <div className='change-buttons'>
      <div className='container'>
        <SpinnerSendTasksButton
          onClick={sendTasks}
          disabled={images.length === 0 || images.filter(img => img.comment !== undefined && img.comment.trim() !== '').length < images.length}
        />
      </div>
      <div className="container">
        {
          yaDiskToken.toString() === 'null' || yaDiskToken.toString() === '' ?
            <GetPoligonToken /> :
            <div className='container'>
              <div className="container text-align-center">
                <div className="form-check mb-5 w-max m0auto">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={pushToDisk}
                    id="flexCheckDefault"
                    onChange={() => setPushToDisk(pushToDisk ? false : true)}
                    disabled={images.length === 0 || images.filter(img => img.comment !== undefined && img.comment.trim() !== '').length < images.length || !yaDiskToken}
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    Push accepted images to Yandex.Disk
                  </label>
                </div>
              </div>
              <h6 className='text-align-center'>{`Current Yandex poligon Token: ${yaDiskToken}`}</h6>
              <div className="container text-align-center">
                <button className='btn btn-outline-danger' onClick={() => dispatch(setYaDiskToken('null'))}>Reset Yandex Poligon Token</button>
              </div>
            </div>
        }
      </div>
    </div>
  )
}

export default ModalContent