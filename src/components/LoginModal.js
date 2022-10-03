import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Box, DialogActions, FormControl,TextField } from '@material-ui/core';

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
    },
    cssOutlinedInput: {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: 'green',
              },
            // .Mui-focused .MuiOutlinedInput-notchedOutline': {
            //     borderColor: 'orange',
            //   }  
        }
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

const useStyles = makeStyles((theme) => ({
    helperText: {
      alignSelf:'flex-end'
    },
    loginBtn:{
        backgroundColor: '#43AFFF', 
        color: '#ffffff', 
        border: '1px solid #43AFFF', 
        textTransform: 'none', 
        width: '148px', 
        height: '46px',
        '&:hover, &:active, &:visited': {
            backgroundColor: "#43AFFF",
            border: '1px solid #43AFFF',
         },
      },
      actionRow:{
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '10px' 
      }
  }));

export default function LoginModal(props) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [responseError, setResponseError] = useState({ code: '', message: '' });

    const handleCloseModal = () => {
            props.onCloseModal(false);
    };

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
            return false;
        }
        else {
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
                    if (result.success) {
                        localStorage.setItem("UserInfo", JSON.stringify(result.data));
                        props.onLoggedIn(true);
                        window.location.href = '/recruiters?loggedIn=true';

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
                    console.log(error);
                    return false;
                });
        }
    }

    return (
        <div>
            <Dialog maxWidth='sm' fullWidth PaperProps={{style:{borderRadius: 20 }}} onClose={handleCloseModal} aria-labelledby="login-dialog-title" open>
                <DialogTitle id="login-dialog-title" onClose={handleCloseModal}>
                    Login
                </DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            display: 'block',
                            alignItems: 'center',
                            '& > :not(style)': { m: 1 }
                        }}
                    >

                        <label>Email address</label>
                        <div>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <TextField 
                                className={classes.cssOutlinedInput}
                                  FormHelperTextProps={{
                                    className: classes.helperText
                                  }}
                                  autoFocus
                                    placeholder={'Enter your email'}
                                    id="email-required"
                                    variant='outlined'
                                    size='small'
                                    onChange={(e)=>setEmail(e.target.value)}
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
                                    onChange={(e)=>setPassword(e.target.value)}
                                    error={passwordError != '' || responseError.message != '' ? true : false}
                                    helperText={passwordError ? passwordError : responseError.message}
                                />
                            </FormControl>
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions className={classes.actionRow} >
                    <Button variant='contained' className={classes.loginBtn} onClick={handleLogin}>Login</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
