import { useState, useEffect } from 'react';
import { isAuth, getCookie } from '../../actions/auth';
import { getLocation, editLocation } from '../../actions/user';
import './editLocation.css';

const EditLocation = ({ setLoggedIn }) => {
    const [values, setValues] = useState({
        street: '',
        city: '',
        state: '',
        country:  '',
        zip: '',
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
        getLocationData();
    }, []);

    const {
        street,
        city,
        state,
        country,
        zip,
        userData,
        error,
        loading,
        message,
        showForm } = values;
    const token = getCookie('token');

    const getLocationData = () => {
        getLocation(token)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    userData.set('street', data.street);
                    userData.set('city', data.city);
                    userData.set('state', data.state);
                    userData.set('country', data.country);
                    userData.set('zip', data.zip);
                    setValues({
                        ...values,
                        street: data.street,
                        city: data.city,
                        state: data.state,
                        country: data.country,
                        zip: data.zip,
                        userData: userData
                    });
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

        editLocation(userData, token)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false, message: '' });
                } else {
                    setValues({
                        ...values,
                        street: data.street,
                        city: data.city,
                        state: data.state,
                        country: data.country,
                        zip: data.zip,
                        error: false,
                        loading: false,
                        message: 'Location successfully updated!'
                    });
                }
            })
            .catch(err => console.log(err));
    };

    const showLoading = () => {
        return loading ? <div className="location-result alert alert-info">Loading...</div> : '';
    }

    const showError = () => {
        return error ? <div className="location-result alert alert-danger">{ error }</div> : '';
    }

    const showMessage = () => {
        return message ? <div className="location-result alert alert-success">{ message }</div> : '';
    }

    const editLocationForm = () => {
        return (
            <div className="location-fields p-5 border border-light rounded">
                <div className="mb-3">
                    <label className="form-label location-label">Street Address</label>
                        <input
                            type="text"
                            className="form-control"
                            value={ street }
                            onChange={ handleChange('street') }
                        />
                </div>
                <div className="mb-3">
                    <label className="form-label location-label">City</label>
                        <input
                            type="text"
                            className="form-control"
                            value={ city }
                            onChange={ handleChange('city') }
                        />
                </div>
                <div className="mb-3">
                    <label className="form-label location-label">State</label>
                        <input
                            type="text"
                            className="form-control"
                            value={ state }
                            onChange={ handleChange('state') }
                        />
                </div>
                <div className="mb-3">
                    <label className="form-label location-label">Country/Region</label>
                        <input
                            type="text"
                            className="form-control"
                            value={ country }
                            onChange={ handleChange('country') }
                        />
                </div>
                <div className="mb-3">
                    <label className="form-label location-label">Zip Code</label>
                        <input
                            type="text"
                            className="form-control"
                            value={ zip }
                            onChange={ handleChange('zip') }
                        />
                </div>
                <hr/>
                <div>
                    <button
                        type="submit"
                        className="location-btn btn"
                        onClick={ handleSubmit }
                    >
                        Save
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="edit-location-container">
            <p className="location-text">My Location</p>
            { showLoading() }
            { showError() }
            { showMessage() }
            { editLocationForm() }
        </div>
    );
};

export default EditLocation;