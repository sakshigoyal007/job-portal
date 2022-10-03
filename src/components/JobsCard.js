import { Box, Button, Card, CardActions, CardContent, Grid, Icon, Typography } from '@material-ui/core';
import React, { Component, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import API from '../constants/API-Config';
import ApplicantsModal from './ApplicantsModal';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
    alignCard: {
        width: 260,
        height: 162,
        // overflow:'hidden'
    },
    wrapIcon: {
        verticalAlign: 'middle',
        display: 'inline-flex'
    }
});

const JobsCard = (props) => {
    // console.log("props: ",props);
    const [showCandidateModal, setShowCandidateModal] = useState(false);
    let authToken = ''
    const classes = useStyles();

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('UserInfo'));
        console.log(user);
        authToken = user.token;
        console.log("inside jobs card: ", authToken);
    }, []);

    const handleApplication = () => {
        setShowCandidateModal(true);
    }

    return (
        <><Grid xs={6} md={3} sm={4} style={{ padding: '10px' }}>
            <Card className={classes.alignCard} key={props.jobId} variant='outlined'>
                <CardContent>
                    <Typography noWrap variant='h6' style={{ overflow: 'hidden', color: '#303F60', size: '17px', opacity: '1' }} >{props.title}</Typography>
                    <Typography variant='body2'
                        noWrap
                        style={{ overflow: 'hidden', color: '#303F60', size: '17px', opacity: '0.8' }}
                    >
                        {props.description}</Typography>
                </CardContent>
                <CardActions style={{
                    //   'alignItems': 'center',
                    //   'justifyContent': 'space-between',
                    'marginTop': '10px'
                }}>
                    <Box display={'flex'} style={{ overflow: 'hidden' }}>
                        <LocationOnIcon style={{ color: '#43AFFF' }} />
                        <Typography noWrap style={{ overflow: 'hidden', marginRight: '10px' }} >{props.location}</Typography>
                    </Box>
                    <Button size='small' variant='contained' style={{ display: 'inline-block', backgroundColor: '#43AFFF33', color: '#303f60', borderRadius: '5px', textTransform: 'none', height: '32px', whiteSpace: 'nowrap' }} onClick={handleApplication}>View Applications</Button>
                </CardActions>
            </Card>
        </Grid>
            {
                showCandidateModal &&
                <ApplicantsModal onCloseModal={setShowCandidateModal} jobId={props.jobId} authToken={authToken} />

            }
        </>
    )
}

export default JobsCard;