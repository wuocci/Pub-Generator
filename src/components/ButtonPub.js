import React, {useState, useEffect, useRef} from 'react';
import Button from '@material-ui/core/Button';
import PubResults from './PubResults'
import CircularProgress from '@material-ui/core/CircularProgress';


const ButtonPub = ({districtValue, buttonType}) => {
    const [isTour, setTour] = useState();
    const [showResults, setShowResults] = useState(false);
    const [district, setDistrict] = useState("");
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const timer = useRef();
    
    useEffect(() => {
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
    
        return () => {
          clearInterval(timer);
        };
      }, []);



    const handleClick = (event) => {
        const buttonType = event.target.textContent;
        if(buttonType === "Arvo kapakka"){
            setTour(false);
        }
        else{
            setTour(true);
        }

        if(!loading){
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setShowResults(true);
            }, 2000);
        }

        if(districtValue === 1){
            setDistrict("MainStreet")
        }
        else if(districtValue === 2){
            setDistrict("TamKal")
        }
        else if(districtValue === 3){
            setDistrict("HerWood")
        }
    }

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
            <CircularProgress variant="determinate" size="200px" color="secondary" />
        )

    }

    else{
        return(
            <div className="buttons">
                <PubResults district = {district}
                            isTour = {isTour}/>
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