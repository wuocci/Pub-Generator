import React, {useState} from 'react'
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const Notification = () => {
    const [open, setOpen] = useState(true);
    return(
        <div>
          <Collapse in={open}>
            <Alert severity="error"
            action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                    setOpen(false);
                }}
                >
                <CloseIcon fontSize="inherit" />
                </IconButton>
            }
            >
            Huppista! Virhe karttaa ladattaessa.
            </Alert>
        </Collapse>
        </div>
    )
}

export default Notification