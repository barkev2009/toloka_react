import React from 'react'
import { useSelector } from 'react-redux'

const SpinnerButton = ({onClick}) => {

    const loading = useSelector(state => state.app.poolsLoading)

  return (
    <button type="button" className="btn btn-primary" onClick={onClick} disabled={loading ? true : false}>
        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : ''}
        {loading ? ' Loading...' : 'Get pools'}
    </button>
  )
}

export default SpinnerButton