import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { isAuth } from "../../actions/auth";
import { editLocation, getProfile } from "../../actions/user";
import { ArrowLeft, MessageSquare } from 'react-feather';
import './viewProfile.css';

const ViewProfile = ({ match, setLoggedIn }) => {
    let history = useHistory();

    const [user, setUser] = useState({});
    const [room, setRoom] = useState('');

    useEffect(() => {
        if (!isAuth()) {
            history.push('/signin');
        }
        setLoggedIn(true);
        initProfile();
    }, []);

    const initProfile = () => {
        getProfile(match.params.username)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setUser(data);

                    let res = data.username.localeCompare(isAuth().username);

                    if (res == -1) {
                        setRoom(data.username + ' ' + isAuth().username);
                    } else {
                        setRoom(isAuth().username + ' ' + data.username);
                    }
                }
            })
            .catch(err => console.log(err));
    };

    const displayLocation = () => {
        let locationPoints = [];

        if (user.location['city']) {
            locationPoints.push(user.location['city']);
        }
        if (user.location['state']) {
            locationPoints.push(user.location['state']);
        }
        if (user.location['country']) {
            locationPoints.push(user.location['country']);
        }

        return locationPoints.join(', ');
    };

    return (
        <div className="view-profile-container">
            <div className="profile-back-container">
                <ArrowLeft
                    className="profile-back"
                    onClick={ () => history.push(`/worldview/profile/list/lat=${ user.location.latitude }&lng=${ user.location.longitude }`) }
                />
            </div>
            <div className="selected-profile">
                { isAuth().name === user.name ? (
                    <h1>{ user.name } (YOU)</h1>
                ) : (
                    <h1>{ user.name }</h1>
                ) }
                <div
                    className="profile-photo-container"
                    style={ {
                        backgroundImage: `url(${ process.env.REACT_APP_API }/api/user/profile/photo/${ user.username }/${ Math.random() })`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    } }
                >
                </div>
                <h3>Language</h3>
                <hr className="profile-hr"/>
                <h4>{ user.language }</h4>
                <br />
                <h3>Location</h3>
                <hr className="profile-hr"/>
                <h4>
                    { user && user.location && displayLocation() }
                </h4>
                <br />
                <h3>About</h3>
                <hr className="profile-hr"/>
                <h4>{ user.about }</h4>
            </div>
            <Link to={ `/chat?name=${ encodeURI(isAuth().name) }&room=${ encodeURI(room) }` }>
                <div className="profile-message-container">
                    <div className="message-text">Tap to</div>
                    <MessageSquare className="profile-message" />
                </div>
            </Link>
        </div>
    );
};

export default ViewProfile;