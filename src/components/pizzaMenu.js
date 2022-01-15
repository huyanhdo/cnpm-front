import React, { useState,useEffect } from "react";
import { PizzaCard } from "./categories";
import {IconButton, Box, Typography, styled, Pagination, Grow, CircularProgress,TextField,InputAdornment} from '@mui/material';
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { makeStyles } from "@mui/styles";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
const label ={
    'Kids':'Đồ cho bé',
    'Pizzas':'Pizza',
    'Appetizers':'Khai vị',
    'Vegetables':'Đồ chay',
    'Drinks':'Đồ uống',
    'Desserts':'Tráng miệng',
    'Combo':'Combo',
}
const useStyle = makeStyles({
    textField:{
    '& .MuiOutlinedInput-root': {
    borderRadius:100,
    border:'solid',
    borderWidth:'1px',
    backgroundColor:'white',
    '&.Mui-focused fieldset': {
        borderColor: 'white',
    },
    '& input':{
        height:'8px',
        backgroundColor:'white',
        borderTopRightRadius:'100px',
        borderBottomRightRadius:'100px',
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
        fontFamily: 'be Vietnam'
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
  //  const [ids,setids] = useState([]);
    const ids = categories[category].selector.ids;
    const [page, setPage] = useState(1);
    const fetchingStatus = categories[category].selector.fetchingStatus
    const products = categories[category].selector.entities
   // const ids = categories[category].selector.ids
    const max = 10;
    //const [page, setPage] = useState(1);
    const totalPage = Math.ceil(ids.length / max);
    const pageList = [];
    for(let i = 1;i <= totalPage;i++)pageList.push(i);
    useEffect(()=>{
        setSearch('');
    },[category])
    
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
                    >{label[categories[category].menuName]}
        </Typography>
        <Box sx={{display:'flex',alignItems:'center'}}>
        <TextField 
            className = {classes.textField}
            placeholder="Tìm kiếm..."
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
                ids.filter(id=>   
                    !search ? id : products[id].title.toUpperCase().includes(search.toString().toUpperCase())
                   )
                .map((id, index) =>{
                    return (index >= (page - 1)*max && index < page * max) &&
                        <Box sx={{marginLeft: '20px'}}>
                            <PizzaCard image={products[id].image_url} name={products[id].title} 
                            rate={products[id].rating} price={products[id].price}
                            id = {id} link = {categories[category].singlePath + id}
                            />
                        </Box>
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
                        fontFamily: 'be Vietnam',
                        fontWeight: 700,
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        m: 3
                    }}
                    >Hãy đợi một chút
            </Typography>
            <CircularProgress/>
        </Box>
        :<Box sx= {{width: '100%', alignItems: 'center'}}>
        <Typography variant="h6"
                sx={{
                    fontFamily: 'be Vietnam',
                    fontWeight: 700,
                    fontSize: '30px',
                    lineHeight: '52px',
                    color: '#07143B',
                    textAlign: 'start',
                    m: 3
                }}
                >Có vẻ có lỗi đã xảy ra
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

