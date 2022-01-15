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
                        fontFamily: 'be Vietnam',
                        fontWeight: 700,
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        m: 3
                    }}
                    >hãy chờ một chút
            </Typography>
            <CircularProgress/>
        </Box>
        :<Box sx= {{width: '100%', alignItems: 'center'}}>
        <Typography variant="h6"
                sx={{
                    fontFamily: 'be Vietnam',
                    fontWeight: 700,
                    fontSize: '30px',
                    lineHeight: '52px',
                    color: '#07143B',
                    textAlign: 'start',
                    m: 3
                }}
                >Có lỗi xảy ra
        </Typography>
        </Box>
        }
        </Box>
    )
}