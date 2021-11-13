import React, { useState } from "react";
import { PizzaCard } from "./categories";
import {Box, Tab, Tabs, Typography, styled, Fade} from '@mui/material';
const pizzas = [
    {image: './spaghetti.png', name: 'Spaghetti', rate: 3, price: 7.29},
    {image: './vegetable.png', name: 'Vegetable', rate: 2, price: 5.49},
    {image: './mushroom.png', name: 'Mushroom', rate: 4, price: 7.49},
    {image: './sweet.png', name: 'Sweet', rate: 5, price: 6.49},
    {image: './spaghetti.png', name: 'Spaghetti', rate: 3, price: 7.29},
    {image: './vegetable.png', name: 'Vegetable', rate: 1, price: 5.49},
    {image: './mushroom.png', name: 'Mushroom', rate: 4, price: 7.49},
    {image: './sweet.png', name: 'Sweet', rate: 5, price: 6.49},
    {image: './spaghetti.png', name: 'Spaghetti', rate: 3, price: 7.29},
    {image: './vegetable.png', name: 'Vegetable', rate: 4, price: 5.49},
    {image: './mushroom.png', name: 'Mushroom', rate: 3, price: 7.49},
    {image: './sweet.png', name: 'Sweet', rate: 2, price: 6.49},
    {image: './spaghetti.png', name: 'Spaghetti', rate: 3, price: 7.29},
    {image: './vegetable.png', name: 'Vegetable', rate: 2, price: 5.49},
    {image: './mushroom.png', name: 'Mushroom', rate: 4, price: 7.49},
    {image: './sweet.png', name: 'Sweet', rate: 5, price: 6.49},
    {image: './spaghetti.png', name: 'Spaghetti', rate: 3, price: 7.29},
    {image: './vegetable.png', name: 'Vegetable', rate: 1, price: 5.49},
    {image: './mushroom.png', name: 'Mushroom', rate: 4, price: 7.49},
    {image: './sweet.png', name: 'Sweet', rate: 5, price: 6.49},
    {image: './spaghetti.png', name: 'Spaghetti', rate: 3, price: 7.29},
    {image: './vegetable.png', name: 'Vegetable', rate: 4, price: 5.49},
    {image: './mushroom.png', name: 'Mushroom', rate: 3, price: 7.49},
    {image: './sweet.png', name: 'Sweet', rate: 2, price: 6.49},
]
//const pricePizza = pizzas.sort((a,b)=>{return a.price - b.price});
//const ratePizza = pizzas.sort((a,b)=>{return b.rate - a.rate});
const filters = ['Filter 1', 'Filter 2', 'Filter 3']
const CustomTab = styled(Tab)({
    fontFamily: 'Poppins',
})
export const PizzaMenu = ()=>{
    const [filter, setFilter] = useState(1);
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
            p: 3
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
        </Box>
        <Fade in={filter===0} timeout={1000} mountOnEnter unmountOnExit>
        <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap'
        }}
        >
        {
            pizzas.sort((a,b)=>{return b.name - a.name}).map((pizza) =>{
                return(
                    <Box sx={{marginLeft: '20px'}}>
                        <PizzaCard image={pizza.image} name={pizza.name} rate={pizza.rate} price={pizza.price}/>
                    </Box>
                ) 
            })
        }
        </Box>
        </Fade>
        <Fade in={filter===1} timeout={1000} mountOnEnter unmountOnExit>
        <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap'
        }}
        >
        {
            pizzas.sort((a,b)=>{return a.price - b.price}).map((pizza) =>{
                return(
                    <Box sx={{marginLeft: '20px'}}>
                        <PizzaCard image={pizza.image} name={pizza.name} rate={pizza.rate} price={pizza.price}/>
                    </Box>
                ) 
            })
        }
        </Box>
        </Fade>
        <Fade in={filter===2} timeout={1000} mountOnEnter unmountOnExit>
        <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap'
        }}
        >
        {
            pizzas.sort((a,b)=>{return b.rate - a.rate}).map((pizza) =>{
                return(
                    <Box sx={{marginLeft: '20px'}}>
                        <PizzaCard image={pizza.image} name={pizza.name} rate={pizza.rate} price={pizza.price}/>
                    </Box>
                ) 
            })
        }
        </Box>
        </Fade>
        </Box>
    )
}