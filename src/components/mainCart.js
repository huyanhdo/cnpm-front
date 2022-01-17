import React, { useState } from "react";
import {Box, Divider, IconButton, Stack, Typography, Card, List, ListItem, Chip, Collapse} from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector} from "react-redux";
import { useNavigate } from "react-router";
import AddRounded from "@mui/icons-material/AddRounded";
import { ExpandLess, ExpandMore, RemoveRounded } from "@mui/icons-material";
const round = (num)=> Math.round(num * 100) / 100;
export const PizzaCartItem = (props)=>{
    const cartInfo = props.cartInfo
    const cartId = props.cartId
    const pizza = props.pizza
    const handleCartChange = props.handleCartChange;
    const navigate = useNavigate();
    const remove = ()=>{
        handleCartChange(cartId);
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
            src={pizza.image_url}
            alt={pizza.title}
            style={{
                borderRadius: '200px',
                width: '150px',
                height: '150px',
                boxShadow: '5px 0px 20px rgba(0, 0, 0, 0.1)',
                zIndex: 2,
                objectFit: 'cover'
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
                    >{pizza.title}
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
                    >Tổng tiền:  {cartInfo.total}VND
                    </Typography>
                        <IconButton
                        onClick={() =>{
                            navigate("/pizza/" + cartInfo.pizzaId, 
                            {state: {
                                id: cartId,
                                size: cartInfo.size,
                                sole: cartInfo.sole,
                                number: cartInfo.number,
                                total: cartInfo.total,
                                toppings: cartInfo.toppings
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
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: {md: '16px', sm: '14px', xs: '13px'},
                        lineHeight: '175%',
                        color: 'black',
                        textAlign: 'start',
                        marginBottom: '10px'
                    }}
                    >Cỡ: {pizza.size[cartInfo.size].type_detail}
                    </Typography>
                    <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: {md: '16px', sm: '14px', xs: '13px'},
                        lineHeight: '175%',
                        color: 'black',
                        textAlign: 'start',
                        marginBottom: '10px'
                    }}
                    >Đế: {pizza.type[cartInfo.sole]}
                    </Typography>
                    <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: {md: '16px', sm: '14px', xs: '13px'},
                        lineHeight: '175%',
                        color: 'black',
                        textAlign: 'start',
                        marginBottom: '10px'
                    }}
                    >Số lượng: {cartInfo.number}
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
                    >Tổng tiền: {cartInfo.total}đ
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
                        pizza.topping.map((topping, toppingId)=>{
                            return cartInfo.toppings[toppingId] && 
                            <Chip label={topping.topping_name} sx={{
                                margin: '5px 5px 5px 0',
                                fontFamily: 'be Vietnam'
                            }}/>
                        })
                        // : <Chip label='No Topping' sx={{
                        //     margin: '5px 5px 5px 0',
                        //     fontFamily: 'be Vietnam'
                        // }}/>
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
    const category = props.category;
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
                objectFit: 'cover'
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
                    >Tổng tiền:  {round(num * price)}VND
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
                            handleClick(category, extraId, true, false, num*price);
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
                        fontFamily: 'be Vietnam',
                        fontWeight: 700,
                        fontSize: {md: '20px', sm: '16px', xs: '15px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'center',
                    }}
                    >Số lượng: 
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
                    handleClick(category, extraId, false, false, price, {
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
                        fontFamily: 'be Vietnam',
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
                    handleClick(category, extraId, false, true, price, {
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
                    >Tổng tiền: {round(price * num)}VND
                    </Typography>
            </Stack>
        </Box>
    )
}
export const ComboMiniItem = (props) =>{
    const image = props.image;
    const title = props.title;
    return(
        <Box
        sx={{
            borderRadius: '25px',
            backgroundColor : 'rgba(252, 237, 227, 0.3)',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            width: '30%',
            margin: '10px'
        }}
        >
            <img
            src={image}
            alt={title}
            style={{
                borderRadius: '50px',
                width: '60px',
                height: '60px',
                objectFit: 'cover'
            }}
            />
            <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: {md: '16px', sm: '14px', xs: '13px'},
                        lineHeight: '175%',
                        color: 'black',
                        textAlign: 'start',
                        marginLeft: '10%'
                    }}
                    >{title}
            </Typography>
        </Box>
    )
}
export const ComboCartItem = (props)=>{
    const cartId = props.cartId;
    const cartInfo = props.cartInfo;
    const combo = useSelector(state => state.combos.entities[cartInfo.comboId])
    const handleComboChange = props.handleComboChange
    const [expand, setExpand] = useState(false);
    const categories = {
        'pizza':{
            number: combo.pizza ? combo.pizza : 0, slot: cartInfo.pizzaSlot, selector: useSelector(state => state.pizzas.entities)
        },
        'kid':{
            number: combo.kid ? combo.kid : 0, slot: cartInfo.kidSlot, selector: useSelector(state => state.kids.entities)
        },
        'vegetable':{
            number: combo.vegetable ? combo.vegetable : 0, slot: cartInfo.vegetableSlot, selector: useSelector(state => state.vegetables.entities)
        },
        'appetizer':{
            number: combo.appetizer ? combo.appetizer : 0, slot: cartInfo.appetizerSlot, selector: useSelector(state => state.appetizers.entities)
        },
        'dessert':{
            number: combo.dessert ? combo.dessert : 0, slot: cartInfo.dessertSlot, selector: useSelector(state => state.desserts.entities)
        },
        'drink':{
            number: combo.drink ? combo.drink : 0, slot: cartInfo.drinkSlot, selector: useSelector(state => state.drinks.entities)
        },
    }
    if(combo.free){
        categories['pizza'].number += combo.free.pizza ? combo.free.pizza : 0;
        categories['kid'].number += combo.free.kid ? combo.free.kid : 0;
        categories['vegetable'].number += combo.free.vegetable ? combo.free.vegetable : 0;
        categories['appetizer'].number += combo.free.appetizer ? combo.free.appetizer : 0;
        categories['dessert'].number += combo.free.dessert ? combo.free.dessert : 0;
        categories['drink'].number += combo.free.drink ? combo.free.drink : 0;
    }
    const navigate = useNavigate()
    return (
        <Box sx={{
            width: '100%',
            boxShadow: '1px 1px 5px rgb(0,0,0,0.2)',
            backgroundColor:'white',
            borderRadius: '10px',
            minWidth: '300px'
        }}>
            <Box sx= {{
                display: 'flex',
                width: '100%',
                p: 1,alignItems: 'center',
            }}>
            <Box
            sx={{
                display: {md: 'block', sm: 'none', xs: 'none'}
            }}
            >
            <img
            src={combo.image}
            alt={combo.title}
            style={{
                borderRadius: '10px',
                width: '150px',
                height: '150px',
                //boxShadow: '5px 0px 20px rgba(0, 0, 0, 0.1)',
                zIndex: 2,
                objectFit: 'cover'
            }}
            />
            
            </Box>
            <Stack
            sx={{
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
                    >{combo.title}
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
                    >Tổng tiền: {cartInfo.total}VND
                    </Typography>
                        <IconButton
                        onClick={() =>{
                            navigate("/combo/" + cartInfo.comboId, 
                            {state: {
                                cartId: cartId,
                                cartInfo: cartInfo
                            }})
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
                        onClick={() =>{
                            handleComboChange(cartId)
                        }}
                        >
                            <DeleteIcon sx={{
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
                        onClick={() =>{setExpand(prev => !prev)}}
                        >
                            {
                            !expand ?
                            <ExpandMore sx={{
                                width: {md: '30px', sm: '20px', xs: '15px'},
                                height: {md: '30px', sm: '20px', xs: '15px'},
                            }}/>
                            : <ExpandLess sx={{
                                width: {md: '30px', sm: '20px', xs: '15px'},
                                height: {md: '30px', sm: '20px', xs: '15px'},
                            }}/>
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
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: {md: '16px', sm: '14px', xs: '13px'},
                        lineHeight: '175%',
                        color: 'black',
                        textAlign: 'start',
                        marginBottom: '10px'
                    }}
                    >{combo.off > 0 ? combo.off + " %Off" : "Bonus"}
                    </Typography>
                    <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: {md: '16px', sm: '14px', xs: '13px'},
                        lineHeight: '175%',
                        color: 'black',
                        textAlign: 'start',
                        marginBottom: '10px'
                    }}
                    >Số lượng: {cartInfo.number}
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
                    >Tổng tiền: {cartInfo.total}VND
                </Typography>
                
            </Stack>
            </Box>
            
            <Collapse
                in={expand}
                >
                    <Divider sx ={{
                    margin: '0 20px'
                    }}/>
                    <Box
                    sx={{
                    //backgroundColor : 'rgba(252, 237, 227, 0.3)',
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    p: 3
                    }}
                    >
                        {
                            Object.values(categories).map(category =>{
                                if(!category.number) return false
                                const range = []
                                for(let i = 0; i < category.number;i++)range.push(i)
                                return range.map(i =>{
                                    const productId = category.slot[i].productId
                                    return productId && category.selector[productId] && <ComboMiniItem 
                                    image = {category.selector[productId].image_url}
                                    title = {category.selector[productId].title}/>
                                })
                            })
                        }
                    </Box>
            </Collapse>
        </Box>
    )
}
export const EmptyCart = () =>{
    return(
        <Box
        sx={{width: '100%'}}
        >
            <img
            src= 'pizza1.png'
            alt='empty cart'
            />
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
            selector: useSelector(state => state.appetizers),
        }
    }
    const cart = useSelector(state => state.cart);
    const cartExtras = useSelector(state => state.cartExtras);
    const cartCombos = useSelector(state => state.cartCombos);
    const allPizzas = useSelector(state => state.pizzas.entities);
    
    return (
        <Card
        sx={{
            m: 3,
            paddingLeft: '50px', paddingRight:'50px',
            borderRadius: '20px'
        }}
        >
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '50px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'center',
                        width: '100%',
                        marginTop: '50px',
                        marginBottom: '50px'
                    }}
                >Giỏ hàng của bạn
            </Typography>
            <Divider variant="middle"/>
            {
            cart.ids.length > 0 &&
            <Box sx = {{width: '100%'}}>
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
            <List sx={{
                backgroundColor: 'rgba(252, 237, 227, 0.3)',
                borderRadius: '10px', p: 3
            }}>
            { 
                cart.ids.map((itemId) =>{
                    const cartInfo = cart.entities[itemId]
                    const pizza = allPizzas[cart.entities[itemId].pizzaId]
                    return cartInfo && pizza &&(
                            <ListItem>
                                <PizzaCartItem 
                                cartInfo = {cartInfo}
                                pizza = {pizza}
                                cartId = {itemId}
                                handleCartChange = {props.handleCartChange}
                                />
                            </ListItem>
                    )
                })
            }
            </List>
            </Box>
            }
            {
            Object.keys(categories).map(category => 
            cartExtras[category].ids.length > 0 &&
            <Box sx={{width: '100%'}}>
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
                >{category.replace(/^\w/, (c) => c.toUpperCase())}s
            </Typography>
            <List sx={{
                backgroundColor: 'rgba(252, 237, 227, 0.3)',
                borderRadius: '10px', p: 3
            }}>
            {
                cartExtras[category].ids.map((itemId) =>{
                    const cartItem = cartExtras[category].entities[itemId]
                    const extra = categories[cartItem.category].selector.entities[itemId]
                    return extra && cartItem && (
                            <ListItem>
                                <ExtraCartItem 
                                category = {category}
                                extra = {extra} 
                                number={cartItem.number}
                                handleClick = {props.handleExtraChange} 
                                extraId={itemId}
                                />
                            </ListItem>
                    )
                })
            }
            </List>
            </Box>
            )}
            {
            cartCombos.ids.length > 0 &&
            <Box sx={{width: '100%'}}>
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
            <List sx={{
                backgroundColor: 'rgba(252, 237, 227, 0.3)',
                borderRadius: '10px',
                p: 3
            }}>
                {
                cartCombos.ids.map((cartId) =>{
                    return(
                            <ListItem>
                                <ComboCartItem cartId = {cartId} cartInfo = {cartCombos.entities[cartId]} handleComboChange = {props.handleComboChange}/>
                            </ListItem>
                    )
                })
            }
            </List>
            <Divider variant="middle" sx={{
                marginTop: '20px',
                marginBottom: '50px'
            }}/>
            </Box>
            }
            
        </Card>
    )
}