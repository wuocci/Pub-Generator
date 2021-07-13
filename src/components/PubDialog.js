import React, {useRef, useEffect, useState} from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { encodeLocations } from '../helpers/helpers';


const PubDialog = ({showDialog, pubName}) => {  
    const handleClose = () => {
        showDialog.current = false
    };

    const showSearchResults = () => {
        showDialog.current = false
        var encodePubName = pubName.current
        var listOfNumbers = ["1", "2", "3", "4", "5"]
        if(listOfNumbers.includes(encodePubName[0])) {
            encodePubName = encodePubName.substring(3)
        }
        var encodedPub = encodeURIComponent(encodePubName)
        console.log(encodedPub)
        window.open("https://www.google.com/search?q=" + encodedPub + " Tampere")
    }
  
    return(
        <div className="dialog">
            <Dialog open={showDialog.current} onClose={handleClose} aria-labelledby="simple-dialog-title">
                <DialogTitle id="simple-dialog-title">Hae googlesta kapakan nimellä : {pubName.current} ?</DialogTitle>
                <DialogActions>
                <Button onClick={showSearchResults} variant="outlined" color="primary" style={{fontSize: "18px"}}>
                    Hae
                </Button>
                <Button onClick={handleClose} variant="outlined" color="secondary"  style={{fontSize: "18px"}}>
                    Palaa
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default PubDialog;