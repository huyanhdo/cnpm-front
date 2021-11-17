import { Box, Divider , IconButton, Rating, Stack, Typography} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
export const Category = (props)=>{
    const navigate = useNavigate();
    const image = props.image;
    const name = props.name;
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
            m: {md: 0, sm: 1, xs: 1}
        }}
        >
            <img
            src={image}
            alt={name}
            style={{
            borderRadius: '50%',
            width: '64px',
            height: '64px'
            }}
            />
            <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 600,
                        fontSize: '13px',
                        lineHeight: '175%',
                        color: hov? 'white': 'black',
                        textAlign: 'start'
                    }}
                    >{name}
            </Typography>
            <Divider variant="middle" 
            sx={{
                color: hov? 'white': 'rgba(234, 106, 18, 0.7)',
                width: hov? '51px': '32px',
                
            }}
            />
            <IconButton
            onClick = {()=>{
                navigate('/menu/' + category); 
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
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        color: 'black',
                        textAlign: 'start'
                    }}
                    >View all
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
    const name = props.name;
    const price = props.price;
    const rate = props.rate;
    const [hov, setHov] = useState(false);
    const switchHov = ()=>{
        setHov(prev => !prev);
    }
    return (
        <Box
        sx={{
            marginTop: '100px'
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
            maxWidth: '200px',
            maxHeight: '230px',
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
            transform: 'translateY(-25%)',
            width: '90%'
            }}
            />
            <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Poppins',
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
            <Stack
            direction='row'
            spacing={11}
            sx={{
                marginTop: '20px'
            }}
            >
                <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 600,
                        fontSize: '13px',
                        lineHeight: '175%',
                        color: hov? 'white': '#EA6A12',
                        textAlign: 'start'
                    }}
                    >$ {price}
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
            </Stack>
        </Box>
        </Box>
    )
}
export const Categories = ()=>{
    const categories = useSelector(state => state.categories);
    const pizzas = useSelector(state => state.pizzas);
    return(
    <Box sx = {{
        width: {md: '70%', sm: '100%', xs : '100%'}
    }}>
        <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: {md: '30px', sm: '20px', xs: '16px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start', 
                        m: 3
                    }}
                    >Menu categories
        </Typography>
    <Box
    sx={{
        display: 'flex',
        justifyContent: {md: 'space-evenly', sm: 'flex-start', xs: 'flex-start'},
        flexWrap: 'wrap',
    }}
    >
        {
            categories.ids.map(id =>{
                return <Category image={categories.entities[id].image} name={categories.entities[id].name} category={id}/>
            })
        }
    </Box>
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
                    >Newest 
        </Typography>
    <Box
    sx={{
        display: 'flex',
        justifyContent: {md: 'space-evenly', sm: 'flex-start', xs: 'space-evenly'},
        flexWrap: 'wrap',
    }}
    >
        {
            pizzas.ids.map((id, index) => {
                if(index < 4)
                return <PizzaCard image={pizzas.entities[id].image} name={pizzas.entities[id].name} rate={pizzas.entities[id].rate} 
                price={pizzas.entities[id].price[0]} link={`/product/${id}`}/>
            })
        }
    </Box>
    </Box>
    )
}