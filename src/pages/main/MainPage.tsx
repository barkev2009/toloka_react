import React from 'react'
import Pools from './components/Pools'
import SandboxSwitch from './components/SandboxSwitch'
import TokenForm from './components/TokenForm'

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