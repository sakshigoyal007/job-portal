import { Box, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React from 'react';

const useStyles=makeStyles((theme)=>({
    pageContainer:{
        zIndex:200,
        padding:'10px 80px',
        width:'100%'
    },
    ul: {
        "& .MuiPaginationItem-root": {
          color: "#303F60",
          backgroundColor:'#43AFFF33'
        },
      }
}))

const CustomPagination=({setPage,currentPage,totalCount,numberOfPages})=>{

    const classes=useStyles();

   const handlePageChange=(page)=>{
        setPage(page.target.textContent);
    }
    
    return(
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{margin:'20px 0px'}}>
            <div className={classes.pageContainer}>
                <Pagination  classes={{ ul: classes.ul }} style={{display:'flex', justifyContent:'center'}} 
                count={numberOfPages} 
                onChange={handlePageChange}
                variant="outlined" shape="rounded" color='primary'
                
                />
            </div>
        </Box>
    )
}

export default CustomPagination;