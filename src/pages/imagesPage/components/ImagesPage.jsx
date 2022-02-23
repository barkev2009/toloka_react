import React, { useCallback } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ImagesPage = ({pool_id}) => {

    const folder = '/images/';
    const activePool = useSelector(state => state.pools.activePool);
    const images = useSelector(state => state.images.images);

    const navigate = useNavigate(); 
    const returnHome = useCallback(
        () => navigate('/', {replace: true}), [navigate]
    )

  return (
    <div className="container pt-3">
        <button type='button' className='btn btn-info' onClick={returnHome}>
            Return home
        </button>
        { images.length !== 0 && activePool !== '' ? images.filter(item => item.pool_id === activePool)[0].images.map( item =>
            <figure className='figure' key={item.id}>
                <img src={folder + item.name} alt="Test" className="img-thumbnail img-fluid rounded float-start" width="300px" key={item}/>
                <figcaption className="figure-caption text-center">{item.name}</figcaption>
            </figure>
        ) :
        <div className="alert alert-danger">No images to show yet</div>}
        
    </div>
  )
}

export default ImagesPage