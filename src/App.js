import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, DrawingManager, useJsApiLoader } from '@react-google-maps/api';

const MapComponent = ({ address }) => {
    const [center, setCenter] = useState(null);
    const mapRef = useRef();

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "process.env.REACT_APP_GOOGLE_MAPS_API_KEY",
    });

    const onLoad = (map) => {
        mapRef.current = map;
    };

    const onUnmount = () => {
        mapRef.current = null;
    };

    const fetchGeocode = async () => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=YOUR_GOOGLE_MAPS_API_KEY`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            setCenter(location);
        }
    };

    useEffect(() => {
        fetchGeocode();
    }, [address]);

    return isLoaded && center ? (
        <GoogleMap
            id="drawing-map"
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={center}
            zoom={17}
            onLoad={onLoad}
            onUnmount={onUnmount}
            mapTypeId="satellite"
        >
            <DrawingManager
                onPolygonComplete={(polygon) => {
                    const path = polygon.getPath().getArray();
                    console.log('Polygon vertices:', path);
                }}
                options={{
                    drawingControl: true,
                    drawingControlOptions: {
                        position: window.google.maps.ControlPosition.TOP_CENTER,
                        drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
                    },
                    polygonOptions: {
                        fillColor: '#ffff00',
                        fillOpacity: 1,
                        strokeWeight: 5,
                        clickable: false,
                        editable: true,
                        zIndex: 1,
                    },
                }}
            />
        </GoogleMap>
    ) : null;
};

export default MapComponent;
