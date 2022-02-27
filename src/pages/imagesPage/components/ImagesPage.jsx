import React, { useCallback } from 'react'
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ImageForm from './ImageForm';
import '../styles/Images.css';
import { checkImageSize, checkNamePattern, checkWhiteArea, removeDuplicates } from '../../../redux/actions/imageActions';
import { useDispatch } from 'react-redux';
import CheckButton from './CheckButton';

const ImagesPage = ({activePoolID, removeDuplicates}) => {

    const folder = '/images/';
    const images = useSelector(state => state.images.images.filter(img => img.details.pool_id === activePoolID));
    const dispatch = useDispatch();

    const navigate = useNavigate(); 
    const returnHome = useCallback(
        () => navigate('/', {replace: true}), [navigate]
    )
    const removeDuplicatesFromPool = () => {
        removeDuplicates(activePoolID)
    }
    const checkNamePatterns = () => {
        dispatch(checkNamePattern(images))
    }
    const checkSizes = () => {
        dispatch(checkImageSize(images))
    }
    const checkWhiteAreas = () => {
        dispatch(checkWhiteArea(images))
    }


    return (
        <div className="container-fluid">
            <button type='button' className='btn btn-info' onClick={returnHome}>
                Return home
            </button>
            <CheckButton onClick={removeDuplicatesFromPool} value={'Reject duplicate names'}/>
            <CheckButton onClick={checkNamePatterns} value={'Check for name pattern'}/>
            <CheckButton onClick={checkSizes} value={'Check image sizes'}/>
            <CheckButton onClick={checkWhiteAreas} value={'Check white areas'}/>
            <div className="container pt-3" style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end'}}>
                { images.length !== 0 && activePoolID !== '' ? images.map( item =>
                    <ImageForm imageData={item} rootFolder={folder} key={item.id}/>
                ) :
                <div className="alert alert-danger" style={{width: '100%'}}>No images to show yet</div>}
            </div>
            
        </div>
    )
}

const mapStateToProps = state => ({
    activePoolID: state.pools.activePool
})

const mapDispatchToProps = {
    removeDuplicates
}

export default connect(mapStateToProps, mapDispatchToProps)(ImagesPage) 