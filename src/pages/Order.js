import React from 'react';
import {Box,Grid} from '@mui/material';
import EnhancedTable from '../components/Admin_order/Table';
const Order = ()=>{
    return(
        <>
        <Box sx={{width:'100%',display:'flex',justifyContent:'center'}}>
        
        <Box sx={{width:'80%',paddingTop:'20px'}}><EnhancedTable/></Box>
        </Box>
        
        </>
    )
}

export default Order;