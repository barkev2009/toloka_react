import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SpinnerOpenCloseButton from './SpinnerButtons/SpinnerOpenCloseButton';
import SpinnerImgDownloadButton from './SpinnerButtons/SpinnerImgDownloadButton';
import { RootState } from '../../..';
import Modal from '../../common/Modal';

const PoolItem = ({ data }) => {

  const [theme, setTheme] = useState('');
  const [active, setActive] = useState(false);
  const taskSchema = Object.keys(data.input_spec).map(key => ({ [key]: data.input_spec[key].type }))
  const [tasks, setTasks] = useState(data.input_spec)
  const [numTasks, setNumTasks] = useState(0)

console.log(taskSchema)

  const poolImages: any = useSelector<RootState>(state => state.images.images.filter(item => item.details.pool_id === data.id))
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
        <div className="buttons-container">
          <div className="btn-group" role="group">
            {
              data.all_tasks_done ? '' :
                <SpinnerOpenCloseButton poolData={data} />
            }
            {imagesAvailable !== 0 ? <SpinnerImgDownloadButton poolID={data.id} /> : <p></p>}
          </div>
          <button className='btn-tasks btn btn-outline-info' onClick={() => setActive(!active)}>Add tasks</button>
        </div>
      </div>
      <Modal active={active} setActive={setActive}>
        <h3 className='black-text mb-10'>Applicable only for tasks with universal features</h3>
        <h5 className='black-text mb-10'>Fields</h5>
        {taskSchema.map(
          item =>
          <>
            {tasks[Object.keys(item)[0]].required ? <p className='red-text mb-0'>*Required</p> : <p> </p>}
            <div className="input-group mb-3">
              <span className="input-group-text">{Object.keys(item)}</span>
              <input 
                type="text" 
                className="form-control"
                value={tasks[Object.keys(item)[0]].value}
                onChange={(e) => setTasks({...tasks, [Object.keys(item)[0]]: {...tasks[Object.keys(item)[0]], value: e.target.value}})}
              />
            </div>
            </>
        )}
        <div className="input-group mt-5 mb-3">
          <span className="input-group-text">Number of tasks</span>
          <input type="text" className="form-control" value={numTasks} onChange={e => e.target.value === '' ? setNumTasks(0) : setNumTasks(parseInt(e.target.value, 10))}/>
        </div>
        <button className='btn btn-secondary btn-lg'>Add tasks to pool</button>
      </Modal>
    </div>
  )
}

export default PoolItem;