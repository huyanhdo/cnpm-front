import React from "react";
import {Box, Link, Stack, Typography} from '@mui/material';
export const CustomLink = (props)=>{
    return(
        <Link 
        underline='none'
        color='#07143B'
        href='#'
        sx={{
            fontFamily: 'Poppins',
            fontSize: '13px',
            lineHeight: '175%',
            letterSpacing: '0.02em'
        }}>
        {props.label}
        </Link>
    )
}
export const Footer = ()=>{
    return(
        <Box 
        sx={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '100px',
            minHeight: '50px',
            padding: '0 10px',
            width: '100%',
            //boxSizing: 'border-box',
            zIndex: 2
        }}
        >
            <Stack direction='row' spacing={2}>
                <CustomLink label='Privacy Policy'/>
                <CustomLink label='Terms of Use'/>
            </Stack>
            <Typography
            sx={{
                fontFamily: 'Poppins',
                fontSize: '13px',
                lineHeight: '175%',
                letterSpacing: '0.02em',
                marginRight: '5%'
            }}
            >© 2021 Aprycot, Made with ❤ by IQONIC Design.</Typography>
        </Box>
    )
}