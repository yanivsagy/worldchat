import { useState, useEffect } from 'react';
import { isAuth, getCookie } from '../../actions/auth';
import { getLocation, editLocation } from '../../actions/user';
import './editLocation.css';

const EditLocation = ({ setLoggedIn }) => {
    const [values, setValues] = useState({
        street: '',
        city: '',
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
                    setValues({
                        ...values,
                        street: data.street,
                        city: data.city,
                        country: data.country,
                        zip: data.zip
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
                    setValues({ ...values, error: false, loading: false, message: '' });
                } else {
                    setValues({
                        ...values,
                        street: data.street,
                        city: data.city,
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
                        Edit Location
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="edit-location-container">
            <p className="location-text">Location</p>
            { editLocationForm() }
        </div>
    );
};

export default EditLocation;