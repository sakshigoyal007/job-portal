import React, { Component, useState } from 'react';
import { Box, Typography, Grid, Button, IconButton, Menu, MenuItem, Tooltip, Snackbar, AppBar, Toolbar, makeStyles, Divider } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import LoginModal from './LoginModal';

const useStyles = makeStyles((theme) => ({
    headerNav: {
        backgroundColor: '#1A253C',
        background: 'transparent',
        boxShadow: 'none',
        padding: '6px 70px',
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [
            theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },

}));

const HeaderNav = () => {
    const classes = useStyles();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('UserInfo') ? true : false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [snackbarState, setSnackBarState] = useState({
        open: false,
        msg: ''
    });
    // const { open, msg } = snackbarState;

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    const handleLogout = () => {
        // handleCloseUserMenu();  
        localStorage.removeItem('UserInfo');
        setSnackBarState({ open: true, msg: 'Logout success!' });
        window.location.href = '/';

    }

    const handleClose = () => {
        setSnackBarState({
            open: false, msg: () => (<><h4 style={{ color: '#43afff' }}>Login</h4>
                <span>You have successfully logged in</span></>)
        });
    };


    return (
        <>
            {/* <Box height={'20vh'} color="#ffffff" py={4} >
                <Grid container justifyContent='center' >
                    <Grid item xs={10}>
                        <Box display={'flex'} justifyContent='space-between'>
                            <Typography variant='h6'>MyJobs
                            </Typography> */}
            <div className='App'>
                <AppBar className={classes.headerNav} position='static'>
                    <Toolbar style={{ padding: '0' }}>
                        <Typography className={classes.title} variant='h6' noWrap>My<span style={{ color: '#43AFFF' }}>Jobs</span>
                        </Typography>
                        {
                            !isLoggedIn ?
                                <>
                                    <Button variant='contained' style={{ backgroundColor: '#43AFFF33', color: '#ffffff', border: '1px solid #43AFFF', textTransform: 'none', width: '148px', height: '46px' }} onClick={() => setShowLoginModal(true)}>Login</Button>
                                    {/* <Snackbar
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    open={snackbarState.open}
                                    onClose={handleClose}
                                    message={snackbarState.msg}
                                    autoHideDuration={5000}
                                    action={[
                                        <IconButton key={'close'}
                                            aria-label='Close'
                                            color='inherit'
                                            onClick={handleClose}>x</IconButton>
                                    ]}
                                /> */}

                                </>
                                :
                                <>
                                    {/* <IconButton
                                            aria-label="LoggedIn user account"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleOpenUserMenu}
                                            color="inherit"
                                        >
                                            <AccountCircle />
                                        </IconButton> */}
                                    <Tooltip title="Open Profile">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                                            <AccountCircle />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        getContentAnchorEl={null}
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem onClick={handleLogout}>
                                            <Typography align='center' >Logout</Typography>
                                        </MenuItem>
                                    </Menu>
                                </>
                        }
                        {/* <Snackbar
                                    style={{backgroundColor:'white'}}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    open={isLoggedIn ? `<h4 style={{color:'#43afff'}}>Login</h4>
                                    <span>You have successfully logged in</span>`: snackbarState.open}
                                    onClose={handleClose}
                                    message={snackbarState.msg}
                                    action={[
                                        <IconButton key={'close'}
                                            aria-label='Close'
                                            color='black'
                                            onClick={handleClose}>x</IconButton>
                                    ]}
                                /> */}
                        {/* </Box> */}
                    </Toolbar>
                    <Divider style={{ border: '1px solid #4D618E' }} />
                </AppBar>

            </div>
            {
                showLoginModal &&
                <LoginModal onCloseModal={setShowLoginModal} onLoggedIn={setIsLoggedIn} />
            }
        </>
    )
}

export default HeaderNav;