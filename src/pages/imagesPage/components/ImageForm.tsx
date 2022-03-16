import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ACCEPT_COMMENT, REJECT_COMMENT } from '../../../constants'
import { setComment, setDecision } from '../../../redux/actions/imageActions'
import '../styles/Images.css'
import Modal from '../../common/Modal';

const ImageForm = ({rootFolder, imageData}) => {

  const [active, setActive] = useState(false)
  const acceptOption = "option1" + imageData.id
  const rejectOption = "option2" + imageData.id
  const dispatch = useDispatch()

  const setAcceptDecision = () => {
    dispatch(setDecision(imageData.id, 'accept'));
    setCommentOnImage(ACCEPT_COMMENT);
  }
  const setRejectDecision = () => {
    dispatch(setDecision(imageData.id, 'reject'));
    setCommentOnImage(REJECT_COMMENT);
  }
  const setCommentOnImage = (commentString: string) => {
    dispatch(setComment(imageData.id, commentString))
  }

  return (
    <div className='container img-container'>
      <Modal active={active} setActive={setActive} imageModal={true}>
        <img src={rootFolder + imageData.fake_name} alt="Pool Item" className="img-thumbnail img-fluid rounded float-start"/>
      </Modal>
      <div className='col'>
        <div className='row'>
          <img 
          src={rootFolder + imageData.fake_name} 
          alt="Pool Item" 
          className="img-thumbnail img-fluid rounded float-start" 
          style={{width: '400px', cursor: 'pointer'}}
          key={imageData}
          onClick={active ? () => setActive(false) : () => setActive(true)}
          />
          </div>
        <div className='row'>
          <figcaption className="figure-caption text-center img-caption">{imageData.name}</figcaption>
        </div>
        <div className='row'>
          <div className='btn-group btn-group-sm' role='group'>
              <input type="radio" className="btn-check" name={"options" + imageData.id} id={acceptOption} autoComplete="off" checked={imageData.decision === 'accept'} onClick={setAcceptDecision}/>
              <label className="btn btn-outline-success" htmlFor={acceptOption}>Accept</label>
              <input type="radio" className="btn-check" name={"options" + imageData.id} id={rejectOption} autoComplete="off" checked={imageData.decision === 'reject'} onClick={setRejectDecision}/>
              <label className="btn btn-outline-danger" htmlFor={rejectOption}>Reject</label>
              <input placeholder='Type the comment' className='form-control' value={imageData.comment} onChange={(e) => setCommentOnImage(e.target.value)}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageForm