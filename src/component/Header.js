import React from 'react';
import SearchBar from './Header/SearchBar';
import Tools from './Header/Tools';
const Header = ()=>{
    return (
        <div className='header'style={{
            display:'inline-block',
            bottomPadding:'none',
           // borderBottom:'solid',
            width:'100%'
        }}> 
        <div style={{float:'left' }}> <SearchBar/> </div>
        <div style={{float:'right',verticalAlign:'baseline',position:'relative'}}><Tools/></div>
        </div>
    )
}

export default Header;