import { useState, useEffect } from 'react';
import { isAuth, getCookie } from '../../actions/auth';
import { editPhoto } from '../../actions/user';
import './editPhoto.css';

const EditPhoto = ({ setLoggedIn }) => {
    const [values, setValues] = useState({
        photo: '',
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
        photo,
        userData,
        error,
        loading,
        message } = values;
    const token = getCookie('token');

    const handleChange = (type) => (e) => {
        if (type === 'upload') {
            userData.set(type, e.target.files[0]);
            setValues({ ...values, photo: e.target.files[0], userData: userData, error: '' });
        } else {
            userData.set(type, '');
            setValues({ ...values, photo: '', userData: userData, error: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, loading: true, error: false, message: '' });

        editPhoto(userData, token)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, loading: false, error: true, message: '' });
                } else {
                    setValues({ ...values, loading: false, error: false, message: data.message });
                }
            })
            .catch(err => console.log(err));
    }

    const editPhotoForm = () => {
        return (
            <div className="photo-fields p-5 border border-light rounded">
                <div className="user-photo-container mb-3">
                    <label className="form-label photo-label">Profile Photo</label>
                    <img
                        src={ `${ process.env.REACT_APP_API }/api/user/profile/photo/${ isAuth().username }` }
                        className="user-photo img img-fluid img-thumbnail mb-3"
                        alt="User profile photo"
                    />
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
                <hr/>
                <div>
                    <button
                        type="submit"
                        className="photo-confirm-btn btn"
                        onClick={ handleSubmit }
                    >
                        Confirm Edit
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="edit-photo-container">
            <p className="photo-text">Profile Photo</p>
            { editPhotoForm() }
        </div>
    );
};

export default EditPhoto;