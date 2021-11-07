import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Avatar from '@mui/material/Avatar';
import '../../assets/styles/Header.css';
import SplitButton from './SplitButton';
const Tools = ()=>{
    return(
    <ul style={
        {
            paddingTop:'10px',
            paddingBottom:'10px',
            listStyle:"none",
            textAlign:'center',
            margin:'0'
        }
    }>
        <li className='toolItems'><NotificationsIcon/></li>
        <li className='toolItems'><EmailIcon/></li>
        <li className='toolItems'><ShoppingBasketIcon/></li>

        <li className='toolItems'>
            <div style={{display:'flex',textAlign:'center'}}>
            <Avatar >H</Avatar>
            <h2 style={{margin:'0',paddingLeft:'20px',width:'auto'}}> huy anh</h2>
            {/* <SplitButton/> */}
            </div>
        </li>
    </ul>
    )
}

export default Tools;
