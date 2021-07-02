import React from 'react'
import PubList from '../resources/barList.json'

/** This component includes the list of the pubs in the footer */

const Footer = () => {
    return(
        <div className="footer">
            <p>Generaattorin alueet eivät ole asemakaavan mukaisesti katsottuja.</p>
            <p>Hämeenkadun baareissa on otettu huomioon lähikorttelit keskustan alueella. </p>
            {PubList.map((pubs) => (
                <ul>
                    <li>{pubs.name}</li>
                </ul>
            ))}
        </div>
    )
}

export default Footer