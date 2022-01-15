import { Box, Card, Typography } from '@mui/material';
import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bill } from '../components/bill';
import { fetchOrders } from '../store/orderSlice';
export const OrderPage = () =>{
    const orders = useSelector(state => state.orders)
    const dispatch= useDispatch()
    useEffect(() =>{
        //console.log(orders.ids)
        dispatch(fetchOrders())
    }, [])
    const [currentId, setCurrentId] = useState(0);
    return orders.fetchingStatus === 'SUCCESS' && orders.ids.length > 0 && (
        <Box
        sx={{
            width:"95%",
            margin: "50px",
            display: 'flex',
            justifyContent: 'space-between'
        }}
        >
            <Bill
                    code = {orders.ids[currentId]}
                    order = {orders.entities[orders.ids[currentId]]}
            />  
            <Box sx={{
                width: '40%', p: 5
            }}>
                <Typography variant="h6"
                sx={{
                    fontFamily: 'be Vietnam',
                    fontWeight: 700,
                    fontSize: '30px',
                    lineHeight: '52px',
                    color: '#07143B',
                    textAlign: 'center',
                    marginBottom: '10px',
                    width: '100%'
                }}
                >Danh sách đơn hàng
            </Typography>
            <Box sx={{
                width: '100%',
                overflow: "auto",
                maxHeight: '1000px'
            }}>
            {
                orders.ids.map((id,index) =>
                    <Box
                    sx={{
                        marginBottom: '10px',
                        borderRadius: '24px',
                        fontFamily: 'be Vietnam',
                        fontWeight: 700,
                        fontSize: '16px',
                        lineHeight: '52px',
                        color: index===currentId ? 'white':'#07143B',
                        textAlign: 'center',
                        backgroundColor: index===currentId ? '#EA6A12': 'white',
                        boxShadow: '1px 1px 10px rgb(0,0,0,0.1)'
                    }}
                    onClick = {() =>{
                        setCurrentId(index)
                    }}
                    >
                        {"Mã đơn hàng: " + id}
                    </Box>
                )
            }
            </Box>
            </Box>
        </Box>
    )
}