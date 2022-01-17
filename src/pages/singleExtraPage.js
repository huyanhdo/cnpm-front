import React from "react";
import {Box, CircularProgress, Typography} from '@mui/material';
import { SingleExtra } from "../components/singleExtra";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
export const SingleExtraPage = ()=>{
    const categories = {
        'dessert':{
            status: useSelector(state => state.desserts.fetchingStatus),
        },
        'drink':{
            status: useSelector(state => state.drinks.fetchingStatus),
        },
        'vegetable':{
            status: useSelector(state => state.vegetables.fetchingStatus),
        },
        'kid':{
            status: useSelector(state => state.kids.fetchingStatus),
        },
        'appetizer':{
            status: useSelector(state => state.desserts.fetchingStatus),
        }
    }
    const {category} = useParams()
    const fetchingStatus = categories[category].status
    return(
        <Box style={{
            width: '100%',
        }}>
        {
        fetchingStatus === 'SUCCESS'?
            <SingleExtra/>:
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