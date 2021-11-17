import {Box} from '@mui/material';
import { Cart } from '../components/cart';
import { Categories } from '../components/categories';
import { ImageDecorator } from '../components/decorator';
import { TrendingList } from '../components/trending';
import React from 'react';
import { ComboCarousel } from '../components/carousel';
export const Home = () =>{
    return(
            <Box style={{
            width: '100%',
            }}>
                <ComboCarousel/>
                <Box sx={{alignItems: 'stretch', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
                margin: '0 20px'
                }}>
                <Categories/>
                <Cart/>
                </Box>
                <ImageDecorator/>
                <Box sx={{marginTop: '50px', marginBottom: '150px', paddingRight: '20px', alignItems: 'stretch',
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', zIndex: 10
                }}>
                <TrendingList/>
                </Box>
                </Box>
    )
}