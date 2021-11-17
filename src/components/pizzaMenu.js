import React, { useState } from "react";
import { PizzaCard } from "./categories";
import {Box, Tab, Tabs, Typography, styled, Collapse, Pagination, Fade, Grow} from '@mui/material';
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
        color: 'white',
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
    const filters = ['Filter 1', 'Filter 2', 'Filter 3'];
    const [filter, setFilter] = useState(0);
    const max = 2;
    const [page, setPage] = useState(1);
    const totalPage = Math.ceil(ids.length / max);
    const pageList = [];
    for(let i = 1;i <= totalPage;i++)pageList.push(i);
    const handleChange = (event, newValue)=>{
        setFilter(newValue);
    }
    return(
        <Box>
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
        <Box sx={{
            width: '100%',
            p: 3,
            display: 'flex',
            flexWrap: 'wrap-reverse',
            justifyContent: 'space-between'
        }}>
            <Tabs value={filter} onChange={handleChange}
            textColor='inherit'
            TabIndicatorProps={{
                style:{
                    backgroundColor: '#EA6A12',
                }
            }}
            >
                {
                    filters.map(f =>{
                        return(
                            <CustomTab label={f} ></CustomTab>
                        )
                    })
                }
            </Tabs>
            <CustomPagination variant="outlined" shape="rounded" count={totalPage}
            onChange={(event, value) => {setPage(value)}} size="large" page={page}
            />
        </Box>
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
                .sort((id1, id2) => products[id2].rate - products[id1].rate)
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
        </Box>
    )
}