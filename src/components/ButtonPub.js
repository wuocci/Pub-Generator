import React, {useState, useEffect, useRef} from 'react';
import Button from '@material-ui/core/Button';
import PubResults from './PubResults'
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { getPubs } from '../helpers/helpers'
  

const ButtonPub = ({districtValue}) => {
    const [district, setDistrict] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const pubsToShow = useRef([]);
    const timer = useRef();
    const tour = useRef();

    // determine the district and name it. 
    // easier filtering on the helper function.
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


    // progressbar movement implementation. 
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
              if (oldProgress === 100) {
                return 0;
              }
              const diff = Math.random() * 10;
              return Math.min(oldProgress + diff, 100);
            });
          }, 250);

        return () => {
          clearTimeout(timer.current);
        };
      }, []);




    // function to help the progressbar component.
    function LinearProgressWithLabel(props) {
        return (
            <div className="progress-loader">
            <LinearProgress variant="determinate" {...props}/>
              <Typography variant="subtitle1" color="textSecondary">{`${Math.round(
                props.value,
              )}% lasketaan todennäköisyyksiä...`}
              </Typography>
            </div>
        );
      }

    // function to handle button clicks
    const handleClick = (event) => {
        window.scrollTo(0, 200);
        if(pubsToShow.current.length > 0){
            pubsToShow.current = []
        }
        setShowResults(false);

        // determine if the button clicked was
        // the tour one or just one pub.
        const buttonType = event.target.textContent;
        if(buttonType === "Arvo kapakka"){
            tour.current = false;
        }
        else{
            tour.current = true;
        }

        // insert timer when button is clicked.
        // necessary for googles goecoding API to 
        // follow through on the requests.
        if(!loading){
            // get the pubs from the JSON array using helper function.
            const pubList = getPubs(district, tour.current);
            pubsToShow.current.push(pubList);
            setLoading(true);
            setProgress(10);
            timer.current = window.setTimeout(() => {
                setShowResults(true);
                setLoading(false);
            }, 3000);
        }
    }




    /*  RENDERS */ 
    if(!showResults && !loading){
        return (
            <div className="buttons">
                <Button style={{fontSize: "20px"}} variant="contained" className="random-pub-tour-button" onClick={handleClick}>
                    Arvo kapakka
                </Button>
                <Button style={{fontSize: "20px"}} variant="contained" className="random-pub-tour-button" onClick={handleClick}>
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
            <div className="results">
                <PubResults pubsToShow={pubsToShow}/>
                <div className="buttons">
                <Button style={{fontSize: "20px"}}variant="contained" className="random-pub-tour-button"onClick={handleClick}>
                        Arvo kapakka
                    </Button>
                    <Button style={{fontSize: "20px"}} variant="contained" className="random-pub-tour-button"  onClick={handleClick}>
                        Arvo kapakkakierros
                    </Button>
                </div>
            </div>
        )
    }
}

export default ButtonPub