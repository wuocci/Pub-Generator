import React from 'react'
import PubList from '../resources/barList.json'
import BackgroundImg from '../other/skyline-tampere.png'

/** This component includes the list of the pubs in the footer */

const Footer = () => {

    /** 
     * Make an array out the pubs filtered by their category. Sort the lists aplhabetically.
    */
    const mainStreetPubs = PubList.filter(item => item.category === "MainStreet").sort((pub, pubToCompare) => pub.name.localeCompare(pubToCompare.name))
    const tamKalPubs = PubList.filter(item => item.category === "TamKal").sort((pub, pubToCompare) => pub.name.localeCompare(pubToCompare.name))
    const herwoodPubs = PubList.filter(item => item.category === "HerWood").sort((pub, pubToCompare) => pub.name.localeCompare(pubToCompare.name))


    return(
        <div className="footer">
            <img src={BackgroundImg} alt="Tampere city skyline black charasteristics."></img>
            
            <div className="footerTexts">
                <p>Generaattorin alueet eivät ole asemakaavan mukaisesti katsottuja.</p>
                <p>Hämeenkadun baareissa on otettu huomioon lähikorttelit keskustan alueella. </p>
                <p><b>Arvonnassa mukana:</b></p>
                <p>Hämeenkatu ({mainStreetPubs.length})</p>
                
                {mainStreetPubs.map((pub) => (
                    <ul key={pub.name}>
                        <li>{pub.name}</li>
                    </ul>
                ))}

                <p>Tammela & Kaleva ({tamKalPubs.length})</p>

                {tamKalPubs.map((pub) => (
                    <ul key={pub.name}>
                        <li>{pub.name}</li>
                    </ul> 
                ))}
                <p>Hervanta ({herwoodPubs.length})</p>

                {herwoodPubs.map((pub) => (
                    <ul key={pub.name}>
                        <li>{pub.name}</li>
                    </ul> 
                ))}
            </div>
        </div>
    )
}

export default Footer