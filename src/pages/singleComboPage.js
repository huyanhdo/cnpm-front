import React from "react";
import {Box, CircularProgress, Typography} from '@mui/material';
import {SingleCombo} from "../components/singleCombo"
import { useSelector } from "react-redux";
export const SingleComboPage = ()=>{
    const fetchingStatus = useSelector(state => state.combos.fetchingStatus)
    return(
        <Box style={{
            width: '100%',
        }}>
        {
        fetchingStatus === 'SUCCESS'?
            <SingleCombo/>:
        fetchingStatus === 'LOADING' || fetchingStatus === 'INITIAL'?
        <Box sx= {{width: '100%', alignItems: 'center'}}>
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        m: 3
                    }}
                    >Please Wait
            </Typography>
            <CircularProgress/>
        </Box>
        :<Box sx= {{width: '100%', alignItems: 'center'}}>
        <Typography variant="h6"
                sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    fontSize: '30px',
                    lineHeight: '52px',
                    color: '#07143B',
                    textAlign: 'start',
                    m: 3
                }}
                >Opps...Sorry, something went wrong
        </Typography>
        </Box>
        }
        </Box>
    )
}