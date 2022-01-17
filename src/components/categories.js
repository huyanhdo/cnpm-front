import { Box, Divider , IconButton, Rating, Stack, Typography,} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Category = (props)=>{
    const label ={
        'Kid':'Đồ cho bé',
        'Pizza':'Pizza',
        'Appetizer':'Khai vị',
        'Vegetable':'Đồ chay',
        'Drink':'Đồ uống',
        'Dessert':'Tráng miệng'
    }
    const navigate = useNavigate();
    const category = props.category;
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
            borderRadius: '24px',
            marginRight: {md: '20px', sm: '10px', xs: '10px'},
            marginBottom: '10px'
        }}
        >
            <img
            src={category.image}
            alt={category.name}
            style={{
            borderRadius: '50%',
            width: '64px',
            height: '64px'
            }}
            />
            <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: '13px',
                        lineHeight: '175%',
                        color: hov? 'white': 'black',
                        textAlign: 'start'
                    }}
                    >{label[category.name]  }
            </Typography>
            <Divider variant="middle" 
            sx={{
                color: hov? 'white': 'rgba(234, 106, 18, 0.7)',
                width: hov? '51px': '32px',
                
            }}
            />
            <IconButton
            onClick = {()=>{
                navigate(category.menuLink); 
            }}
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
                        fontFamily: 'be Vietnam',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        color: 'black',
                        textAlign: 'start'
                    }}
                    >Xem tất cả
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
    const navigate = useNavigate();
    const link = props.link;
    const image = props.image;
    let name = props.name;
    if(name.length > 20){
        name = name.substring(0, 15);
        name += '...';
    }
    const price = props.price;
    const rate = props.rate;
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
        onClick={()=>{navigate(link)}}
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
            <Rating value={rate} readOnly
            sx={{
                color: hov? 'white':'#EA6A12',
            }}
            icon={<StarRoundedIcon/>}
            emptyIcon={<StarRoundedIcon/>}
            />
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: '20%'
            }}>
                <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: '13px',
                        lineHeight: '175%',
                        color: hov? 'white': '#EA6A12',
                        textAlign: 'start'
                    }}
                    >{price} VND
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
            </Box>
        </Box>
        </Box>
    )
}
export const Categories = ()=>{
    const categories = [
        {name: 'Pizza', image: '/pizza1.png', menuLink : '/menu/pizza'},
        {name: 'Vegetable', image: '/vegetable.png', menuLink : '/menu/vegetable'},
        {name: 'Kid', image: '/sweet.png', menuLink : '/menu/kid'},
        {name: 'Dessert', image: '/trend1.png', menuLink : '/menu/dessert'},
        {name: 'Appetizer', image: '/trend2.png', menuLink : '/menu/appetizer'},
        {name: 'Drink', image: '/trend3.png', menuLink : '/menu/drink'},
    ]

    return(
    <Box sx = {{
        width: '100%'
    }}>
        <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: {md: '30px', sm: '20px', xs: '16px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start', 
                        m: 3,
                        
                    }}
                    >Danh mục các món
        </Typography>
    <Box
    sx={{
        display: 'flex',
        flexWrap: 'wrap',
        paddingLeft: '5%'
    }}
    >
        {
            categories.map(category =>{
                return <Category category={category}/>
            })
        }
    </Box>
    
    </Box>
    )
}
export const Newest = () =>{
    const pizzas = useSelector(state => state.pizzas);
    const fetchingStatus = pizzas.fetchingStatus;

    let sortedIds = [...pizzas.ids];
    if(fetchingStatus === 'SUCCESS')
    sortedIds.sort((id1, id2)=> pizzas.entities[id2].rating - pizzas.entities[id1].rating)
    return fetchingStatus === 'SUCCESS' && (
        <Box sx = {{
            width: '100%'
        }}>
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: {md: '30px', sm: '20px', xs: '16px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        m:3
                    }}
                    >Đánh giá tốt nhất
        </Typography>
    <Box
    sx={{
        display: 'flex',
        justifyContent: {md: 'space-evenly', sm: 'flex-start', xs: 'space-evenly'},
        flexWrap: 'wrap',
    }}
    >
        {
            sortedIds.map((id, index) => {
                return (index < 4) && <PizzaCard image={pizzas.entities[id].image_url} name={pizzas.entities[id].title} rate={pizzas.entities[id].rating} 
                price={pizzas.entities[id].price} link={`/pizza/${id}`}/>
            })
        }
    </Box>
        </Box>
    )
}