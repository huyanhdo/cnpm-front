import React,{useState,useRef,useEffect} from 'react';
import{Button,Box,TextField} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
const useStyle = makeStyles({
    forgetPass:{
        textAlign:'left',
        width:'100%',
        paddingLeft:'50px',
        fontFamily:'Poppins',
        '&:hover':{
            fontSize:'20px',
            cursor:'pointer'
        }
    },
    container:{
            width:'100%',
            display:'flex',
            
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column',
    },
    button:{
        '&.MuiButton-root':{
            backgroundColor: '#EA6A12',
            borderRadius: '50px',
            fontFamily: 'Poppins',
            fontWeight: 'normal',
            fontSize: '16px',
            width: '200px',
            lineHeight: '175%',
            color: 'white',
            '&:hover, &:active':{
                backgroundColor: '#f57c00'
            },            
        }
    },
    textField:{
        '& .MuiOutlinedInput-root': {
        borderRadius:100,
        border:'solid',
        borderWidth:'1px',
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
        '& input':{
            height:'8px',
            "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px white inset"
            }
         },
        },
        '& fieldset':{
            border:'none',
            fontFamily: 'Poppins',
            paddingLeft:'10px',
        },      
        width:'80%',
        

    }
})
const SignInForm = ()=>{
    const [userName,setUserName] = useState("");
    const [pass,setPass] = useState("");
    const [error,setError] = useState("");
    const {login} = useAuth();
    const navigate = useNavigate();
    const classes = useStyle();
    const btn = useRef(null);
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
           setError('');
           await login(userName,pass);
           navigate('/');
        }
        catch{setError('error')}
    };


    useEffect(() => {
        const listener = event => {
          if (event.keyCode === 13) {
            event.preventDefault();
            btn.current.click();
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, []);


    return (
        <Box className={classes.container}>
        <Box py={6}></Box>
        <h1 style={{
            fontFamily:'Poppins',
            fontSize:'50px'
        }}>Đăng nhập</h1>
        <Box py={3} sx={{width:'100%'}}>
            {error && 
            <h3 style={{textAlign:'left',justifyContent:'left',fontSize:'15px',opacity:'0.5',marginLeft:'50px',color:'red'}}>
                Tên đăng nhập hoặc mật khẩu không đúng
            </h3>}
        </Box> 
        <Box sx={{width:'100%'}}>
        <h3 style={{textAlign:'left',justifyContent:'left',fontSize:'15px',opacity:'0.5',marginLeft:'50px'}}>Tên đăng nhập</h3>
        <TextField 
            value={userName}
            onChange = { e => setUserName(e.target.value)}
            className={classes.textField} 
       
            placeholder='Tên đăng nhập'/>
        <Box py={1}></Box>
        </Box>

        <Box sx={{width:'100%'}}>
        <h3 style={{textAlign:'left',justifyContent:'left',fontSize:'15px',opacity:'0.5',marginLeft:'50px'}}>Mật khẩu</h3>
        <TextField
            value={pass}
            onChange={e=>setPass(e.target.value)}
            className={classes.textField} 
            type ='password' 
            placeholder='Mật khẩu'/>
        <Box py={1}></Box>
        </Box>
        <Box className={classes.forgetPass}>
        <Link to ='/reset_password' style={{color:'black','&:hover':{textColor:'#EA6A12',}}}> Quên mật khẩu? </Link>
        </Box>
        <Box py={1}></Box>
        <Button variant="contained" 
            onClick = {e => handleSubmit(e)}
            className={classes.button}
            ref = {btn}
        >
            Đăng nhập
        </Button>
        
        </Box>
    )
}

export default SignInForm;