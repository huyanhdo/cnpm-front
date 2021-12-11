import React from "react";
import {Grid,Box,Hidden} from '@mui/material';
import pic1 from '../assets/img/pic1.png';
import SignInForm from "./SignIn/SignInForm";

const SignIn = ()=>{

    return (
        <Box sx={{height:'100%', width:'100%'}}>
 
        <Grid container 
            sx={{height:'100%', width:'100%'}}
            spacing ={0}
            display='flex'
            flexDirection='row'>
        <Grid item xs={12} sm={12} md={4} >
        <SignInForm/>
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

export default SignIn;