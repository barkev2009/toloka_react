import React from 'react'
import Pools from './Pools'
import SandboxSwitch from './SandboxSwitch'
import TokenForm from './TokenForm'

const MainPage = () => {
  return (
    <div className="container pt-3">
      <SandboxSwitch />
      <TokenForm />
      <Pools/>
    </div>
  )
}

export default MainPage