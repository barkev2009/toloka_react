import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../..';
import { openClosePool } from '../../../../redux/actions/poolActions';

const SpinnerOpenCloseButton = ({poolData}) => {

    const [btnTheme, setBtnTheme] = useState('');
    const dispatch = useDispatch()
    const token: any = useSelector<RootState>(state => state.token.yaToken)
    const sandbox: any = useSelector<RootState>(state => state.sandbox.sandboxOn)
    const loading = useSelector<RootState>(state => state.app.spinners[poolData.id])

    useEffect(
        () => {
          switch (poolData.status) {
            case 'CLOSED':
              setBtnTheme('btn btn-success');
              break;
            case 'OPEN':
              setBtnTheme('btn btn-danger');
              break;
            default:
              setBtnTheme('btn btn-secondary');
              break;
          }
        }, [poolData.status]
      )

    const onClick = () => {
        dispatch(openClosePool(
          token, 
          sandbox, 
          poolData.id,
          poolData.status === 'OPEN' ? 'close' : 'open'));
      }

    return (
        <button type="button" className={btnTheme} onClick={onClick} disabled={loading ? true : false}>
            {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : ''}
            {loading ? ' Loading...' : poolData.status === 'OPEN' ? 'Close pool' : 'Open pool'}
        </button>
    )
}

export default SpinnerOpenCloseButton