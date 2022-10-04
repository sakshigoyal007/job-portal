import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { Button, DialogActions, IconButton, Typography, withStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
    errorTitle: {
        margin: 0,
        padding: theme.spacing(2),
        paddingBottom: '0px',
        color: theme.palette.error.main
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
        '&:focus': {
            outline: 'none'
        }
    }
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.errorTitle} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const ErrorModal = ({ handleErrorOk, handleClose, errorText, modalOpen }) => {
    return (
        <div>
            <Dialog maxWidth='sm' fullWidth onClose={handleClose} aria-labelledby="erorr-dialog-title" open={modalOpen}>
                <DialogTitle id="error-dialog-title" onClose={handleClose}>
                    Error
                </DialogTitle>
                <DialogContent>
                    {errorText}
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' style={{ backgroundColor: 'red', color: '#fff' }} onClick={handleErrorOk}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ErrorModal;