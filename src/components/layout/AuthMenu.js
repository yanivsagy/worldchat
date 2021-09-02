import { useState } from 'react';
import { Link } from 'react-router-dom';
import './authMenu.css';

const AuthMenu = ({ currentAuthPage, setCurrentAuthPage }) => {

    const handleClick = (type) => (e) => {
        if (type !== currentAuthPage) {
            setCurrentAuthPage(type);
        }
    }

    return (
        <div className="auth-menu-container">
            <div className="signup">
                <Link className="auth-menu-link" onClick={ handleClick('signup') } to={ `/signup` }>
                    { currentAuthPage === 'signup' ? (
                        <p className="signup-text-active">Sign Up</p>
                    ) : (
                        <p className="signup-text">Sign Up</p>
                    )}
                </Link>
            </div>
            <div className="signin">
                <Link className="auth-menu-link" onClick={ handleClick('signin') } to={ `/signin` }>
                    { currentAuthPage === 'signin' ? (
                        <p className="signin-text-active">Log In</p>
                    ) : (
                        <p className="signin-text">Log In</p>
                    )}
                </Link>
            </div>
        </div>
    );
};

export default AuthMenu;