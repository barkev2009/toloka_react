import React from 'react'
import { useDispatch } from 'react-redux'
import { setComment, setDecision } from '../../../redux/actions/imageActions'
import '../styles/Images.css'

const ImageForm = ({rootFolder, imageData}) => {

  const acceptOption = "option1" + imageData.id
  const rejectOption = "option2" + imageData.id
  const dispatch = useDispatch()

  const setAcceptDecision = (decisionString) => {
    dispatch(setDecision(imageData.id, 'accept'))
  }
  const setRejectDecision = (decisionString) => {
    dispatch(setDecision(imageData.id, 'reject'))
  }
  const setCommentOnImage = (commentString) => {
    dispatch(setComment(imageData.id, commentString))
  }

  return (
    <div className='container img-container'>
      <div className='col'>
        <div className='row'>
          <img 
          src={rootFolder + imageData.fake_name} 
          alt="Pool Item" 
          className="img-thumbnail img-fluid rounded float-start" 
          style={{width: '400px'}}
          key={imageData}
          />
          </div>
        <div className='row'>
          <figcaption className="figure-caption text-center img-caption">{imageData.name}</figcaption>
          {/* <div className='btn-group btn-group-sm' role='group'>
              <button className='btn btn-outline-success' type='button' autocomplete='off'>Accept</button>
              <button className='btn btn-outline-danger' type='button'>Reject</button>
          </div> */}
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