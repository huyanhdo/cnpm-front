import React, { useEffect, useState } from 'react';
import {Box, Typography} from '@mui/material';
import { CustomPagination } from '../../components/pizzaMenu';
import './index.css'
import OrderDetail from '../../components/OrderReport/OrderDetail';




function OrderReport() {
    const [OrderLists, setOrderLists] = useState(
        {
    });
    
    
    

    
    // const keys = Object.keys(OrderLists)
    const [keys, setKeys] = useState([])
    const maxrow = 9;
    const totalPage = Math.ceil(keys.length / maxrow);
    
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
            setKeys(keys);
            setDetailItem(keys[0]);
            setStatus(responseJSON[keys[0]].status)
            
        }

        fetchOrderLists();
    },[])  
    
    console.log(keys[0]);
    console.log(detailItem);
    
    return (
        <div style={{
            display:'flex',
            justifyContent:'space-between'
        }
        }>
            <Box sx={{width:'750px',
            padding :'0 0 20px 0',
            
            backgroundColor:'#ffe6cc',
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
                    fontSize: '20px',
                    
                    justifyContent:'left',
                    textAlign: 'start',
                    
                    
                }}>
                    Order Report
                </Typography>
                
                </Box>

                <Box sx={{
                    marginLeft:'24px'
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
                            }}>Khách hàng</th>
                            <th className='th-Order' style={{
                                width:'30%'
                            }}>Menu</th>
                            <th className='th-Order' style={{
                                width: '20%'
                            }}>Tổng Đơn</th>
                            <th className='th-Order' style={{
                                width:'20%'
                            }}>Trạng Thái</th>
                        </tr>
                        {OrderList.map((order,index) => { 
                                                    
                                                    var key = Object.keys(OrderLists[order].detail);
                                                    var menu = '';
                                                    key.forEach((item)=>{
                                                        menu += item + ', '
                                                    })
                                                    menu = menu.slice(0, menu.length-2)
                                                
                                        return(
                            <tr className="Order"
                                tabIndex="0"            
                                 style ={{ cursor:'pointer',
                                }}
                                 onClick={()=>{setDetailItem(order); setStatus(OrderLists[order].status)}} >
                                <td style={{paddingLeft:'20px'}}>{OrderLists[order].customer}</td>
                                <td>{menu}</td>
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
                backgroundColor:'#ffe6cc',
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
        </div>
    );
}

export default OrderReport;