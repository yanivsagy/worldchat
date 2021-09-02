import { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth';
import { useHistory } from 'react-router-dom';
import Hero from '../layout/Hero';
import AuthMenu from '../layout/AuthMenu';
import './signin.css';


const Signin = ({ setLoggedIn, currentAuthPage, setCurrentAuthPage }) => {
    let history = useHistory();

    const [values, setValues] = useState({
        email: 'yanivsagy@gmail.com', //remove
        password: '12345678', //remove
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
        setCurrentAuthPage('signin');
    }, []);

    const { email, password, error, loading, message, showForm } = values;

    const handleSubmit = (e) => {
        setValues({ ...values, error: false, loading: true });
        const user = { email, password };

        signin(user)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false, message: '' });
                } else {
                    authenticate(data, () => {
                        setLoggedIn(true);
                        history.push('/worldview');
                    });
                }
            })
            .catch(err => console.log(err));

    };

    const handleChange = (type) => (e) => {
        setValues({ ...values, error: false, [type]: e.target.value });
    };

    const showLoading = () => {
        return loading ? <div className="signin-result alert alert-info">Loading...</div> : '';
    }

    const showError = () => {
        return error ? <div className="signin-result alert alert-danger">{ error }</div> : '';
    }

    const showMessage = () => {
        return message ? <div className="signin-result alert alert-success">{ message }</div> : '';
    }

    const signinForm = () => {
        return (
            <div className="signin-fields">
                <div className="mb-3">
                    <label className="form-label signin-fields-text">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={ email }
                        placeholder="Type your email"
                        onChange={ handleChange('email') }
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label signin-fields-text">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={ password }
                        placeholder="Type your password"
                        onChange={ handleChange('password') }
                        required
                    />
                </div>
                <hr className="signin-hr"/>
                <div>
                    <button
                        type="submit"
                        className="signin-btn btn form-control"
                        onClick={ handleSubmit }
                    >
                        Log In
                    </button>
                </div>
                <div className="mb-3 signin-dummy">
                    <label className="form-label signin-fields-text">Password</label>
                    <input
                        type="password"
                        className="form-control"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="signin-container">
            <Hero />
            <p className="min-signin-title">WorldChat{ " " }<span role="img" aria-label="tent">🌎</span></p>
            <div className="signin">
                <AuthMenu currentAuthPage={ currentAuthPage } setCurrentAuthPage={ setCurrentAuthPage } />
                { showLoading() }
                { showError() }
                { showMessage() }
                { showForm && signinForm() }
            </div>
        </div>
    );
};

export default Signin;