import React, {useState, useEffect, useRef} from 'react';
import Button from '@material-ui/core/Button';
import PubResults from './PubResults'
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { getPubs } from '../helpers/helpers'


const ButtonPub = ({districtValue}) => {
    const [district, setDistrict] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [pubsToShow, setPubs] = useState([])
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const timer = useRef();
    var tour;


    // Determine the district and name it. 
    // Easier filtering on the helper function.
    useEffect(() => {
         if(districtValue === "1"){
             setDistrict("MainStreet")
         }
         else if(districtValue === "2"){
            setDistrict("TamKal")
        }
        else if(districtValue === "3"){
            setDistrict("HerWood")
        }
    }, [districtValue]);


    // Progressbar movement implementation. 
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
              if (oldProgress === 100) {
                return 0;
              }
              const diff = Math.random() * 10;
              return Math.min(oldProgress + diff, 100);
            });
          }, 460);

        return () => {
          clearTimeout(timer.current);
        };
      }, []);


    // Function to help the progressbar component.
    function LinearProgressWithLabel(props) {
        return (
            <div className="progress-loader">
            <LinearProgress variant="determinate" {...props} color="secondary" />
              <Typography variant="subtitle1" color="textSecondary">{`${Math.round(
                props.value,
              )}% lasketaan todennäköisyyksiä...`}
              </Typography>
            </div>
        );
      }



    const handleClick = (event) => {
        setShowResults(false);

        // Determine if the button clicked was
        // the tour one or just one pub.
        const buttonType = event.target.textContent;
        if(buttonType === "Arvo kapakka"){
            tour = false;
        }
        else{
            tour = true;
        }

        // Insert timer when button is clicked.
        // Necessary for googles goecoding API to 
        // follow through on the requests.
        if(!loading){
            // Get the pubs from the JSON array using helper function.
            const pubList = getPubs(district, tour);
            if(pubList.length === 1){
                setPubs(pubList);
            }
            else{
                setPubs(...pubsToShow, pubList);
            }
            setLoading(true);
            setProgress(10);
            timer.current = window.setTimeout(() => {
                setShowResults(true);
                setLoading(false);
            }, 1000);
        }
    }


    /*  RENDERS */ 
    if(!showResults && !loading){
        return (
            <div className="buttons">
                <Button variant="outlined" color="secondary" onClick={handleClick}>
                    Arvo kapakka
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleClick}>
                    Arvo kapakkakierros
                </Button>
            </div>
        )
    }
    
    else if(loading && !showResults){
        return(
            <div className="progress-loader">
                <LinearProgressWithLabel value={progress}/>         
            </div>
        )
    }

    else{
        return(
            <div className="buttons">
                <PubResults pubsToShow={pubsToShow}/>
                <Button variant="outlined" color="secondary" onClick={handleClick}>
                    Arvo kapakka
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleClick}>
                    Arvo kapakkakierros
                </Button>
            </div>
        )
    }
}

export default ButtonPub