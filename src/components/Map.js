import React, {useRef, useEffect, useState} from 'react'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Notification from './Notification';
import { encodeLocations } from '../helpers/helpers'

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
mapboxgl.accessToken = "pk.eyJ1Ijoid3VvY2NpIiwiYSI6ImNrZzd6cTRsODBja20yd3FvdG1lc2I5b2kifQ.w-yWhkZL-CVnRSIqkUhEag"


const Map = ({pubsToShow}) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const centerToHervanta = useRef(false) // boolean for centering the map to hervanta
    const encodedLocations = useRef([]);
    const [error, setError] = useState(null);
    const hervantaCenter = [23.8513, 61.4497]


    // API stuff
    var URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    var settings = '.json?proximity=23.75, 61.5&access_token='
  
    // first check if the pubs are located in hervanta
    if(pubsToShow.current[0].category === "HerWood"){
        centerToHervanta.current = true;
    }
    else if(pubsToShow.current[0].length > 0 && pubsToShow.current[0].category === "HerWood"){
        centerToHervanta.current = true;
    }


    /*
     // initialize map when component mounts
    */  
    useEffect(() => {
        // map init
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            // change the center of the map accordingly (if hervanta)
            center: centerToHervanta.current? hervantaCenter : [23.7756, 61.5008], 
            zoom: 12
        });

         /* 
        // 1. encode the URL to match to API:s formatting
        // style by calling the helper function encodeLocations().
        // 2. make the requests for the geocodes from the API
        // based on the encoded addresses.
        // 3. add a marker in the spot. 
        */ 
       console.log(pubsToShow)
        encodedLocations.current = encodeLocations(pubsToShow.current);
        console.log(encodedLocations)
        // fetch the data from the API
        encodedLocations.current.forEach((element, index) =>  {

        // declare the full URL to fetch (easier for me to comprehend)
            var fetchURL = URL + element + settings + mapboxgl.accessToken;
            const fetchData = async () => {
                try {
                    const resp = await fetch(fetchURL);
                    const data = await resp.json();
                    console.log(data.features)
                    const coordinates = data.features[0].center
                    console.log(coordinates)
                                    
                    
                    var popup = new mapboxgl.Popup({ offset: 25 })
                        .setMaxWidth("300px")
                        .setText(
                        pubsToShow.current[index].name
                    );
            
                    // add the markers
                    new mapboxgl.Marker({
                    color: "#FFFFFF",
                    scale: 1.5,
                    })
                        .setLngLat([coordinates[0], coordinates[1]])
                        .setPopup(popup)
                        .addTo(map.current);

                } 
                // prepare for errors and make room for notification.
                catch (e) {
                    console.log(e)
                    setError(e);
                }
            }
            fetchData();
        })

        // add navigation control to the map (the +/- zoom buttons and fullscreen)
        map.current.addControl(new mapboxgl.FullscreenControl());
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

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