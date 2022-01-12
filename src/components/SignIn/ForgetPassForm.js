import React,{useState,useEffect,useRef} from 'react';
import{Button,Box,TextField} from '@mui/material';
import { makeStyles } from '@mui/styles';
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
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
        borderRadius:100,
        border:'solid',
        borderWidth:'1px',
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



const ForgetPassForm = ()=>{
    const [email,setEmail] = useState("");
    const [submited,setSubmited] = useState(false);
    const {resetPassword} = useAuth();
    const classes = useStyle();
    const [error,setError] = useState('');
    const btn = useRef(null);
    const handleResetPassword= async (e)=>{
        e.preventDefault();
        if (!email){
            setError('error');
            return;
        }
        try{
           setError('');
           await resetPassword(email);
           setSubmited(true);
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
        <>
        {!submited?
        <Box className={classes.container}>
        <Box py={6}></Box>
        <h1 style={{
            fontFamily:'Poppins',
            fontSize:'50px'
        }}>Quên mật khẩu</h1>
        <Box py={3} sx={{width:'100%'}}>
        {error && <h3 style={{textAlign:'left',justifyContent:'left',fontSize:'15px',opacity:'0.5',marginLeft:'50px',color:'red'}}>
                Chưa nhập Email hoặc không có Email này
       </h3>}
        </Box> 
        <Box sx={{width:'100%'}}>
        <h3 style={{textAlign:'left',justifyContent:'left',fontSize:'15px',opacity:'0.5',marginLeft:'50px'}}>Email</h3>
        <TextField 
            value={email}
            onChange = { e => setEmail(e.target.value)}
            className={classes.textField} 
       
            placeholder='Email'/>
        <Box py={1}></Box>
        </Box>

        <Box className={classes.forgetPass}>
        <Link to ='/signin' style={{color:'black','&:hover':{textColor:'#EA6A12',}}}> Đăng nhập </Link>
        </Box>
        <Box py={1}></Box>
        <Button variant="contained" 
            onClick = {e => handleResetPassword(e)}
            className={classes.button}
            ref={btn}
        >
            Reset mật khẩu
        </Button>
        
        </Box> :
        <Box sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
        }}>
            <div>Hãy kiểm tra email của bạn. Quay về trang  <Link to ='/signin'>{' '}Đăng nhập</Link></div>
        </Box>}
        </>
    )
}

export default ForgetPassForm;