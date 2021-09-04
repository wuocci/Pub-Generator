import React from 'react'
import Typography from '@material-ui/core/Typography'
import HeaderImg from '../other/beers3.png'

const Header = () => {
    return(
        <div className="header">
            <img src={HeaderImg} alt="Logo with three beers on it" onClick={()=> window.location.reload()}></img>
            <Typography variant="h1">Tampereen kapakkageneraattori</Typography>
            <Typography variant="body1">kaikkien janoisten sankari</Typography>
        </div>
    )
}

export default Header