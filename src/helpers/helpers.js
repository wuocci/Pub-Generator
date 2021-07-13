import PubList from '../resources/barList.json';


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
 * Helper function to url-8 encode locations.
 * @param {Array} pubsToShow 
 * @returns coordinates which have been encoded
 */
export const encodeLocations = (pubsToShow) => {
    console.log(pubsToShow)
    var locations = []
    if(pubsToShow[0].length > 1){
        pubsToShow[0].map(pub => 
            locations.push(encodeURIComponent(pub.address))
        )
    }
    else{
        locations.push(encodeURIComponent(pubsToShow[0].address))
    }
    return locations
}

