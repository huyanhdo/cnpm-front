import { Grid ,Box} from '@mui/material';
import { Cart } from '../components/cart';
import { Categories } from '../components/categories';
import { Chips } from '../components/chips';
import { Combo } from '../components/combo';
import { ImageDecorator } from '../components/decorator';
import { Footer } from '../components/footer';
import { Searchbar } from '../components/searchbar';
import { MenuBar} from '../components/sidebar';
import { TrendingList } from '../components/trending';
import React from 'react';
export const Home = () =>{
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
                <Combo/>
                <Grid container sx={{paddingRight: '20px', alignItems: 'stretch'}}>
                <Grid item md={8} sm={1}>
                <Categories/>
                </Grid>
                <Grid item md={4} sm={1}>
                <Cart/>
                </Grid>
                </Grid>
                <Grid container sx={{marginTop: '50px', paddingRight: '20px', alignItems: 'stretch'}}>
                <Grid item md={9}>
                <TrendingList/>
                </Grid>
                <Grid item md={3}>
                <Chips/>
                </Grid>
                </Grid>
                <Footer/>
                <ImageDecorator/>
                </Box>
            </div>
    )
}