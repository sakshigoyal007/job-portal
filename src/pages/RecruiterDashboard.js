import { Box, Button, CircularProgress, Container, Grid, IconButton, Snackbar, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import CustomPagination from '../components/CustomPagination';
import HeaderNav from '../components/HeaderNav';
import API from '../constants/API-Config';
import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';
import PostedJobs from '../components/PostedJobs';

const styles = theme => ({
    jobsGrid: {
        paddingTop: '5px',
        overflow: 'hidden'
    },
    descriptionIcon: {
        width: '106px',
        height: '106px',
        opacity: '0.5',
        color: 'grey'
    },
    postBtn: {
        borderReadius: '5px',
        marginTop: '40px',
        color: '#FFFFFF',
        backgroundColor: '#43AFFF',
        textTransform: 'none',
        width: '148px',
        height: '46px',
        '&:hover, &:active': {
            backgroundColor: "#43AFFF",
            border: '1px solid #43AFFF',
        },
    },
    note: {
        color: '#303F60',
        opacity: '0.8'
    },
    notifierCss: {
        backgroundColor: 'white',
        height: 'auto',
        lineHeight: '28px',
        whiteSpace: 'pre-line'
    }
});

class RecruiterDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            authToken: '',
            jobsRecord: [],
            totalCount: 0,
            numberOfPages: 1,
            isLoading: false,
            showNotifier: false,
        }
    }


    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('UserInfo'));
        if (!user) {
            window.location.href = '/';
        }
        if (window.location.search.includes('loggedIn=true')) {
            this.setState({ showNotifier: true });
        }
        this.setState({ authToken: user.token }, () => {
            this.getPostedJobs();
        })
    }

    paginationChange = (page) => {
        this.setState({ currentPage: page }, () => {
            this.getPostedJobs();
        })
    }

    getPostedJobs = () => {
        this.setState({ isLoading: true });
        let apiUrl = API.GET_POSTED_JOBS + `?page=${this.state.currentPage}`;
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
                let totalPages = Math.ceil(result.data.metadata.count / result.data.metadata.limit);
                this.setState({
                    isLoading: false,
                    jobsRecord: result.data.data,
                    totalCount: result.data.metadata.count,
                    numberOfPages: totalPages
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleCloseNotifier = () => {
        this.setState({ showNotifier: false });
    };

    render() {
        const records = this.state.jobsRecord;
        const { classes } = this.props;
        return (
            <>
                <HeaderNav />
                <Box color="#ffffff" sx={{ mt: '12px', p: '0 180px' }} display={'flex'} flexDirection='column' justifyContent={'space-evenly'}>
                    <Box display={'flex'}>
                        <HomeIcon style={{ color: '#ffffff' }} />
                        <span>Home</span>
                    </Box>

                    <Typography variant='h4' style={{ padding: '24px 0' }} >Jobs posted by you</Typography>
                    {
                        !this.state.isLoading ?

                            <Container disableGutters={true}>
                                <Grid style={{ paddingTop: '10px' }}>
                                    {
                                        records && records.length > 0 ?
                                            <>
                                                <Grid className={classes.jobsGrid} container spacing={4} justifyContent='flex-start'>
                                                    {Array.from(records).map((job) => (
                                                        <PostedJobs key={job.id} title={job.title} description={job.description} location={job.location} jobId={job.id} />
                                                    ))}
                                                </Grid>
                                                <CustomPagination setPage={this.paginationChange}
                                                    currentPage={this.state.currentPage}
                                                    totalCount={this.state.totalCount}
                                                    numberOfPages={this.state.numberOfPages} />
                                            </>
                                            :
                                            <>
                                                <Box sx={{ pt: 25, pb: 18 }} display='flex' alignItems={'center'} flexDirection='column'>
                                                    <DescriptionIcon className={classes.descriptionIcon} />
                                                    <Typography className={classes.note}>Your posted jobs will show here!</Typography>
                                                    <Button variant='contained' className={classes.postBtn} >Post a Job</Button>
                                                </Box>
                                            </>

                                    }
                                </Grid>

                            </Container>
                            :
                            <>
                                <Box p={18} display='flex' alignItems={'center'} flexDirection='column'>
                                    <CircularProgress size={50} style={{ color: '#43AFFF' }} />
                                </Box>
                            </>

                    }
                </Box>
                {
                    this.state.showNotifier &&
                    <Snackbar
                        className={classes.notifierCss}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        onClose={this.handleCloseNotifier}
                        title={'Login'}
                        message={"Login\nYou have successfully logged in"}
                        open
                        action={[
                            <IconButton key={'close'}
                                aria-label='Close'
                                onClick={this.handleCloseNotifier}>x</IconButton>
                        ]}
                    />
                }

            </>

        );
    }
}

export default withStyles(styles)(RecruiterDashboard);