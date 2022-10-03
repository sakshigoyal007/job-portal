import { Box, Button, Card, CardContent, Container, Grid, IconButton,makeStyles, Snackbar,Typography } from '@material-ui/core';
import React, {useEffect, useState } from 'react';
import HeaderNav from '../components/HeaderNav';
import { imageData } from '../constants/ImageData';

const useStyles = makeStyles((theme) => ({
    headerNav: {
        backgroundColor: '#1A253C',
        background: 'transparent',
        boxShadow: 'none',
        padding: '0 2rem'
    },

    hero: {
        backgroundImage: `url(/images/HomePageImg.png)`,
        height: "395px",
        position: "relative",
        display: "flex",
        width: "622px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        borderRadius: "20px",
        // [theme.breakpoints.down('sm')]:{
        //     // width:'300px',
        //     backgroundImage: `url(HomePageImg.png)`
        // }
    },

    infoContainer: {
        paddingTop: theme.spacing(3),
        marginBottom: theme.spacing(10),
        paddingLeft: '0',
        paddingRight: '0'
    },

    card: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    imageDiv: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        width: 200,
        height: 250,
    },
    startBtn: {
        borderRadius: '5px',
        backgroundColor: '#43AFFF',
        color: '#ffffff',
        border: '1px solid #43AFFF',
        textTransform: 'none',
        width: '148px',
        height: '46px',
        marginTop: '-6rem',
        '&:hover, &:active, &:visited': {
            backgroundColor: "#43AFFF",
            border: '1px solid #43AFFF',
         },
    },
    articleTitle: {
        color: '#303F60',
        fontWeight: 'bold',
        paddingBottom: '40px'
    },
    cardTitle: {
        color: '#43AFFF',
        whiteSpace: 'pre-line'
    },
    cardContent: {
        color: '#303F60',
        paddingTop: '29px'
    },
    imgGrid:{
        display: 'flex', 
        justifyContent: 'space-around', 
        flexWrap: 'wrap' 
    },
    notifier:{
        backgroundColor: 'white', 
        height: 'auto', 
        lineHeight: '28px', 
        whiteSpace: 'pre-line'
    }
}));

const HomePage = () => {
    const classes = useStyles();
    const [notifier,setNotifier]=useState(false);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('UserInfo'));
        if(user)
            window.location.href='/recruiters';
        if (window.location.search.includes('logout=true')) {
                setNotifier(true);
            }
    }, []);

   const handleCloseNotifier = () => {
        setNotifier(false);
    };

    return (
        <>
            <HeaderNav />
            <Box sx={{ mt: '30px', p: '0 180px' }} display={'flex'} flexDirection='column' justifyContent={'space-around'}>
                <Box display={'flex'} justifyContent='space-between'>
                    <Box display={'flex'} flexWrap='wrap' flexDirection={'column'} justifyContent='space-evenly' >
                        <Typography variant='h4' style={{ color: '#ffffff' }}>Welcome to<br />My<span style={{ color: '#43AFFF' }}>Jobs</span></Typography>
                        <Button variant='contained' className={classes.startBtn}>Get Started</Button>
                    </Box>
                    <Box className={classes.hero}/>
                </Box>
                <Container className={classes.infoContainer} maxWidth={'lg'}>
                    <Typography className={classes.articleTitle} variant='h5'>Why Us</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant='h5' component={'h2'} className={classes.cardTitle} >
                                        {"Get More \n Visibility"}
                                    </Typography>
                                    <Typography gutterBottom variant='body2' component={'p'} className={classes.cardContent}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                                    </Typography>
                                </CardContent>

                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant='h5' component={'h2'} className={classes.cardTitle}>{"Organize Your \n Candidates"}</Typography>
                                    <Typography gutterBottom variant='body2' color='textSecondary' component={'p'} className={classes.cardContent}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </Typography>
                                </CardContent>

                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant='h5' component={'h2'} className={classes.cardTitle}>{"Verify Their \n Abilities"}</Typography>
                                    <Typography gutterBottom variant='body2' color='textSecondary' component={'p'} className={classes.cardContent}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                                    </Typography>
                                </CardContent>

                            </Card>
                        </Grid>
                    </Grid>
                </Container>

                <Container className={classes.infoContainer} maxWidth={'lg'}>
                    <Typography className={classes.articleTitle} variant='h5'>Companies Who Trust Us</Typography>
                    <Grid container spacing={1} className={classes.imgGrid}>
                        {imageData.map((item) => {
                            return (
                                <div key={item.id} style={{ paddingRight: "4rem" }}>
                                    <img style={{ mixBlendMode: "multiply" }} src={item.img} width="" height="" alt={item.title} />
                                </div>
                            )
                        })}
                    </Grid>

                </Container>
            </Box>
            {
                    notifier &&
                    <Snackbar
                        className={classes.notifier}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        onClose={handleCloseNotifier}
                        title={'Login'}
                        message={"Logout\nYou have successfully logged out."}
                        open
                        action={[
                            <IconButton
                             key={'close'}
                                aria-label='Close'
                                color='black'
                                onClick={handleCloseNotifier}>x</IconButton>
                        ]}
                    />
                }
        </>
    );
}

export default HomePage;