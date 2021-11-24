import React from "react";
import {Box} from '@mui/material';
import { PizzaMenu } from "../components/pizzaMenu";
import { ComboCarousel } from "../components/carousel";
export const PizzaPage = ()=>{
    return(
            <Box style={{
                width: '100%',
                }}>
                <ComboCarousel/>
                <PizzaMenu/>
            </Box>
    )
}