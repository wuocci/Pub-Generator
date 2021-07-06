import React, {useRef, useEffect, useState} from 'react'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { encodeLocations } from '../helpers/helpers'
import Notification from './Notification';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
mapboxgl.accessToken = "pk.eyJ1Ijoid3VvY2NpIiwiYSI6ImNrZzd6cTRsODBja20yd3FvdG1lc2I5b2kifQ.w-yWhkZL-CVnRSIqkUhEag"


const Map = ({pubsToShow}) => {
    const mapContainer = useRef(null);
    const [error, setError] = useState(null);
    const hervantaCenter = [23.8513, 61.4497]
    var encodedLocations = [];
    var centerToHervanta = false // boolean for centering the map
    
    // API stuff
    var URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    var settings = '.json?proximity=23.7, 61.4&access_token='

    
    // initialize map when component mounts
    useEffect(() => {
        // first check if the pubs are located in hervanta
        if(pubsToShow[0].category === "HerWood"){
            centerToHervanta = true;
            console.log(centerToHervanta);
        }
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            // change the center of the map accordingly (if hervanta)
            center: centerToHervanta? hervantaCenter : [23.7756, 61.5008], 
            zoom: 12
        });
        
        /* 
        // 1. encode the URL to match to API:s formatting
        // style by calling the helper function encodeLocations().
        // 2. make the requests for the geocodes from the API
        // based on the encoded addresses.
        // 3. add a marker in the spot. 
        */ 
        encodedLocations = encodeLocations(pubsToShow);
        encodedLocations.forEach((element, index) =>  {

            // declare the full URL to fetch (easier for me to comprehend)
            var fetchURL = URL + element + settings + mapboxgl.accessToken;

            // fetch the data from the API
            const fetchData = async () => {
                try {
                    const resp = await fetch(fetchURL);
                    const data = await resp.json();
                    const coordinates = data.features[0].center

                    var popup = new mapboxgl.Popup({ offset: 25 })
                        .setText(
                        pubsToShow[index].name
                    );
                        

                    // add the markers
                    new mapboxgl.Marker({
                        color: "#FFFFFF",
                        scale: 1.5,
                        })
                        .setLngLat([coordinates[0], coordinates[1]])
                        .setPopup(popup)
                        .addTo(map);
                } 
                // prepare for errors and make room for notification.
                catch (e) {
                    setError(e);
                }
            }
            fetchData();
        });

        // add navigation control to the map (the +/- zoom buttons and fullscreen)
        map.addControl(new mapboxgl.FullscreenControl());
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    
    /* RENDERS */
    return (
        <div>
            {error != null ? 
            <Notification></Notification>:
            <div ref={mapContainer} className="map-container" />
            }
        </div>
    );
}

export default Map;