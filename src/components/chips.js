import { Chip } from "@mui/material";
import React from "react";
export const CateChip = (props)=>{
    
    return(
        <Chip label={props.label} variant='outlined' sx={{
            color: '#EA6A12',
            margin: '10px',
            '&:hover, &:active':{
                backgroundColor: '#EA6A12',
                color:'white',
                border: 'white'
            }
        }}/>
    )
}