import React from 'react';
import Button from '@material-ui/core/Button';


const ButtonTour = ({districtValue}) => {
    const handleClick = () => {
        console.log(districtValue)
    }
    return (
        <div>
          <Button variant="outlined" color="secondary" onClick={handleClick}>
            Arvo kapakkakierros
        </Button>
        </div>
    )
}

export default ButtonTour