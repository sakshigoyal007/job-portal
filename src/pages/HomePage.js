import { AppBar, Box, Button, Card, CardContent, Container, Grid, IconButton, makeStyles, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React, { Component } from 'react';
import HeaderNav from '../components/HeaderNav';

const useStyles = makeStyles((theme) => ({
    headerNav: {
        backgroundColor: '#1A253C',
        background: 'transparent',
        boxShadow: 'none',
        padding: '0 2rem'
    },

    hero: {
    backgroundImage: `url(HomePageImg.png)`,
    height: "395px",
    position: "relative",
    display: "flex",
    width: "622px",
    borderRadius: "20px"
    },

    infoContainer:{
        paddingTop:theme.spacing(3)
    },

    card:{
        maxWidth:'100%'
    }
}));

const HomePage = () => {
    const classes = useStyles();

    return (
        <>
            <HeaderNav />
            <Box sx={{ mt: '30px' }} display={'flex'} justifyContent='space-around'>
                <Box sx={{ pl: '20px' }} display={'flex'} flexDirection={'column'} justifyContent='space-evenly' >
                    <Typography variant='h3' style={{ color: '#ffffff' }}>Welcome to<br/>My<span style={{ color: '#43AFFF' }}>Jobs</span></Typography>
                    {/* <Typography variant='h3' style={{ color: '#ffffff' }}>My<span style={{ color: '#43AFFF' }}>Jobs</span></Typography> */}
                    <Button variant='contained' style={{borderRadius:'5px', backgroundColor: '#43AFFF', color: '#ffffff', border: '1px solid #43AFFF', textTransform: 'none', width: '148px', height: '46px', marginTop:'-2rem' }}>Get Started</Button>
                </Box>
                <Box className={classes.hero}></Box>
            </Box>
            <Container className={classes.infoContainer} maxWidth={'lg'}>
                <Typography variant='h5'>Why Us</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant='h5' component={'h2'} style={{color:'#43AFFF'}}>Get More Visibility</Typography>
                                <Typography variant='body2' component={'p'} style={{color:'#303F60'}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                                </Typography>
                            </CardContent>
                            
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant='h5' component={'h2'} style={{color:'#43AFFF'}}>Organize Your Candidates</Typography>
                                <Typography variant='body2' color='textSecondary' component={'p'} style={{color:'#303F60'}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </Typography>
                            </CardContent>
                            
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant='h5' component={'h2'} style={{color:'#43AFFF'}}>Verify Their Abilities</Typography>
                                <Typography variant='body2' color='textSecondary' component={'p'} style={{color:'#303F60'}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                                </Typography>
                            </CardContent>
                            
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            <Container className={classes.infoContainer} maxWidth={'lg'}>
                <Typography variant='h5'>Companies Who Trust Us</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        hey
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        hey
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        hey
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default HomePage;