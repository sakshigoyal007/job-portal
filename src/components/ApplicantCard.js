import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Grid, Icon, Typography } from '@material-ui/core';
import React, { Component, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    applicantCard: {
        width: 240,
        height: 162,
        // overflow:'hidden'
        border: '1px solid #303F6080',
        borderRadius:'5px',
        marginTop:'15px'
    },
    wrapIcon: {
        verticalAlign: 'middle',
        display: 'inline-flex'
    }
});

const ApplicantCard = (props) => {
    const classes = useStyles();

    return (
        <><Grid xs={12} md={6} sm={12} style={{padding:'5px 5px'}}>
            <Card className={classes.applicantCard} key={props.applicantId} variant='outlined'>
                <CardHeader style={{color:'#303F60'}}
                    avatar={<Avatar style={{backgroundColor:'#D9EFFF', color:'#303F60'}}>{props.name.charAt(0).toUpperCase()}</Avatar>}
                    title={props.name}
                    // subheaderTypographyProps="caption"
                    subheader={<Typography noWrap variant='caption' style={{color:'#303F60', overflow:'hidden',opacity:'0.8'}}>{props.email}</Typography>}
                />
                <CardContent style={{color:'#303F60'}}>
                    <Typography variant='body2'>Skills</Typography>
                    <Typography variant='body2' style={{opacity:'0.8', overflowWrap:'break-word'}}>{props.skills}</Typography>
                </CardContent>
                {/* <CardActions>
                    <Typography>{props.skills}
                    </Typography>
                </CardActions> */}
            </Card>
        </Grid>
        </>
    )
}

export default ApplicantCard;