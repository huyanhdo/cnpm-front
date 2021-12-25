import React, {useState} from "react";
import {Box, Button, Typography, Modal, TextField, Fade, Stack, Select, MenuItem, Snackbar} from '@mui/material';
import { Cart } from "../components/mainCart";
import { useSelector, useDispatch } from "react-redux";
import {itemRemoved} from '../store/cartSlice';
import { itemRemoved as comboRemoved} from "../store/cartComboSlice";
import { itemRemoved as extraRemoved, itemUpdated as extraUpdated } from "../store/cartExtraSlice";
import { addOrder } from "../store/orderSlice";
const axios = require('axios')
const round = (num)=> Math.round(num * 100) / 100;
export const EmptyCart = () =>{
    return(
        <Box
        sx={{width: '100%', marginTop: '50px',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
        }}
        >
            <img
            src= 'pizza1.png'
            alt='empty cart'
            style={{
                width: '500px'
            }}
            />
        <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: '35px',
                        lineHeight: '175%',
                        color: '#07143B',
                        textAlign: 'center',
                        marginTop: '50px'
                    }}
                    >Your cart is empty.
                </Typography>
        </Box>

    )
}
export const CartPage = ()=>{
    const dispatch = useDispatch();
    const [pay, SetPay] = useState(false);
    const cart = useSelector(state => state.cart);
    const cartExtras = useSelector(state => state.cartExtras);
    const cartCombos = useSelector(state => state.cartCombos);
    const totalPizza = cart.ids.reduce((total, itemId)=>{return round(total + cart.entities[itemId].total)}, 0);
    let totalExtra = 0;
    Object.keys(cartExtras).map(category => {
        totalExtra += cartExtras[category].ids.reduce((total, itemId) => {return round(total + cartExtras[category].entities[itemId].total)}, 0);
    })
    const totalCombo = cartCombos.ids.reduce((total, itemId) => {return round(total + cartCombos.entities[itemId].total)}, 0);
    const [totalValue, SetTotalValue] = useState(round(totalPizza + totalExtra + totalCombo));
    const handleCartChange = (_id)=>{
        SetTotalValue(prev => round(prev - cart.entities[_id].total));
        dispatch(itemRemoved(_id));
    }
    const handleComboChange = (_id)=>{
        SetTotalValue(prev => round(prev - cartCombos.entities[_id].total));
        dispatch(comboRemoved(_id));
    }   
    const handleExtraChange = (category, _id, remove ,add, delta, newData)=>{
        if(remove){
            SetTotalValue(prev => round(prev - delta));
            dispatch(extraRemoved({id: _id, category: category}));
        }else{
            if(add){
                SetTotalValue(prev => round(prev + delta));
            }else{
                SetTotalValue(prev => round(prev - delta));
            }
            
            dispatch(extraUpdated({
                id: _id,
                category: category,
                ...newData
            }))
            
        }
    }   
    const [customer, setCustomer] = useState('')
    const [phone, setPhone] = useState('')
    const [province, setProvince] = useState('Ha Noi')
    const [address, setAddress] = useState('')
    const [posted, setPosted] = useState(false)
    const [message, setMessage] = useState('')
    const pros = ['Ha Noi', 'Ha Nam', 'Ninh Binh', 'Nam Dinh', 'Hai Duong', 'Hung Yen']
    const validForm = () =>{
        if(customer.length ===0) return false;
        if(address.length ===0) return false;
        if(province.length ===0) return false;
        return /[0-9]{10}/.test(phone)
    }
    const pizzas = useSelector(state => state.pizzas.entities)
    const combos = useSelector(state => state.combos.entities)
    const makeOrder = () =>{
        const shipment = province ==='Ha Noi'? 0 : 30000
        const time = Date.now()
        const detail = {
            'pizza': [],
            'drink': [],
            'vegetable': [],
            'kid': [],
            'appetizer': [],
            'dessert': [],
        }
        const orderedPizzas = []
        if(cart.ids.length > 0){
            cart.ids.map(cartId =>{
                const cartPizza = cart.entities[cartId]
                const pizzaId = cartPizza.pizzaId;
                const pizza = pizzas[pizzaId]
                orderedPizzas.push({
                    id: pizzaId,
                    size: pizza.size[cartPizza.size].type_detail,
                    type: pizza.type[cartPizza.sole],
                    topping: pizza.topping.filter((top,index) => cartPizza.toppings[index] === true).map(top => top.topping_name),
                    number: cartPizza.number
                })
            })
        }
        if(cartCombos.ids.length > 0){
            cartCombos.ids.map(cartId =>{
                const cartCombo = cartCombos.entities[cartId]
                const comboId = cartCombo.comboId
                const combo = combos[comboId]
                const comboNumber = cartCombo.number;
                const pizzaNumber = combo.pizza
                
                if(pizzaNumber && pizzaNumber > 0){
                    const pizzaSlot = cartCombo.pizzaSlot
                    for(let i = 0;i< pizzaNumber;i++){
                        const pizzaInfo = pizzaSlot[i].pizzaInfo
                        const pizzaId = pizzaSlot[i].productId
                        const pizza = pizzas[pizzaId]
                        orderedPizzas.push({
                            id: pizzaId,
                            size: pizza.size[pizzaInfo.size].type_detail,
                            type: pizza.type[pizzaInfo.type],
                            topping: pizza.topping.filter((top,index) => pizzaInfo.topping[index] === true).map(top => top.topping_name),
                            number: comboNumber
                        })
                    }
                }
                const categories = {
                    'drink': {
                        comNumber: combo.drink, slot: cartCombo.drinkSlot
                    },
                    'kid': {
                        comNumber: combo.kid, slot: cartCombo.kidSlot
                    },
                    'appetizer': {
                        comNumber: combo.appetizer, slot: cartCombo.appetizerSlot
                    },
                    'dessert': {
                        comNumber: combo.dessert, slot: cartCombo.dessertSlot
                    },
                    'vegetable': {
                        comNumber: combo.vegetable, slot: cartCombo.vegetableSlot
                    },
                }
                Object.keys(categories).map(category =>{
                const number = categories[category].comNumber;
                if(number && number > 0){
                    const slot = categories[category].slot
                    for(let i = 0;i< number;i++){
                        const id = slot[i].productId
                        const existedIndex = detail[category].findIndex(item => item.id === id)
                        if(existedIndex === -1)detail[category].push({
                            id: id,
                            number: comboNumber
                        })
                        else{
                            detail[category][existedIndex].number += comboNumber
                        }
                    }
                }
                })
            })
        }
        Object.keys(cartExtras).map(category => {
            cartExtras[category].ids.map(id =>{
                const existedIndex = detail[category].findIndex(item => item.id === id)
                        if(existedIndex === -1)detail[category].push({
                            id: id,
                            number: cartExtras[category].entities[id].number
                        })
                        else{
                            detail[category][existedIndex].number += cartExtras[category].entities[id].number
                        }
            })
        })
        detail['pizza'] = orderedPizzas;
        const fullAddress = address + '-' + province
        const order = {
            "customer": customer,
            "phone": phone,
            "address": fullAddress,
            "status": 'Pending',
            "time": time,
            "total payment": totalValue,
            "shipping payment": shipment,
            "detail": detail 
        }
        console.log(order)
        return order
    }
    const postOrder = async () =>{
        const order = makeOrder()
        try{
            const result = await axios.post(
                'https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app/order.json',
                order
            )
            if(result && result.status === 200){
                console.log(result)
                setMessage('Your order has been posted successfully')
                dispatch(addOrder({id:result.data.name, data: order}))
            }
            else setMessage('Opps...Sorry, something went wrong!')
            setPosted(true)
        }catch(err){
            setMessage('Opps...Sorry, something went wrong!')
            setPosted(true)
        }
    }
    return totalValue > 1 ?(
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
                <TextField
                required
                id="name-field"
                label="Name"
                value={customer}
                onChange={(e) =>{
                    setCustomer(e.target.value)
                }}
                multiline
                maxRows={1}
                color='warning'
                inputProps={{style: {fontFamily: 'Poppins'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                />
                <TextField
                required
                id="name-field"
                label="Phone Number"
                value = {phone}
                onChange={(e) =>{
                    setPhone(e.target.value)
                }}
                multiline
                type="number"
                maxRows={1}
                color='warning'
                inputProps={{style: {fontFamily: 'Poppins'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                />
                <Select
                label="Province"
                value={province}
                onChange={(e) =>{
                    setProvince(e.target.value)
                }}
                inputProps={{style: {fontFamily: 'Poppins'}}}
                MenuProps={{style: {fontFamily: 'Poppins'}}}
                SelectDisplayProps={{style: {fontFamily: 'Poppins'}}}
                color='warning'
                >
                    {
                        pros.map(pro => 
                            <MenuItem 
                            value={pro}
                            sx={{
                                fontFamily: 'Poppins'
                            }}
                            >
                                {pro}
                            </MenuItem>    
                        )    
                    }
                </Select>
                <TextField
                required
                id="name-field"
                label="Address"
                multiline
                value={address}
                onChange={(e) =>{
                    setAddress(e.target.value)
                }}
                maxRows={1}
                color='warning'
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
                    >Shipping Fee: {province ==='Ha Noi'? 0 : 30000}
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
                    >Total Pay: {totalValue + (province ==='Ha Noi'? 0 : 30000)}
                </Typography>
                <Button variant="contained" 
                    disabled={!validForm()}
                    onClick={()=>{
                        postOrder()
                        SetPay(false)
                    }}
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
            <Snackbar
        open={posted}
        onClose={() => {setPosted(false)}}
        message={message}
        autoHideDuration={6000}
        />
            </Box>
    ): <EmptyCart/>
}