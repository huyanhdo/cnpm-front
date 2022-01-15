import React, { useEffect, useState } from 'react';
import {Box, Typography} from '@mui/material';
import { CustomPagination } from '../../components/pizzaMenu';
import './index.css'
import OrderDetail from '../../components/OrderReport/OrderDetail';
import { useAuth } from '../../context/AuthContext';
import { Home } from '../Home';
function OrderReport() {
    const [OrderLists, setOrderLists] = useState(
        {
    });
        
    // const keys = Object.keys(OrderLists)
    const [keys, setKeys] = useState([])
    const maxrow = 9;
    const totalPage = Math.ceil(keys.length / maxrow);
    const {currentUser} = useAuth();
    const [page, setPage] = useState(1);
    const [orderStart, setOrderStart] = useState(0);
    const [orderEnd, setOrderEnd] = useState(8);
    const [detailItem, setDetailItem] = useState(keys[0])
    const [status, setStatus] = useState('')
    
    
    const OrderList = keys.slice(orderStart, orderEnd +1)
    useEffect(()=>{
        async function fetchOrderLists() {
            const requestUrl='https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app/order.json';
            const response = await fetch(requestUrl);
            const responseJSON = await response.json();
            
            setOrderLists(responseJSON);
            const keys = Object.keys(responseJSON).reverse();
            console.log(responseJSON);
            setKeys(keys);
            setDetailItem(keys[0]);
            setStatus(responseJSON[keys[0]].status)
            
        }

        fetchOrderLists();
    },[])  
    
    console.log(keys[0]);
    console.log(detailItem);
    
    return (
        currentUser ?
        <div style={{
            display:'flex',
            justifyContent:'space-between'
        }
        }>
            <Box sx={{width:'750px',
            padding :'0 0 20px 0',
            
            backgroundColor:'rgba(252, 237, 227, 0.3)',
            borderRadius:'8px',
            minHeight:'750px',
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between'
            }}>
                <Box><Box sx={{
                    padding:'33px 24px'
                }}>
                <Typography variant="h2"
                sx={{
                    fontWeight: 600,
                    fontSize: '30px',
                    justifyContent:'left',
                    textAlign: 'center',

                    
                    
                }}>
                    Thông tin đơn hàng
                </Typography>
                
                </Box>

                <Box sx={{
                    
                }}>
                    <table style={{
                        width:'100%'
                    }}>
                        <tr style={{
                            borderBottom:' 1px solid white',
                            
                        }}>
                            <th className='th-Order' style={{
                                width:'30%',
                                paddingLeft:'20px'
                            }}>ID</th>
                            <th className='th-Order' style={{
                                width:'20%',
                                paddingLeft:'20px'
                            }}>Khách hàng</th>
                            <th className='th-Order' style={{
                                width:'20%',
                                textAlign:'center'
                            }}>Thời gian</th>
                            <th className='th-Order' style={{
                                width: '15%'
                            }}>Tổng Đơn</th>
                            <th className='th-Order' style={{
                                width:'15%',
                                
                            }}>Trạng Thái</th>
                        </tr>
                        {OrderList.map((order,index) => { 
                                                    
                                                    //var key = Object.keys(OrderLists[order].detail);
                                                    
                                                    const day = new Date();
                                                    day.setTime(OrderLists[order].time);
                                                    let date = day.getDate();
                                                    let month = day.getMonth();
                                                    let year = day.getFullYear();
                                                    let hour = day.getHours();
                                                    let minute = day.getMinutes();
                                                    
                                                
                                        return(
                            <tr className="Order"
                                tabIndex="0"            
                                 style ={{ cursor:'pointer',
                                 
                                }}
                                 onClick={()=>{setDetailItem(order); setStatus(OrderLists[order].status)}} >
                                <td style={{paddingLeft:'10px'}}>{order}</td>
                                <td style={{paddingLeft:'10px'}}>{OrderLists[order].customer}</td>
                                <td style={{textAlign:'center'}}>{`${hour}:${minute} ${date}/${month}/${year}`}</td>
                                <td>{OrderLists[order]['total payment']}</td>
                                <td>
                                    <button  className={OrderLists[order].status} style={{
                                        width:'91px',
                                        height:'26px',
                                        lineHeight:'15px',
                                        borderRadius:'30px',
                                        border: 'none'
                                    }
                                    }>{OrderLists[order].status}
                                    </button>
                                </td>
                            </tr>)
                        })}
                    </table>
                </Box>
                </Box>
               <Box sx={{
                   marginLeft:'35%',
                   flex:'end'
               }}>
                   <CustomPagination 
                   style={{color:'white',
                   
                }}
                   variant="outlined" shape="rounded" count={totalPage}
            onChange={(event, value) => {
                setPage(value); 
                setOrderStart(maxrow * (value - 1)); 
                setOrderEnd(maxrow * value - 1)}} size="large" page={page}/>
        
        </Box>
            </Box>
            <Box>
               
            {OrderLists[detailItem] && <Box sx={{
                backgroundColor:'rgba(252, 237, 227, 0.3)',
                width:'600px',
                minHeight:'750px',
                borderRadius:'8px'
            }}>
                <OrderDetail detailItem={OrderLists[detailItem]}
                detailId = {detailItem}
                Status = {status}/>  
            </Box>
            }
            </Box>
        </div> : <Home/>
    );
}

export default OrderReport;