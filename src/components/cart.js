import { Box, Divider, IconButton, Stack, Typography, Card, Button, List } from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import React from 'react';
const CartItem = (props)=>{
    const name = props.name;
    const image = props.image;
    const number = props.number;
    const price = props.price;
    return(
    <Box
    sx={{
        display: 'flex',
        width: '100%',
        transform: 'translateX(-20px)',
        marginTop: '5%'
    }}
    >
        <img
            src={image}
            alt={name}
            style={{
            borderRadius: '50%',
            boxShadow: '10px 0px 10px rgb(0,0,0, 0.1)',
            position: 'relative',
            width: '100px',
            height: '100px',
            left: '50px'
            }}
        />
        <Box
        sx={{
            display: 'flex',
            backgroundColor: '#FFF5EE',
            borderRadius: '100px',
            width: '100%',
            alignItems: 'center'
        }}
        >
            <Box sx={{flexGrow: 3}}/>
            <Stack
            sx={{
                flexGrow:3,
            }}
            >
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
                    >{name}
                </Typography>
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
                    ><strong style={{color: 'red'}}>x{' '}</strong>{number}
                </Typography>
            </Stack>
            <Box sx={{flexGrow: 2}}/>
            <Stack
            sx={{
                flexGrow:1
            }}
            >
                <IconButton
                sx={{
                    width: 40,
                    height: 40
                }}
                >
                    <DeleteForeverRoundedIcon
                    sx={{
                        color: 'red'
                    }}
                    />
                </IconButton>
                <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 600,
                        fontSize: '13px',
                        lineHeight: '175%',
                        color: 'black',
                        textAlign: 'start',
                        marginBottom: '10px'
                    }}
                    >$ {price}
                </Typography>
            </Stack>
        </Box>
    </Box>
    )
}
const cart = [
    {image: './spaghetti.png', name: 'Spaghetti', number: 1, price: 7.29},
    {image: './vegetable.png', name: 'Vegetable', number: 1, price: 5.49},
    
    {image: './mushroom.png', name: 'Mushroom', number: 1, price: 7.49},
    {image: './sweet.png', name: 'Sweet', number: 1, price: 6.49},
    
    {image: './spaghetti.png', name: 'Spaghetti', number: 1, price: 7.29},
    
    {image: './vegetable.png', name: 'Vegetable', number: 1, price: 5.49},
    {image: './mushroom.png', name: 'Mushroom', number: 1, price: 7.49},
    {image: './sweet.png', name: 'Sweet', number: 1, price: 6.49},
    
]
export const Cart = ()=>{
    return(
        <Card
        sx={{
            borderRadius: '24px',
            height: '100%',
        }}
        >
            <Typography variant="h6"
                    sx={{
                        alignSelf: 'start',
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '20px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        marginLeft: '10%'
                    }}
                >My Cart
            </Typography>
            
            <Divider variant="middle" sx={{
                width: '80%',
                alignSelf: 'center'
            }}/>
            <List sx={{width: '100%', height: '90%', overflow: 'auto', 
            maxHeight: '600px'
            }}>
            {
                cart.map(cartItem =>{
                    return(
                        <CartItem image={cartItem.image} name={cartItem.name}
                        number={cartItem.number} price={cartItem.price}
                        />
                    )
                })
            }
            </List>
            <Divider variant="middle" sx={{
                width: '80%',
                alignSelf: 'center'
            }}/>
            <Button variant="contained" 
                    sx={{
                        backgroundColor: '#EA6A12',
                        borderRadius: '100px',
                        fontFamily: 'Poppins',
                        fontWeight: 'normal',
                        fontSize: '13px',
                        lineHeight: '175%',
                        maxWidth: '150px',
                        color: 'white',
                        margin: '10px 0',
                        '&:hover, &:active':{
                            backgroundColor: '#f57c00'
                        }
                    }}
            >
                Checkout
            </Button>
        </Card>
    )
}