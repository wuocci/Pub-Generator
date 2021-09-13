import React, {useState, useRef} from 'react'
import Button from '@material-ui/core/Button';
import PubDialog from './PubDialog';
import Map from './Map.js'
import { Typography } from '@material-ui/core';

const PubResults = ({pubsToShow}) => {
    const [mapVisible, setMapVisible] = useState(false)
    const showDialog = useRef(false)
    const pubName = useRef("")

    const handleDialogChange = (event) => {
        showDialog.current = true
        pubName.current = event.target.textContent;
    }

    return(
        <div className="pub-results">
            {pubsToShow.current[0].length > 1 ?
            <div className="pub-list">  
            {showDialog && <PubDialog showDialog={showDialog}
                                        pubName={pubName}/>} 
                {pubsToShow.current[0].map((pub, ind) => (
                        <div key={pub.name}>
                            <Typography color="primary" 
                                        variant="h6" 
                                        onClick={handleDialogChange} 
                                        className="pub-list-name"
                                        style={{textDecoration: "underline",
                                                width: "400px",
                                                marginTop: "-20px"}}>
                                    {ind +1 }. {pub.name}
                            </Typography>
                            <p>{pub.address}</p>
                        </div>
                    ))}
           </div>
            : 

            <div className="pub-onlyone">
                 {showDialog && <PubDialog showDialog={showDialog}
                                            pubName={pubName}/>} 
               <Typography color="primary" 
                            variant="h5" 
                            onClick={handleDialogChange} 
                            className="pub-onlyone-name"
                            style={{textDecoration: "underline",
                                    width: "400px"}}>
                    {pubsToShow.current[0].name}
                </Typography>
                <Typography variant="body2">{pubsToShow.current[0].address}</Typography>
            </div>
            }

            {!mapVisible ?
                <Button onClick={() => setMapVisible(!mapVisible)} 
                style={{textDecoration: "underline",
                        fontSize: "16px"}}>
                Näytä kartalla
                </Button>
            : 
            <div className="map-div">
                <Map pubsToShow={pubsToShow}/>
                <Button onClick={() => setMapVisible(!mapVisible)}
                        style={{textDecoration: "underline"}}>
                        Piilota kartta
                </Button>
            </div>
        }
        </div>
    )
}




export default PubResults;