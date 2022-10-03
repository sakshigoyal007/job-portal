import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Grid, Icon, Typography } from '@material-ui/core';
import React, { Component, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    applicantCard: {
        width: 240,
        height: 162,
        border: '1px solid #303F6080',
        borderRadius: '5px',
        marginTop: '15px'
    },
});

const ApplicantCard = (props) => {
    const classes = useStyles();

    return (
        <><Grid item xs={12} md={6} sm={12} style={{ padding: '5px 5px' }}>
            <Card className={classes.applicantCard} key={props.applicantId} variant='outlined'>
                <CardHeader style={{ color: '#303F60' }}
                    avatar={<Avatar style={{ backgroundColor: '#D9EFFF', color: '#303F60' }}>{props.name.charAt(0).toUpperCase()}</Avatar>}
                    title={props.name}
                    subheader={<Typography variant='caption' style={{ color: '#303F60',  display:'-webkit-box', wordBreak:'break-all', overflow:'hidden', WebkitLineClamp:'3', WebkitBoxOrient:'vertical',  opacity: '0.8' }}>{props.email}</Typography>}
                />
                <CardContent style={{ color: '#303F60' }}>
                    <Typography variant='body2'>Skills</Typography>
                    <Typography variant='body2' style={{ opacity: '0.8',  display:'-webkit-box', wordBreak:'break-all', overflow:'hidden', WebkitLineClamp:'1', WebkitBoxOrient:'vertical'}}  title={props.skills}>{props.skills}</Typography>
                </CardContent>
            </Card>
        </Grid>
        </>
    )
}

export default ApplicantCard;