import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { isAuth } from "../../actions/auth";
import { listProfiles } from "../../actions/user";
import { Link } from 'react-router-dom';
import { X } from 'react-feather';
import './profileList.css';

const ProfileList = ({ match, setLoggedIn }) => {
    let history = useHistory();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!isAuth()) {
            history.push('/signin');
        }
        setLoggedIn(true);
        initProfiles();
    }, []);

    const initProfiles = () => {
        listProfiles({ coordinates: match.params.coordinates })
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    console.log('Users:', data)
                    setUsers(data);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="profile-list-container">
            <div className="profile-leave-container">
                <X className="profile-leave" onClick={ () => history.push('/worldview') } />
            </div>
            <div className="list-intro">People at this location:</div>
            <div className="list-profiles">
                { users && users.map(user => {
                    return (
                        <Link key={ user.username } className="list-link" to={ `/worldview/profile/${ user.username }` }>
                            <div className="profile-preview">
                                <div
                                    className="list-photo-container"
                                    style={ {
                                        backgroundImage: `url(${ process.env.REACT_APP_API }/api/user/profile/photo/${ user.username }/${ Math.random() })`,
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center'
                                    } }
                                >
                                </div>
                                { isAuth().name === user.name ? (
                                    <div className="profile-list-name">{ user.name } (YOU)</div>
                                ) : (
                                    <div className="profile-list-name">{ user.name }</div>
                                ) }
                            </div>
                        </Link>
                    )
                }) }
            </div>
        </div>
    );
};

export default ProfileList;