import React from "react";
import { MenuBar } from "../components/sidebar";
import {Box} from '@mui/material';
import { Searchbar } from "../components/searchbar";
import { PizzaMenu } from "../components/pizzaMenu";
import { Footer } from "../components/footer";
import { SinglePizza } from "../components/singlePizza";
export const PizzaPage = ()=>{
    return(
        <div style={{
            backgroundColor: 'rgba(252, 237, 227, 0.3)',
            display: 'flex',
            position: 'relative'
        }}>
            <MenuBar/>
            <Box style={{
                width: '100%',
                }}>
                <Searchbar/>
                <PizzaMenu/>
                <Footer/>
            </Box>
        </div>
    )
}