import React, {useRef, useEffect, useState} from 'react'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { getGeoCodes } from '../helpers/helpers'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
mapboxgl.accessToken = "pk.eyJ1Ijoid3VvY2NpIiwiYSI6ImNrZzd6cTRsODBja20yd3FvdG1lc2I5b2kifQ.w-yWhkZL-CVnRSIqkUhEag"



const Map = ({pubsToShow}) => {
    const mapContainer = useRef(null);
    //const [coordinates, setCoordinates] = useState([])
    var coordinates = [];

    // initialize map when component mounts
    useEffect(() => {
         //get geocodes from helper functions
         getGeoCodes(pubsToShow)
         .then(response => {
             coordinates.push(response)
         });

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [23.7695, 61.4988],
            zoom: 12.5
        });

        // add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.FullscreenControl());
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        var marker = new mapboxgl.Marker()
        .setLngLat([coordinates[0][0], coordinates[0][1]])
        .addTo(map);

        return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}

export default Map;