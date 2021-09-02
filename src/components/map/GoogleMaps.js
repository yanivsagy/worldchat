import { useState, useEffect, useCallback } from 'react';
import { isAuth } from '../../actions/auth';
import { populateMap } from '../../actions/map';
import { useHistory } from 'react-router-dom';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from "@react-google-maps/api";
import './map.css';

const libraries = ["places"];
const mapContainerStyle = {
    width: '100%',
    height: '100vh'
};
const center = {
    lat: 37.773972,
    lng: -122.431297,
};
const options = {
    disableDefaultUI: true,
    zoomControl: true,
    minZoom: 2.2,
    restriction: {
        latLngBounds: {
            north: 86.5,
            south: -85.05115,
            west: -180,
            east: 180
        }
    }
}

const GoogleMaps = ({ setLoggedIn }) => {
    let history = useHistory();

    useEffect(() => {
        if (!isAuth()) {
            setLoggedIn(false);
            history.push('/signin');
        } else {
            setLoggedIn(true);
        }

        populateMap()
            .then(data => setMarkers(data))
            .catch(err => console.log(err));
    }, [])

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });
    const [markers, setMarkers] = useState([]);

    if (loadError) {
        return "Error loading maps";
    }
    if (!isLoaded) {
        return "Loading Maps";
    }

    return (
        <div className="map-container">
            <GoogleMap
                mapContainerStyle={ mapContainerStyle }
                zoom={ 8 }
                center={ center }
                options={ options }
            >
                { markers.map(marker => {
                    return (
                        <Marker
                            key={ marker.location.defaultLat.toString() + marker.location.defaultLong.toString() }
                            position={ {
                                lat: !marker.location.latitude ? marker.location.defaultLat : marker.location.latitude,
                                lng: !marker.location.longitude ? marker.location.defaultLong : marker.location.longitude
                            } }
                            icon={ {
                                url: '/person.png',
                                scaledSize: new window.google.maps.Size(30, 30),
                                origin: new window.google.maps.Point(0, 0),
                                anchor: new window.google.maps.Point(15, 15)
                            } }
                        />
                    );
                }) }
            </GoogleMap>
        </div>
    );
};

export default GoogleMaps;