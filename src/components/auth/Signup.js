import { useState, useEffect } from 'react';
import { preSignup, isAuth } from '../../actions/auth';
import { useHistory } from 'react-router-dom';
import Hero from '../layout/Hero';
import AuthMenu from '../layout/AuthMenu';
import "./signup.css";

const Signup = ({ setLoggedIn, currentAuthPage, setCurrentAuthPage }) => {
    let history = useHistory();

    const [values, setValues] = useState({
        name: 'Yaniv Sagy', //get rid of these
        email: 'yanivsagy@gmail.com',
        password: '12345678',
        error: false,
        loading: false,
        message: '',
        showForm: true
    });

    useEffect(() => {
        if (isAuth()) {
            setLoggedIn(true);
            history.push('/worldview');
        }
        setCurrentAuthPage('signup');
    }, []);

    const { name, email, password, error, loading, message, showForm } = values;

    const handleSubmit = (e) => {
        setValues({ ...values, error: false, loading: true });
        const user = { name, email, password };

        preSignup(user)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false, message: '' });
                } else {
                    setValues({ ...values, name: '', email: '', password: '', error: false, loading: false, message: data.message, showForm: false });
                }
            })
            .catch(err => console.log(err));

    };

    const handleChange = (type) => (e) => {
        setValues({ ...values, error: false, [type]: e.target.value });
    };

    const showLoading = () => {
        return loading ? <div className="signup-result alert alert-info">Loading...</div> : '';
    }

    const showError = () => {
        return error ? <div className="signup-result alert alert-danger">{ error }</div> : '';
    }

    const showMessage = () => {
        return message ? <div className="signup-result alert alert-success">{ message }</div> : '';
    }

    const signupForm = () => {
        return (
            <div className="signup-fields">
                <div className="mb-3">
                    <label className="form-label signup-fields-text">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={ name }
                        placeholder="World Chatter"
                        onChange={ handleChange('name') }
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label signup-fields-text">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={ email }
                        placeholder="user@worldchat.com"
                        onChange={ handleChange('email') }
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label signup-fields-text">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={ password }
                        placeholder="password123"
                        onChange={ handleChange('password') }
                        required
                    />
                </div>
                <hr className="signup-hr"/>
                <div>
                    <button
                        type="submit"
                        className="signup-btn btn"
                        onClick={ handleSubmit }
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="signup-container">
            <Hero />
            <p className="min-signup-title">WorldChat{ " " }<span role="img" aria-label="tent">🌎</span></p>
            <div className="signup">
                <AuthMenu currentAuthPage={ currentAuthPage } setCurrentAuthPage={ setCurrentAuthPage } />
                { showLoading() }
                { showError() }
                { showMessage() }
                { showForm && signupForm() }
            </div>
        </div>
    );
};

export default Signup;