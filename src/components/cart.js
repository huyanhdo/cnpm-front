import { Box, Divider, IconButton, Stack, Typography, Card, Button, List } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
        backgroundColor: '#FFF5EE',
        borderRadius: '100px 0 50px 100px',
        margin: '20px 0',
        maxHeight: '90px',
        alignItems: 'center'
    }}
    >
        <img
            src={image}
            alt={name}
            style={{
            borderRadius: '50%',
            boxShadow: '10px 0px 10px rgb(0,0,0, 0.1)',
            width: '100px',
            height: '100px',
            zIndex: 100
            }}
        />
        <Stack
        sx={{

            width: '100%',
            zIndex: 0,
            marginLeft: '5%'
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
                
            <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
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
                    ><strong style={{color: 'red'}}>x{' '}</strong>{number}
                </Typography>
                <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 600,
                        fontSize: '16px',
                        lineHeight: '175%',
                        color: 'black',
                        textAlign: 'start',
                        marginBottom: '10px',
                        marginLeft: '60%'
                    }}
                    >$ {price}
                </Typography>
            </Box>
        </Stack>
    </Box>
    )
}
export const Cart = ()=>{
    const cart = useSelector(state => state.cart);
    const cartExtras = useSelector(state => state.cartExtras);
    const cartCombos = useSelector(state => state.cartCombos);
    const pizzas = useSelector(state => state.pizzas.entities);
    const extras = useSelector(state => state.extras.entities);
    const combos = useSelector(state => state.combos.entities);
    const navigate = useNavigate();
    return(
        <Card
        sx={{
            borderRadius: '24px',
            height: '100%',
            width: {md: '30%', sm: '100%', xs: '100%'},
            margin: '50px 0'
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
            maxHeight: '600px',  padding: '0 20px'
            }}>
            {
                cart.ids.map(id =>{
                    return(
                        <CartItem 
                        image={pizzas[cart.entities[id].pizzaId].image} 
                        name={pizzas[cart.entities[id].pizzaId].name}
                        number={cart.entities[id].number} 
                        price={cart.entities[id].total}
                        />
                    )
                })
            }
            {
                cartExtras.ids.map(id =>{
                    return(
                        <CartItem 
                        image={extras[id].image} 
                        name={extras[id].name}
                        number={cartExtras.entities[id].number} 
                        price={cartExtras.entities[id].total}
                        />
                    )
                })
            }
            {
                cartCombos.ids.map(id =>{
                    return(
                        <CartItem 
                        image={combos[id].image} 
                        name={combos[id].title}
                        number={cartCombos.entities[id].number} 
                        price={cartCombos.entities[id].total}
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
                    onClick={()=>{navigate('/cart')}}
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