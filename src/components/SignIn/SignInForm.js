import React,{useState} from 'react';
import{Button,Box,TextField,FormControlLabel,Checkbox} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

const useStyle = makeStyles({
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
          '&.Mui-focused fieldset': {
            borderColor: 'black',
          },
          '& input':{
              height:'8px',
              "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px white inset"
              }
         },
     
        },
        '& fieldset':{
            borderRadius: 100,
            fontFamily: 'Poppins',
            paddingLeft:'10px'
        },      
        width:'80%',

        //marginTop: 15,
        // marginLeft: 20
    }
})
const SignInForm = ()=>{
    const [userName,setUserName] = useState("");
    const [pass,setPass] = useState("");
    const [check,setCheck] = useState(false);
    const [error,setError] = useState("");
    // const {currentUser} = useAuth();
    const {login} = useAuth();
    const navigate = useNavigate();
    const classes = useStyle();
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
           setError('');
           await login(userName,pass);
           navigate('/');
        }
        catch{setError('error')}
    };
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
        <Box sx={{textAlign:'left',width:'100%',paddingLeft:'50px'}}>
        <FormControlLabel
        label="Nhớ mật khẩu"
        control={
            <Checkbox
            sx={{'&.Mui-checked': {
                color: '#EA6A12',
              }}}
            checked={check}
            onChange={()=>setCheck(!check)}
        />}
        />
        </Box>
        <Button variant="contained" 
            onClick = {e => handleSubmit(e)}
            className={classes.button}
        >
            Đăng nhập
        </Button>
        
        </Box>
    )
}

export default SignInForm;