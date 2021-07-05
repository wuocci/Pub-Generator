import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import Map from './Map'

const PubResults = ({pubsToShow}) => {
    const [mapVisible, setMapVisible] = useState(false)

    return(
        <div className="pub-results">
            {pubsToShow.length > 1 ?
            <div className="pub-list">   
                {pubsToShow.map((pub, ind) => (
                        <div key={pub.name}>
                            <h3>{ind +1 }. {pub.name}</h3>
                            <p>{pub.address}</p>
                        </div>
                    ))}
           </div>
            : 
            <div className="pub-onlyone">
                <h3>{pubsToShow.name}</h3>
                <p>{pubsToShow.address}</p>
            </div>
            }
            {!mapVisible ?
                <Button onClick={() => setMapVisible(!mapVisible)}>Näytä kartalla</Button>
            : 
            <div className="map-div">
                <Map pubsToShow={pubsToShow}/>
                <Button onClick={() => setMapVisible(!mapVisible)}>Piilota kartta</Button>
            </div>
        }
        </div>
    )
}




export default PubResults;