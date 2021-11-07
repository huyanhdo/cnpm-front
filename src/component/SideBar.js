import react from 'react';
import TicketIcons from '../assets/icons/Ticket Star.png';
import Category  from '../assets/icons/Category.png';
import PeopleIcons from '../assets/icons/people.png'
import ShieldIcons from '../assets/icons/Shield Done.png';
import WalletIcons from '../assets/icons/Wallet.png';
import '../assets/styles/SideBar.css';
import Logo from '../assets/icons/Logo.png';
const SideBar = ()=>{
    return (
        <ul className='sideBar' style={{
            paddingTop:'0',
            paddingBottom:'10px',
            margin:'0 0 0 0',
            paddingLeft:"0",
            listStyle:"none",
            textAlign:'center',
            width:'120px',
            align:'left'
        }}>
            <li>
                <img src={Logo}/>
           </li>
            <li>
                <img src={Category}/>
           </li>
           <li>
                <img src={TicketIcons}/>
           </li>
           <li>
                <img src={PeopleIcons}/>
           </li>
           <li>
                <img src={ShieldIcons}/>
           </li>
           <li>
                <img src={WalletIcons}/>
           </li>

        </ul>
    )
}

export default SideBar;