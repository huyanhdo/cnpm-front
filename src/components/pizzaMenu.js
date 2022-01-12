import React, { useState,useEffect } from "react";
import { Categories, Category, PizzaCard } from "./categories";
import {IconButton, Box, Typography, styled, Pagination, Grow, CircularProgress,TextField,InputAdornment} from '@mui/material';
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { makeStyles } from "@mui/styles";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
const useStyle = makeStyles({
    textField:{
    '& .MuiOutlinedInput-root': {
    borderRadius:100,
    border:'solid',
    borderWidth:'1px',
    '&.Mui-focused fieldset': {
        borderColor: 'white',
    },
    '& input':{
        height:'8px',
        backgroundColor:'white',
        borderRadius:100,
        "&:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px white inset"
        }
     },
    },
    '& fieldset':{
        border:'none',
        fontFamily: 'be Vietnam',
        paddingLeft:'10px',
    },      
    width:'100%',
    },
    iconButton:{backgroundColor:'white'}
})

export const CustomPagination = styled(Pagination)({
    "& .MuiPaginationItem-root": {
        fontFamily: 'Poppins'
    },
    "& .MuiPaginationItem-root:active": {
        backgroundColor: 'rgb(234, 106, 18, 0.5)',
    },
    '& .Mui-selected': {
        backgroundColor: 'rgb(234, 106, 18, 0.5)',
    }
})

export const PizzaMenu = ()=>{
    const classes = useStyle();
    const categories = {
        'pizza':{
            selector: useSelector(state => state.pizzas),
            menuName: 'Pizzas',
            singlePath: '/pizza/'
        },
        'dessert':{
            selector: useSelector(state => state.desserts),
            menuName: 'Desserts',
            singlePath: '/dessert/'
        },
        'drink':{
            selector: useSelector(state => state.drinks),
            menuName: 'Drinks',
            singlePath: '/drink/'
        },
        'vegetable':{
            selector: useSelector(state => state.vegetables),
            menuName: 'Vegetables',
            singlePath: '/vegetable/'
        },
        'kid':{
            selector: useSelector(state => state.kids),
            menuName: 'Kids',
            singlePath: '/kid/'
        },
        'appetizer':{
            selector: useSelector(state => state.appetizers),
            menuName: 'Appetizers',
            singlePath: '/appetizer/'
        }
    }
    const {category} = useParams();
    const [search,setSearch] = useState('');
    const [ids,setids] = useState(categories[category].selector.ids);
    const [page, setPage] = useState(1);
    const fetchingStatus = categories[category].selector.fetchingStatus
    const products = categories[category].selector.entities
    const max = 5;
    const totalPage = Math.ceil(ids.length / max);
    const pageList = [];
    for(let i = 1;i <= totalPage;i++)pageList.push(i);
    useEffect(()=>{ 
        console.log(products)
        !search ?
            setids(categories[category].selector.ids)
            : setids(categories[category].selector.ids.filter(
                (item) =>  products[item].title.toUpperCase().includes(search.toString().toUpperCase())
            ))
    },[search,products])
    
    return(
        <Box sx={{p: 5, marginBottom: '100px', width: '100%'}}>
        <Box sx={{display:'flex',flexDirection:'row'}}>
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
                    >{categories[category].menuName}
        </Typography>
        <Box sx={{display:'flex',alignItems:'center'}}>
        <TextField 
            className = {classes.textField}
            placeholder="Search..."
            value={search}
            onChange = {(e)=>setSearch(e.target.value)}
            InputProps={{
                startAdornment: <InputAdornment position="start" sx={{backgroundImage:'white'}}>
                            <IconButton className = {classes.iconButton}><SearchRoundedIcon /></IconButton>
                            </InputAdornment>,
              }}/>
        </Box>
        </Box>
        {
        fetchingStatus === 'SUCCESS'?
        <Box>
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
                        <Box sx={{marginLeft: '20px'}}>
                            <PizzaCard image={products[id].image_url} name={products[id].title} 
                            rate={products[id].rating} price={products[id].price}
                            id = {id} link = {categories[category].singlePath + id}
                            />
                        </Box>
                    : false
                })
            }
            </Box>
                </Grow>   
            )})
        }
        </Box>
        :
        fetchingStatus === 'LOADING' || fetchingStatus === 'INITIAL'?
        <Box sx= {{width: '100%', alignItems: 'center'}}>
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        m: 3
                    }}
                    >Please Wait
            </Typography>
            <CircularProgress/>
        </Box>
        :<Box sx= {{width: '100%', alignItems: 'center'}}>
        <Typography variant="h6"
                sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    fontSize: '30px',
                    lineHeight: '52px',
                    color: '#07143B',
                    textAlign: 'start',
                    m: 3
                }}
                >Opps...Sorry, something went wrong
        </Typography>
        </Box>
        }
        <Box sx={{marginTop: '100px', alignItems: 'center', width: '100%', marginLeft: '40%'}}>
        <CustomPagination variant="outlined" shape="rounded" count={totalPage}
            onChange={(event, value) => {setPage(value)}} size="large" page={page}
        />
        </Box>
        </Box>
    )
}

