import { Box, Divider, Stack, Typography, Card, Button, List } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
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
            zIndex: 100,
            objectFit:'cover'
            }}
        />
        <Stack
        sx={{

            width: '100%',
            zIndex: 0,
            marginLeft: '10px'
        }}
        >
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
                    >{name}
                </Typography>
                
            <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
                paddingRight: '10px'
            }}
            >
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
                    ><strong style={{color: 'red'}}>x{' '}</strong>{number}
                </Typography>
                <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: '16px',
                        lineHeight: '175%',
                        color: 'black',
                        textAlign: 'start',
                        marginBottom: '10px',
                    }}
                    > {price} VND
                </Typography>
            </Box>
        </Stack>
    </Box>
    )
}

export const Cart = ()=>{
    const categories = {
        'dessert':{
            selector: useSelector(state => state.desserts.entities),
        },
        'drink':{
            selector: useSelector(state => state.drinks.entities),
        },
        'vegetable':{
            selector: useSelector(state => state.vegetables.entities),
        },
        'kid':{
            selector: useSelector(state => state.kids.entities),
        },
        'appetizer':{
            selector: useSelector(state => state.appetizers.entities),
        }
    }
    const cart = useSelector(state => state.cart);
    const cartExtras = useSelector(state => state.cartExtras);
    const cartCombos = useSelector(state => state.cartCombos);
    const pizzas = useSelector(state => state.pizzas.entities);
    const combos = useSelector(state => state.combos.entities);
    const navigate = useNavigate();
    const emptyCart = () =>{
        if (cart.ids.length > 0) return false;
        if (cartCombos.ids.length > 0) return false;
        const cates = Object.keys(categories)
        for(let i = 0; i< cates.length ;i++){
            if(cartExtras[cates[i]].ids.length > 0) return false;
        }
        return true;
    }
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
                >Giỏ hàng của tôi
            </Typography>
            
            <Divider variant="middle"/>
            <List sx={{width: '100%', height: '90%', overflow: 'auto', 
            maxHeight: '600px',  padding: '0 20px',
            minHeight: {md: '150px', sm: '50px', xs: '50px'}
            }}>
            
            {
                cart.ids && cart.ids.map(id =>{
                    const cartInfo = cart.entities[id]
                    const pizza = pizzas[cartInfo.pizzaId]
                    return pizza && cartInfo && (
                        <CartItem 
                        image={pizza.image_url} 
                        name={pizza.title}
                        number={cartInfo.number} 
                        price={cartInfo.total}
                        />
                    )
                })
            }
            
            {
            Object.keys(categories).map(category => 
            cartExtras[category] && cartExtras[category].ids && cartExtras[category].ids.length > 0 &&
            
                cartExtras[category].ids.map((itemId) =>{
                    const extra = categories[category].selector[itemId]
                    const cartInfo = cartExtras[category].entities[itemId]
                    return extra && cartInfo && (
                        <CartItem 
                            image = {extra.image_url}
                            name = {extra.title}
                            number = {cartInfo.number}
                            price = {cartInfo.total}
                        />
                    )
                })
            )}
            
            {
            cartCombos.ids && cartCombos.ids.map(id =>{
                    const cartInfo = cartCombos.entities[id]
                    const comboId = cartInfo.comboId;
                    const combo = combos[comboId];
                    return combo && cartInfo && (
                        <CartItem 
                        image={combo.image} 
                        name={combo.title}
                        number={cartInfo.number} 
                        price={cartInfo.total}
                        />
                    )
                })
            }
            {
                emptyCart()
                &&
                <Box sx = {{
                    marginTop: '30px'
                }}>
                <RemoveShoppingCartIcon sx={{
                    width: '50px', height: '50px'
                }}/>
                <Typography variant="h6"
                    sx={{
                        alignSelf: 'start',
                        fontFamily: 'be Vietnam',
                        fontWeight: 700,
                        fontSize: '16px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'center',
                        
                    }}
                >Giỏ hàng đang rỗng
                </Typography>
                </Box>
                
            }
            </List>
            <Divider variant="middle" />
            <Button variant="contained" 
                    onClick={()=>{navigate('/cart')}}
                    sx={{
                        backgroundColor: '#EA6A12',
                        borderRadius: '100px',
                        fontFamily: 'be Vietnam',
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
                Kiểm tra giỏ
            </Button>
        </Card>
    )
}