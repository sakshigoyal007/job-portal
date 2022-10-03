import React, {useState } from 'react';
import { Typography,Button, IconButton, Menu, MenuItem, Tooltip, AppBar, Toolbar, makeStyles, Divider } from '@material-ui/core';
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
    headerTitle: {
        flexGrow: 1,
        display: 'none',
        [
            theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    headerBtn:{
        backgroundColor: '#43AFFF33', 
        color: '#ffffff', 
        border: '1px solid #43AFFF', 
        textTransform: 'none', 
        width: '148px', 
        height: '46px' ,
        '&:hover, &:active, &:visited': {
            backgroundColor: "#43AFFF",
            border: '1px solid #43AFFF',
         },
    }

}));

const HeaderNav = () => {
    const classes = useStyles();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('UserInfo') ? true : false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [userAnchorEle, setUserAnchorEle] = useState(null);

    const handleOpenUserMenu = (event) => {
        setUserAnchorEle(event.currentTarget);
    }

    const handleCloseUserMenu = () => {
        setUserAnchorEle(null);
    }

    const handleLogout = () => {
        localStorage.removeItem('UserInfo');
        window.location.href = '/?logout=true';
    }

    return (
        <>
            <div className='App'>
                <AppBar className={classes.headerNav} position='static'>
                    <Toolbar style={{ padding: '0' }}>
                        <Typography className={classes.headerTitle} variant='h6' noWrap>My<span style={{ color: '#43AFFF' }}>Jobs</span>
                        </Typography>
                        {
                            !isLoggedIn ?
                                    <Button variant='contained' className={classes.headerBtn} onClick={() => setShowLoginModal(true)}>Login</Button>
                                :
                                <>
                                    <Tooltip title="Open Profile">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <AccountCircle />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        getContentAnchorEl={null}
                                        anchorEl={userAnchorEle}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        open={Boolean(userAnchorEle)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem onClick={handleLogout}>
                                            <Typography align='center' >Logout</Typography>
                                        </MenuItem>
                                    </Menu>
                                </>
                        }
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