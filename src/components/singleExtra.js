import React, { useState } from "react";
import {Box, Divider, IconButton, Stack, Typography, Rating, Button, List, ListItem, Modal, TextField, Checkbox, Fade} from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import  AddRoundedIcon  from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { Comment } from "./comment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { itemAdded } from "../store/cartExtraSlice";
const round = (num)=> Math.round(num * 100) / 100;
export const SingleExtra = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {productId} = useParams();
    const extra = useSelector(state => state.extras.entities[productId]);
    const comments = extra.comments;
    const [num, setNum] = useState(1);
    const [cmt, setCmt] = useState(false);
    const [done, setDone] = useState(false);
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
            src={extra.image}
            alt={extra.name}
            style={{
            width: '280px',
            height: '280px',
            borderRadius: '50%'
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
                    >{extra.name}
                </Typography>
                <Typography
                    style={{
                        fontFamily: 'Poppins',
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
                        fontFamily: 'Poppins',
                        fontWeight: 600,
                        fontSize: '20px',
                        lineHeight: '175%',
                        color:'#EA6A12',
                        textAlign: 'start'
                    }}
                    >$ {extra.price}
                </div>
                <Rating value={extra.rate} readOnly
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
                    >Number: 
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
                    >Total: $ {round(extra.price * num)}
            </Typography>
        </Box>
        <Button variant="contained" 
                    onClick={()=>{
                        setDone(true);
                        dispatch(itemAdded({
                            extraId: productId,
                            number: num,
                            total: round(num * extra.price)
                        }))
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
                        '&:hover, &:active':{
                            backgroundColor: '#f57c00'
                        },
                        marginTop: 3
                    }}
                    >
                        Add to Cart
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
                    >Comments
        </Typography>
        <Button variant="contained" 
                    onClick = {() => {setCmt(true)}}
                    sx={{
                        backgroundColor: '#EA6A12',
                        borderRadius: '100px',
                        //maxWidth: '150px',
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
                        Add Comment
        </Button>
        <Modal open={cmt} onClose = {() => {setCmt(false)}}>
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
                width: '400px'
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
                    >Your Comment
                </Typography>
                <TextField
                required
                id="name-field"
                label="Name"
                multiline
                maxRows={1}
                color='warning'
                inputProps={{style: {fontFamily: 'Poppins'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                sx={{
                    width: '60%'
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
                inputProps={{style: {fontFamily: 'Poppins'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                />
                <Stack direction="row" spacing={5}
                sx={{alignItems: 'center'}}
                >
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: '15px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'center',
                    }}
                    >Rate: 
                </Typography>
                <Rating
                sx={{
                    color: '#EA6A12',
                }}
                icon={<StarRoundedIcon/>}
                emptyIcon={<StarRoundedIcon/>}
                />
                </Stack>
                <Stack direction="row" spacing={1}>
                <Checkbox sx={{
                    color: '#EA6A12',
                    '&.Mui-checked': {
                        color: '#EA6A12'
                    }
                }}/>
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: '12px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                        display: 'inline-block'
                    }}
                    >I will recommend this product to my friends and family 
                </Typography>
                </Stack>
                <Button variant="contained" 
                    onClick={()=>{setCmt(false)}}
                    sx={{
                        backgroundColor: '#EA6A12',
                        borderRadius: '100px',
                        alignSelf: 'center',
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
                comments.length > 0 ? 
                comments.map(comment =>{
                    return(
                            <ListItem>
                                <Comment comment = {comment}/>
                            </ListItem>
                    )
                })
                : 
                <Typography variant="h6"
                    sx={{
                        alignSelf: 'start',
                        fontFamily: 'Poppins',
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
        </Box>
        
    )
}