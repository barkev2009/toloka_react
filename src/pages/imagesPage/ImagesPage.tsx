import React, { useCallback, useState } from 'react'
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ImageForm from './components/ImageForm';
import { changeAllImages, checkImageSize, checkNamePattern, checkWhiteArea, removeDuplicates } from '../../redux/actions/imageActions';
import { useDispatch } from 'react-redux';
import CheckButton from './components/CheckButton';
import Modal from '../common/Modal';
import ModalContent from './components/ModalContent';
import {RootState} from '../../index'

const ImagesPage = ({activePoolID, removeDuplicates}) => {

    const folder = '/images/';
    const images : any = useSelector<RootState>(state => state.images.images.filter(img => (img.details.pool_id === activePoolID) && (img.status === 'SUBMITTED')));
    const dispatch = useDispatch();

    const [modalActive, setModalActive] = useState(false)

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
    const acceptAll = () => {
        dispatch(changeAllImages(activePoolID, 'accept'))
    }
    const rejectAll = () => {
        dispatch(changeAllImages(activePoolID, 'reject'))
    }
    
    return (
        <div className="container-fluid">
            <Modal active={modalActive} setActive={setModalActive}>
                <ModalContent images={images}/>
            </Modal>
            <div className="container">
                <button type='button' className='btn btn-info' onClick={returnHome}>
                    Return home
                </button>
                <button 
                    type='button' 
                    className='btn btn-primary btn-lg' 
                    onClick={() => setModalActive(true)} 
                    disabled={images.length === 0 || images.filter(img => img.comment !== undefined && img.comment.trim() !== '').length < images.length}
                >
                    Send decisions to Toloka
                </button>
            </div>
            <div className="container change-buttons">
                <div className='changeAll-buttons'>
                    <button type='button' className='btn btn-success' onClick={acceptAll} disabled={images.length === 0}>
                        Accept all
                    </button>
                    <button type='button' className='btn btn-danger' onClick={rejectAll} disabled={images.length === 0}>
                        Reject all
                    </button>
                </div>
                <div className='check-buttons'>
                    <CheckButton onClick={removeDuplicatesFromPool} value={'Reject duplicate names'} disabled={images.length === 0}/>
                    <CheckButton onClick={checkNamePatterns} value={'Check for name pattern'} disabled={images.length === 0}/>
                    <CheckButton onClick={checkSizes} value={'Check image sizes'} disabled={images.length === 0}/>
                    <CheckButton onClick={checkWhiteAreas} value={'Check white areas'} disabled={images.length === 0}/>
                </div>
            </div>
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