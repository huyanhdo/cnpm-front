import React, {useState} from "react";
import {Box, Button, Typography, Modal, TextField, Fade, Stack} from '@mui/material';
import { Cart } from "../components/mainCart";
import { useSelector, useDispatch } from "react-redux";
import {itemRemoved} from '../store/cartSlice';
import { itemRemoved as comboRemoved, itemUpdated as comboUpdated } from "../store/cartComboSlice";
import { itemRemoved as extraRemoved, itemUpdated as extraUpdated } from "../store/cartExtraSlice";
const round = (num)=> Math.round(num * 100) / 100;
export const CartPage = ()=>{
    const dispatch = useDispatch();
    const [pay, SetPay] = useState(false);
    const cart = useSelector(state => state.cart);
    const cartExtras = useSelector(state => state.cartExtras);
    const cartCombos = useSelector(state => state.cartCombos);
    const totalPizza = cart.ids.reduce((total, itemId)=>{return round(total + cart.entities[itemId].total)}, 0);
    const totalExtra = cartExtras.ids.reduce((total, itemId) => {return round(total + cartExtras.entities[itemId].total)}, 0);
    const totalCombo = cartCombos.ids.reduce((total, itemId) => {return round(total + cartCombos.entities[itemId].total)}, 0);
    const [totalValue, SetTotalValue] = useState(totalPizza + totalExtra + totalCombo);
    const handleCartChange = (_id)=>{
        SetTotalValue(prev => round(prev - cart.entities[_id].total));
        dispatch(itemRemoved(_id));
    }
    const handleComboChange = (_id, remove ,add, delta, newData)=>{
        if(remove){
            SetTotalValue(prev => round(prev - delta));
            dispatch(comboRemoved(_id));
        }else{
            if(add){
                SetTotalValue(prev => round(prev + delta));
            }else{
                SetTotalValue(prev => round(prev - delta));
            }
            
            dispatch(comboUpdated({
                id: _id,
                data: newData
            }))
            
        }
    }   
    const handleExtraChange = (_id, remove ,add, delta, newData)=>{
        if(remove){
            SetTotalValue(prev => round(prev - delta));
            dispatch(extraRemoved(_id));
        }else{
            if(add){
                SetTotalValue(prev => round(prev + delta));
            }else{
                SetTotalValue(prev => round(prev - delta));
            }
            
            dispatch(extraUpdated({
                id: _id,
                data: newData
            }))
            
        }
    }   
    return(
            <Box style={{
                width: '100%',
                }}>
                <Cart style={{zIndex: 0}} handleCartChange = {handleCartChange} 
                handleComboChange={handleComboChange}
                handleExtraChange={handleExtraChange}
                />
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center', marginBottom: '100px'
                }}
                >
                    <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start'
                    }}
                    >Total: $ {totalValue}
                    </Typography>
                    <Button variant="contained" 
                    disabled = {totalValue < 0.01}
                    onClick = {()=>{SetPay(true)}}
                    sx={{
                        zIndex: 10,
                        backgroundColor: '#EA6A12',
                        borderRadius: '50px',
                        fontFamily: 'Poppins',
                        fontWeight: 'normal',
                        fontSize: '16px',
                        width: '100px',
                        lineHeight: '175%',
                        color: 'white',
                        '&:hover, &:active':{
                            backgroundColor: '#f57c00'
                        },
                    }}
                >
                    Order
                </Button>
                </Box>
                <Modal open={pay} onClose = {() => {SetPay(false)}}>
            <Fade in={pay} timeout={500}>
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
                width: '500px'
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
                    >Please fill this form
                </Typography>
                <Stack direction= "row" spacing={3}>
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
                required
                id="name-field"
                label="Phone Number"
                multiline
                type="number"
                maxRows={1}
                color='warning'
                inputProps={{style: {fontFamily: 'Poppins'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                sx={{
                    width: '60%'
                }}
                />
                </Stack>
                
                <TextField
                required
                id="name-field"
                label="Email"
                multiline
                maxRows={1}
                color='warning'
                inputProps={{style: {fontFamily: 'Poppins'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                />
                <TextField
                required
                id="name-field"
                label="Address"
                multiline
                maxRows={1}
                color='warning'
                inputProps={{style: {fontFamily: 'Poppins'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                />
                <TextField
                color='warning'
                id="name-field"
                label="Note"
                multiline
                rows={2}
                maxRows = {2}
                inputProps={{style: {fontFamily: 'Poppins'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                />
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: '15px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                    }}
                    >Shipping Fee: $1.00
                </Typography>
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: '20px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                    }}
                    >Total Pay: $ {totalValue + 1.00}
                </Typography>
                <Button variant="contained" 
                    onClick={()=>{SetPay(false)}}
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
                        marginBottom: 2,
                        width: '150px'
                    }}
                    >
                    Order
                </Button>
            </Stack>
            </Fade>
            </Modal>
            </Box>
    )
}