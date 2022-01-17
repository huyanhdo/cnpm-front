import { Stack, Typography, Box, IconButton, Divider , Collapse, Grow} from '@mui/material';
import React, { useState } from 'react';
import AddCircleRounded from '@mui/icons-material/AddCircleRounded';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { CustomPagination } from './pizzaMenu';
const timeToDate = (time) =>{
    let date = new Date(time * 1000)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return year + '/' + month + '/' + day;   
}
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
                        fontFamily: 'be Vietnam',
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
                        fontFamily: 'be Vietnam',
                        fontWeight: 700,
                        fontSize: {md: '15px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        marginLeft: {md: '20px'},
                        display: {md: 'block', sm: 'none', xs: 'none'}
                    }}
                >(Xem thêm)
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
                        fontFamily: 'be Vietnam',
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
                        fontFamily: 'be Vietnam',
                        fontWeight: 700,
                        fontSize: {md: '15px', sm: '15px', xs: '13px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                    }}
                >Cỡ: {item.size}
            </Typography>
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 700,
                        fontSize: {md: '15px', sm: '15px', xs: '13px'},
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                    }}
                >Đế: {item.sole}
            </Typography>
            </Stack>
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'be Vietnam',
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
                        fontFamily: 'be Vietnam',
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
                        fontFamily: 'be Vietnam',
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
export const ComboMenuItem = (props) =>{
    const navigate = useNavigate();
    const combo = props.combo;
    const [hov, setHov] = useState(false);
    const switchHov = ()=>{
        setHov(prev => !prev);
    }
    const valid = Date.now() / 1000 >= combo.start && Date.now() / 1000 <= combo.end
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
                        
                        fontFamily: 'be Vietnam',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        color: hov? 'white':'#EA6A12',
                        textAlign: 'start'
                    }}
                    >❤️ {combo.subtitle.length <= 20 ? combo.subtitle : combo.subtitle.slice(0, 17) + '...'}
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
                    >{combo.title.slice(0, 15)}
            </Typography>
            <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        color: hov? 'white': valid ? '#959895': 'red',
                        textAlign: 'start',
                        marginBottom: '20px'
                    }}
                    >{valid ? timeToDate(combo.start) + " - " + timeToDate(combo.end): "Expired"}   
            </Typography>
            <Divider variant="light"  sx={{
                width: '50%',
                color: hov?'white': 'rgb(0,0,0,0.5)'
            }}/>
            <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        textAlign: 'start',
                        color: hov? 'white': '#959895',
                        marginBottom: '20px'
                    }}
                    >{combo.persons} người                 
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
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: '13px',
                        lineHeight: '175%',
                        color: hov? 'white': '#EA6A12',
                        textAlign: 'start'
                    }}
                    >{combo.off && combo.off > 0 ? combo.off + ' %Off': 'Bonus'}
                </Typography>
                <IconButton
                sx={{
                width: '24px',
                height: '24px'
                }}
                onClick={() => {navigate('/combo/' + props.comboId)}}
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
            objectFit: 'cover',
            //boxShadow: '-10px 0px 30px rgba(0, 0, 0, 0.1)',
            alignSelf: 'center',
            //transform: 'translateX(5%)',
            width: '150px',
            height: '150px'
            }}
            />
        </Box>
    )
}
export const ComboList = ()=>{
    const ids = useSelector(state => state.combos.ids);
    const combos = useSelector(state => state.combos.entities);
    const fetchingStatus = useSelector(state => state.combos.fetchingStatus);
    const max = 6;
    const [page, setPage] = useState(1);
    const totalPage = Math.ceil(ids.length / max);
    const pageList = [];
    for(let i = 1;i <= totalPage;i++)pageList.push(i);
    return fetchingStatus === 'SUCCESS' && (
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
                        <ComboMenuItem  combo = {combos[id]} comboId={id}/>
                    </Box>
                    : false
                })
            }
            </Box>
                </Grow>   
            )})
        }
        <Box sx={{marginTop: '100px', alignItems: 'center', width: '100%', marginLeft: '40%'}}>
        <CustomPagination variant="outlined" shape="rounded" count={totalPage}
            onChange={(event, value) => {setPage(value)}} size="large" page={page}
        />
        </Box>
        </Box>
    )
}