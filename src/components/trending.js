import AddCircleRounded from '@mui/icons-material/AddCircleRounded';
import { Divider, IconButton, Stack, Typography, Box } from '@mui/material';
import React, {useState} from 'react';
export const Trending = (props)=>{
    const [hov, setHov] = useState(false);
    const switchHov = ()=>{
        setHov(prev => !prev);
    }
    return(
        <Box
        onMouseEnter={switchHov}
        onMouseLeave = {switchHov}
        sx={{
            boxShadow:'none',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: hov ?'rgba(234, 106, 18, 0.7)': 'rgba(255, 255, 255, 0.4)',
            maxWidth: '274px',
            maxHeight: '237px',
            borderRadius: '24px',
            p: 3,
            boxSizing: 'border-box',
            marginRight: '2.5%',
            marginLeft: '2.5%'
        }}
        >
            <Stack spacing={1} sx={{minWidth: '150px'}}>
            <Typography variant="subtitle1"
                    sx={{
                        
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        color: hov? 'white':'#EA6A12',
                        textAlign: 'start'
                    }}
                    >👑 Top of the {props.time}
            </Typography>
            <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 600,
                        fontSize: '16px',
                        lineHeight: '175%',
                        color: hov? 'white': 'black',
                        textAlign: 'start',
                        marginBottom: '10px'
                    }}
                    >{props.name}
            </Typography>
            <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        color: hov? 'white': '#959895',
                        textAlign: 'start',
                        marginBottom: '20px'
                    }}
                    >{props.calories} calories                    
            </Typography>
            <Divider variant="light"  sx={{
                width: '50%',
                color: hov?'white': 'rgb(0,0,0,0.5)'
            }}/>
            <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        textAlign: 'start',
                        color: hov? 'white': '#959895',
                        marginBottom: '20px'
                    }}
                    >{props.persons} persons                    
            </Typography>
            <Stack
            direction='row'
            spacing={1}
            sx={{
                marginTop: '20px'
            }}
            >
                <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 600,
                        fontSize: '13px',
                        lineHeight: '175%',
                        color: hov? 'white': '#EA6A12',
                        textAlign: 'start'
                    }}
                    >$ {props.price}
                </Typography>
                <IconButton
                size="small"
                sx={{
                width: '24px',
                height: '24px'
                }}
                >
                <AddCircleRounded
                    sx={{
                        color: hov ? 'white':'rgba(234, 106, 18, 0.7)',
                    }}
                />
                </IconButton>
            </Stack>
            </Stack>
            
            <img
            src={props.image}
            alt={props.name}
            style={{
            borderRadius: '50%',
            boxShadow: '-10px 0px 30px rgba(0, 0, 0, 0.1)',
            alignSelf: 'center',
            //transform: 'translateX(5%)',
            width: '75%',
            }}
            />
            
        </Box>
    )
}
const trendings = [
    {image: './trend1.png', name: 'Italian Salad', time: 'week', calories: 100, persons: 4, price: 7.49},
    {image: './trend2.png', name: 'Italian Salad', time: 'day', calories: 50, persons: 1, price: 7.49},
    {image: './trend3.png', name: 'Italian Salad', time: 'month', calories: 90, persons: 3, price: 7.49},
    {image: './trend4.png', name: 'Italian Salad', time: 'week', calories: 50, persons: 1, price: 7.49},
    {image: './trend5.png', name: 'Italian Salad', time: 'day', calories: 70, persons: 2, price: 7.49},
    {image: './trend6.png', name: 'Italian Salad', time: 'month', calories: 80, persons: 3, price: 7.49},
    {image: './trend1.png', name: 'Italian Salad', time: 'week', calories: 100, persons: 4, price: 7.49},
    {image: './trend2.png', name: 'Italian Salad', time: 'day', calories: 50, persons: 1, price: 7.49},
]
export const TrendingList = ()=>{
    return(
        <Box
        sx={{
            width: '100%'
        }}
        >
        <Box
        sx={{
        display: 'flex',
        justifyContent: 'space-between',
        p: 5
        }}
        >
        <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: {md: '30px', sm: '20px', xs: '16px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start'
                    }}
                    >Trending Orders
        </Typography>
        </Box>
        <Box
        sx={{
            display: 'flex',
            flexWrap:'wrap'
        }}
        >
        {
            trendings.map(trending=>{
                return(
                    <Trending image={trending.image} name ={trending.name} time={trending.time}
                    calories={trending.calories} persons={trending.persons} price={trending.price}
                    />
                )
            })
        }
        </Box>
        </Box>
    )
}