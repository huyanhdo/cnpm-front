import react from'react';
import '../assets/styles/Home.css';
import Header from '../component/Header';
import SideBar from '../component/SideBar';
const Home=()=>{
    return(
    <div className='homePage'
    style={{
        display:'flexbox',
        flexDirection:'row'
    }}>
    <div className='sideBar'><SideBar/></div>
    <div className='content' style={{
        flexGrow:'1',
    }}>
        <div className="header">
            <Header/>
        </div>
        <div></div> 
        </div>
  </div>
  )
}

export default Home;