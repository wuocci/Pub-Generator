import React, {useState} from 'react'
import PubList from '../resources/barList.json'



const PubResults = ({district, isTour}) => {
    const [pubsToShow, setPubs] = useState([])
    
    const getPubs = () => {
        const filteredPubs = PubList.filter(pub => pub.category === district)
        if(isTour === true){
            var pubArray = [];
            while(pubArray.length < 5){
              var pubToAdd = filteredPubs[Math.floor(Math.random() * filteredPubs.length)];
              if(!pubArray.includes(pubToAdd)){
                pubArray.push(pubToAdd);
              }
            }
            setPubs(pubArray.concat(pubsToShow))
        }
        else{
            setPubs(filteredPubs[Math.floor(Math.random() * filteredPubs.length)]);
        }
    }

    if(pubsToShow.length === 0){
       getPubs()    
    }
    
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
        </div>
    )
}




export default PubResults;