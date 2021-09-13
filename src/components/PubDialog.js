import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


const PubDialog = ({showDialog, pubName}) => {  
    const handleClose = () => {
        showDialog.current = false
    };

    const showSearchResults = () => {
        showDialog.current = false
        var encodePubName = pubName.current

        //remove number from the google search with this "wooden-leg" -method :D 
        var listOfNumbers = ["1", "2", "3", "4", "5"]
        if(listOfNumbers.includes(encodePubName[0])) {
            encodePubName = encodePubName.substring(3)
        }
        var encodedPub = encodeURIComponent(encodePubName)
        window.open("https://www.google.com/search?q=" + encodedPub + " Tampere")
    }
  
    return(
        <div className="dialog">
            <Dialog open={showDialog.current} 
                    onClose={handleClose} 
                    aria-labelledby="make-google-search-dialog">
                <DialogTitle id="dialog-title">Hae lisätietoja kapakasta: {pubName.current} ?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="dialog-description">
                        (Avautuu uudelle välilehdelle)
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={showSearchResults} 
                        className="search-button"
                        variant="outlined" 
                        color="primary">
                    Hae
                </Button>
                <Button onClick={handleClose} 
                        className="return-button"
                        variant="outlined"
                        color="secondary">
                    Palaa
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default PubDialog;