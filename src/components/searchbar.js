import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FormControl, InputAdornment, TextField, styled, IconButton, Avatar, AppBar, Toolbar, Box, Stack } from "@mui/material";

import React from "react";
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
                <IconButton>
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
                
                
                <Avatar
                sx={{
                    '&:hover':{
                        color: '#EA6A12'
                    }
                }}/>
            </Stack>
            </Toolbar>
        </AppBar>
    )
}