import jwt from 'jsonwebtoken';
import { useState, useEffect } from 'react';
import { signup } from '../../actions/auth';
import './accountActivation.css';

const AccountActivation = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        error: '',
        message: '',
        loading: false,
        showButton: true
    });

    const { name, token, error, message, loading, showButton } = values;

    useEffect(() => {
        const token = match.params.token;

        if (token) {
            const { name } = jwt.decode(token);
            setValues({ ...values, name, token, error: false, message: '', loading: false });
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, message: '', loading: true, showButton: false });

        signup({ token })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, message: '', loading: false, showButton: false });
                } else {
                    setValues({ ...values, error: false, message: data.message, loading: false, showButton: false });
                }
            })
            .catch(err => console.log(err));
    };

    const showLoading = () => {
        return loading ? <div className="alert alert-info mt-5">Loading...</div> : '';
    }

    const showError = () => {
        return error ? <div className="alert alert-danger mt-5">{ error }</div> : '';
    }

    const showMessage = () => {
        return message ? <div className="alert alert-success mt-5">You have successfully activated your account. Please sign in.</div> : '';
    }

    return (
        <div className="activate-container">
            <h1 className="activate-text">Hello, { name }, ready to activate your account?</h1>
            { showLoading() }
            { showError() }
            { showMessage() }
            { showButton && (
                <button
                    className="activate-btn btn mt-5"
                    onClick={ handleSubmit }>
                        Activate Account
                </button>
            ) }
        </div>
    );
};

export default AccountActivation;