import React,{useEffect} from "react";
import {Grid,Box,Hidden} from '@mui/material';
import pic1 from '../assets/img/pic1.png';

import { useAuth } from "../context/AuthContext";
import ForgetPassForm from "../components/SignIn/ForgetPassForm";

const ForgetPassword  = ( )=>{
    const {currentUser} = useAuth();
    const {logout} = useAuth();

    useEffect(() => {
        if(currentUser) logout();
    }, [])
    
    return (
        <Box sx={{height:'100%', width:'100%'}}>
   
        <Grid container 
            sx={{height:'100%', width:'100%'}}
            spacing ={0}
            display='flex'
            flexDirection='row'>
        <Grid item xs={12} sm={12} md={4} >
        <ForgetPassForm/>
        </Grid>
        <Hidden only={['xs','sm']}>
        <Grid item xs >
            <img
            src={pic1}
            alt='smth' 
            style={{
            width:'100%',
            height:'100%',
     
        }}/>
        </Grid>
        </Hidden>
        </Grid> 
        </Box>
    )
}

export default ForgetPassword;