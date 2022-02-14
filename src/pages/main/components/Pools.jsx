import React from 'react'
import PoolItem from './PoolItem'
import { getPools } from '../../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import SpinnerButton from './SpinnerButton'

const Pools = () => {

    const dispatch = useDispatch();
    const pools = useSelector(state => state.pools.pools)
    const token = useSelector(state => state.token.yaToken)
    const sandbox = useSelector(state => state.sandbox.sandboxOn)
    const latestError = JSON.stringify(useSelector(state => state.app.latestError))

    const onClick = () => {
        dispatch(getPools(token, sandbox));
    };
    
  return (
    <div className="container-fluid">
        <SpinnerButton onClick={onClick}/>
        {latestError !== 'null' ? <p>{latestError}</p> : <p></p>}
        {pools.items && pools.items.length !== 0 ? 
        pools.items.map(item => <PoolItem data={item} key={item.id}/>) :
            pools.code === 'ACCESS_DENIED' ? 
            <div className="alert alert-danger" role="alert">Access by this token is denied!</div> :
            <div className="alert alert-primary" role="alert">No pools to display yet</div>}       
    </div>
  )
}


export default Pools;