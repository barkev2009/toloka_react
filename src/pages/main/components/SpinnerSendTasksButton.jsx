import React from 'react'
import { useSelector } from 'react-redux'

const SpinnerSendTasksButton = ({onClick, disabled}) => {

    const loading = useSelector(state => state.app.tasksSending)

    return (
        <button type="button" className='btn btn-primary btn-lg' onClick={onClick} disabled={(!disabled && !loading) ? false : true}>
            {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : ''}
            {loading ? ' Loading...' : 'Send response to tasks'}
        </button>
    )
}

export default SpinnerSendTasksButton