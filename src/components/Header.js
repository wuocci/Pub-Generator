import React from 'react'
import HeaderImg from '../other/beers3.png'

const Header = () => {
    return(
        <div className="header">
            <img src={HeaderImg} alt="Logo with three beers on it" onClick={()=> window.location.reload()}></img>
            <h1>Tampereen kapakkageneraattori</h1>
            <p>kaikkien janoisten sankari</p>
        </div>
    )
}

export default Header