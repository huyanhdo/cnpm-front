import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import styles from "./dashboard.module.css"
import { Box } from '@mui/system';
import { Button, Stack, Typography, IconButton, Divider , Collapse, Tabs, Modal, Fade, Grow} from '@mui/material';
import { ListItem } from '@mui/material';

import axios from 'axios'
import SplitButton from './splitButton';
import { ListItemButton } from '@mui/material';
import { useSelector } from "react-redux";
import React, {useEffect,useState} from 'react';
export const MostOrder=()=>{
    const [menu, setMenu] = useState({});
    const [status,setStatus]=useState('pending');
    const[mostList,setmostList]=useState([]);
    useEffect(()=>{
        async function fetchMenu() {
            
            const menuURL = 'https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app/menu.json';
            setStatus('pending')
            const response = await fetch(menuURL);
            const responseJSON =await response.json();
            setMenu(responseJSON);
            if(response.status===200){
                setStatus('success')
                const array=[];
                    for(const entry of Object.entries(responseJSON)){
                    
                            
                        const v=Object.values(entry[1])
                        v.sort((v1,v2)=>v2.order_number-v1.order_number)
                        v[0].category=entry[0];
                        array.push(v[0])
                        
        }setmostList(array)
            
            }
            else{
                setStatus('fail')
            }
            
        }
        fetchMenu();
    },[])
    
    
       
    
    

        
    return status==='success'&&(
        <Box sx={{ 
        display: 'grid',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: '0px'
        }}>
             <table className={styles.table}>
                            <tr>
                                <th style={{width:'20%',color:'white',fontSize:'30px'}}>Ảnh</th>
                                <th style={{width:'50%',color:'white',fontSize:'30px' }}>Món</th>
                                <th style={{width:'30%',color:'white',fontSize:'30px'}}>Menu</th>
                            </tr>
            {mostList.map(v=>
                <tr style={{borderSpacing:'10px'}}>
                    <td>
                    <img
                    src={v.image_url}
                    alt=''
                    style={{
                        
                        borderRadius: '200px',
                        width: '80px',
                        height: '80px',
                       
                    }}
                    />
                    </td>
                    <td style={{textAlign:'start'}}>
                        <Box>
                        <Typography variant='h1' sx={{
                                    marginTop:'8px',
                                    fontWeight:550,
                                    fontSize:'28px',
                                    textAlign:'start',
                                    color:'white'
                                }}>{v.title}</Typography>
                        <Typography variant='p' sx={{
                                    marginTop:'8px',
                                    fontWeight:550,
                                    fontSize:'15px',
                                    textAlign:'start',  
                                    color:'gray'
                                    
                                }}>{`${v.order_number} dishes ordered`}
                        </Typography>
                        </Box>
                    </td>
                    <td>
                    <Typography variant='h1' sx={{
                                    
                                    fontWeight:550,
                                    fontSize:'28px',
                                    textAlign:'center',
                                    color:'white',
                                    
                                }}>{v.category}</Typography>
                    </td>
                </tr>)}
            </table>
        </Box>
        
    )

                
    
}



const Dashboard =(props) =>{
   
    const [OrderLists,setOrderLists]=useState([]);
    useEffect(()=>{
        async function fetchOrderLists() {
            const requestUrl='https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app/order.json';
            const response = await fetch(requestUrl);
            const responseJSON = await response.json();

            setOrderLists(responseJSON);
            
            
        }

        fetchOrderLists();
    },[])  
    
    let totalpay = 0;
    let totaldish = 0;
    let totalcustomer =Object.values(OrderLists).length;    
    
    Object.values(OrderLists).forEach(order => {
        totalpay += order['total payment'];
        
        
        const detail = order.detail;
        for (var pizza in detail){
            totaldish += detail[pizza].length;
        }
    });

    totalpay /= 1000;
    
    return (
       
            <Box sx={{
                
                backgroundColor: '#252836',
                width:'100%',
                height:'100%',
            }}>
                <Box sx={{
                display:'flex',
                justifyContent:'space-between',
                alignItems:'flex-start',
                
                 }}>
                
                    <Box sx={{
                        minWidth:'30%',
                        backgroundColor:'#1F1D2B',
                        minHeight:'15%',
                        borderRadius:'8px',
                        padding:'16px'
                    }}> 
                    <Box sx={{
                        width:'38px',
                        height:'38px',
                        backgroundColor:'#252836',
                        padding:'5px',
                        borderRadius:'8px'
                    }}>
                    <MonetizationOnRoundedIcon sx={{color:'#9288E0'}}/></Box>
                    <Typography variant='h1' sx={{
                        marginTop:'8px',
                        fontWeight:550,
                        fontSize:'28px',
                        textAlign:'start',
                        color:'white'
                    }}>{`${totalpay} K`}</Typography>
                    <Typography variant='h3' sx={{
                        marginTop:'8px',
                        fontWeight:500,
                        fontSize:'14px',
                        textAlign:'start',
                        color:'#ABBBC2'
                    }}>Total Revenue</Typography>
                    </Box>
                    <Box sx={{
                        width:'30%',
                        backgroundColor:'#1F1D2B',
                        height:'15%',
                        borderRadius:'8px',
                        padding:'16px'
                    }}>
                        <Box sx={{
                        width:'38px',
                        height:'38px',
                        backgroundColor:'#252836',
                        padding:'5px',
                        borderRadius:'8px'
                    }}>
                    <BookmarkRoundedIcon sx={{color:'#FFB572'}}/></Box>
                    <Typography variant='h1' sx={{
                        marginTop:'8px',
                        fontWeight:550,
                        fontSize:'28px',
                        textAlign:'start',
                        color:'white'
                    }}>{totaldish}</Typography>
                    <Typography variant='h3' sx={{
                        marginTop:'8px',
                        fontWeight:500,
                        fontSize:'14px',
                        textAlign:'start',
                        color:'#ABBBC2'
                    }}>Total Dish Ordered</Typography>
                    </Box>
                    <Box sx={{
                        width:'30%',
                        backgroundColor:'#1F1D2B',
                        height:'15%',
                        borderRadius:'8px',
                        padding:'16px'
                    }}>
                        <Box sx={{
                        width:'38px',
                        height:'38px',
                        backgroundColor:'#252836',
                        padding:'5px',
                        borderRadius:'8px'
                    }}>
                    <AccountCircleRoundedIcon sx={{color:'#65B0F6'}}/></Box>
                    <Typography variant='h1' sx={{
                        marginTop:'8px',
                        fontWeight:550,
                        fontSize:'28px',
                        textAlign:'start',
                        color:'white'
                    }}>{totalcustomer}</Typography>
                    <Typography variant='h3' sx={{
                        marginTop:'8px',
                        fontWeight:500,
                        fontSize:'14px',
                        textAlign:'start',
                        color:'#ABBBC2'
                    }}>Total Customer </Typography>
                    </Box>
                    </Box>
                    <br/>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0px',
                }}>
                    <Typography variant='h1' sx={{
                    marginTop:'8px',
                    fontWeight:550,
                    fontSize:'50px',
                    textAlign:'center',
                    color:'white'
                }}>Most Ordered </Typography>
                    
                            
                </Box>
                <hr className={styles.hr}/>
                <MostOrder/>
            </Box>
            
        
    );
}
export default Dashboard