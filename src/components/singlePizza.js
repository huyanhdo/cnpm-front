import React, { useState } from "react";
import {Box, Divider, IconButton, Stack, Typography, Rating, Button, List, ListItem, Modal, TextField,  Fade, Snackbar} from '@mui/material';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import  AddRoundedIcon  from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { ToppingCard } from "./topping";
import { Comment } from "./comment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { itemAdded, itemUpdated } from "../store/cartSlice";
import { CustomPagination } from "./pizzaMenu";
import { updatePizza } from "../store/categories/pizzaSlice";
const axios = require('axios')
const round = (num)=> Math.round(num * 100) / 100;
export const SinglePizza = ()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const {productId} = useParams();
    const pizza = useSelector(state => state.pizzas.entities[productId]);
    const toppings = pizza.topping;
    const comments = pizza.comment ? pizza.comment : [];
    const sizes = pizza.size;
    const soles = pizza.type;
    const [size, setSize] = useState(location.state? location.state.size: 0);
    const [sole, setSole] = useState(location.state? location.state.sole: 0);
    const [num, setNum] = useState(location.state? location.state.number: 1);
    const [total, setTotal] = useState(location.state? round(location.state.total / location.state.number) : pizza.price);
    const [cmt, setCmt] = useState(false);
    const [tops, setTops] = useState(location.state? location.state.toppings: {});
    const [done, setDone] = useState(false);
    //comment
    const [yourName, setYourName] = useState('')
    const [yourCmt, setYourCmt] = useState('')
    const [yourRate, setYourRate] = useState(0)
    const [posted, setPosted] = useState(false);
    const [message, setMess] = useState('');
    const max = 2
    const totalPage = Math.ceil(comments ? comments.length / max : 1);
    const pageList = [];
    for(let i = 1;i <= totalPage;i++)pageList.push(i);
    const [page, setPage] = useState(1);
    const closeCmt = () =>{
            setCmt(false)
            setYourName('')
            setYourCmt('')
    }
    const postComment = async () =>{
        try{
            const newCmt = {
                comment_time: Math.floor(Date.now()/1000),
                content: yourCmt,
                user_name: yourName,
                user_rating: yourRate
            }
            let newPizza = {}
            newPizza = Object.assign(newPizza, pizza)
            newPizza.comment = [...comments, newCmt]
            newPizza.rating = (pizza.rating * comments.length + yourRate)/ (comments.length + 1)
            const result = await axios.put(
                    'https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app/menu/menu_main_courses/' + productId + '/.json',
                    newPizza)
            if(result.status === 200){
                dispatch(updatePizza({id: productId, item: newPizza}))
                setMess('Your comment has been posted successfully')
                setPosted(true)
            }
            setYourRate(0);
            closeCmt()
        }catch(err){
            setMess('Sorry, Failed to post your comment')
            setPosted(true)
            console.log(err)
        }
    }
    const handleAdd = (_id, add)=>{
        setTotal(prev => add ? round(prev + toppings[_id].topping_price) : round(prev - toppings[_id].topping_price));
        if(add) {
            
            setTops(prev => {
                prev[_id] = true;
                return prev;
            });
        }
        else {
            setTops(prev => {
                prev[_id] = false;
                return prev;
                });
        }
    }
    const sizeChanged = (o, n)=>{
        setSize(n);
        setTotal(prev => round(prev - sizes[o].type_price + sizes[n].type_price));
    }
    return(
        <Box
        sx={{
            backgroundColor: 'white',
            borderRadius: '24px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
            padding: '20px 0px',
            alignItems: 'center',
            m:3,marginBottom: '150px'
        }}
        >
        <Box
        sx={{
            backgroundColor:'rgba(252, 237, 227, 0.3)',
            display: 'flex',
            borderRadius: '24px',
            justifyContent: 'space-around',
            alignItems: 'center',
            p: 5,
            m: 5,
            flexWrap: {xs: 'wrap',sm: 'wrap', md: 'nowrap'}
        }}
        >
            <img
            src={pizza.image_url}
            alt={pizza.title}
            style={{
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            objectFit: 'cover'
            }}
            />
            <Stack spacing={2}
            sx={{
                marginLeft: {md: '100px', sm: 0, xs: 0},
                marginTop: {md: 0, sm: '50px', xs: '50px'}
            }}>
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'Fairplay Display',
                        fontWeight: 700,
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        
                    }}
                    >{pizza.title}
                </Typography>
                <Typography
                    style={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        color: '#EA6A12',
                        textAlign: 'start',
                        textOverflow: 'ellipsis',
                        maxWidth: '80%',
                        maxHeight: '65px',
                        overflow: 'hidden'
                    }}
                    >{pizza.description}
                </Typography>
                <Divider sx = {{maxWidth: '50%'}}/>
                <div
                    style={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: '20px',
                        lineHeight: '175%',
                        color:'#EA6A12',
                        textAlign: 'start'
                    }}
                    >$ {pizza.price + sizes[size].type_price}
                </div>
                <Rating value={pizza.rating} readOnly
                sx={{
                    color: '#EA6A12',
                }}
                icon={<StarRoundedIcon/>}
            emptyIcon={<StarRoundedIcon/>}
            />
                <Stack spacing={1} direction="row"
                sx={{
                    alignItems: 'center'
                }}
                >
                <Typography variant="body1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 400,
                        fontSize: '20px',
                        lineHeight: '22.75px',
                        color: '#07143B',
                        textAlign: 'start'
                    }}
                    >Cỡ: 
                </Typography>
                <IconButton 
                onClick={() => sizeChanged(size, size > 0 ? size - 1 : 0)}
                >
                    <KeyboardArrowLeftRoundedIcon/>
                </IconButton>
                <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Fairplay Display',
                        fontWeight: 600,
                        fontSize: '20px',
                        lineHeight: '175%',
                        color:'#07143B',
                        textAlign: 'start'
                    }}
                    >{sizes[size].type_detail}
                </Typography>
                <IconButton 
                onClick={() => sizeChanged(size, (size + 1) < sizes.length ? size + 1 : size)}
                >
                    <KeyboardArrowRightRoundedIcon/>
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
                        fontSize: '20px',
                        lineHeight: '22.75px',
                        color: '#07143B',
                        textAlign: 'start'
                    }}
                    >Đế: 
                </Typography>
                <IconButton
                onClick={() => setSole(prev => {return prev === 1 ? 0: 1})}
                >
                    <KeyboardArrowLeftRoundedIcon/>
                </IconButton>
                <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Fairplay Display',
                        fontWeight: 600,
                        fontSize: '20px',
                        lineHeight: '175%',
                        color:'#07143B',
                        textAlign: 'start'
                    }}
                    >{soles[sole]}
                </Typography>
                <IconButton 
                onClick={() => setSole(prev => {return prev === 1 ? 0: 1})}
                >
                    <KeyboardArrowRightRoundedIcon/>
                </IconButton>
                </Stack>
            </Stack>
        </Box>
        <Divider variant="middle" sx={{m: 5}}/>
        <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        m: 1,
                        marginLeft: '50px'
                    }}
                    >Toppings
        </Typography>
        
        <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            m: 5,
        }}
        >
            {
            toppings.map((topping, toppingId) =>{
                return (<ToppingCard 
                    name={topping.topping_name} 
                    price = {topping.topping_price} 
                    _id = {toppingId} 
                    handleAdd = {handleAdd} 
                    added = {tops[toppingId]}
                />
                )
            })
            }
        </Box>
        <Divider variant="middle" sx ={{marginBottom: 3}}/>
        <Box sx={{
            m: 1,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around'
        }}>
            <Stack spacing={2} direction="row">
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '30px',
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
                sx={{
                    width: '40px',
                    height: '40px',
                    '&:hover, &:active':{
                        color: 'white'
                    }
                }}
                >
                    <RemoveRoundedIcon
                    onClick = {()=>{setNum(prev => (prev === 1)? 1: prev - 1)}}
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
                    <AddRoundedIcon
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
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'center',
                    }}
                    >Tổng tiền:  {round(total * num)} VND
            </Typography>
        </Box>
        <Button variant="contained" 
                    onClick = {()=>{
                        if(location.state){
                            dispatch(itemUpdated({
                                id: location.state.id,
                                data: {
                                    pizzaId: productId,
                                    size: size,
                                    sole: sole,
                                    toppings: tops,
                                    total: round(total * num),
                                    number: num
                                }
                            }));
                        }else{
                            dispatch(itemAdded({
                                pizzaId: productId,
                                size: size,
                                sole: sole,
                                toppings: tops,
                                total: round(total * num),
                                number: num
                            }));
                        }
                        setDone(true);
                        
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
                        '&:hover, &:active':{
                            backgroundColor: '#f57c00'
                        },
                        marginTop: 3
                    }}
                    >
                        {location.state ? "Cập nhập giỏ hàng" : "Thêm vào giỏ hàng"}
        </Button>
        <Divider variant="middle" sx={{m: 5}}/>
        <Box sx={{display: 'flex', justifyContent: 'space-between', padding: '20px 50px'}}>
        <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                    }}
                    >Bình luận
        </Typography>
        <Button variant="contained" 
                    onClick = {() => {setCmt(true)}}
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
                        marginBottom: 2
                    }}
                    >
                        Thêm bình luận
        </Button>
        <Modal open={cmt} onClose = {closeCmt}>
            <Fade in={cmt} timeout={500}>
            <Stack
            spacing = {1}
            sx={{
                borderRadius: '24px',
                backgroundColor: 'white',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                p: 4,
                boxShadow: 24,
                width: {md: '50%', sm: '80%', xs: '90%'}
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
                    >Bình luận của bạn
                </Typography>
                <TextField
                required
                id="name-field"
                label="Tên"
                multiline
                maxRows={1}
                color='warning'
                inputProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input label
                sx={{
                    width: '100%'
                }}
                onChange={(e)=>{
                    setYourName(e.target.value)
                }}
                />
                <TextField
                color='warning'
                required
                id="name-field"
                label="Bình luận"
                multiline
                rows={4}
                maxRows = {4}
                inputProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'be Vietnam'}}} // font size of input label
                onChange={(e)=>{
                    setYourCmt(e.target.value)
                }}
                />
                <Stack direction="row" spacing={5}
                sx={{alignItems: 'center'}}
                >
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 700,
                        fontSize: '15px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'center',
                    }}
                    >Đánh giá: 
                </Typography>
                <Rating
                
                onChange={(e,newRate)=>{
                    setYourRate(newRate)
                }}
                sx={{
                    color: '#EA6A12',
                }}
                icon={<StarRoundedIcon/>}
                emptyIcon={<StarRoundedIcon/>}
                />
                </Stack>
                {
                (yourName.length === 0 || yourCmt.length === 0) &&
                (<Typography variant="h6"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 700,
                        fontSize: '15px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'center',
                    }}
                >
                    Hãy điền đủ thông tin
                </Typography>)
                }
                <Button variant="contained" 
                    onClick={postComment}
                    sx={{
                        backgroundColor: '#EA6A12',
                        borderRadius: '100px',
                        alignSelf: 'center',
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
                    disabled = {yourName.length === 0 || yourCmt.length === 0}
                    >
                    Đăng
                </Button>
            </Stack>
            </Fade>
        </Modal>
        </Box>
            
            <Divider variant="middle"/>
            <Box sx={{margin: '0 20px'}}>
            <List sx={{width: '100%', height: '90%', backgroundColor: 'rgba(252, 237, 227, 0.3)', alignSelf: 'center'
            }}>
            {
                comments && comments.length > 0 ? 
                comments.map((comment, index) =>
                    (index >= (page - 1)*max && index < page * max) ?
                            <ListItem>
                                <Comment comment = {comment}/>
                            </ListItem>
                    : false
                )
                : 
                <Typography variant="h6"
                    sx={{
                        alignSelf: 'start',
                        fontFamily: 'be Vietnam',
                        fontWeight: 700,
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'center',
                        marginTop: '50px'
                    }}
                >No comment
            </Typography>
            }
            </List>
            </Box>
            <Box sx={{width: '100%', justifyContent: 'center', marginTop: '10px', display: 'flex'}}>
            <CustomPagination variant="outlined" shape="rounded" count={totalPage}
            onChange={(event, value) => {setPage(value)}} size="large" page={page}/>
            </Box>
        <Divider variant="middle" sx={{m: 5}}/>
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
                    >Đã thêm vào giỏ hàng
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
                        Hoàn thành
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
        <Snackbar
        open={posted}
        onClose={() => {setPosted(false)}}
        message={message}
        autoHideDuration={6000}
        />
        </Box>
        
    )
}