import React from "react";
import {Box} from '@mui/material';
import { SinglePizza } from "../components/singlePizza";
export const SinglePage = ()=>{
    return(
        <Box style={{
            width: '100%',
        }}>
            <SinglePizza/>
        </Box>
    )
}