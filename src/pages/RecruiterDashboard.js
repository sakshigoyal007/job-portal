import { Box, Button, Container, Grid, SvgIcon, Typography } from '@material-ui/core';
import { NoteAddOutlined } from '@material-ui/icons';
import React, { Component } from 'react';
import CustomPagination from '../components/CustomPagination';
import HeaderNav from '../components/HeaderNav';
import JobsCard from '../components/JobsCard';
import API from '../constants/API-Config';
import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';

class RecruiterDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: '',
            currentPage: 1,
            authToken: '',
            jobsRecord: [],
            totalCount:0,
            pageLimit:20,

            numberOfPages:1,
        }
    }


    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('UserInfo'));
        console.log(user);
        this.setState({ loggedInUser: user, authToken: user.token }, () => {
            this.getPostedJobs();
        })
    }

    paginationChange = (page) => {
        this.setState({currentPage:page},()=>{
            this.getPostedJobs();
        })
    }

    getPostedJobs = () => {
        let apiUrl = API.GET_POSTED_JOBS+`?page=${this.state.currentPage}` ;
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.state.authToken
            },
            body: null
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                let totalPages=Math.ceil(result.data.metadata.count/result.data.metadata.limit);
                this.setState({ 
                    jobsRecord: result.data.data, 
                    totalCount:result.data.metadata.count, 
                    pageLimit: result.data.metadata.limit,
                    numberOfPages:totalPages
                });
            })
            .catch((error) => {
                console.log("Err", error);
                return false;
            });
    }

    render() {
        const records = this.state.jobsRecord;

        return (
            <>
                <HeaderNav />
                <Box color="#ffffff" py={5} px={20}>
                    <Box display={'flex'}>
                    <HomeIcon style={{color:'#ffffff'}}/>
                    <span>Home</span>
                    </Box>
                    <Typography variant='h4' style={{paddingTop:'24px'}}>Jobs posted by you</Typography>
                    {/* <h4 style={{paddingTop:'24px'}}>Jobs posted by you</h4> */}
                    <Container>
                    <Grid style={{paddingTop:'10px'}}>
                        {
                            records && records.length >0 ?
                            <Grid container spacing={4} style={{paddingTop:'5px', overflow:'hidden'}} justifyContent='flex-start'>
                                {Array.from(records).map((job) => (
                                    
                                    
                                     <JobsCard title={job.title} description={job.description} location={job.location} jobId={job.id} />
                                    //  </Grid>
                                     
                                ))}
                                </Grid>
                                :
                                <>
                                    <Box padding={18} display='flex' alignItems={'center'} flexDirection='column'>
                                        <DescriptionIcon style={{width:'106px', height:'106px', opacity:'0.5', color:'grey'}}/>
                                        <Typography style={{color:'#303F60', opacity:'0.8'}}>Your posted jobs will show here!</Typography>
                                        <Button variant='contained' style={{borderReadius:'5px',marginTop:'40px',color:'#FFFFFF', backgroundColor:'#43AFFF', textTransform:'none', width:'148px', height:'46px'}} >Post a Job</Button>
                                    </Box>
                                </>
                        }
                    </Grid>
                    <CustomPagination setPage={this.paginationChange} 
                currentPage={this.state.currentPage}
                totalCount={this.state.totalCount}
                numberOfPages={this.state.numberOfPages}/>
                </Container>
                </Box>
                
            </>
        );
    }
}

export default RecruiterDashboard;