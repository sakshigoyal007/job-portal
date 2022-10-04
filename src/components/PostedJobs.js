import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import ApplicantsModal from './ApplicantsModal';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles((theme) => ({
    alignCard: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    jobCardTitle: {
        overflow: 'hidden',
        color: '#303F60',
        opacity: '1'
    },
    jobCardContent: {
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitLineClamp: '3',
        WebkitBoxOrient: 'vertical',
        wordBreak: 'break-all',
        color: '#303F60',
        opacity: '0.8'
    },
    cardActionCss: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px'
    },
    locationBox: {
        overflow: 'hidden'
    },
    location: {
        overflow: 'hidden',
        marginRight: '10px',
        maxWidth: '100px'
    },
    applicationBtn: {
        display: 'inline-block',
        backgroundColor: theme.palette.primary.dark,
        color: '#303f60',
        borderRadius: '5px',
        textTransform: 'none',
        height: '32px',
        whiteSpace: 'nowrap',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
        [theme.breakpoints.down('md')]: {
            display: 'block',
        }
    }

}));

const PostedJobs = (props) => {
    const [showApplicantModal, setShowApplicantModal] = useState(false);
    let authToken = ''
    const classes = useStyles();

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('UserInfo'));
        authToken = user.token;
    }, []);

    const handleApplication = () => {
        setShowApplicantModal(true);
    }

    return (
        <><Grid item xs={6} md={3} sm={4} style={{ padding: '10px' }}>
            <Card
                className={classes.alignCard}
                key={props.jobId} variant='outlined'>
                <CardContent style={{ height: '132px' }}>
                    <Typography gutterBottom noWrap variant='h6' className={classes.jobCardTitle} title={props.title}>
                        {props.title}
                    </Typography>
                    <Typography variant='body2' title={props.description} className={classes.jobCardContent}>
                        {props.description}
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardActionCss}>
                    <Box display={'flex'}>
                        <LocationOnIcon color='primary' />
                        <Typography className={classes.location} noWrap title={props.location} >{props.location}</Typography>
                    </Box>
                    <Button size='small' variant='contained'
                        className={classes.applicationBtn}
                        onClick={handleApplication}>
                        View Applications
                    </Button>
                </CardActions>
            </Card>
        </Grid>
            {
                showApplicantModal &&
                <ApplicantsModal onCloseModal={setShowApplicantModal} jobId={props.jobId} authToken={authToken} />

            }
        </>
    )
}

export default PostedJobs;