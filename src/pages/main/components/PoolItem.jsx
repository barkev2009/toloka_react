import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { readImagesFromPool } from '../../../redux/actions/imageActions';
import { openClosePool, setActivePool } from '../../../redux/actions/poolActions';
import '../styles/PoolItem.css';

const PoolItem = ({data}) => {

  const [theme, setTheme] = useState('');
  const [btnTheme, setBtnTheme] = useState('');
 
  const dispatch = useDispatch();
  const token = useSelector(state => state.token.yaToken)
  const sandbox = useSelector(state => state.sandbox.sandboxOn)
  const poolImages = useSelector(state => state.images.images.filter(item => item.details.pool_id === data.id))
  const imagesAvailable = poolImages !== undefined ? poolImages.filter(item => item.status === 'SUBMITTED').length : 0

  const onClick = () => {
    dispatch(openClosePool(
      token, 
      sandbox, 
      data.id,
      data.status === 'OPEN' ? 'close' : 'open'));
  }

  const downloadImage = (sandbox, token, file_id, file_name) => {
    axios({
      method: 'GET',
      url: 'http://127.0.0.1:8000/download_image/',
      params : {
        sandbox,
        token,
        file_id,
        file_name
      },
    })
  }

  const downloadImages = () => {
    poolImages.forEach(img => {
      downloadImage(sandbox, token, img.id, img.name);
    });
    dispatch(setActivePool(data.id))
  }

  useEffect(
    () => {
      switch (data.status) {
        case 'ARCHIVED':
          setTheme('card text-white bg-dark mb-3');
          setBtnTheme('btn btn-secondary');
          break;
        case 'CLOSED':
          setTheme('card text-white bg-danger mb-3');
          setBtnTheme('btn btn-success');
          break;
        case 'OPEN':
          setTheme('card text-white bg-success mb-3');
          setBtnTheme('btn btn-danger');
          break;
        default:
          setTheme('card bg-light mb-3');
          setBtnTheme('btn btn-secondary');
          break;
      }
    }, [data.status]
  )
  
  useEffect(
    () => {
      dispatch(readImagesFromPool(token, sandbox, data.id));
    }, []
  )
  
  return (
    <div className={theme}>
    <div className="card-header">
        {data.status}
    </div>
    <div className="card-body">
        <h5 className="card-title">{data.private_name}</h5>
        <p className="card-text">{`Project Name: ${data.project_name}`}</p>
        <p className="card-text">{`Created on: ${data.created.slice(0, -4).replace('T', ' ')}`}</p>
        <div className="btn-group" role="group">
          <button className={btnTheme} disabled={data.status === 'ARCHIVED'} onClick={onClick}>
            {data.status === 'OPEN' ? 'Close pool' : 'Open pool'}
          </button>
          {imagesAvailable !== 0 ? <button className='card text-dark bg-warning mb-3' onClick={downloadImages}>{imagesAvailable + ' images available'}</button> : <p></p>}
        </div>
    </div>
    </div>
  )
}

export default PoolItem;