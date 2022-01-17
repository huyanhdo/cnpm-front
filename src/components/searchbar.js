import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { TextField, styled, IconButton, Avatar, AppBar, Toolbar, Box, Stack,Button,Menu,MenuItem } from "@mui/material";
import { useAuth } from '../context/AuthContext';
import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
    customButton:{
        "&.MuiButton-root":{
                    border:'none',
                    borderRadius:'25px',
                    color:'black',
                   '&:hover':{ 
                       color: '#EA6A12',
                      '.MuiAvatar-root':{color: '#EA6A12'}
                    }
        },
     
    }
})

export const Searchbar = ()=>{
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const {logout} = useAuth();
    const {resetPassword} = useAuth(); 
    const {currentUser} = useAuth();
    const navigate = useNavigate();
    const handlelogout= ()=>{logout();setAnchorEl(null);navigate('/') }

    const changePassword = async ()=>{
        resetPassword(currentUser.email);
        alert('Hãy kiểm tra email của bạn');
    }

    const handleClose = () => {setAnchorEl(null)}
    const handleClick = (e) => {setAnchorEl(e.currentTarget);}

    return(
        <AppBar
            position='sticky'
            sx={{
                backgroundColor:'white',
                boxShadow: '0px 10px 30px rgba(234, 106, 18, 0.05)',
                zIndex: 105,
            }}
        >
            {console.log(anchorEl)}
            <Toolbar
            sx={{
                width: '100%'
            }}
            >
       
            <Box sx={{ flexGrow: 10 }} />
            <Stack sx={{flexGrow: 2,height:'40px'}} spacing={2} direction="row">
                <Link to="/cart">
                <IconButton>
                <ShoppingCartIcon
                sx={{
                    '&:hover':{
                        color: '#EA6A12'
                    }
                }}/>
                </IconButton>
                </Link>
                
                { currentUser ?
                <>
                <Button 
                    onClick={handleClick}
                    className={classes.customButton}
                    startIcon={ <Avatar />}>
                Xin chào 
                </Button>
                <Menu sx={{width:'100%'}}
                    open = {open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                >
                <MenuItem sx={{width:'100%'}} 
                        onClick={()=>{
                        handleClose();
                        changePassword();
                        }}>Đổi mật khẩu</MenuItem>
                <MenuItem sx={{width:'100%'}} onClick={handlelogout}>Đăng xuất</MenuItem>
                </Menu>
                </>
                :
                    <Button
                        onClick={()=>{navigate('/signin')}}
                        sx={{
                            borderRadius:'25px',
                            color:'black',
                            textDecorationLine:'none',
                            '&:hover':{
                            backgroundColor:'#EA6A12',
                            color:'white',
                            }
                        }}
                        >
                            Đăng nhập</Button>
             
                }
            </Stack>
            </Toolbar>
        </AppBar>
    )
}