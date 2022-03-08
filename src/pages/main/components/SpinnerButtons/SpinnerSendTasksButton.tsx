import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../..'
import './../../styles/buttons.css'

const SpinnerSendTasksButton = ({onClick, disabled}) => {

    const loading = useSelector<RootState>(state => state.app.spinners.tasksSending)

    return (
        <button type="button" className='btn btn-primary btn-lg' onClick={onClick} disabled={(!disabled && !loading) ? false : true}>
            {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : ''}
            {loading ? ' Loading...' : 'Send response to tasks'}
        </button>
    )
}

export default SpinnerSendTasksButton