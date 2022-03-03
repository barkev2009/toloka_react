import React, { useCallback } from 'react'
import PoolItem from './PoolItem'
import { getPools } from '../../../redux/actions/poolActions'
import { useDispatch, useSelector } from 'react-redux'
import { resetError } from '../../../redux/actions/appActions'
import { useNavigate } from 'react-router-dom'
import SpinnerGetPoolsButton from './SpinnerButtons/SpinnerGetPoolsButton'

const Pools = () => {

    const dispatch = useDispatch();
    const pools = useSelector(state => state.pools.pools)
    const token = useSelector(state => state.token.yaToken)
    const sandbox = useSelector(state => state.sandbox.sandboxOn)
    const latestError = JSON.stringify(useSelector(state => state.app.latestError))

    const navigate = useNavigate();
  
    const navToImages = useCallback(
      () => navigate('/images', {replace: true}, [navigate]), []
    )

    const handleGetPools = () => {
        dispatch(getPools(token, sandbox));
        dispatch(resetError());
    };
    
  return (
    <div className="container-fluid">
        <div className="container">
          <SpinnerGetPoolsButton onClick={handleGetPools}/>
          <button type='button' className='btn btn-info ml-1' onClick={navToImages}>
            Go to images
          </button>
        </div>
        {latestError !== 'null' ? <div className='alert alert-danger' role='alert'>{latestError}</div> : <div></div>}
        {pools && pools.length !== 0 ? 
        pools.map(item => <PoolItem data={item} key={item.id}/>) :
        <div className="alert alert-primary" role="alert">No pools to display yet</div>}       
    </div>
  )
}


export default Pools;