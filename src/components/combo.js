import { Button, Stack, Typography, Box, IconButton, Divider , Collapse, Tabs, Modal, Fade, Grow} from '@mui/material';
import React, { useState } from 'react';
import {ExpandLess, ExpandMore, AddRounded, RemoveRounded} from '@mui/icons-material';
import AddCircleRounded from '@mui/icons-material/AddCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import {CustomTab} from './pizzaMenu';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { itemAdded } from '../store/cartComboSlice';
import { CustomPagination } from './pizzaMenu';
const round = (num)=> Math.round(num * 100) / 100;
export const ComboPizzaItem = (props) =>{
    const item = props.item;
    const [expand, SetExpand] = useState(false);
    const allToppings = useSelector(state => state.toppings.entities);
    const pizza = useSelector(state => state.pizzas.entities[item.pizzaId]);
    return (
        <Box
        sx={{
            width: {md: '45%', sm: '95%', xs: '100%'},
            marginTop: '20px',
            marginBottom: '20px',
            marginLeft: {md: '10px', sm: '20px', xs: '20px'},
            marginRight: {md: '10px', sm: '5px', xs: '5px'},
        }}
        >
        <Box
        onClick = {()=>{
            SetExpand(prev => !prev)
        }}
        sx={{
            backgroundColor: 'white',
            boxShadow: '0 1px 5px rgb(0,0,0,0.5)',
            borderRadius: '50px',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '5px',
            alignItems: 'center',
            height: '50px', 
            position: 'relative',
            zIndex: 100
        }}
        >
            <img
            src={pizza.image}
            alt={pizza.name}
            style={{
                borderRadius: '200px',
                width: '80px',
                height: '80px',
                transform: 'translateX(-20px)',
                zIndex: 2
            }}
            />
            <Stack direction="row">
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: {md: '15px', sm: '13px', xs: '12px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        marginLeft: {md: '20px', sm: '5px', xs: '2px'}
                    }}
                >{pizza.name}
            </Typography>
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: {md: '15px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        marginLeft: {md: '20px'},
                        display: {md: 'block', sm: 'none', xs: 'none'}
                    }}
                >(See more)
            </Typography>
            </Stack>
            <Box sx={{
                borderRadius: '50px',
                width: '45px', height: '45px',
                backgroundColor: 'rgba(234, 106, 18, 0.2)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: {md: '15px', sm: '15px', xs: '13px'},
                        lineHeight: '52px',
                        color: 'rgba(234, 106, 18, 1)',
                        textAlign: 'center',
                    }}
                >x {item.number}
            </Typography>
            </Box>
        </Box> 
        {
        <Collapse in = {expand} unmountOnExit style={{zIndex: 0, position: 'relative'}}>
            <Box sx={{width: '98%', borderRadius: '0 0 24px 24px', backgroundColor: 'white', paddingLeft: '10%'
            }}>
            <Stack direction="row" spacing={5}>
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: {md: '15px', sm: '15px', xs: '13px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                    }}
                >Size: {item.size}
            </Typography>
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: {md: '15px', sm: '15px', xs: '13px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                    }}
                >Sole: {item.sole}
            </Typography>
            </Stack>
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: {md: '15px', sm: '15px', xs: '13px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                    }}
                >Toppings: {
                    item.availableToppings.map((toppingId) => allToppings[toppingId].name + ',  ')
                }
            </Typography>
            </Box>
        </Collapse>   
        }
        </Box>
    )
}
export const ComboExtraItem = (props) =>{
    const item = props.item;
    const extra = useSelector(state => state.extras.entities[item.extraId]);
    return(
        <Box
        sx={{
            width: {md: '45%', sm: '95%', xs: '100%'},
            marginTop: '20px',
            marginBottom: '20px',
            marginLeft: {md: '10px', sm: '20px', xs: '20px'},
            marginRight: {md: '10px', sm: '5px', xs: '5px'},
        }}
        >
            <Box
        sx={{
            backgroundColor: 'white',
            boxShadow: '0 1px 5px rgb(0,0,0,0.5)',
            borderRadius: '50px',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '5px',
            alignItems: 'center',
            height: '50px', 
            position: 'relative',
            zIndex: 100
        }}
        >
            <img
            src={extra.image}
            alt={extra.name}
            style={{
                borderRadius: '200px',
                width: '80px',
                height: '80px',
                transform: 'translateX(-20px)',
                zIndex: 2
            }}
            />
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: {md: '15px', sm: '13px', xs: '12px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        marginLeft: {md: '20px', sm: '5px', xs: '2px'}
                    }}
                >{extra.name}
            </Typography>
            <Box sx={{
                borderRadius: '50px',
                width: '45px', height: '45px',
                backgroundColor: 'rgba(234, 106, 18, 0.2)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: {md: '15px', sm: '15px', xs: '13px'},
                        lineHeight: '52px',
                        color: 'rgba(234, 106, 18, 1)',
                        textAlign: 'center',
                    }}
                >x {item.number}
            </Typography>
            </Box>
        </Box> 
        </Box>
    )
}
export const ComboCard = (props) =>{
    const handleClick = props.handleClick;
    const comboId = props.comboId;
    const combo = props.combo;
    const add = props.add;
    const [expand, SetExpand] = useState(false);
    const [num, setNum] = useState(props.number ? props.number : 1);
    return (
        <Box sx={{
            backgroundColor: 'white',
            borderRadius: '24px',
            boxShadow: '0px 5px 10px rgb(0,0,0, 0.2)',
            alignItems: 'start',
            width: '100%',
            marginTop: '20px',
            minWidth: '250px'
        }}>
            <Box
            sx={{
                width: '100%',
                display: 'flex',
                //flexDirection: {md: 'row', sm: 'column', xs: 'column'},
                justifyContent: 'space-between'
            }}
            >
                <Box sx={{
                    display: {md: 'block', sm: 'none', xs: 'none'},
                }}>
            <img
            src={combo.image}
            alt={combo.title}
            style={{
                borderRadius: '200px',
                width: '150px',
                height: '150px',
                zIndex: 2,
                display: {md: 'block', sm: 'none', xs: 'none'},
                margin: '20px'
            }}
            />
            </Box>
                <Box sx={{width: '100%', marginLeft:'5%', marginRight: '5%'}}>
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: {md: '25px', sm: '20px', xs: '15px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                    }}
                >{combo.title}
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: {md: '16px', sm: '15px', xs: '13px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                    }}
                >Time: {combo.time}
                </Typography>
                <Typography variant="h6"
                    sx={{
                        alignSelf: 'center',
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: {md: '30px', sm: '25px', xs: '20px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        display: {md: 'block', sm: 'none', xs: 'none'}
                    }}
                    >Price: $ {combo.price}
                </Typography>
                <Stack direction="row" spacing={{md: 3, sm: 1, xs: 0}}
            sx={{
                marginRight: {md: '40px', sm: '10px', xs: '0px'}, 
                //alignSelf: {md: 'center', sm: 'start', xs: 'start'}
            }}
            >
            <IconButton
                onClick={() => {
                    add? handleClick(comboId, num, round(num*combo.price)) : handleClick(comboId, true, false, combo.price * num)
                }}
                sx={{
                width: {md: '60px', sm: '40px', xs: '30px'},
                height: {md: '60px', sm: '40px', xs: '30px'},
                alignSelf: 'center'
                }}
                >
                {
                    add ? <AddCircleRounded
                    sx={{
                        width: {md: '60px', sm: '40px', xs: '30px'},
                        height: {md: '60px', sm: '40px', xs: '30px'},
                        color: 'rgba(234, 106, 18, 0.7)',
                    }}
                />
                : <DeleteIcon
                    sx={{
                        width: {md: '40px', sm: '30px', xs: '25px'},
                        height: {md: '40px', sm: '30px', xs: '25px'},
                        //color: 'rgba(234, 106, 18, 0.7)',
                    }}
                />
                }
                
                </IconButton>
            {
            !add?
            <IconButton 
            sx={{
                width: {md: '60px', sm: '40px', xs: '30px'},
                height: {md: '60px', sm: '40px', xs: '30px'},
                alignSelf: 'center',
            }}
            onClick = {()=> SetExpand(prev => !prev)}>
                {expand ? 
                <ExpandLess sx={{width: {md: '60px', sm: '40px', xs: '30px'}, height: {md: '60px', sm: '40px', xs: '30px'},}}/> : 
                <ExpandMore sx={{width: {md: '60px', sm: '40px', xs: '30px'}, height: {md: '60px', sm: '40px', xs: '30px'},}}/>}
            </IconButton>  
            : false
            }     
                </Stack>
                </Box>
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: {md: '16px', sm: '15px', xs: '13px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                    }}
                >{combo.persons} persons
                </Typography>
                </Box>
            </Box>
            <Divider/>
            <Collapse in={add ? true : expand} unmountOnExit>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                    width: '100%',
                    backgroundColor: 'rgba(252, 237, 227, 0.3)'
                }}>
                    {
                        combo.pizzas.map(item => <ComboPizzaItem item = {item}/>)
                    }
                    {
                        combo.extras.map(item => <ComboExtraItem item = {item}/>)
                    }
                </Box>
            </Collapse>
            <Divider/>
            <Box sx={{
            m: 1,
            display: 'flex',
            justifyContent: 'space-around',
            p: 1,
            flexWrap: 'wrap'
        }}>
            <Stack spacing={2} direction="row">
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
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
                borderRadius: '100px',
                maxHeight: '50px'
            }}
            >
                <IconButton
                onClick = {()=>{
                    const newNum = (num === 1) ? 1: num - 1;
                    if(!add && num > 1)
                    handleClick(comboId, false, false, combo.price,
                        {
                            number: newNum,
                            total: round(newNum*combo.price)
                        });
                    setNum(newNum);
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
                    
                    if(!add && num < 10)handleClick(comboId, false, true, combo.price,
                    {
                        number: newNum,
                        total: round(newNum*combo.price)
                    }
                    );
                    setNum(newNum);
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
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: {md: '20px', sm: '16px', xs: '15px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'center',
                    }}
                    >Total: $ {round(combo.price * num)}
            </Typography>
        </Box>
        </Box>
    )
}
export const ComboMenuItem = (props) =>{
    const combo = props.combo;
    const [expand, SetExpand] = useState(false);
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
            alignItems: 'center',
            backgroundColor: hov ?'rgba(234, 106, 18, 0.7)': 'rgba(255, 255, 255, 0.4)',
            maxWidth: '274px',
            maxHeight: '237px',
            borderRadius: '24px',
            p: 3,
            boxSizing: 'border-box',
            marginRight: '2.5%',
            marginLeft: '2.5%',
            boxShadow: '1px 1px 5px rgba(0,0,0, 0.5)'
        }}
        >
            <Stack spacing={1} sx={{minWidth: '150px'}}>
            <Typography variant="subtitle1"
                    sx={{
                        
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        color: hov? 'white':'#EA6A12',
                        textAlign: 'start'
                    }}
                    >❤️ {combo.content1}
            </Typography>
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
                    >{combo.title}
            </Typography>
            <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        color: hov? 'white': '#959895',
                        textAlign: 'start',
                        marginBottom: '20px'
                    }}
                    >{combo.time}   
            </Typography>
            <Divider variant="light"  sx={{
                width: '50%',
                color: hov?'white': 'rgb(0,0,0,0.5)'
            }}/>
            <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        textAlign: 'start',
                        color: hov? 'white': '#959895',
                        marginBottom: '20px'
                    }}
                    >{combo.persons} persons                    
            </Typography>
            <Stack
            direction='row'
            spacing={1}
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
                    >$ {combo.price}
                </Typography>
                <IconButton
                sx={{
                width: '24px',
                height: '24px'
                }}
                onClick={() =>{SetExpand(true); switchHov()}}
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
            src={combo.image}
            alt={combo.title}
            style={{
            borderRadius: '50%',
            //boxShadow: '-10px 0px 30px rgba(0, 0, 0, 0.1)',
            alignSelf: 'center',
            //transform: 'translateX(5%)',
            width: '75%',
            }}
            />
        <Modal open={expand} onClose={() => {SetExpand(false)}}>
            <Fade in={expand} timeout={500}>
            <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: {md: '70%', sm: '90%', xs: '95%'}
            }}
            >
            <ComboCard add={true} combo={combo} comboId={props.comboId} handleClick={props.handleClick}/>
            </Box>
            </Fade>
        </Modal>
        </Box>
    )
}
export const ComboList = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = (comboId, number, total) =>{
        dispatch(itemAdded({
            comboId: comboId,
            number: number,
            total: total
        }));
        setDone(true);
    }
    const [done, setDone] = useState(false);
    const ids = useSelector(state => state.combos.ids);
    const combos = useSelector(state => state.combos.entities);
    const max = 2;
    const [page, setPage] = useState(1);
    const totalPage = Math.ceil(ids.length / max);
    const pageList = [];
    for(let i = 1;i <= totalPage;i++)pageList.push(i);
    return(
        <Box sx={{p: 3, width: '100%', marginBottom: '100px'}}>
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        m: 3
                    }}
                    >Combos
            </Typography>
        {
            pageList.map(p => {return(
            <Grow in={page===p} mountOnEnter unmountOnExit timeout={page===p ? 1000: 0}>
            <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap'
            }}
            >
            {
                ids
                .map((id, index) =>{
                    return (index >= (page - 1)*max && index < page * max) ?
                    <Box sx={{margin: '20px 50px'}}>
                        <ComboMenuItem  combo = {combos[id]} comboId={id} handleClick={handleClick}/>
                    </Box>
                    : false
                })
            }
            </Box>
                </Grow>   
            )})
        }
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
                    >Your Cart has been updated successfully!!
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
                        fontFamily: 'Poppins',
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
                        Done
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
                        fontFamily: 'Poppins',
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
                        Go to cart
                </Button>
                </Stack>
                
            </Stack>
            </Fade>
        </Modal>
        <Box sx={{marginTop: '100px', alignItems: 'center', width: '100%', marginLeft: '40%'}}>
        <CustomPagination variant="outlined" shape="rounded" count={totalPage}
            onChange={(event, value) => {setPage(value)}} size="large" page={page}
        />
        </Box>
        </Box>
    )
}