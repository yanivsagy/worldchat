import { useState, useEffect } from 'react';
import { isAuth, getCookie, updateUser } from '../../actions/auth';
import { getAbout, editAbout } from '../../actions/user';
import './editAbout.css';

const EditAbout = ({ setLoggedIn }) => {
    const [values, setValues] = useState({
        username: '',
        language: '',
        about: '',
        userData: new FormData(),
        error: false,
        loading: false,
        message: '',
        showForm: true
    });

    useEffect(() => {
        if (isAuth()) {
            setLoggedIn(true);
        }
        getAboutData();
    }, []);

    const {
        username,
        language,
        about,
        userData,
        error,
        loading,
        message,
        showForm } = values;
    const token = getCookie('token');

    const getAboutData = () => {
        getAbout(token)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({ ...values, username: data.username, language: data.language, about: data.about });
                }
            })
            .catch(err => console.log(err));
    };

    const handleChange = (type) => (e) => {
        userData.set(type, e.target.value);
        setValues({ ...values, [type]: e.target.value, userData: userData, error: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: false, loading: true, message: '' });

        editAbout(userData, token)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false, message: '' });
                } else {
                    updateUser(data, () => {
                        setValues({
                            ...values,
                            username: data.username,
                            language: data.language,
                            about: data.about,
                            error: false,
                            loading: false,
                            message: 'About You successfully updated!'
                        });
                    });
                }
            })
            .catch(err => console.log(err));
    };

    const editAboutForm = () => {
        return (
            <div className="about-fields p-5 border border-light rounded">
                <div className="mb-3">
                    <label className="form-label about-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={ username }
                            onChange={ handleChange('username') }
                            required
                        />
                </div>
                <div className="mb-3">
                    <label className="form-label about-label">Language</label>
                        <input
                            type="text"
                            className="form-control"
                            value={ language }
                            onChange={ handleChange('language') }
                            required
                        />
                </div>
                <div className="mb-3">
                    <label className="form-label about-label">About</label>
                        <textarea
                            className="form-control"
                            value={ about }
                            onChange={ handleChange('about') }
                            maxLength="200"
                        />
                </div>
                <hr className="about-hr"/>
                <div>
                    <button
                        type="submit"
                        className="about-btn btn"
                        onClick={ handleSubmit }
                    >
                        Edit About You
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="edit-about-container">
            <p className="about-text">About You</p>
            { editAboutForm() }
        </div>
    );
};

export default EditAbout;