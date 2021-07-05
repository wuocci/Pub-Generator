import PubList from '../resources/barList.json'


/**
 * Helper function to get pubs from the resource JSON file.
 * 
 * @param {string} district 
 * @param {boolean} isTour 
 * @returns array of pubs, or just a pub.
 */
export const getPubs = (district, isTour) => {
    const filteredPubs = PubList.filter(pub => pub.category === district)
    if(isTour === true){
        var pubArray = [];
        while(pubArray.length < 5){
          var pubToAdd = filteredPubs[Math.floor(Math.random() * filteredPubs.length)];
          if(!pubArray.includes(pubToAdd)){
            pubArray.push(pubToAdd);
          }
        }
       return pubArray
    }
    else{
        return filteredPubs[Math.floor(Math.random() * filteredPubs.length)];
    }
}

/**
 * Helper function to get the geocodes.
 * @param {Array} pubsToShow 
 * @returns coordinates which have been geocoded
 */
export const getGeoCodes = async (pubsToShow) => {
    var locations = []
    if(pubsToShow.length > 1){
        pubsToShow.map(pub => {
            locations.push(encodeURIComponent(pub.address))
        })
    }
    else{
        locations.push(encodeURIComponent(pubsToShow.address))
    } 

    //Fetch the geocodes from mapbox geocoding API
    var coordinates = []
    locations.forEach(async element => {
        try{
            // GET request using fetch inside useEffect React hoo
            fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + element + '.json?proximity=61.4, 23.7&access_token=pk.eyJ1Ijoid3VvY2NpIiwiYSI6ImNrZzd6cTRsODBja20yd3FvdG1lc2I5b2kifQ.w-yWhkZL-CVnRSIqkUhEag')
            .then(async response => {
                const data = await response.json();
                const coordinate = data.features[0].center
                coordinates.push(coordinate)
            })
        }
        catch(error){
            console.log(error)
        }
    })
    return coordinates;
}



