import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FormControl, InputAdornment, TextField, styled, IconButton, Avatar, AppBar, Toolbar, Box, Stack,Button } from "@mui/material";
import { useAuth } from '../context/AuthContext';
import React from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export const Searchbar = ()=>{
    const CssTextField = styled(TextField)({
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: 'black',
          },
        },
        '& fieldset':{
            borderRadius: 100,
            fontFamily: 'Poppins',
        },
        //marginTop: 15,
        marginLeft: 20
    });
    const {logout} = useAuth();
    const {currentUser} = useAuth();
    const navigate = useNavigate();
    const handlelogout= ()=>{logout();navigate('/') }
    return(
        <AppBar
            position='sticky'
            sx={{
                backgroundColor:'white',
                boxShadow: '0px 10px 30px rgba(234, 106, 18, 0.05)',
                zIndex: 105,
            }}
        >
            <Toolbar
            sx={{
                width: '100%'
            }}
            >
            <FormControl sx={{flexGrow:1}}>
                <CssTextField placeholder="Search..."
                    variant="outlined"
                    size="small"
                    InputProps={
                        {
                            startAdornment:(
                                <InputAdornment position="start">
                                    <IconButton>
                                    <SearchIcon/>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }
                />
            </FormControl>
            <Box sx={{ flexGrow: 10 }} />
            <Stack sx={{flexGrow: 2}} spacing={2} direction="row">
                <IconButton onClick={handlelogout} >
                <NotificationsIcon
                sx={{
                    '&:hover':{
                        color: '#EA6A12'
                    }
                }}
                />
                </IconButton>
                <IconButton>
                <EmailIcon
                sx={{
                    '&:hover':{
                        color: '#EA6A12'
                    }
                }}/>
                </IconButton>
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
                <Avatar
                    
                sx={{
                    '&:hover':{
                        color: '#EA6A12'
                    }
                }}/>
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
                        }}>Sign in</Button>
             
                }
            </Stack>
            </Toolbar>
        </AppBar>
    )
}