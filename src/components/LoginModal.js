import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Box, DialogActions, FormControl, Grid, TextField } from '@material-ui/core';

import API from "../constants/API-Config";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    }
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
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

// const DialogActions = withStyles((theme) => ({
//     root: {
//         margin: 0,
//         padding: theme.spacing(1),
//     },
// }))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
    helperText: {
      alignSelf:'flex-end'
    }
  }));

export default function LoginModal(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [responseError, setResponseError] = useState({ code: '', message: '' });

    const [inputClass, setInputClass] = useState('input-text');

    //   console.log(props);



    // const handleLogin = () => {
    //     setOpen(true);
    // };
    const handleClose = () => {
            props.onCloseModal(false);
    };

    const handleEmail = (e) => {
        let inputEmail = e.target.value;
        setEmail(inputEmail);
        // if (inputEmail) {
        //     let emailRegex =
        //         /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //     if (emailRegex.test(inputEmail)) {
        //         setEmail(inputEmail);
        //         setEmailError('');
        //     } else {
        //         setEmail('');
        //         // setEmailError('Please enter a valid email address');
        //     }
        // }
        // else {
        //     setEmailError('Please enter your email address');
        // }
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const validateLogin = () => {

        if (!email) {
            setEmailError('Please enter your email address');
            return false;
        } else {
            let emailRegex =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (emailRegex.test(email)) {
                setEmailError('');
            } else {
                setEmailError('Please enter a valid email address');
                return false;
            }
        }

        if (!password) {
            setPasswordError('Please enter your password');
            return false;
        }
        else setPasswordError('');
        return true;

    }

    const handleLogin = () => {
        if (!validateLogin()) {
            console.log("wrong validate", email, password);
            return false;
        }
        else {
            console.log("inside validate", email, password);
            let apiUrl = API.USER_LOGIN;
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    if (result.success) {
                        localStorage.setItem("UserInfo", JSON.stringify(result.data));
                        props.onLoggedIn(true);
                        window.location.href = '/recruiters';

                    }
                    else {
                        const error = {
                            code: `${result.code}`,
                            message: `${result.message}`
                        };
                        setResponseError(error);
                    }
                })
                .catch((error) => {
                    console.log("Err", error);
                    return false;
                });
        }
    }

    return (
        <div>
            <Dialog maxWidth='sm' fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Login
                </DialogTitle>
                <DialogContent>
                    <Box
                        // component="form"
                        // sx={{
                        //     '& .MuiTextField-root': { m: 1, width: '25ch' },
                        // }}
                        sx={{
                            display: 'block',
                            alignItems: 'center',
                            '& > :not(style)': { m: 1 }
                        }}
                    // noValidate
                    // autoComplete="off"
                    >
                        {/* <Grid
                            container
                            direction="column"
                            justifyContent="flex-start"
                        > */}


                        <label>Email address</label>
                        <div>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <TextField
                                  FormHelperTextProps={{
                                    className: classes.helperText
                                  }} 
                                    placeholder={'Enter your email'}
                                    // margin={'normal'}
                                    id="email-required"
                                    variant='outlined'
                                    size='small'
                                    onChange={handleEmail}
                                    error={emailError != '' || responseError.message != ''? true : false}
                                    helperText={emailError}
                                />
                            </FormControl>
                        </div>

                        <label>Password</label>
                        <div>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <TextField
                                FormHelperTextProps={{
                                    className: classes.helperText
                                  }}   
                                  id="password-required"
                                    placeholder={'Enter your password'}
                                    type='password'
                                    size='small'
                                    variant='outlined'
                                    onChange={handlePassword}
                                    error={passwordError != '' || responseError.message != '' ? true : false}
                                    helperText={passwordError ? passwordError : responseError.message}
                                // InputLabelProps={{ shrink: true, classes: inputLabelStyles }}
                                // InputProps={{ classes: inputBaseStyles, disableUnderline: true }}
                                />
                            </FormControl>
                        </div>
                        {/* </Grid> */}
                    </Box>
                </DialogContent>
                <DialogActions style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }} >
                    {/* <Button autoFocus onClick={handleLogin} color="primary">
                        Login
                    </Button> */}
                    <Button variant='contained' style={{ backgroundColor: '#43AFFF', color: '#ffffff', border: '1px solid #43AFFF', textTransform: 'none', width: '148px', height: '46px' }} onClick={handleLogin}>Login</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
