import React, { useState } from "react";
import { PizzaCard } from "./categories";
import {Box, Tab, Typography, styled, Pagination, Grow} from '@mui/material';
import { useSelector } from "react-redux";
import { useParams } from "react-router";
export const CustomTab = styled(Tab)({
    fontFamily: 'Poppins',
})
export const CustomPagination = styled(Pagination)({
    "& .MuiPaginationItem-root": {
        fontFamily: 'Poppins'
    },
    "& .MuiPaginationItem-root:active": {
        backgroundColor: 'rgb(234, 106, 18, 0.5)',
    },
    '& .Mui-selected': {
        backgroundColor: 'rgb(234, 106, 18, 0.5)',

    }
})
export const PizzaMenu = ()=>{
    const {category} = useParams();
    const products = useSelector(state => 
        category == 0 ? 
        state.pizzas.entities 
        : state.extras.entities
    );
    const ids = useSelector(state => {
        if(category == 0)
        return state.pizzas.ids;
        else return state.extras.ids.filter(id => {
            return (state.extras.entities[id].category == category)
        })
    });
    const max = 2;
    const [page, setPage] = useState(1);
    const totalPage = Math.ceil(ids.length / max);
    const pageList = [];
    for(let i = 1;i <= totalPage;i++)pageList.push(i);
    return(
        <Box sx={{p: 5, marginBottom: '100px', width: '100%'}}>
        <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        m: 3
                    }}
                    >Pizzas
        </Typography>
        {
            pageList.map(p => {return(
            <Grow in={page===p} mountOnEnter unmountOnExit timeout={page===p ? 1000: 0}>
            <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap'
            }}
            >
            {
                ids
                .map((id, index) =>{
                    return (index >= (page - 1)*max && index < page * max) ?
                        <Box sx={{marginLeft: '20px'}}>
                            <PizzaCard image={products[id].image} name={products[id].name} 
                            rate={products[id].rate} price={category == 0 ? products[id].price[0] : products[id].price}
                            id = {id} link = {category==0 ? `/product/${id}` : `/extra/${id}` }
                            />
                        </Box>
                    : false
                })
            }
            </Box>
                </Grow>   
            )})
        }
        <Box sx={{marginTop: '100px', alignItems: 'center', width: '100%', marginLeft: '40%'}}>
        <CustomPagination variant="outlined" shape="rounded" count={totalPage}
            onChange={(event, value) => {setPage(value)}} size="large" page={page}
        />
        </Box>
        </Box>
    )
}