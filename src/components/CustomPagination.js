import { Box, makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    pageContainer: {
        zIndex: 200,
        padding: '10px 80px',
        width: '100%'
    },
    ul: {
        "& .MuiPaginationItem-root": {
            color: "#303F60",
            backgroundColor: theme.palette.primary.dark,
            border: 'none',
            fontWeight: 'bold',
            '&:hover': {
                backgroundColor: theme.palette.primary.dark
            }
        },
        "& .Mui-selected": {
            border: '1px solid #43AFFF'
        },
        '& li': {
            '& button': {
                '&:focus': {
                    outline: '0'
                }
            }
        }
    }
}))

const CustomPagination = ({ setPage, currentPage, numberOfPages }) => {

    const classes = useStyles();

    const handlePageChange = (e, page) => {
        setPage(page);
    }

    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ margin: '20px 0px' }}>
            <div className={classes.pageContainer}>
                <Pagination classes={{ ul: classes.ul }} style={{ display: 'flex', justifyContent: 'center' }}
                    count={numberOfPages}
                    onChange={handlePageChange}
                    page={currentPage}
                    variant="outlined" shape="rounded" color='secondary'

                />
            </div>
        </Box>
    )
}

export default CustomPagination;