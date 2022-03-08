import React, { useCallback } from 'react'
import PoolItem from './PoolItem'
import { getPools } from '../../../redux/actions/poolActions'
import { useDispatch, useSelector } from 'react-redux'
import { resetError } from '../../../redux/actions/appActions'
import { useNavigate } from 'react-router-dom'
import SpinnerGetPoolsButton from './SpinnerButtons/SpinnerGetPoolsButton'
import { RootState } from '../../..'

const Pools = () => {

    const dispatch = useDispatch();
    const pools: any = useSelector<RootState>(state => state.pools.pools)
    const token: any = useSelector<RootState>(state => state.token.yaToken)
    const sandbox: any = useSelector<RootState>(state => state.sandbox.sandboxOn)
    const latestError = JSON.stringify(useSelector<RootState>(state => state.app.latestError))

    const navigate = useNavigate();
  
    const navToImages = useCallback(
      () => navigate('/images', {replace: true}), []
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