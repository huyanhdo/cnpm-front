import React, { useEffect } from 'react';
import {Box, Typography} from '@mui/material'
import { useState } from 'react';
import './index.css'



function OrderDetail(props) {
    const {detailItem, detailId, Status} = props;
    
    const detailURL = `https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app/order/${detailId}.json`
    
    
    
    const [status, setStatus] = useState('')
    
    const detail = detailItem.detail;
    const detailKeys = Object.keys(detail)
    const [menu, setMenu] = useState({});
    const day = new Date();
    
    day.setTime(detailItem.time)
    
    let date = day.getDate();
    let month = day.getMonth();
    let year = day.getFullYear();
    let hour = day.getHours();
    let minute = day.getMinutes();

    useEffect(()=>{
        async function fetchMenu() {
            const menuURL = 'https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app/menu.json';
            const response = await fetch(menuURL);
            const responseJSON = await response.json();
            
            setMenu(responseJSON);
            setStatus(Status);
            
            
        }
        fetchMenu();
    },[])
    function putData(data, callback){
        var option = {
            method:'PUT',
            body:JSON.stringify(data)
        };
        fetch(detailURL, option)
        .then(function(response){
            response.json();
        })
        .then(callback)
    }

    const onHanleSubmitStatus = value=> {
        setStatus(value);
        if (value !== detailItem.status){
            const data = { ...detailItem,
                status: value
                        }
            
            putData(data);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }
    
    
    
    return (
        <div>
            <Box sx={{
                padding: '24px',
                
            }}>
                <Typography 
                variant='h2'
                sx ={{
                   
                    fontSize:'25px',
                    fontWeight:600,
                    borderBottom:'1px solid white ',
                    padding:'0 0 24px 0'
                }}
                >
                    {detailItem.customer}
                </Typography>
                <Box sx={{
                    marginTop:'20px',   
                    
                    textAlign:'start',
                    display:'flex',
                    
                    
                }}>
                    <Box sx={{
                        width:'100px'
                    }}><h4 style={{
                        fontSize:'20px'
                    }}> Đơn Hàng</h4></Box>
                    <Box sx={{
                        marginLeft:'50px',
                        minWidth:'300px'
                    }}>
                        <table>
                            <tr>
                                <th style={{width:'75%'}}>Món</th>
                                <th style={{width:'25%', textAlign:'center'}}>Số Lượng</th>
                            </tr>
                            
                            {detailKeys.map((items)=>{
                                
                                
                                if((Object.keys(menu)).length === 0 && menu.constructor === Object) return;
                                return(detail[items].map( (item)=>{
                                    
                                const id = item.id;
                                
                            
                                var name = '';
                                const number = item.number;
                                
                                switch(items){
                                    case 'drink': name = menu['menu_drink'][id].title; break;
                                    case 'pizza': name = menu['menu_main_courses'][id].title; break;
                                    case 'appetizer': name = menu['menu_appetizer'][id].title; break;
                                    case 'kid': name = menu['menu_kid'][id].title; break;
                                    case 'dessert': name = menu['menu_dessert'][id].title; break;
                                    case 'vegetable': name = menu['menu_vegetarian'][id].title; break;
                                 }
                                 
                                return(
                                    <tr>
                                        <td style={{padding:'5px 0'}}>{name}</td>
                                        <td style={{padding:'5px 0',textAlign:'center'}}>{number}</td>
                                    </tr>
                                )
                            }))

                            })}
                        
                        </table>
                    </Box>
                </Box>
                <Box sx={{
                    marginTop:'20px',   
                    
                    textAlign:'start',
                    display:'flex',
                    
                    
                }}>
                    <Box sx={{
                        width:'100px'
                    }}><h4 style={{
                        fontSize:'20px'
                    }}> Tổng </h4></Box>
                    <Box sx={{
                        marginLeft:'50px'
                    }}><p>{detailItem['total payment'] }</p></Box>
                </Box>
                <Box sx={{
                    marginTop:'20px',   
                    
                    textAlign:'start',
                    display:'flex',
                    
                    
                }}>
                    <Box sx={{
                        width:'100px'
                    }}><h4 style={{
                        fontSize:'20px'
                    }}> Phí ship </h4></Box>
                    <Box sx={{
                        marginLeft:'50px'
                    }}><p>{ detailItem['shipping payment']}</p></Box>
                </Box>
                <Box sx={{
                    marginTop:'20px',   
                    
                    textAlign:'start',
                    display:'flex',
                    
                    
                }}>
                    <Box sx={{
                        width:'100px'
                    }}><h4 style={{
                        fontSize:'20px'
                    }}> Tổng đơn </h4></Box>
                    <Box sx={{
                        marginLeft:'50px'
                    }}><p>{detailItem['total payment'] + detailItem['shipping payment']}</p></Box>
                </Box>
                <Box sx={{
                    marginTop:'20px',   
                    
                    textAlign:'start',
                    display:'flex',
                    
                    
                }}>
                    <Box sx={{
                        width:'100px'
                    }}><h4 style={{
                        fontSize:'20px'
                    }}> SĐT </h4></Box>
                    <Box sx={{
                        marginLeft:'50px'
                    }}><p>{detailItem.phone}</p></Box>
                </Box>
                <Box sx={{
                    marginTop:'20px',   
                    
                    textAlign:'start',
                    display:'flex',
                    
                    
                }}>
                    <Box sx={{
                        width:'100px'
                    }}><h4 style={{
                        fontSize:'20px'
                    }}> Địa chỉ </h4></Box>
                    <Box sx={{
                        marginLeft:'50px'
                    }}><p>{detailItem.address}</p></Box>
                </Box>
                <Box sx={{
                    marginTop:'20px',   
                    
                    textAlign:'start',
                    display:'flex',
                    
                    
                }}>
                    <Box sx={{
                        width:'100px'
                    }}><h4 style={{
                        fontSize:'20px'
                    }}> Thời gian </h4></Box>
                    <Box sx={{
                        marginLeft:'50px'
                    }}><p>{`${hour}:${minute}  Ngày ${date}/${month}/${year}`}</p></Box>
                </Box>

                <Box sx={{
                    marginTop:'20px',   
                    
                    textAlign:'start',
                    display:'flex',
                    
                    
                }}>
                    <Box sx={{
                        width:'100px'
                    }}><h4 style={{
                        fontSize:'20px'
                    }}> Trạng thái </h4></Box>
                    <Box sx={{
                        marginLeft:'50px'
                    }}> 
                    <button  className={(( status==='' && Status==="Pending")||(status==="Pending"))? "status" : ""} 
                    onClick={()=>{onHanleSubmitStatus('Pending')}}
                    style={{
                        width:'91px',
                        height:'26px',
                        lineHeight:'15px',
                        borderRadius:'30px',
                        border: 'none',
                        marginRight:'10px'
                    }
                    }>Pending
                    </button>
                    <button  className={(( status==='' && Status==="Preparing")||(status==="Preparing"))? "status" : ""} 
                    onClick={()=>{onHanleSubmitStatus('Preparing')}}
                    style={{
                        width:'91px',
                        height:'26px',
                        lineHeight:'15px',
                        borderRadius:'30px',
                        border: 'none',
                        marginRight:'10px'
                    }
                    }>Preparing
                    </button>
                    <button  className={(( status==='' && Status==="Shipping")||(status==="Shipping"))? "status" : ""}
                    onClick={()=>{onHanleSubmitStatus('Shipping')}}
                     style={{
                        width:'91px',
                        height:'26px',
                        lineHeight:'15px',
                        borderRadius:'30px',
                        border: 'none',
                        marginRight:'10px'
                    }
                    }>Shipping
                    </button>
                    <button   className={(( status==='' && Status==="Completed")||(status==="Completed"))? "status" : ""} 
                    onClick={()=>{onHanleSubmitStatus('Completed')}}
                    style={{
                        width:'91px',
                        height:'26px',
                        lineHeight:'15px',
                        borderRadius:'30px',
                        border: 'none'
                    }
                    
                    }>Completed
                    </button>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default OrderDetail;