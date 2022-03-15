import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../styles/PoolItem.css';
import SpinnerOpenCloseButton from './SpinnerButtons/SpinnerOpenCloseButton';
import SpinnerImgDownloadButton from './SpinnerButtons/SpinnerImgDownloadButton';
import { RootState } from '../../..';

const PoolItem = ({data}) => {

  const [theme, setTheme] = useState('');
 
  const poolImages : any = useSelector<RootState>(state => state.images.images.filter(item => item.details.pool_id === data.id))
  const imagesAvailable = poolImages !== undefined ? poolImages.filter(item => item.status === 'SUBMITTED').length : 0


  useEffect(
    () => {
      switch (data.status) {
        case 'ARCHIVED':
          setTheme('card text-white bg-dark mb-3');
          break;
        case 'CLOSED':
          setTheme('card text-white bg-danger mb-3');
          break;
        case 'OPEN':
          setTheme('card text-white bg-success mb-3');
          break;
        default:
          setTheme('card bg-light mb-3');
          break;
      }
    }, [data.status]
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
        <p className="card-text">{`Tasks done: ${data.tasks_done} / ${data.tasks_overall}`}</p>
        <div className="btn-group" role="group">
          {
          data.all_tasks_done ? '' : 
          <SpinnerOpenCloseButton poolData={data}/>
          }
          {imagesAvailable !== 0 ? <SpinnerImgDownloadButton poolID={data.id}/> : <p></p>}
        </div>
    </div>
    </div>
  )
}

export default PoolItem;