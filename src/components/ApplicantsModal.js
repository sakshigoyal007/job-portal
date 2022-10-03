import { Box, Button, Container, Dialog, DialogActions, DialogContent, Grid, IconButton, makeStyles, TextField, Typography, withStyles } from '@material-ui/core';
import { NoteAddOutlined } from '@material-ui/icons';
import React, { Component, useEffect, useState } from 'react';
import API from '../constants/API-Config';
import ApplicantCard from './ApplicantCard';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
    applicanttitle: {
        margin: 0,
        padding: theme.spacing(2),
        paddingBottom:'0px',
        color:'#303F60'
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
        <MuiDialogTitle disableTypography className={classes.applicanttitle} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
            <hr/>
        </MuiDialogTitle>
    );
});

const useStyles=makeStyles((theme)=>({
    content:{
        backgroundColor:theme.palette.grey[200],
        paddingTop:theme.spacing(1),
        borderRadius:theme.spacing(1),
        marginBottom:theme.spacing(2)
    }
}))


const ApplicantsModal = (props) => {
    const [totalCount, setTotalCount] = useState(0);
    const [applicantsRecord, setApplicantsRecord] = useState([]);
    let authToken='';
    const classes=useStyles();

    const handleClose=()=>props.onCloseModal(false);


    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('UserInfo'));
        console.log(user);
        authToken=user.token; 
        let apiUrl = API.GET_POSTED_JOBS + `/${props.jobId}/candidates`;
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': authToken
            },
            body: null
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if(result.success){
                setApplicantsRecord(result.data);
                setTotalCount(result.data.length);
                }
            })
            .catch((error) => {
                console.log("Err", error);
            });
    },[]);


    return (
        <div>
            <Dialog maxWidth='sm' fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Applicants for this job
                </DialogTitle>
                <Typography variant='body1' style={{color:'#303F60', paddingLeft:'1.8rem', fontSize:'15px'}}>
                    
                    {
                         applicantsRecord && applicantsRecord.length >0 ?
                         `Total ${totalCount} applicants`
                        : `0 applications`
                    }
                    </Typography>
                <DialogContent>
                
                <Container className={classes.content}>
                    <Box
                        component="form"
                        // sx={{
                        //     '& .MuiTextField-root': { m: 1, width: '25ch' },
                        // }}
                        noValidate
                        autoComplete="off"
                    >
                       <Grid style={{paddingBottom:'22px'}}>
                        {
                            applicantsRecord && applicantsRecord.length >0 ?
                            <Grid container spacing={4} justifyContent='space-between'>
                                {Array.from(applicantsRecord).map((applicant) => (
                                     <ApplicantCard name={applicant.name} email={applicant.email} skills={applicant.skills} applicantId={applicant.id} />
                                ))}
                                </Grid>
                                :
                                <>
                                    <Box padding={18} display='flex' alignItems={'center'} flexDirection='column'>
                                        <AssignmentIcon style={{width:'106px', height:'106px', opacity:'0.5', color:'grey'}}/>
                                        <Typography style={{color:'#303F60', opacity:'0.8'}}>No applications available!</Typography>
                                    </Box>
                                </>
                        }
                    </Grid>
                    </Box>
                    </Container>
                </DialogContent>
            </Dialog>
        </div>
    )
}


export default ApplicantsModal;