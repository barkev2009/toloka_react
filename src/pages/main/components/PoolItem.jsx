import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { openClosePool } from '../../../redux/actions';
import '../styles/PoolItem.css';

const PoolItem = ({data}) => {

  const [theme, setTheme] = useState('');
  const [btnTheme, setBtnTheme] = useState('');

  const dispatch = useDispatch();
  const token = useSelector(state => state.token.yaToken)
  const sandbox = useSelector(state => state.sandbox.sandboxOn)

  const onClick = () => {
    dispatch(openClosePool(
      token, 
      sandbox, 
      data.id,
      data.status === 'OPEN' ? 'close' : 'open'));
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

  
  return (
    <div className={theme}>
    <div className="card-header">
        {data.private_name}
    </div>
    <div className="card-body">
        <h5 className="card-title">{data.status}</h5>
        <p className="card-text">{data.created.slice(0, -4).replace('T', ' ')}</p>
        <button className={btnTheme} disabled={data.status === 'ARCHIVED'} onClick={onClick}>
          {data.status === 'OPEN' ? 'Close pool' : 'Open pool'}
        </button>
    </div>
    </div>
  )
}

export default PoolItem;