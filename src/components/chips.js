import { Chip , Box, Typography, Divider, Container } from "@mui/material";
import React from "react";
import { ViewAll } from "./categories";
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
const cates = [
    'Burger', 'Pizza', 'Dessert', 'Appetizer', 'Biscuits', 'Grilled Cheese', 'Tomato soup',
    'Chicken fingers', 'Chicken', 'nuggets', 'Flatbread Pizza', 'Mac & Cheese', 'Mini burger',
    'Mini pizzas', 'Biscuits', 'Grilled Cheese', 'Tomato soup', 'Chicken fingers', 'Chicken', 'nuggets'
]
export const Chips = ()=>{
    return(
        <Box
        sx={{
            borderRadius: '24px',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            height: '100%'
        }}
        >
        <Container
        sx={{
        display: 'flex',
        justifyContent: 'space-between'
        }}
    >
        <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '15px',
                        lineHeight: '52px',
                        color: '#07143B'
                    }}
                    >Categories
        </Typography>
        <ViewAll/>
    </Container>
    <Divider variant='middle'/>
    <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginTop: '20px'
        }}
    >
        {
            cates.map(cate=>{
                return <CateChip label={cate}/>
            })
        }
    </Box>
    </Box>
    )
}