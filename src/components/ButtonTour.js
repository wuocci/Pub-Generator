import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import PubResults from './PubResults'


const ButtonTour = ({districtValue}) => {

    const isTour = true;
    const [showResults, setShowResults] = useState(false)
    const [district, setDistrict] = useState("")

    const handleClick = () => {
        setShowResults(true)
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

    if(!showResults){
        return (
            <div>
                <Button variant="outlined" color="secondary" onClick={handleClick}>
                    Arvo kapakkakierros
                </Button>
            </div>
        )
    }
    else{
        return(
            <div>
                <PubResults district = {district}
                        isTour = {isTour}/>
                <Button variant="outlined" color="secondary" onClick={handleClick}>
                    Arvo kapakkakierros
                </Button>
            </div>
        )
    }
}

export default ButtonTour