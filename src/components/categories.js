import { Box, Card, Container, Divider , IconButton, Rating, Stack, Typography} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
export const Category = (props)=>{
    const image = props.image;
    const name = props.name;
    const [hov, setHov] = useState(false);
    const switchHov = ()=>{
        setHov(prev => !prev);
    }
    return(
        <Box
        onMouseEnter={switchHov}
        onMouseLeave = {switchHov}
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: hov ?'rgba(234, 106, 18, 0.7)': 'rgba(255, 255, 255, 0.4)',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
            minWidth: '112px',
            minHeight: '236px',
            borderRadius: '24px'
        }}
        >
            <img
            src={image}
            alt={name}
            style={{
            borderRadius: '50%',
            width: '64px',
            height: '64px'
            }}
            />
            <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 600,
                        fontSize: '13px',
                        lineHeight: '175%',
                        color: hov? 'white': 'black',
                        textAlign: 'start'
                    }}
                    >{name}
            </Typography>
            <Divider variant="middle" 
            sx={{
                color: hov? 'white': 'rgba(234, 106, 18, 0.7)',
                width: hov? '51px': '32px',
                
            }}
            />
            <IconButton
            
            sx={{
                backgroundColor: hov? 'white': 'rgba(234, 106, 18, 0.7)',
                '&:active, &:hover':{
                    backgroundColor:  'white'
                }
            }}
            >
                <KeyboardArrowRightRoundedIcon
                    sx={{
                        color: hov ?'rgba(234, 106, 18, 0.7)': 'white',
                    }}
                />
            </IconButton>
        </Box>
    )
}
const categories = [
    {image: './spaghetti.png', name: 'Spaghetti'},
    {image: './vegetable.png', name: 'Vegetable'},
    {image: './mushroom.png', name: 'Mushroom'},
    {image: './sweet.png', name: 'Sweet'},
    {image: './spaghetti.png', name: 'Spaghetti'},
    {image: './vegetable.png', name: 'Vegetable'},
    {image: './mushroom.png', name: 'Mushroom'}
]
const pizzas = [
    {image: './spaghetti.png', name: 'Spaghetti', rate: 3, price: 7.29},
    {image: './vegetable.png', name: 'Vegetable', rate: 3, price: 5.49},
    {image: './mushroom.png', name: 'Mushroom', rate: 3, price: 7.49},
    {image: './sweet.png', name: 'Sweet', rate: 3, price: 6.49},
]
export const ViewAll = ()=>{
    return(
        <Stack
        direction='row'
        spacing={1}
        sx={{
            alignItems: 'center'
        }}
        >
            <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        color: 'black',
                        textAlign: 'start'
                    }}
                    >View all
            </Typography>
            <IconButton
            size="small"
            sx={{
                backgroundColor: 'rgba(234, 106, 18, 0.7)',
                width: '24px',
                height: '24px',
                '&:hover':{
                    backgroundColor: 'rgba(234, 106, 18, 0.9)'
                }
            }}
            >
                <KeyboardArrowRightRoundedIcon
                    sx={{
                        color: 'white',
                    }}
                />
            </IconButton>
        </Stack>
    )
}
export const PizzaCard = (props)=>{
    const image = props.image;
    const name = props.name;
    const price = props.price;
    const rate = props.rate;
    const [hov, setHov] = useState(false);
    const switchHov = ()=>{
        setHov(prev => !prev);
    }
    return (
        <Box
        sx={{
            marginTop: '100px'
        }}
        >
        <Box
        onMouseEnter={switchHov}
        onMouseLeave = {switchHov}
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'start',
            backgroundColor: hov ?'rgba(234, 106, 18, 0.7)': 'rgba(255, 255, 255, 0.4)',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
            maxWidth: '200px',
            maxHeight: '230px',
            borderRadius: '24px',
            p: 3,
            boxSizing: 'border-box',
        }}
        >
            <img
            src={image}
            alt={name}
            style={{
            borderRadius: '50%',
            boxShadow: '0px 30px 30px rgba(234, 106, 18, 0.05)',
            alignSelf: 'center',
            transform: 'translateY(-25%)',
            width: '90%'
            }}
            />
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
                    >{name}
            </Typography>
            <Rating value={rate} readOnly
            sx={{
                color: hov? 'white':'#EA6A12',
            }}
            icon={<StarRoundedIcon/>}
            emptyIcon={<StarRoundedIcon/>}
            />
            <Stack
            direction='row'
            spacing={11}
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
                    >$ {price}
                </Typography>
               <IconButton
                size="small"
                sx={{
                width: '24px',
                height: '24px'
                }}
                >
                <AddCircleRoundedIcon
                    sx={{
                        color: hov ? 'white':'rgba(234, 106, 18, 0.7)',
                    }}
                />
                </IconButton> 
            </Stack>
        </Box>
        </Box>
    )
}
export const Categories = ()=>{
    return(
    <Box>
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
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start'
                    }}
                    >Menu categories
        </Typography>
        <ViewAll/>
    </Box>
    <Box
    sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
    }}
    >
        {
            categories.map(category =>{
                return <Category image={category.image} name={category.name}/>
            })
        }
    </Box>
    <Box
    sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap'
    }}
    >
        {
            pizzas.map(pizza =>{
                return <PizzaCard image={pizza.image} name={pizza.name} rate={pizza.rate} price={pizza.price}/>
            })
        }
    </Box>
    </Box>
    )
}