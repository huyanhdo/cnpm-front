import React, { useState } from 'react'
import {Box, Card, CardContent, CardMedia, Divider, IconButton, Stack, Typography, Modal, Checkbox, Button, Fade} from '@mui/material';
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { AddCircleRounded, InfoRounded, KeyboardArrowLeftRounded, KeyboardArrowRightRounded, SwapHorizontalCircleRounded } from '@mui/icons-material';
import { CustomPagination } from './pizzaMenu';
import { useNavigate, useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {itemAdded, itemUpdated} from '../store/cartComboSlice'
const label ={
    'kid':'đồ cho bé',
    'pizza':'pizza',
    'appetizer':'khai vị',
    'vegetable':'đồ chay',
    'drink':'đồ uống',
    'dessert':'tráng miệng'
}
const timeToDate = (time) =>{
    let date = new Date(time * 1000)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return year + '/' + month + '/' + day;   
}
export const ChooseCard = (props)=>{
    const navigate = useNavigate();
    const category = props.category;
    const slotId = props.slotId;
    const handleAdd = props.handleAdd;
    const handleClose = props.handleClose;
    const productId = props.productId;
    const image = props.image;
    let name = props.name;
    if(name.length > 20){
        name = name.substring(0, 15);
        name += '...';
    }
    const price = props.price;
    const [hov, setHov] = useState(false);
    const switchHov = ()=>{
        setHov(prev => !prev);
    }
    return (
        <Box
        sx={{
            marginTop: '100px',
            alignSelf: 'flex-end'
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
            width: '200px',
            height: '230px',
            borderRadius: '24px',
            p: 3,
            boxSizing: 'border-box',
            marginRight: {md: 0, sm: 2, xs: 2}
        }}
        >
            <img
            src={image}
            alt={name}
            style={{
            borderRadius: '50%',
            boxShadow: '0px 30px 30px rgba(234, 106, 18, 0.05)',
            alignSelf: 'center',
            marginTop: '-1000px',
            transform: 'translateY(-20px)',
            width: '150px', height: '150px',
            objectFit: 'cover'
            }}
            />
            <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: '16px',
                        lineHeight: '175%',
                        color: hov? 'white': 'black',
                        textAlign: 'start',
                        marginBottom: '10px'
                    }}
                    >{name}
            </Typography>
                <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: '13px',
                        lineHeight: '175%',
                        color: hov? 'white': '#EA6A12',
                        textAlign: 'start'
                    }}
                    >$ {price}
                </Typography>
                <Stack spacing={2} direction="row" sx={{alignSelf:"flex-end"}}>
                <IconButton
                size="small"
                sx={{
                width: '24px',
                height: '24px'
                }}
                onClick={() =>{
                    handleAdd(slotId, productId, price)
                    handleClose()
                }}
                >
                
                <AddCircleRounded
                    sx={{
                        color: hov ? 'white':'rgba(234, 106, 18, 0.7)',
                    }}
                />
                </IconButton>
                <IconButton
                size="small"
                sx={{
                width: '24px',
                height: '24px'
                }}
                onClick={() =>{
                    navigate('/' + category + '/' + productId)
                }}
                >
                
                <InfoRounded
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
export const ComboChooseModal = (props) =>{
    const menu = {
        'pizza': useSelector(state => state.pizzas),
        'kid': useSelector(state => state.kids),
        'drink': useSelector(state => state.drinks),
        'appetizer': useSelector(state => state.appetizers),
        'vegetable': useSelector(state => state.vegetables),
        'dessert': useSelector(state => state.desserts),
    }
    const handleAdd = props.handleAdd;
    const handleClose = props.handleClose;
    const category = props.category;
    const slotId = props.slotId;
    const max = 5;
    const ids = menu[category].ids;
    const products = menu[category].entities;
    const totalPage = Math.ceil(ids.length / max);
    const [page, setPage] = useState(1)
    
    return(
        <Modal open= {true} onClose={handleClose}>
            <Box
            sx={{
                borderRadius: '24px',
                backgroundColor: 'white',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                p: 4,
                boxShadow: 24,
                width: {md: '80%', sm: '80%', xs: '90%'},
            }}
            >
                <Typography
                    style={{
                        fontFamily: 'Fairplay Display',
                        fontWeight: 600,
                        fontSize: '40px',
                        lineHeight: '22.75px',
                        color: '#07143B',
                        textAlign: 'start',
                        margin: '20px'
                    }}
                    >Chọn {label[category]} 
            </Typography>
            <Box sx={{
                m: 1,
                p: 2,
                backgroundColor: 'rgba(252, 237, 227, 0.3)',
                display: 'flex',
                justifyContent: 'space-evenly',
                overflow: 'auto'
            }}>
            {
                ids
                .map((id, index) =>{
                    return (index >= (page - 1)*max && index < page * max) &&
                        
                            <ChooseCard image={products[id].image_url} name={products[id].title} price={products[id].price}
                            handleAdd = {handleAdd} category = {category} slotId = {slotId}
                            productId = {id} handleClose = {handleClose}
                            />
                        
                })
            }
            </Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
            }}>
            <CustomPagination variant="outlined" shape="rounded" count={totalPage}
            onChange={(event, value) => {setPage(value)}} size="large" page={page}
            />
            </Box>
            
            </Box>
        </Modal>
    )
}
export const AddSlot = (props) =>{
    const slotId = props.slotId;
    const category = props.category;
    const openModal = props.openModal;
    return(
        <Box
        sx={{
            borderRadius: '12px',
            borderColor: '#EA6A12',
            borderStyle: 'dashed',
            borderWidth: '2px',
            width: '100%',
            alignItems: 'center',
            m: 3,
            p: 3,
            backgroundColor: 'rgba(252, 237, 227, 0.3)'
        }}
        >
            <IconButton
                sx={{
                }}
                onClick={() => {openModal(slotId)}}
                >
                <AddCircleRounded
                    sx={{
                        width: '50px',
                        height: '50px',
                        color: 'rgba(234, 106, 18, 0.7)',
                    }}
                />
                </IconButton>
            <Typography
                    style={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 400,
                        fontSize: '20px',
                        lineHeight: '22.75px',
                        color: 'black',
                        textAlign: 'center',
                    }}
                    >Chọn {label[category]}
            </Typography>
        </Box>
    )
}
export const AddedExtra = (props) =>{
    const menu = {
        'pizza': useSelector(state => state.pizzas),
        'kid': useSelector(state => state.kids),
        'drink': useSelector(state => state.drinks),
        'appetizer': useSelector(state => state.appetizers),
        'vegetable': useSelector(state => state.vegetables),
        'dessert': useSelector(state => state.desserts),
    }
    const category = props.category;
    const slotId = props.slotId;
    const openModal = props.openModal;
    const productId = props.productId;
    const product = menu[category].entities[productId];
    return (
        <Box
        sx={{
            backgroundColor:'rgba(252, 237, 227, 0.3)',
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            p:3,
            m: 3
        }}
        >
            <Box 
            sx={{
                display: 'flex',
                flexWrap: 'wrap'
            }}
            >
            <Box
            sx={{
                display: {md: 'block', sm: 'none', xs: 'none'}
            }}
            >
            <img
            src={product.image_url}
            alt={product.title}
            style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover'
            }}
            />
            </Box>
            <Stack spacing = {2} sx={{
                marginLeft: {md: '50px', sm: 0, xs: 0}
            }}>
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'Fairplay Display',
                        fontWeight: 700,
                        fontSize: {md: '35px', sm: '25px', xs: '20px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        
                    }}
            >{product.title}
            </Typography>
            <Divider variant='middle' sx={{width: '50%'}}/>
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 700,
                        fontSize: {md: '25px', sm: '20px', xs: '20px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        
                    }}
            >{product.price}đ
            </Typography>
            </Stack>
            </Box>
            <IconButton
            onClick={() =>{
                openModal(slotId)
            }}
            >
                <SwapHorizontalCircleRounded
                    sx={{
                        width: '50px',
                        height: '50px',
                        color: 'rgba(234, 106, 18, 0.7)',
                    }}
                />
            </IconButton>
        </Box>
    )
}
export const AddedPizza = (props) =>{
    const slotId = props.slotId;
    const openModal = props.openModal;
    const productId = props.productId;
    const pizzaInfo = props.pizzaInfo;
    const handleChange = props.handleChange;
    const product = useSelector(state => state.pizzas.entities[productId]);
    return (
        <Box
        sx={{
            backgroundColor:'rgba(252, 237, 227, 0.3)',
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            p:3,
            m: 3
        }}
        >
            <Box 
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                width: {md: '90%', sm: '95%', xs: '95%'}
            }}
            >
                <Box
            sx={{
                display: {md: 'block', sm: 'none', xs: 'none'}
            }}
            >
            <img
            src={product.image_url}
            alt={product.title}
            style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover'
            }}
            />
            </Box>
            <Stack spacing = {2} sx={{
                marginLeft: {md: '50px', sm: 0, xs: 0},
                width: {md: '70%', sm: '100%', xs: '100%'}
            }}>
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
            }}
            >
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'Fairplay Display',
                        fontWeight: 700,
                        fontSize: {md: '35px', sm: '30px', xs: '25px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        
                    }}
                >{product.title}
                </Typography>
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 700,
                        fontSize: {md: '25px', sm: '20px', xs: '20px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        
                    }}
                >Giá: {pizzaInfo.price}VND
                </Typography>
            </Box>
            
            <Divider variant='middle' sx={{width: '50%'}}/>
            <Box
            sx={{
                display: 'flex',
                width: {md: '70%', sm: '90%', xs: '90%'},
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap'
            }}
            >
            <Stack spacing={1} direction='row'
                sx={{
                    alignItems: 'center'
                }}
                >
                <Typography variant="body1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 400,
                        fontSize: {md: '20px', sm: '15px', xs: '15px'},
                        lineHeight: '22.75px',
                        color: '#07143B',
                        textAlign: 'start'
                    }}
                    >Cỡ: 
                </Typography>
                <IconButton 
                onClick = {() =>{
                    const currentSize = pizzaInfo.size ? pizzaInfo.size : 0
                    const newSize = currentSize > 0 ? currentSize - 1: 0
                    const currentPrice = pizzaInfo.price;
                    const newPrice = currentPrice - product.size[currentSize].type_price + product.size[newSize].type_price
                    handleChange(slotId, {
                        productId: productId,
                        pizzaInfo:{
                            ...pizzaInfo,
                            size: newSize,
                            price: newPrice
                        }
                    })
                }}
                >
                    <KeyboardArrowLeftRounded/>
                </IconButton>
                <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Fairplay Display',
                        fontWeight: 600,
                        fontSize: {md: '20px', sm: '15px', xs: '15px'},
                        lineHeight: '175%',
                        color:'#07143B',
                        textAlign: 'start'
                    }}
                    >{product.size[pizzaInfo.size ? pizzaInfo.size: 0].type_detail}
                </Typography>
                <IconButton 
                onClick = {() =>{
                    const currentSize = pizzaInfo.size ? pizzaInfo.size : 0
                    const newSize = currentSize < product.size.length - 1 ? currentSize + 1: currentSize
                    const currentPrice = pizzaInfo.price;
                    const newPrice = currentPrice - product.size[currentSize].type_price + product.size[newSize].type_price
                    handleChange(slotId, {
                        productId: productId,
                        pizzaInfo:{
                            ...pizzaInfo,
                            size: newSize,
                            price: newPrice
                        }
                    })
                }}
                >
                    <KeyboardArrowRightRounded/>
                </IconButton>
                </Stack>
                <Stack spacing={1} direction="row"
                
                sx={{
                    alignItems: 'center'
                }}
                
                >
                <Typography variant="body1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 400,
                        fontSize: {md: '20px', sm: '15px', xs: '15px'},
                        lineHeight: '22.75px',
                        color: '#07143B',
                        textAlign: 'start'
                    }}
                    >Đế: 
                </Typography>
                <IconButton
                onClick = {() =>{
                    const currentType = pizzaInfo.type ? pizzaInfo.type : 0
                    const newType = 1 - currentType
                    handleChange(slotId, {
                        productId: productId,
                        pizzaInfo:{
                            ...pizzaInfo,
                            type: newType,
                        }
                    })
                }}
                >
                    <KeyboardArrowLeftRounded/>
                </IconButton>
                <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Fairplay Display',
                        fontWeight: 600,
                        fontSize: {md: '20px', sm: '15px', xs: '15px'},
                        lineHeight: '175%',
                        color:'#07143B',
                        textAlign: 'start'
                    }}
                    >{product.type[pizzaInfo.type ? pizzaInfo.type: 0].slice(0, 10)}
                </Typography>
                <IconButton 
                onClick = {() =>{
                    const currentType = pizzaInfo.type ? pizzaInfo.type : 0
                    const newType = 1 - currentType
                    handleChange(slotId, {
                        productId: productId,
                        pizzaInfo:{
                            ...pizzaInfo,
                            type: newType,
                        }
                    })
                }}
                >
                    <KeyboardArrowRightRounded/>
                </IconButton>
                </Stack>
            </Box>

            <Typography variant="body1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 400,
                        fontSize: {md: '20px', sm: '15px', xs: '15px'},
                        lineHeight: '22.75px',
                        color: '#07143B',
                        textAlign: 'start'
                    }}
                    >Toppings: 
            </Typography>
            <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
            }}
            >
                {
                    product.topping.map((top, index) =>
                        <Stack direction='row' spacing={3} sx={{width: {md: '70%', sm: '100%', xs: '100%'}, alignItems: 'center'}}>
                            <Checkbox 
                                sx={{
                                    '&.Mui-checked': {
                                    color: '#EA6A12',
                                    },
                                }}
                                checked = {pizzaInfo.topping ? pizzaInfo.topping[index] : false}
                                onChange={() =>{
                                    const currentTopping = pizzaInfo.topping ? pizzaInfo.topping : {}
                                    const newTopping = {
                                        ...currentTopping
                                    }
                                    newTopping[index] = currentTopping[index] === true? false : true
                                    const currentPrice = pizzaInfo.price;
                                    const newPrice = newTopping[index] ? currentPrice + top.topping_price : currentPrice - top.topping_price
                                    handleChange(slotId, {
                                        productId: productId,
                                        pizzaInfo:{
                                            ...pizzaInfo,
                                            topping: newTopping,
                                            price: newPrice
                                        }
                                    })
                                }}
                            />
                            <Typography variant="body1"
                            sx={{
                            fontFamily: 'be Vietnam',
                            fontWeight: 700,
                            fontSize: '15px',
                            lineHeight: '22.75px',
                            color: '#07143B',
                            textAlign: 'start'
                            }}
                            >{top.topping_name} - {top.topping_price}đ
                            </Typography>
                        </Stack>    
                    )
                }
            </Box>
            </Stack>
            </Box>
            <IconButton
            onClick={() =>{
                openModal(slotId)
            }}
            >
                <SwapHorizontalCircleRounded
                    sx={{
                        width: '50px',
                        height: '50px',
                        color: 'rgba(234, 106, 18, 0.7)',
                    }}
                />
            </IconButton>
        </Box>
    )
}
export const CustomProduct = (props) =>{
    const number = props.number;
    const category = props.category;
    const slot = props.slot;
    const handleAdd = props.handleAdd;
    const offset = props.offset ? props.offset : 0;
    const [open, setOpen] = useState(false);
    const [openSlot, setOpenSlot] = useState(-1);
    const openModal = (id) =>{
        setOpen(true)
        setOpenSlot(id)
    }
    const range = [];
    for(let i=offset;i<offset + number;i++)range.push(i);
    return (
        <Box
        sx={{
            width: '100%'
        }}
        >
            <Divider variant='middle'/>
            <Typography
                    style={{
                        fontFamily: 'Fairplay Display',
                        fontWeight: 1000,
                        fontSize: '30px',
                        lineHeight: '22.75px',
                        color: '#07143B',
                        textAlign: 'start',
                        marginTop: '50px',
                        marginLeft: '20px'
                    }}
                    >{label[category]} x{number}
            </Typography>
            <Box sx={{alignItems: 'center', display: 'flex', flexWrap: 'wrap'}}>
                {
                    range.map(i => slot[i] ? category !== 'pizza'?
                    <AddedExtra category={category} slotId = {i} productId={slot[i].productId} openModal = {openModal}/> 
                    : <AddedPizza slotId = {i} productId={slot[i].productId} openModal = {openModal}
                    handleChange = {props.handleChange} pizzaInfo = {slot[i].pizzaInfo}
                    /> 
                    :<AddSlot 
                    category={category} slotId = {i} 
                    openModal={openModal}/>)
                }
            </Box>
            {
                open && <ComboChooseModal
                category = {category}
                slotId = {openSlot}
                handleClose = {() =>{setOpen(false)}}
                handleAdd = {handleAdd}
                />
            }
        </Box>
    )
}
const round = (num)=> Math.round(num * 100) / 100;
export const SingleCombo = () =>{
    
    const location = useLocation();
    const cartId = location.state ? location.state.cartId: -1;
    const cartInfo = location.state ? location.state.cartInfo: {};
    const {comboId} = useParams();
    const combo = useSelector(state => state.combos.entities[comboId]);
    const [kidSlot, setKidSlot] = useState(cartId >= 0 ? cartInfo.kidSlot: {})
    const [drinkSlot, setDrinkSlot] = useState(cartId >= 0 ? cartInfo.drinkSlot: {})
    const [vegetableSlot, setVegetableSlot] = useState(cartId >= 0 ? cartInfo.vegetableSlot: {})
    const [appetizerSlot, setAppetizerSlot] = useState(cartId >= 0 ? cartInfo.appetizerSlot: {})
    const [dessertSlot, setDessertSlot] = useState(cartId >= 0 ? cartInfo.dessertSlot: {})
    const [pizzaSlot, setPizzaSlot] = useState(cartId >= 0 ? cartInfo.pizzaSlot: {})
    const extras = [
        {category: 'kid', number: combo.kid, slot: kidSlot, setSlot: setKidSlot},
        {category: 'drink', number: combo.drink, slot: drinkSlot, setSlot: setDrinkSlot},
        {category: 'vegetable', number: combo.vegetable, slot: vegetableSlot, setSlot: setVegetableSlot},
        {category: 'appetizer', number: combo.appetizer, slot: appetizerSlot, setSlot: setAppetizerSlot},
        {category: 'dessert', number: combo.dessert, slot: dessertSlot, setSlot: setDessertSlot},
    ]
    let proNum = combo.pizza;
    extras.map(extra => proNum += extra.number ? extra.number : 0)
    if(combo.free){
        extras[0].freeNumber = combo.free.kid ? combo.free.kid: 0;
        extras[1].freeNumber = combo.free.drink ? combo.free.drink: 0;
        extras[2].freeNumber = combo.free.vegetable ? combo.free.vegetable: 0;
        extras[3].freeNumber = combo.free.appetizer ? combo.free.appetizer: 0;
        extras[4].freeNumber = combo.free.dessert ? combo.free.dessert: 0;
        proNum += combo.free.pizza ? combo.free.pizza : 0;
        extras.map(extra => proNum += extra.freeNumber)
    }
    
    const initTotal = cartId >= 0 ? round((cartInfo.total * 100 / (100 - combo.off)) / cartInfo.number) : 0
    const [total, setTotal] = useState(initTotal);
    const [num, setNum] = useState(cartId >= 0 ? cartInfo.number :1);
    const [filled, setFilled] = useState(cartId >= 0 ? proNum: 0);
    const [done, setDone] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(Date.now()/ 1000)
    console.log(combo.end)
    const valid = Date.now() / 1000 >= combo.start && Date.now() / 1000 <= combo.end
    return valid? (
        <Box sx ={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
            marginBottom: '100px'
        }}>
            <Card sx = {{
                width: {md: '85%', sm: '95%', xs: '95%'}
            }}>
                <CardMedia 
                component= "img"
                height = '400px'
                image = {combo.banner}
                alt = {combo.title}
                />
                <CardContent>
                <Box
        sx={{
            backgroundColor:'rgba(252, 237, 227, 0.3)',
            display: 'flex',
            borderRadius: '24px',
            justifyContent: {md: 'flex-start', sm:'center', xs: 'center'},
            alignItems: 'center',
            p: {md: 5, sm: 2, xs: 1},
            m: {md: 5, sm: 2, xs: 1},
            flexWrap: {xs: 'wrap',sm: 'wrap', md: 'nowrap'}
        }}
        >
            <img
            src={combo.image}
            alt={combo.title}
            style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            objectFit: 'cover'
            }}
            />
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginLeft: {md: '10%', sm: 0, xs: 0},
            }}>
            <Stack spacing={2}
            sx={{
                width: '100%',
                marginTop: {md: 0, sm: '50px', xs: '50px'}
            }}>
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'Fairplay Display',
                        fontWeight: 700,
                        fontSize: '35px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        
                    }}
                    >{combo.title}
                </Typography>
                <Typography
                    style={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 400,
                        fontSize: '15px',
                        lineHeight: '22.75px',
                        color: '#EA6A12',
                        textAlign: 'start',
                        maxWidth: '80%',
                        maxHeight: '65px',
                        overflow: 'hidden'
                    }}
                    >{combo.subtitle}
                </Typography>
                <Divider sx = {{maxWidth: '50%'}}/>
                <Stack spacing={1}>
                <Typography
                    style={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 1000,
                        fontSize: '15px',
                        lineHeight: '22px',
                        color: '#07143B',
                        textAlign: 'start',
                        maxWidth: '80%',
                        maxHeight: '65px',
                        overflow: 'hidden'
                    }}
                    >{timeToDate(combo.start)} - {timeToDate(combo.end)}
                </Typography>
                {
                    combo.off > 0 &&
                <Typography
                    style={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 1000,
                        fontSize: '15px',
                        lineHeight: '22px',
                        color: '#07143B',
                        textAlign: 'start',
                        maxWidth: '80%',
                        maxHeight: '65px',
                        overflow: 'hidden',
                        display: {md: 'none', sm: 'block', xs: 'block'}
                    }}
                    >{combo.off}% Off
                </Typography>
                }
                <Typography
                    style={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 400,
                        fontSize: '15px',
                        lineHeight: '22.75px',
                        color: '#EA6A12',
                        textAlign: 'start',
                        maxWidth: '80%',
                        maxHeight: '65px',
                        overflow: 'hidden'
                    }}
                    >{combo.description}
                </Typography>
                <Typography
                    style={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 400,
                        fontSize: '15px',
                        lineHeight: '22.75px',
                        color: '#EA6A12',
                        textAlign: 'start',
                        maxWidth: '80%',
                        maxHeight: '65px',
                        overflow: 'hidden'
                    }}
                    >{combo.persons} người
                </Typography>
                </Stack>
            </Stack>

            <Box
            sx={{
                borderRadius: '50%',
                boxSizing: 'border-box',
                width: '150px', height: '110px',
                backgroundColor: 'rgba(252, 237, 227)',
                justifyContent: 'center',
                alignItems: 'center',
                display: {md: 'flex', sm: 'none', xs: 'none'}
                //boxShadow: '1px 1px 5px black'
            }}
            >
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'Fairplay Display',
                        fontWeight: 1000,
                        fontSize: '35px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'center',
                        textOverflow: 'ellipsis'
                    }}
                    >{combo.off > 0 ? `-${combo.off}%`: "Bonus"}
                </Typography>
            </Box>
            </Box>
                </Box>
                {
                    (combo.pizza && combo.pizza > 0) && 
                    <CustomProduct 
                    category="pizza" number={combo.pizza}
                    slot = {pizzaSlot}
                    handleAdd = {(slotId, productId, price) =>{
                        setPizzaSlot(prev =>{
                            let New = {...prev}
                            if(!prev[slotId]) setFilled(prev => prev + 1)
                            const currentPrice = prev[slotId] && prev[slotId].pizzaInfo && prev[slotId].pizzaInfo.price? 
                            prev[slotId].pizzaInfo.price : 0;
                            setTotal(prev => prev - currentPrice + price)
                            delete New[slotId]
                            New[slotId] = {productId: productId, pizzaInfo: {
                                price: price, 
                                size: 0,
                                type: 0,
                                topping: {}
                            }}
                            return New
                        })
                    }}
                    handleChange = {(slotId, newPizza) =>{
                        setPizzaSlot(prev =>{
                            let New = {...prev}
                            const currentPrice = prev[slotId] && prev[slotId].pizzaInfo && prev[slotId].pizzaInfo.price? 
                            prev[slotId].pizzaInfo.price : 0;
                            setTotal(prev => prev - currentPrice + newPizza.pizzaInfo.price)
                            New[slotId] = newPizza
                            return New
                        })
                    }}
                    />
                }
                {
                    extras.map(extra =>{
                        return extra.number && extra.number > 0 && 
                        <CustomProduct
                        number = {extra.number} category = {extra.category} slot = {extra.slot}
                        handleAdd = {(slotId, productId, price) =>{
                            extra.setSlot(prev =>{
                                let New = {...prev}
                                if(!prev[slotId]) setFilled(prev => prev + 1)
                                const currentPrice = prev[slotId] && prev[slotId].price? 
                                prev[slotId].price : 0;
                                setTotal(prev => prev - currentPrice + price)
                                New[slotId] = {productId: productId, price: price}
                                return New
                            })
                        }}
                        />
                    })
                }
                {
                    combo.free &&
                    <Box sx={{
                        width: '100%'
                    }}>
                    <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Fairplay Display',
                        fontWeight: 600,
                        fontSize: '35px',
                        lineHeight: '175%',
                        color: '#07143B',
                        textAlign: 'start',
                        marginBottom: '10px',
                        m: 3
                    }}
                    >Bonus (100% miễn phí)
                    </Typography>
                    {
                        combo.free.pizza && combo.free.pizza > 0 && 
                        <CustomProduct 
                        category="pizza" number={combo.free.pizza}
                        slot = {pizzaSlot}
                        offset = {combo.pizza}
                        handleAdd = {(slotId, productId, price) =>{
                            setPizzaSlot(prev =>{
                                let New = {...prev}
                                if(!prev[slotId]) setFilled(prev => prev + 1)
                                delete New[slotId]
                                New[slotId] = {productId: productId, pizzaInfo: {
                                    price: 0, 
                                    size: 0,
                                    type: 0,
                                    topping: {}
                                }}
                                return New
                            })
                        }}
                        handleChange = {(slotId, newPizza) =>{
                            setPizzaSlot(prev =>{
                                let New = {...prev}
                                New[slotId] = newPizza
                                return New
                            })
                        }}
                        />
                    }
                    {
                    extras.map(extra =>{
                        return extra.freeNumber && extra.freeNumber > 0 && 
                        <CustomProduct
                        number = {extra.freeNumber} category = {extra.category} slot = {extra.slot}
                        offset = {extra.number}
                        handleAdd = {(slotId, productId, price) =>{
                            extra.setSlot(prev =>{
                                let New = {...prev}
                                if(!prev[slotId]) setFilled(prev => prev + 1)
                                New[slotId] = {productId: productId, price: 0}
                                return New
                            })
                        }}
                        />
                    })
                    }
                    </Box>
                }
                <Divider variant='middle'/>
                <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    p: 5,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}
                > 
                <Stack direction= "row"
                spacing={5}
                sx={{
                alignItems: 'center',
                }}
                >
                    <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Fairplay Display',
                        fontWeight: 600,
                        fontSize: '35px',
                        lineHeight: '175%',
                        color: '#07143B',
                        textAlign: 'start',
                        marginBottom: '10px'
                    }}
                    >Số lượng: 
                </Typography>
                <IconButton
                sx={{
                    width: '40px',
                    height: '40px',
                    '&:hover, &:active':{
                        color: 'white'
                    }
                }}
                onClick = {()=>{setNum(prev => (prev === 1)? 1: prev - 1)}}
                >
                    <KeyboardArrowLeftRounded
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
                onClick = {()=>{setNum(prev => (prev === 10)? 10: prev + 1)}}
                sx={{
                    width: '40px',
                    height: '40px',
                    '&:hover, &:active':{
                        color: 'white'
                    }
                }}
                >
                    <KeyboardArrowRightRounded
                    sx={{
                        color: 'rgba(234, 106, 18, 0.7)',
                        width: '40px',
                        height: '40px'
                    }}
                    />
                </IconButton>
                </Stack>  
                <Stack spacing={1} direction='row'>
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'Fairplay Display',
                        fontWeight: 1000,
                        fontSize: '35px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'center',
                        textOverflow: 'ellipsis'
                    }}
                    >Tổng tiền: {round(total* num *(100 - combo.off) / 100)} VND
                    </Typography>
                    {
                    combo.off > 0 &&
                    <Typography variant="h6"
                    sx={{
                        fontFamily: 'Fairplay Display',
                        fontWeight: 500,
                        fontSize: '25px',
                        lineHeight: '52px',
                        color: '#EA6A12',
                        textAlign: 'center',
                        textOverflow: 'ellipsis',
                        textDecoration: 'line-through'
                    }}
                    >({round(total * num)} vnd)
                    </Typography>
                    }
                </Stack>
                </Box>
                <Button variant="contained" 
                    disabled={filled < proNum}
                    sx={{
                        backgroundColor: '#EA6A12',
                        borderRadius: '100px',
                        //maxWidth: '150px',
                        fontFamily: 'be Vietnam',
                        fontWeight: 'normal',
                        fontSize: '15px',
                        lineHeight: '175%',
                        color: 'white',
                        '&:hover, &:active':{
                            backgroundColor: '#f57c00'
                        },
                        marginTop: 3
                    }}
                    onClick = {() =>{
                        if(cartId >= 0){
                            dispatch(itemUpdated({
                                id: cartId,
                                data:{
                                    comboId: comboId,
                                    pizzaSlot: pizzaSlot,
                                    kidSlot: kidSlot,
                                    vegetableSlot: vegetableSlot,
                                    appetizerSlot: appetizerSlot,
                                    dessertSlot: dessertSlot,
                                    drinkSlot: drinkSlot,
                                    number: num,
                                    total: round(total* num *(100 - combo.off) / 100)
                                }
                            }))
                        }
                        else dispatch(itemAdded({
                            comboId: comboId,
                            pizzaSlot: pizzaSlot,
                            kidSlot: kidSlot,
                            vegetableSlot: vegetableSlot,
                            appetizerSlot: appetizerSlot,
                            dessertSlot: dessertSlot,
                            drinkSlot: drinkSlot,
                            number: num,
                            total: round(total* num *(100 - combo.off) / 100)
                        }))
                        setDone(true)
                    }}
                    >
                        {cartId >= 0 ? "Cập nhập giỏ hàng" : "Thêm vào giỏ hàng"}
                </Button>
                <Modal open={done} >
            <Fade in={done} timeout={500}>
            <Stack
            spacing={3}
            sx={{
                backgroundColor: 'white',
                borderRadius: '24px',
                width: '500px',
                p: 5,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                alignItems: 'center'
            }}
            >
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '20px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'center',
                    }}
                    >Đã cập nhập giỏ hàng của bạn
                </Typography>
                <Stack direction="row" spacing={5}>
                <Button variant="contained" 
                    onClick = {()=>{
                        setDone(false);
                    }}
                    sx={{
                        backgroundColor: '#EA6A12',
                        borderRadius: '100px',
                        //maxWidth: '150px',
                        fontFamily: 'be Vietnam',
                        fontWeight: 'normal',
                        fontSize: '15px',
                        lineHeight: '175%',
                        color: 'white',
                        height: '45px',
                        '&:hover, &:active':{
                            backgroundColor: '#f57c00'
                        },
                        marginBottom: 2
                    }}
                    >
                        Xong
                </Button>
                <Button variant="contained" 
                    onClick = {()=>{
                        navigate('/cart');
                    }}
                    sx={{
                        backgroundColor: '#EA6A12',
                        borderRadius: '100px',
                        //maxWidth: '150px',
                        height: '45px',
                        fontFamily: 'be Vietnam',
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
                        Xem giỏ hàng
                </Button>
                </Stack>
                
                </Stack>
                </Fade>
                </Modal>
                </CardContent>
            </Card>
        </Box>
    ):(
        <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Fairplay Display',
                        fontWeight: 600,
                        fontSize: '35px',
                        lineHeight: '175%',
                        color: '#07143B',
                        textAlign: 'start',
                        marginBottom: '10px',
                        m: 3
                    }}
                    >Combo này đã hết hạn hoặc có lỗi xảy ra
                    </Typography>
    )
}