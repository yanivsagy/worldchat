import { useState, useEffect } from 'react';
import { isAuth, getCookie } from '../../actions/auth';
import { uploadPhoto, removePhoto } from '../../actions/user';
import './editPhoto.css';

const EditPhoto = ({ setLoggedIn }) => {
    const [values, setValues] = useState({
        userData: new FormData(),
        error: false,
        loading: false,
        message: ''
    });

    useEffect(() => {
        if (isAuth()) {
            setLoggedIn(true);
        }
    }, []);

    const {
        userData,
        error,
        loading,
        message } = values;
    const token = getCookie('token');

    const handleChange = (type) => (e) => {
        if (type === 'upload') {
            userData.set(type, e.target.files[0]);
            setValues({ ...values, userData: userData, error: '' });

            uploadPhoto(userData, token)
                .then(data => {
                    if (data.error) {
                        setValues({ ...values, loading: false, error: data.error, message: '' });
                    } else {
                        setValues({ ...values, loading: false, error: false, message: data.message });
                    }
                })
                .catch(err => console.log(err));
        } else {
            removePhoto(token)
                .then(data => {
                    if (data.error) {
                        setValues({ ...values, loading: false, error: data.error, message: '' });
                    } else {
                        setValues({ ...values, loading: false, error: false, message: data.message });
                    }
                })
                .catch(err => console.log(err));
        }
    };

    const showLoading = () => {
        return loading ? <div className="photo-result alert alert-info">Loading...</div> : '';
    }

    const showError = () => {
        return error ? <div className="photo-result alert alert-danger">{ error }</div> : '';
    }

    const showMessage = () => {
        return message ? <div className="photo-result alert alert-success">{ message }</div> : '';
    }

    const editPhotoForm = () => {
        return (
            <div className="photo-fields p-5 border border-light rounded">
                <div
                    className="user-photo-container mb-3"
                    style={ {
                        backgroundImage: `url(${ process.env.REACT_APP_API }/api/user/profile/photo/${ isAuth().username }/${ Math.random() })`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    } }
                >
                </div>
                <p className="recommended-text">*Recommended photo size: 400px x 400px</p>
                <hr/>
                <div className="photo-btn-container">
                    <label className="photo-upload-btn btn">
                        Upload Photo
                        <input
                            className="form-control"
                            type="file"
                            accept="image/*"
                            onChange={ handleChange('upload') }
                            hidden
                        />
                    </label>
                    <button className="photo-remove-btn photo-label btn" onClick={ handleChange('remove') }>Remove Photo</button>
                </div>
            </div>
        );
    }

    return (
        <div className="edit-photo-container">
            <p className="photo-text">My Photo</p>
            { showLoading() }
            { showError() }
            { showMessage() }
            { editPhotoForm() }
        </div>
    );
};

export default EditPhoto;