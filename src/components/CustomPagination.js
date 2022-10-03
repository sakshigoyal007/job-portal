import { Box, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React from 'react';
const useStyles=makeStyles((theme)=>({
    root:{
        // position:'fixed',
        // bottom:0,
        zIndex:200,
        padding:'10px 80px',
        width:'100%'
    },
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        // color:'white'
    },
}))

const CustomPagination=({setPage,currentPage,totalCount,numberOfPages})=>{

    const classes=useStyles();

   const handlePageChange=(page)=>{
        setPage(page.target.textContent);
    }
    
    return(
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{margin:'20px 0px'}}>
            <div className={classes.root}>
                <Pagination style={{display:'flex', justifyContent:'center'}} 
                count={numberOfPages} 
                onChange={handlePageChange}
                variant="outlined" shape="rounded" color='primary'
                
                />
            </div>
        </Box>
    )
}

export default CustomPagination;