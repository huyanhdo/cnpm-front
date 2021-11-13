import React, { useState } from "react";
import {Box, Divider, IconButton, Stack, Typography, Rating, Button} from '@mui/material';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import  AddRoundedIcon  from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { ToppingCard } from "./topping";
const sizes = ['S', 'M', 'L'];
const soles = ['Soft', 'Crispy'];
const toppings = [
    {image: '/trend1.png', name: 'Topping 1', price: 1.01},
    {image: '/trend2.png', name: 'Topping 2', price: 1.11},
    {image: '/trend3.png', name: 'Topping 3', price: 0.21},
    {image: '/trend4.png', name: 'Topping 4', price: 0.3},
    {image: '/trend5.png', name: 'Topping 5', price: 1.05},
    {image: '/trend6.png', name: 'Topping 6', price: 1.01},
]
const round = (num)=> Math.round(num * 100) / 100;
export const SinglePizza = (props)=>{
    const [size, setSize] = useState(0);
    const [sole, setSole] = useState(0);
    const [num, setNum] = useState(1);
    const [total, setTotal] = useState(props.price[0]);
    const handleAdd = (_id, add)=>{
        setTotal(prev => add ? round(prev + toppings[_id].price) :  round(prev - toppings[_id].price));
    }
    const sizeChanged = (o, n)=>{
        setSize(n);
        setTotal(prev => round(prev - props.price[o] + props.price[n]));
    }
    return(
        <Box
        sx={{
            backgroundColor: 'white',
            borderRadius: '24px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
            padding: '20px 0px',
            alignItems: 'center',
            m:3
        }}
        >
        <Box
        sx={{
            backgroundColor:'rgba(252, 237, 227, 0.3)',
            display: 'flex',
            borderRadius: '24px',
            justifyContent: 'space-around',
            alignItems: 'center',
            p: 5,
            m: 5,
            flexWrap: {xs: 'wrap',sm: 'wrap', md: 'nowrap'}
        }}
        >
            <img
            src={props.image}
            alt={props.name}
            style={{
            borderRadius: '50%',
            }}
            />
            <Stack spacing={2}>
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start'
                    }}
                    >{props.name}
                </Typography>
                <div
                    style={{
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        color: '#EA6A12',
                        textAlign: 'start',
                        textOverflow: 'ellipsis',
                        maxWidth: '80%',
                        maxHeight: '65px',
                        overflow: 'hidden'
                    }}
                    >{props.description}
                </div>
                <Divider sx = {{maxWidth: '50%'}}/>
                <div
                    style={{
                        fontFamily: 'Poppins',
                        fontWeight: 600,
                        fontSize: '20px',
                        lineHeight: '175%',
                        color:'#EA6A12',
                        textAlign: 'start'
                    }}
                    >$ {props.price[size]}
                </div>
                <Rating value={props.rate} readOnly
                sx={{
                    color: '#EA6A12',
                }}
                icon={<StarRoundedIcon/>}
            emptyIcon={<StarRoundedIcon/>}
            />
                <Stack spacing={1} direction="row"
                sx={{
                    alignItems: 'center'
                }}
                >
                <Typography variant="body1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                        fontSize: '20px',
                        lineHeight: '22.75px',
                        color: '#07143B',
                        textAlign: 'start'
                    }}
                    >Size: 
                </Typography>
                <IconButton 
                onClick={() => sizeChanged(size, (size - 1) % 3)}
                >
                    <KeyboardArrowLeftRoundedIcon/>
                </IconButton>
                <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Fairplay Display',
                        fontWeight: 600,
                        fontSize: '20px',
                        lineHeight: '175%',
                        color:'#07143B',
                        textAlign: 'start'
                    }}
                    >{sizes[size]}
                </Typography>
                <IconButton 
                onClick={() => sizeChanged(size, (size + 1) % 3)}
                >
                    <KeyboardArrowRightRoundedIcon/>
                </IconButton>
                </Stack>
                <Stack spacing={1} direction="row"
                
                sx={{
                    alignItems: 'center'
                }}
                
                >
                <Typography variant="body1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                        fontSize: '20px',
                        lineHeight: '22.75px',
                        color: '#07143B',
                        textAlign: 'start'
                    }}
                    >Sole: 
                </Typography>
                <IconButton
                onClick={() => setSole(prev => {return prev === 1 ? 0: 1})}
                >
                    <KeyboardArrowLeftRoundedIcon/>
                </IconButton>
                <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Fairplay Display',
                        fontWeight: 600,
                        fontSize: '20px',
                        lineHeight: '175%',
                        color:'#07143B',
                        textAlign: 'start'
                    }}
                    >{soles[sole]}
                </Typography>
                <IconButton 
                onClick={() => setSole(prev => {return prev === 1 ? 0: 1})}
                >
                    <KeyboardArrowRightRoundedIcon/>
                </IconButton>
                </Stack>
            </Stack>
        </Box>
        <Divider variant="middle" sx={{m: 5}}/>
        <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'center',
                        m: 1
                    }}
                    >Toppings
        </Typography>
        
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
            m: 1
        }}
        >
            {
            toppings.map((topping, index) =>{
                return (<ToppingCard 
                name={topping.name} image = {topping.image}
                    price = {topping.price} _id = {index} 
                    handleAdd = {handleAdd}
                />
                )
            })
            }
        </Box>
        <Divider variant="middle" sx={{m: 5}}/>
        <Box sx={{
            m: 1,
            display: 'flex',
            justifyContent: 'space-around'
        }}>
            <Stack spacing={2} direction="row">
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'center',
                    }}
                    >Number: 
            </Typography>
            <Stack direction="row" spacing={5}
            sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(252, 237, 227, 0.3)',
                borderRadius: '100px'
            }}
            >
                <IconButton
                sx={{
                    width: '40px',
                    height: '40px',
                    '&:hover, &:active':{
                        color: 'white'
                    }
                }}
                >
                    <RemoveRoundedIcon
                    onClick = {()=>{setNum(prev => (prev === 1)? 1: prev - 1)}}
                    sx={{
                        color: 'rgba(234, 106, 18, 0.7)',
                        width: '40px',
                        height: '40px'
                    }}
                    />
                </IconButton>
                <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 600,
                        fontSize: '16px',
                        lineHeight: '175%',
                        color: 'black',
                        textAlign: 'start',
                        marginBottom: '10px'
                    }}
                    >{num}
                </Typography>
                <IconButton
                onClick = {()=>{setNum(prev => (prev === 10)? 10: prev + 1)}}
                sx={{
                    width: '40px',
                    height: '40px',
                    '&:hover, &:active':{
                        color: 'white'
                    }
                }}
                >
                    <AddRoundedIcon
                    sx={{
                        color: 'rgba(234, 106, 18, 0.7)',
                        width: '40px',
                        height: '40px'
                    }}
                    />
                </IconButton>
            </Stack>
            </Stack>
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'center',
                    }}
                    >Total: $ {round(total * num)}
            </Typography>
        </Box>
        <Divider variant="middle" sx={{m: 5}}/>
        <Button variant="contained" 
                    sx={{
                        backgroundColor: '#EA6A12',
                        borderRadius: '100px',
                        //maxWidth: '150px',
                        fontFamily: 'Poppins',
                        fontWeight: 'normal',
                        fontSize: '15px',
                        lineHeight: '175%',
                        color: 'white',
                        '&:hover, &:active':{
                            backgroundColor: '#f57c00'
                        },
                        marginBottom: 2
                    }}
                    >
                        Add to Cart
            </Button>
        </Box>
        
    )
}