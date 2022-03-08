import React from 'react'

const CheckButton = ({onClick, value, disabled}) => {
  return (
    <button type='button' className='btn btn-warning' onClick={onClick} disabled={disabled}>
        {value}
    </button>
  )
}

export default CheckButton