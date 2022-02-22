import React from 'react'
import { connect } from 'react-redux';
import { changeSandbox } from '../../../redux/actions/sandboxActions';

const SandboxSwitch = ({changeSandbox, sandbox}) => {

    const onClick = () => {
        changeSandbox();
    }

  return (
    <div className="form-check form-switch">
    <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={sandbox.sandboxOn} onChange={onClick}/>
    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">{sandbox.label}</label>
    </div>
  )
}

const mapStateToProps = state => ({
    sandbox: state.sandbox
})

const mapDispatchToProps = {
    changeSandbox
}

export default connect(mapStateToProps, mapDispatchToProps)(SandboxSwitch);