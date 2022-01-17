import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import styles from "./dashboard.module.css"
import { Box } from '@mui/system';
import { Typography} from '@mui/material';
import React, {useEffect,useState} from 'react';
import {Home} from '../pages/Home';
import { useAuth } from '../context/AuthContext';
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
                                <th style={{width:'20%',color:'black',fontSize:'30px'}}>Ảnh</th>
                                <th style={{width:'50%',color:'black',fontSize:'30px',textAlign:'start',paddingLeft:'10%' }}>Món</th>
                                <th style={{width:'30%',color:'black',fontSize:'30px',textAlign:'start'  }}>Menu</th>
                            </tr>
            {mostList.map(v=>
                <tr style={{borderSpacing:'10px'}}>
                    <td style={{textAlign:'center'}}>
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
                                    color:'black',
                                    paddingLeft:'20%'
                                }}>{v.title}</Typography>
                        <Typography variant='p' sx={{
                                    marginTop:'8px',
                                    fontWeight:550,
                                    fontSize:'15px',
                                    textAlign:'start',  
                                    color:'gray',
                                    paddingLeft:'20%',
                                    
                                }}>{`${v.order_number} dishes ordered`}
                        </Typography>
                        </Box>
                    </td>
                    <td>
                    <Typography variant='h1' sx={{
                                    
                                    fontWeight:550,
                                    fontSize:'28px',
                                    textAlign:'start',
                                    color:'black',
                                    
                                }}>{v.category}</Typography>
                    </td>
                </tr>)}
            </table>
        </Box>
        
    )

                
    
}



const Dashboard =() =>{
    const {currentUser} = useAuth();
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
            currentUser ? 
            <Box 
                sx={{
                backgroundColor: '#FFE6CC',
                width:'80%',
                height:'100%',
                marginLeft:'10%',
                marginRight:'10%'
            }}>
                <Box py={1}></Box>
                <Box sx={{
                display:'flex',
                justifyContent:'space-evenly',
                alignItems:'rows',
                 }}>
                
                    <Box sx={{
                        width:'200px',
                        backgroundColor:'#F9C4A6',
                        height:'150px',
                        borderRadius:'8px',
                        padding:'16px'
                    }}> 
                    <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <Box sx={{
                        width:'38px',
                        height:'38px',
                        backgroundColor:'#FFD3A8',
                        padding:'5px',
                        borderRadius:'8px',
                    }}>
                    <MonetizationOnRoundedIcon sx={{color:'#ffbe0b'}}/>
                    </Box>
                    <Box pl={1}></Box>
                    <Typography variant='h3' sx={{
                        marginTop:'8px',
                        fontWeight:500,
                        fontSize:'20px',
                        textAlign:'start',
                        color:'#252836'
                    }}>Doanh thu</Typography>
                    </Box>
                    <Typography variant='h1' sx={{
                        marginTop:'10%',
                        fontWeight:550,
                        fontSize:'28px',
                        textAlign:'start',
                        color:'black'
                    }}>{`${totalpay} K`}</Typography>
                    </Box>

                    <Box sx={{
                        width:'200px',
                        backgroundColor:'#F9C4A6',
                        height:'150px',
                        borderRadius:'8px',
                        padding:'16px'
                    }}> 
                    <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <Box sx={{
                        width:'38px',
                        height:'38px',
                        backgroundColor:'#FFD3A8',
                        padding:'5px',
                        borderRadius:'8px',
                    }}>
                    <BookmarkRoundedIcon sx={{color:'#E97500'}}/>
                    </Box>
                    <Box pl={1}></Box>
                    <Typography variant='h3' sx={{
                        marginTop:'8px',
                        fontWeight:500,
                        fontSize:'20px',
                        textAlign:'start',
                        color:'#252836'
                    }}>Tổng món</Typography>
                    </Box>
                    <Typography variant='h1' sx={{
                        marginTop:'10%',
                        fontWeight:550,
                        fontSize:'28px',
                        textAlign:'start',
                        color:'black'
                    }}>{`${totaldish}`}</Typography>
                    </Box>
                    <Box sx={{
                        width:'200px',
                        backgroundColor:'#F9C4A6',
                        height:'150px',
                        borderRadius:'8px',
                        padding:'16px'
                    }}> 
                    <Box sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <Box sx={{
                        width:'38px',
                        height:'38px',
                        backgroundColor:'#FFD3A8',
                        padding:'5px',
                        borderRadius:'8px',
                    }}>
                    <AccountCircleRoundedIcon sx={{color:'#1d3557'}}/>
                    </Box>
                    <Box pl={1}></Box>
                    <Typography variant='h3' sx={{
                        marginTop:'8px',
                        fontWeight:500,
                        fontSize:'20px',
                        textAlign:'start',
                        color:'#252836'
                    }}>Tổng đơn</Typography>
                    </Box>
                    <Typography variant='h1' sx={{
                        marginTop:'10%',
                        fontWeight:550,
                        fontSize:'28px',
                        textAlign:'start',
                        color:'black'
                    }}>{`${totalcustomer}`}</Typography>
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
                    color:'black'
                }}>Món nổi bật nhất </Typography>
                    
                            
                </Box>
                <hr className={styles.hr}/>
                <MostOrder/>
            </Box> : <Home/>
            
        
    );
}
export default Dashboard