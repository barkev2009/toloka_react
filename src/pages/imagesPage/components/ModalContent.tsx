import React from 'react'
import SpinnerSendTasksButton from '../../main/components/SpinnerButtons/SpinnerSendTasksButton'
import {useDispatch, useSelector} from 'react-redux'
import { sendCheckedTasks } from '../../../redux/actions/imageActions'
import {RootState} from '../../../index'

const ModalContent = ({images}) => {

  const dispatch = useDispatch()
  const token = useSelector<RootState>(state => state.token.yaToken)
  const sandbox = useSelector<RootState>(state => state.sandbox.sandboxOn)

  const sendTasks = () => {
      dispatch(sendCheckedTasks(sandbox, token, images))
  }

  return (
    <div>
        <SpinnerSendTasksButton 
            onClick={sendTasks} 
            disabled={images.length === 0 || images.filter(img => img.comment !== undefined && img.comment.trim() !== '').length < images.length}
        />
    </div>
  )
}

export default ModalContent