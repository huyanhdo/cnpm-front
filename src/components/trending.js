import AddCircleRounded from '@mui/icons-material/AddCircleRounded';
import { Divider, IconButton, Stack, Typography, Box } from '@mui/material';
import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
const label ={
    'kid':'Đồ cho bé',
    'pizza':'Pizza',
    'appetizer':'Khai vị',
    'vegetable':'Đồ chay',
    'drink':'Đồ uống',
    'dessert':'Tráng miệng'
}
export const Trending = (props)=>{
    const navigate = useNavigate();
    const order = props.order;
    const category = props.category;
    const [hov, setHov] = useState(false);
    const switchHov = ()=>{
        setHov(prev => !prev);
        console.log(order);
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
            marginRight: '5%',
            marginLeft: '2.5%'
        }}
        >
            <Stack spacing={1} sx={{minWidth: '150px'}}>
            <Typography variant="subtitle1"
                    sx={{
                        
                        fontFamily: 'be Vietnam',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        color: hov? 'white':'#EA6A12',
                        textAlign: 'start'
                    }}
                    >👑 {label[category]}
            </Typography>
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
                    >{order.title}
            </Typography>
            <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        color: hov? 'white': '#959895',
                        textAlign: 'start',
                        marginBottom: '20px'
                    }}
                    >{order.order_number} người đã gọi                 
            </Typography>
            <Divider variant="light"  sx={{
                width: '50%',
                color: hov?'white': 'rgb(0,0,0,0.5)'
            }}/>
            <Stack
            direction='row'
            spacing={1}
            sx={{
                marginTop: '20px'
            }}
            >
                <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: '13px',
                        lineHeight: '175%',
                        color: hov? 'white': '#EA6A12',
                        textAlign: 'start'
                    }}
                    >{order.price} VND
                </Typography>
                <IconButton
                size="small"
                sx={{
                width: '24px',
                height: '24px'
                }}
                onClick = {() =>{
                    navigate('/'+category+'/'+props.id)
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
            src={order.image_url}
            alt={order.title}
            style={{
            borderRadius: '100px',
            boxShadow: '-10px 0px 30px rgba(0, 0, 0, 0.1)',
            alignSelf: 'center',
            width: '160px',
            height: '160px',
            objectFit: 'cover'
            }}
            />
            
        </Box>
    )
}

export const TrendingList = ()=>{
    let categories = [
        {category: 'pizza', selector: useSelector(state => state.pizzas)},
        {category: 'vegetable', selector: useSelector(state => state.vegetables)},
        {category: 'kid', selector: useSelector(state => state.kids)},
        {category: 'dessert', selector: useSelector(state => state.desserts)},
        {category: 'appetizer', selector: useSelector(state => state.appetizers)},
        {category: 'drink', selector: useSelector(state => state.drinks)},
    ]
    categories.map((category) =>{
        const products = category.selector;
        const sortedIds = [...products.ids];
        sortedIds.sort((id1, id2) => products.entities[id2].order_number - products.entities[id1].order_number)
        category.mostOrder = products.entities[sortedIds[0]]
        category.mostId = sortedIds[0]
    })
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
                    >Được gọi nhiều nhất
        </Typography>
        </Box>
        <Box
        sx={{
            display: 'flex',
            flexWrap:'wrap'
        }}
        >
        {
            categories.map(category=>{
                return(
                    category.selector.fetchingStatus === 'SUCCESS' && <Trending order = {category.mostOrder} category = {category.category}
                    id= {category.mostId}
                    />
                )
            })
        }
        </Box>
        </Box>
    )
}