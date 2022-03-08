import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../..'
import './../../styles/buttons.css'

const SpinnerGetPoolsButton = ({onClick}) => {

    const loading = useSelector<RootState>(state => state.app.spinners.poolsLoading)
    const pools : any = useSelector<RootState>(state => state.pools.pools)

  return (
    <button type="button" className='btn btn-primary' onClick={onClick} disabled={loading ? true : false}>
        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : ''}
        {loading ? ' Loading...' : pools.length === 0 ? 'Get pools' : 'Refresh pools'}
    </button>
  )
}

export default SpinnerGetPoolsButton