import { useEffect } from "react";
import { Route, Switch } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { isAuth } from "../../actions/auth";
import GoogleMaps from "./GoogleMaps";
import ProfileList from "../user/ProfileList";
import ViewProfile from '../user/ViewProfile';
import './mapView.css';

const MapView = ({ setLoggedIn }) => {
    let history = useHistory()

    useEffect(() => {
        if (!isAuth()) {
            setLoggedIn(false);
            history.push('/signin');
        } else {
            setLoggedIn(true);
        }
    }, []);


    return (
        <div className="map-view-container">
            <div className="google-maps-container">
                <GoogleMaps />
            </div>
            <Switch>
                <Route path="/worldview/profile/list/:coordinates" component={ props => <ProfileList { ...props } setLoggedIn={ setLoggedIn } /> } />
                <Route path="/worldview/profile/:username" component={ props => <ViewProfile { ...props } setLoggedIn={ setLoggedIn } /> } />
            </Switch>
        </div>
    );
};

export default MapView;