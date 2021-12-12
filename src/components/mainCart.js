import React, { useState } from "react";
import {Box, Divider, IconButton, Stack, Typography, Card, List, ListItem, Chip} from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector} from "react-redux";
import { useNavigate } from "react-router";
import { ComboCard } from "./combo";
import AddRounded from "@mui/icons-material/AddRounded";
import { RemoveRounded } from "@mui/icons-material";
const round = (num)=> Math.round(num * 100) / 100;
export const PizzaCartItem = (props)=>{
    const _id = props.pizza._id;
    const pizzaId = props.pizza.pizzaId;
    const name = props.pizza.name;
    const image = props.pizza.image;
    const total = props.pizza.total;
    const number = props.pizza.number;
    const size = props.pizza.size;
    const sole = props.pizza.sole;
    const toppings = props.pizza.toppings;
    const allToppings = props.pizza.allToppings;
    const handleCartChange = props.handleCartChange;
    const navigate = useNavigate();
    const remove = ()=>{
        handleCartChange(_id);
    }
    return(
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            //maxHeight: '200px'
            boxShadow: '1px 1px 5px rgb(0,0,0,0.2)',
            backgroundColor:'white',
            borderRadius: {md: '200px 0px 150px 200px', sm: '10px', xs: '10px'},
            p: 1,
            minWidth: '300px'
        }}>
            <Box
            sx={{
                display: {md: 'block', sm: 'none', xs: 'none'}
            }}
            >
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
            </Box>
            <Stack
            sx={{
                display: 'flex',
                width: '90%',
                boxSizing: 'border-box',
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
                        fontSize: {md: '25px', sm: '20px', xs: '15px'},
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
                        fontSize: {md: '25px', sm: '20px', xs: '15px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        display: {md: 'block', sm: 'none', xs: 'none'}
                    }}
                    >Total: $ {total}
                    </Typography>
                        <IconButton
                        onClick={() =>{
                            console.log('pizzaID :' + pizzaId);
                            navigate("/pizza/" + pizzaId, 
                            {state: {
                                id: _id,
                                size: size,
                                sole: sole,
                                number: number,
                                total: total,
                                toppings: toppings
                            }}
                            )
                        }}
                        sx={{
                            width: {md: '40px', sm: '30px', xs: '20px'},
                            height: {md: '40px', sm: '30px', xs: '20px'},
                            backgroundColor: 'white',
                            boxShadow: '1px 1px 5px rgb(0,0,0,0.2)',
                            '&:hover, &:active':{
                                backgroundColor: 'white'
                            }
                        }}
                        >
                            <ModeEditIcon sx={{
                                width: {md: '30px', sm: '20px', xs: '15px'},
                                height: {md: '30px', sm: '20px', xs: '15px'},
                            }}/>
                        </IconButton>
                        <IconButton
                        sx={{
                            width: {md: '40px', sm: '30px', xs: '20px'},
                            height: {md: '40px', sm: '30px', xs: '20px'},
                            backgroundColor: 'white',
                            boxShadow: '1px 1px 5px rgb(0,0,0,0.2)',
                            '&:hover, &:active':{
                                backgroundColor: 'white'
                            }
                        }}
                        onClick={remove}
                        >
                            <DeleteIcon sx={{
                                width: {md: '30px', sm: '20px', xs: '15px'},
                                height: {md: '30px', sm: '20px', xs: '15px'},
                            }}/>
                            
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
                        fontSize: {md: '16px', sm: '14px', xs: '13px'},
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
                        fontSize: {md: '16px', sm: '14px', xs: '13px'},
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
                        fontSize: {md: '16px', sm: '14px', xs: '13px'},
                        lineHeight: '175%',
                        color: 'black',
                        textAlign: 'start',
                        marginBottom: '10px'
                    }}
                    >Number: {number}
                    </Typography>
                </Stack>
                <Typography variant="h6"
                    sx={{
                        marginRight: '20px',
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: {md: '25px', sm: '20px', xs: '15px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        display: {md: 'none', sm: 'block', xs: 'block'}
                    }}
                    >Total: $ {total}
                    </Typography>
                <Divider sx={{width: '50%'}}/>
                <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    //width: '90%',
                    //justifyContent: 'space-between'
                }}>

                    {
                        toppings.length > 0 ? toppings.map((toppingId)=>{
                            return <Chip label={allToppings[toppingId].topping_name} sx={{
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
export const ExtraCartItem = (props)=>{
    const name = props.extra.title;
    const image = props.extra.image_url;
    const price = props.extra.price;
    const extraId = props.extraId;
    const handleClick = props.handleClick;
    const [num, SetNum] = useState(props.number ? props.number : 1);
    return(
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            //maxHeight: '200px'
            boxShadow: '1px 1px 5px rgb(0,0,0,0.2)',
            backgroundColor:'white',
            borderRadius: {md: '200px 0px 150px 200px', sm: '10px', xs: '10px'},
            p: 1,
            minWidth: '300px',
            marginTop: '20px'
        }}>
            <Box
            sx={{
                display: {md: 'block', sm: 'none', xs: 'none'}
            }}
            >
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
            </Box>
            <Stack
            sx={{
                display: 'flex',
                width: '90%',
                boxSizing: 'border-box',
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
                        fontSize: {md: '25px', sm: '20px', xs: '15px'},
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
                        fontSize: {md: '25px', sm: '20px', xs: '15px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        display: {md: 'block', sm: 'none', xs: 'none'}
                    }}
                    >Total: $ {round(num * price)}
                    </Typography>
                        <IconButton
                        sx={{
                            width: {md: '40px', sm: '30px', xs: '20px'},
                            height: {md: '40px', sm: '30px', xs: '20px'},
                            backgroundColor: 'white',
                            boxShadow: '1px 1px 5px rgb(0,0,0,0.2)',
                            '&:hover, &:active':{
                                backgroundColor: 'white'
                            }
                        }}
                        onClick={() =>{
                            handleClick(extraId, true, false, num*price);
                        }}
                        >
                            <DeleteIcon sx={{
                                width: {md: '30px', sm: '20px', xs: '15px'},
                                height: {md: '30px', sm: '20px', xs: '15px'},
                            }}/>
                            
                        </IconButton>
                    </Stack>
                </Box>
                <Stack spacing={2} direction="row">
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: {md: '20px', sm: '16px', xs: '15px'},
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
                onClick = {()=>{
                    const newNum = (num === 1)? 1: num - 1;
                    if(num > 1)
                    handleClick(extraId, false, false, price, {
                        number: newNum,
                        total: round(newNum * price)
                    });
                    SetNum(newNum);
                }}
                sx={{
                    width: '40px',
                    height: '40px',
                    '&:hover, &:active':{
                        color: 'white'
                    }
                }}
                >
                    <RemoveRounded
                    
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
                onClick = {()=>{
                    const newNum = (num === 10) ? 10: num + 1;
                    if(num < 10)
                    handleClick(extraId, false, true, price, {
                        number: newNum,
                        total: round(newNum * price)
                    });
                    SetNum(newNum);
                }}
                sx={{
                    width: '40px',
                    height: '40px',
                    '&:hover, &:active':{
                        color: 'white'
                    }
                }}
                >
                    <AddRounded
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
                        marginRight: '20px',
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: {md: '25px', sm: '20px', xs: '15px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        display: {md: 'none', sm: 'block', xs: 'block'}
                    }}
                    >Total: $ {round(price * num)}
                    </Typography>
            </Stack>
        </Box>
    )
}

export const Cart = (props)=>{
    const categories = {
        'dessert':{
            selector: useSelector(state => state.desserts),
        },
        'drink':{
            selector: useSelector(state => state.drinks),
        },
        'vegetable':{
            selector: useSelector(state => state.vegetables),
        },
        'kid':{
            selector: useSelector(state => state.kids),
        },
        'appetizer':{
            
        }
    }
    const cart = useSelector(state => state.cart);
    const cartExtras = useSelector(state => state.cartExtras);
    const cartCombos = useSelector(state => state.cartCombos);
    const allPizzas = useSelector(state => state.pizzas.entities);
    const allCombos = useSelector(state => state.combos.entities);
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
                cart.ids.length > 0 ? 
                cart.ids.map((itemId) =>{
                    return(
                            <ListItem>
                                <PizzaCartItem pizza = {{...cart.entities[itemId], 
                                    name: allPizzas[cart.entities[itemId].pizzaId].title,
                                    image : allPizzas[cart.entities[itemId].pizzaId].image_url,
                                    allToppings : allPizzas[cart.entities[itemId].pizzaId].topping,
                                    _id: itemId
                                }} handleCartChange = {props.handleCartChange}/>
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
            <Divider sx={{marginBottom: 4}}/>
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
                >Others
            </Typography>
            <Divider/>
            <List sx={{width: '100%', height: '90%', overflow: 'auto', 
            maxHeight: '1000px', backgroundColor: 'rgba(252, 237, 227, 0.3)', p: {md: 3, sm: '5px', xs: '2px'}
            }}>
            {
                cartExtras.ids.length > 0 ? 
                cartExtras.ids.map((itemId) =>{
                    const cartItem = cartExtras.entities[itemId]
                    const extra = categories[cartItem.category].selector.entities[itemId]
                    return(
                            <ListItem>
                                <ExtraCartItem extra = {
                                    extra
                                } number={cartItem.number}
                                handleClick = {props.handleExtraChange} extraId={itemId}
                                />
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
                >You have not ordered any extra food.
            </Typography>
            }
            </List>
            <Divider sx={{marginBottom: 4}}/>
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
                >Combos
            </Typography>
            <Divider/>
            <List sx={{width: '100%', height: '90%', overflow: 'auto', 
            maxHeight: '1000px', backgroundColor: 'rgba(252, 237, 227, 0.3)', p: {md: 3, sm: '5px', xs: '2px'}
            }}>
                {
                cartCombos.ids.length > 0 ? 
                cartCombos.ids.map((itemId) =>{
                    return(
                            <ListItem>
                                <ComboCard add={false} combo={allCombos[itemId]} number = {cartCombos.entities[itemId].number}
                                handleClick = {props.handleComboChange} comboId={itemId}
                                />
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
                >You have not ordered any combo.
            </Typography>
            }
            </List>
            <Divider sx={{marginBottom: 4}}/>
        </Card>
    )
}