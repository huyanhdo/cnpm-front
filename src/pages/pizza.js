import React from "react";
import {Box} from '@mui/material';
import { PizzaMenu } from "../components/pizzaMenu";
export const PizzaPage = ()=>{
    return(
            <Box style={{
                width: '100%',
                }}>
                <PizzaMenu/>
            </Box>
    )
}