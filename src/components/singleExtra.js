import React, {useState } from "react";
import {Box, Divider, IconButton, Stack, Typography, Rating, Button, List, ListItem, Modal, TextField, Fade, Snackbar} from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import  AddRoundedIcon  from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { Comment } from "./comment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { itemAdded } from "../store/cartExtraSlice";
import { CustomPagination } from "./pizzaMenu";
import { updateDessert } from "../store/categories/dessertSlice";
import { updateDrink } from "../store/categories/drinkSlice";
import { updateVegetable } from "../store/categories/vegetableSlice";
import { updateKid } from "../store/categories/kidSlice";
import { updateAppetizer } from "../store/categories/appetizerSlice";

const axios = require('axios')
const round = (num)=> Math.round(num * 100) / 100;

export const SingleExtra = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const categories = {
        'dessert':{
            selector: useSelector(state => state.desserts),
            link: 'https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app/menu/menu_dessert/',
            update: updateDessert
        },
        'drink':{
            selector: useSelector(state => state.drinks),
            link: 'https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app/menu/menu_drink/',
            update: updateDrink
        },
        'vegetable':{
            selector: useSelector(state => state.vegetables),
            link: 'https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app/menu/menu_vegetarian/',
            update: updateVegetable
        },
        'kid':{
            selector: useSelector(state => state.kids),
            link: 'https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app/menu/menu_kid/',
            update: updateKid
        },
        'appetizer':{
            selector: useSelector(state => state.appetizers),
            link: 'https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app/menu/menu_appetizer/',
            update: updateAppetizer
        }
    }
    const {category , productId} = useParams();
    const extra = categories[category].selector.entities[productId];
    const comments = extra.comment ? extra.comment : [];
    const [num, setNum] = useState(1);
    const [cmt, setCmt] = useState(false);
    const [done, setDone] = useState(false);
    //comment
    const [yourName, setYourName] = useState('')
    const [yourCmt, setYourCmt] = useState('')
    const [yourRate, setYourRate] = useState(0)
    const [posted, setPosted] = useState(false);
    const [message, setMess] = useState('')
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
        let newExtra = {}
        newExtra = Object.assign(newExtra, extra)
        newExtra.comment = [...comments, newCmt]
        newExtra.rating = (extra.rating * comments.length + yourRate)/ (comments.length + 1)
            const result = await axios.put(
                categories[category].link + productId + '/.json',
                newExtra)
            if(result.status === 200){
                dispatch(categories[category].update({id: productId, item: newExtra}))
                setMess('Bình luận của bạn đã được đăng thành công')
                setPosted(true)
            }
        closeCmt()
    }catch(err){
        console.log(err)
        setMess('Xin lỗi, có sự cố xảy ra')
        setPosted(true)
    }
}

    return(
        <Box
        sx={{
            backgroundColor: 'white',
            borderRadius: '24px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
            padding: '20px 0px',
            alignItems: 'center',
            m:3,marginBottom: '100px'
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
            src={extra.image_url}
            alt={extra.title}
            style={{
            width: '280px',
            height: '280px',
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
                    >{extra.title}
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
                    >{extra.description}
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
                    > {extra.price} VND
                </div>
                <Rating value={extra.rating} readOnly
                sx={{
                    color: '#EA6A12',
                }}
                icon={<StarRoundedIcon/>}
            emptyIcon={<StarRoundedIcon/>}
            />
            </Stack>
        </Box>
        <Divider variant="middle" sx={{m: 5}}/>
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
                    >Tổng tiền:  {round(extra.price * num)} VND
            </Typography>
        </Box>
        <Button variant="contained" 
                    onClick={()=>{
                        setDone(true);
                        dispatch(itemAdded({
                            extraId: productId,
                            number: num,
                            category: category,
                            total: round(num * extra.price)
                        }))
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
                        Thêm vào giỏ
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
                label="Name"
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
                label="Comment"
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
                    Post
                </Button>
            </Stack>
            </Fade>
        </Modal>
        </Box>
            
            <Divider variant="middle"/>
            <Box sx={{margin: '0 20px'}}>
            <List sx={{width: '100%', height: '90%', overflow: 'auto', 
            maxHeight: '500px', backgroundColor: 'rgba(252, 237, 227, 0.3)', alignSelf: 'center'
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
                >Không có bình luận nào
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
                    >Giỏ hàng của bạn đã được cập nhập
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
                        Hoàn tất
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