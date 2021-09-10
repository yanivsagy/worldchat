import { useState, useEffect, useRef, useCallback } from 'react';
import { useHistory } from 'react-router';
import { populateMap } from '../../actions/map';
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
    lat: 37.773972, //change from SF to center of the Earth
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

const GoogleMaps = () => {
    let history = useHistory();

    useEffect(() => {
        populateMap()
            .then(data => setMarkers(data))
            .catch(err => console.log(err));
    }, [])

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });
    const [markers, setMarkers] = useState([]);

    const mapRef = useRef();
    const onMapLoad = useCallback(map => {
        mapRef.current = map;
    }, []);

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(15);
    }, []);

    const viewProfiles = ({ lat, lng }) => () => {
        panTo({ lat: lat, lng: lng + 0.015 });
        history.push(`/worldview/profile/list/${ 'lat=' + lat.toString() + '&' + 'lng=' + lng.toString() }`);
    };

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
                onLoad={ onMapLoad }
            >
                { markers.map(marker => {
                    const lat = !marker.location.latitude ? marker.location.defaultLat : marker.location.latitude;
                    const lng = !marker.location.longitude ? marker.location.defaultLong : marker.location.longitude;
                    return (
                        <Marker
                            key={ marker.location.defaultLat.toString() + marker.location.defaultLong.toString() }
                            position={ { lat, lng } }
                            icon={ {
                                url: '/person.png',
                                scaledSize: new window.google.maps.Size(35, 35),
                                origin: new window.google.maps.Point(0, 0),
                                anchor: new window.google.maps.Point(15, 15)
                            } }
                            onClick={ viewProfiles({ lat, lng }) }
                        />

                    );
                }) }
            </GoogleMap>
        </div>
    );
};

export default GoogleMaps;