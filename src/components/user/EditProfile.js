import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { isAuth } from '../../actions/auth';
import ProfileMenu from './ProfileMenu';
import EditAbout from './EditAbout';
import EditLocation from './EditLocation';
import EditPhoto from './EditPhoto';
import './editProfile.css';

const EditProfile = ({ setLoggedIn }) => {
    useEffect(() => {
        if (isAuth()) {
            setLoggedIn(true);
        }
    }, []);

    return (
        <div className="edit-profile-container">
            <div className="edit-profile-menu">
                <ProfileMenu />
            </div>
            <div className="edit-profile">
                <Switch>
                    <Route path="/profile/edit" exact component={ () => <EditAbout setLoggedIn={ setLoggedIn } /> }/>
                    <Route path="/profile/edit/about" component={ ()  => <EditAbout setLoggedIn={ setLoggedIn } /> }/>
                    <Route path="/profile/edit/location" component={ () => <EditLocation setLoggedIn={ setLoggedIn } /> }/>
                    <Route path="/profile/edit/photo" component={ () => <EditPhoto setLoggedIn={ setLoggedIn } /> }/>
                </Switch>
            </div>
        </div>
    );
};

export default EditProfile;