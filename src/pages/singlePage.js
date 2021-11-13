import React from "react";
import { MenuBar } from "../components/sidebar";
import {Box} from '@mui/material';
import { Searchbar } from "../components/searchbar";
import { Footer } from "../components/footer";
import { SinglePizza } from "../components/singlePizza";
export const SinglePage = ()=>{
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
                <SinglePizza image = "./burger.png" name="Wonderful Pizza" 
                description = "body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam."
                price = {[5.49, 6.49, 7.49]} rate = {4}/>
                <Footer/>
            </Box>
        </div>
    )
}