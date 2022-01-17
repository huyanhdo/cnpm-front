import React from "react";
import {Box, CircularProgress, Typography} from '@mui/material';
import { SinglePizza } from "../components/singlePizza";
import { useSelector } from "react-redux";
export const SinglePage = ()=>{
    const fetchingStatus = useSelector(state => state.pizzas.fetchingStatus)
    return(
        <Box style={{
            width: '100%',
        }}>
        {
        fetchingStatus === 'SUCCESS'?
            <SinglePizza/>:
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
                    >Hãy chờ một chút
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