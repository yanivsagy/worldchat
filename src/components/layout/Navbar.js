import { Link } from 'react-router-dom';
import { signout, isAuth } from '../../actions/auth';
import { useHistory } from 'react-router-dom';
import './layout.css';
import { useEffect } from 'react';

const Navbar = ({ loggedIn, setLoggedIn }) => {
    let history = useHistory();

    return (
        loggedIn && (
            <nav className="navbar navbar-position navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="fs-3 navbar-brand" href="#">
                        <p className="navbar-title">WorldChat{ " " }<span role="img" aria-label="tent">🌎</span></p>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {
                                loggedIn && (
                                    <Link className="navbar-link" to={ '/worldview' }>
                                        <li className="nav-item">
                                            <a className="nav-link active" href="#">
                                                <p className="navbar-header">The World</p>
                                            </a>
                                        </li>
                                    </Link>
                                )
                            }
                            {
                                loggedIn && (
                                    <li className="nav-item dropdown">
                                        <a className="nav-link navbar-header navbar-dropdown dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Options
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                            <Link className="navbar-link" to={ `/profile/edit` }>
                                                <li>
                                                    <a className="dropdown-item navbar-dropdown-item navbar-header" href="#">About Me</a>
                                                </li>
                                            </Link>
                                            <li><hr className="dropdown-divider"/></li>
                                            <li onClick={ () =>  signout(() => {
                                                setLoggedIn(false);
                                                history.push('/signin');
                                            }) }>
                                                <a className="dropdown-item navbar-dropdown-item navbar-header" href="#">Sign Out</a>
                                            </li>
                                        </ul>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        )
    );
};

export default Navbar;