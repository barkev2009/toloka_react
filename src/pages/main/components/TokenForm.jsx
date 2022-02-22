import {connect} from 'react-redux';
import { setYaToken } from '../../../redux/actions/yatokenActions';

const TokenForm = ({yaToken, setYaToken}) => {


  const onChange = (e) => {
    setYaToken(e.target.value);
  }

  return <div>
    <h4>Toloka Token</h4>
    <input onChange={onChange} className="form-control" placeholder='Your token here' value={yaToken.yaToken}> 
      
    </input>
  </div>
  
};

const mapStateToProps = state => {
  return {
    yaToken: state.token
  }
}

const mapDispatchToProps = {
  setYaToken
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenForm);
