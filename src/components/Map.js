import React, {useRef, useEffect, useState} from 'react'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { encodeLocations } from '../helpers/helpers'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
mapboxgl.accessToken = "pk.eyJ1Ijoid3VvY2NpIiwiYSI6ImNrZzd6cTRsODBja20yd3FvdG1lc2I5b2kifQ.w-yWhkZL-CVnRSIqkUhEag"


const Map = ({pubsToShow}) => {
    const mapContainer = useRef(null);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    var encodedLocations = [];
    
    // API stuff
    var URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    var settings = '.json?proximity=23.7, 61.4&access_token='


    // initialize map when component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [23.7695, 61.4988], // center of Tampere
            zoom: 12.5
        });
        
        /* 
        // 1. encode the URL to match to API:s formatting
        // style by calling the helper function encodeLocations().
        // 2. make the requests for the geocodes from the API
        // based on the encoded addresses.
        // 3. add a marker in the spot. 
        */ 
        encodedLocations = encodeLocations(pubsToShow);
        encodedLocations.forEach(element => {

            // declare the full URL to fetch (easier for me to comprehend)
            var fetchURL = URL + element + settings + mapboxgl.accessToken;

            // fetch the data from the API
            const fetchData = async () => {
                try {
                    const resp = await fetch(fetchURL);
                    const data = await resp.json();
                    const coordinates = data.features[0].center

                    // add the markers
                    var marker = new mapboxgl.Marker()
                    .setLngLat([coordinates[0], coordinates[1]])
                    .addTo(map);
                } 
                // prepare for errors.
                catch (e) {
                    setData([]);
                    setError(e);
                }
            }
            fetchData();
        });

        // add navigation control (the +/- zoom buttons and fullscreen)
        map.addControl(new mapboxgl.FullscreenControl());
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    
    /* RENDERS */
    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}

export default Map;