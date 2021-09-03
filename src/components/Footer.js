import React from 'react'
import PubList from '../resources/barList.json'
import BackgroundImg from '../other/skyline-tampere.png'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography'




const Footer = () => {


    // make an array out the pubs filtered by their category.
    // sort the lists aplhabetically.
    const mainStreetPubs = PubList
        .filter(pub => pub.category === "MainStreet")
        .sort((pub, pubToCompare) => pub.name.localeCompare(pubToCompare.name))
    const tamKalPubs = PubList
        .filter(pub => pub.category === "TamKal")
        .sort((pub, pubToCompare) => pub.name.localeCompare(pubToCompare.name))
    const herwoodPubs = PubList
        .filter(pub=> pub.category === "HerWood")
        .sort((pub, pubToCompare) => pub.name.localeCompare(pubToCompare.name))


    return(
        <div className="footer">
            <img src={BackgroundImg} alt="Tampere city skyline black charasteristics."></img>
            
            <div className="footerTexts">
                <Typography className="footer-instructions"variant="body2">Otathan huomioon, että generaattorin alueet eivät ole asemakaavan mukaisesti katsottuja,
                    eivätkä kapakat välttämättä vastaa realistisesti alueen rajoja.
                </Typography>

                <Typography variant="h6"><b>Arvonnassa mukana:</b></Typography>

                <List className="pubs-list-footer">

                    <ListSubheader disableSticky={true} color="primary">Hämeenkatu ({mainStreetPubs.length})</ListSubheader>
                
                    
                    {mainStreetPubs.map((pub) => (
                        <ListItem key={pub.name}>
                            <ListItemText disableTypography={true}>{pub.name}</ListItemText>
                        </ListItem>
                    ))}

                    <ListSubheader disableSticky={true} color="primary">Tammela & Kaleva ({tamKalPubs.length})</ListSubheader>

                    {tamKalPubs.map((pub) => (
                        <ListItem key={pub.name}>
                            <ListItemText disableTypography={true}>{pub.name}</ListItemText>
                        </ListItem> 
                    ))}

                    <ListSubheader disableSticky={true} color="primary">Hervanta ({herwoodPubs.length})</ListSubheader>

                    {herwoodPubs.map((pub) => (
                        <ListItem key={pub.name}>
                            <ListItemText disableTypography={true}>{pub.name}</ListItemText>
                        </ListItem> 
                    ))}
                </List>
            </div>
        </div>
    )
}

export default Footer