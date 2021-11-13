import React, { useState } from "react";
import {Box, Divider, IconButton, Stack, Typography, Card, List, ListItem, Button, Chip} from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import RedoIcon from '@mui/icons-material/Redo';
export const PizzaCartItem = (props)=>{
    const name = props.pizza.name;
    const image = props.pizza.image;
    const total = props.pizza.total;
    const number = props.pizza.number;
    const size = props.pizza.size;
    const sole = props.pizza.sole;
    const toppings = props.pizza.toppings;
    const [removed, SetRemoved] = useState(false);
    const switchRemove = ()=>{
        SetRemoved(prev => !prev);

    }
    return(
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            //maxHeight: '200px'
            boxShadow: '1px 1px 5px rgb(0,0,0,0.2)',
            backgroundColor: removed ? 'rgb(255, 0, 0, 0.1)' :'white',
            borderRadius: '200px 0px 150px 200px',
            p: 1
        }}>
            <img
            src={image}
            alt={name}
            style={{
                borderRadius: '200px',
                width: '150px',
                height: '150px',
                boxShadow: '5px 0px 20px rgba(0, 0, 0, 0.1)',
                zIndex: 2,
                //transform: 'translateX(80px)',
            }}
            />
            <Stack
            sx={{
                display: 'flex',
                width: '90%',
                maxHeight: '200px',
                boxSizing: 'border-box',
                //transform: 'translateX(-80px)',
                zIndex: 1,
                padding: {md: '5px 50px 5px 50px', sm: '5px 10px 5px 20px'},
            }}>
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
                >
                    <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '25px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start'
                    }}
                    >{name}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                    <Typography variant="h6"
                    sx={{
                        marginRight: '20px',
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '25px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start'
                    }}
                    >Total: $ {total}
                    </Typography>
                        <IconButton
                        sx={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'white',

                            boxShadow: '1px 1px 5px rgb(0,0,0,0.2)',
                            '&:hover, &:active':{
                                backgroundColor: 'white'
                            }
                        }}
                        >
                            <ModeEditIcon/>
                        </IconButton>
                        <IconButton
                        sx={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'white',
                            boxShadow: '1px 1px 5px rgb(0,0,0,0.2)',
                            '&:hover, &:active':{
                                backgroundColor: 'white'
                            }
                        }}
                        onClick={switchRemove}
                        >
                            {
                                removed ? <RedoIcon/> :<DeleteIcon/>
                            }
                            
                        </IconButton>
                    </Stack>
                </Box>
                <Stack
                direction="row"
                spacing={3}
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
                    >Size: {size}
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
                    >Sole: {sole}
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
                    >Number: {number}
                    </Typography>
                </Stack>
                <Divider sx={{width: '50%'}}/>
                <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    //width: '90%',
                    //justifyContent: 'space-between'
                }}>

                    {
                        toppings.length > 0 ? toppings.map((topping)=>{
                            return <Chip label={topping} sx={{
                                margin: '5px 5px 5px 0',
                                fontFamily: 'Poppins'
                            }}/>
                        }): <Chip label='No Topping' sx={{
                            margin: '5px 5px 5px 0',
                            fontFamily: 'Poppins'
                        }}/>
                    }
                </Box>
            </Stack>
        </Box>
    )
}
const pizzas = [
    
    {image: 'trend1.png', name: 'Pizza 1', size: 'S', sole: 'Soft', total: 5.49, number: 2,
    toppings: ['topping 1', 'topping 2', 'topping 3']
    },
    {image: 'trend2.png', name: 'Pizza 2', size: 'M', sole: 'Soft', total: 6.49, number: 2,
    toppings: ['topping 4', 'topping 5', 'topping 6']
    },
    {image: 'trend3.png', name: 'Pizza 3', size: 'L', sole: 'Crispy', total: 10.49, number: 3,
    toppings: ['topping 1', 'topping 2', 'topping 3', 'topping 4', 'topping 5', 'topping 6']
    },
    
    {image: 'trend4.png', name: 'Pizza 4', size: 'S', sole: 'Soft', total: 15.49, number: 5,
    toppings: ['topping 1', 'topping 2', 'topping 7']
    },
    {image: 'trend5.png', name: 'Pizza 5', size: 'M', sole: 'Soft', total: 5.49, number: 2,
    toppings: ['topping 1', 'topping 8', 'topping 9']
    },
    {image: 'trend6.png', name: 'Pizza 6', size: 'L', sole: 'Crispy', total: 7.49, number: 3,
    toppings: []
    },
    {image: 'trend1.png', name: 'Pizza 1', size: 'S', sole: 'Soft', total: 5.49, number: 2,
    toppings: ['topping 1', 'topping 2', 'topping 3']
    },
    {image: 'trend2.png', name: 'Pizza 2', size: 'M', sole: 'Soft', total: 6.49, number: 2,
    toppings: ['topping 4', 'topping 5', 'topping 6']
    },
    {image: 'trend3.png', name: 'Pizza 3', size: 'L', sole: 'Crispy', total: 10.49, number: 3,
    toppings: ['topping 1', 'topping 2', 'topping 3', 'topping 4', 'topping 5', 'topping 6']
    },
]
export const PizzaCart = ()=>{
    return(
        <Card
        sx={{
            borderRadius: '24px',
            m: 3,
            paddingLeft: 5,
            paddingRight: 5
        }}
        >
            <Typography variant="h6"
                    sx={{
                        alignSelf: 'start',
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        margin: '20px'
                    }}
                >Pizzas
            </Typography>
            
            <Divider/>
            <List sx={{width: '100%', height: '90%', overflow: 'auto', 
            maxHeight: '1000px', backgroundColor: 'rgba(252, 237, 227, 0.3)', 
            }}>
            {
                pizzas.length > 0 ? 
                pizzas.map(pizza =>{
                    return(
                            <ListItem>
                                <PizzaCartItem pizza = {pizza}/>
                            </ListItem>
                    )
                })
                : 
                <Typography variant="h6"
                    sx={{
                        alignSelf: 'start',
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'center',
                        marginTop: '50px'
                    }}
                >You have not ordered any pizza.
            </Typography>
            }
            </List>
            <Divider/>
            <Button variant="contained" 
                    disabled = {pizzas.length === 0}
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
                Delete All
            </Button>
        </Card>
    )
}