import React from 'react';
import Button from '@material-ui/core/Button';


const ButtonPub = ({districtValue}) => {
    const handleClick = () => {
        console.log(districtValue)
    }
    return (
        <div>
          <Button variant="outlined" color="secondary" onClick={handleClick}>
            Arvo kapakka
        </Button>
        </div>
    )
}

export default ButtonPub