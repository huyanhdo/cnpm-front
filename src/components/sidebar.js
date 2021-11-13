import React, { useState } from 'react';
import { Avatar, Badge, Box, Typography, Divider, Stack, IconButton, List, ListItem, ListItemButton, Collapse, AppBar } from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ContactSupportRoundedIcon from '@mui/icons-material/ContactSupportRounded';
import { styled } from '@mui/material/styles';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
export const CustomIconButton = styled(IconButton)({
    width: 45,
    height: 45,
    backgroundColor: '#F5F5F5',
    '&:hover':{
        backgroundColor: '#EA6A12',
        color: 'white',
        width: 60,
        height: 60,
        '& .icon':{
            color: 'white',
        }
    },
    '& .icon':{
        color: '#EA6A12',
    }
})
export const CustomListItem = styled(ListItem)({
    '& .icon':{
        color: '#EA6A12',
    },
    '& .typo':{
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '28px',
        marginLeft: '10px',
        color: 'black'
    },
    '& .button':{
        borderRadius: '50px'
    },
    '&:hover .button':{
        backgroundColor: '#EA6A12',
        color: 'white'
    },
    '&:hover .icon':{
        color: 'white'
    },
    '&:hover .typo':{
        color: 'white'
    },
})
export const MenuBar = ()=>{
    const [expand, SetExpand] = useState(false);
    const [focus, SetFocus] = useState('');
    const switchExpand = ()=>{
        SetExpand(prev => !prev);
    }
    return(
    <Box sx={{
        top: 0,
        left: 0,
        bottom: 0,
        alignSelf: 'stretch',
        backgroundColor: 'white',
        boxShadow: "0px 10px 30px rgba(234, 106, 18, 0.05)",
        zIndex: 100,
        display: 'flex'
    }}
    onMouseLeave = {() =>{switchExpand(); SetFocus('')}}
    onMouseEnter = {switchExpand}
    >
    <Collapse in={expand} unmountOnExit orientation="horizontal">
    <AppBar
        position='sticky'
        sx={{
            minWidth:'200px',
            boxShadow: 'none',
            backgroundColor: 'white'
        }}
        
        >
            <Box sx={{
            marginTop: '10px',
            marginBottom: '10px'
        }}>
        <Badge
        badgeContent={<Avatar src="./sweet.png"
        sx={{
            width: 22,
            height: 22,
        }}
        />}
        overlap="circular"
        >
            <Avatar 
                sx={{
                    backgroundColor: 'rgba(234, 106, 18, 0.32)',
                    width: 60,
                    height: 60,
                    color: 'black'
                }}
                
            >
                <Typography variant="h2" sx={{
                    fontFamily: 'Playfair Display, serif',
                    fontWeight: 'bold',
                    fontSize: 48,
                    lineHeight: 120
                }}>
                    A
                </Typography>
            </Avatar>
        </Badge>
        </Box>
            <Divider light/>
            <List
                spacing={2}
                sx={{
                    marginTop: '10px'
                }}
            >
                <CustomListItem>
                    <ListItemButton className='button' onClick={()=>{SetFocus('')}}>
                    <DashboardRoundedIcon className='icon'/>
                    <Typography className='typo'>
                        Dashboard
                    </Typography>
                    </ListItemButton>
                    
                </CustomListItem>
                <CustomListItem>
                    <ListItemButton className='button' onClick={()=>{SetFocus('')}}>
                    <HomeRoundedIcon className='icon'/>
                    <Typography className='typo'>
                        Home
                    </Typography>
                    </ListItemButton>
                </CustomListItem>
                <CustomListItem>
                    <ListItemButton className='button' onClick={()=>{SetFocus(
                        prev => {return prev==='auth'? '': 'auth'}
                    )}}>
                    <VerifiedUserRoundedIcon className='icon'/>
                    <Typography className='typo'>
                        Authentication
                    </Typography>
                    {focus==='auth'?<ExpandLessIcon/>: <ExpandMoreIcon/>}
                    </ListItemButton>
                </CustomListItem>

                    <Collapse in={focus==='auth'} unmountOnExit>
                        <List>
                            <CustomListItem sx={{
                                pl: 4
                            }}>
                                <ListItemButton className='button'>
                                <FiberManualRecordIcon className='icon'/>
                                <Typography className='typo'>
                                    Menu Item
                                </Typography>
                                </ListItemButton>
                            </CustomListItem>
                            <CustomListItem sx={{
                                pl: 4
                            }}>
                                <ListItemButton className='button'>
                                <FiberManualRecordIcon className='icon'/>
                                <Typography className='typo'>
                                    Menu Item
                                </Typography>
                                </ListItemButton>
                            </CustomListItem>
                        </List>
                    </Collapse>
                <CustomListItem>
                    <ListItemButton className='button' onClick={()=>{SetFocus(
                        prev => {return prev==='user'? '': 'user'}
                    )}}>
                    <AccountCircleRoundedIcon className='icon'/>
                    <Typography className='typo'>
                        User <pre style={{display: 'inline'}}>{'        '}</pre>
                    </Typography>
                    {focus==='user'?<ExpandLessIcon/>: <ExpandMoreIcon/>}
                    </ListItemButton>
                </CustomListItem>
                <Collapse in={focus==='user'} unmountOnExit>
                        <List>
                            <CustomListItem sx={{
                                pl: 4
                            }}>
                                <ListItemButton className='button'>
                                <FiberManualRecordIcon className='icon'/>
                                <Typography className='typo'>
                                    Menu Item
                                </Typography>
                                </ListItemButton>
                            </CustomListItem>
                            <CustomListItem sx={{
                                pl: 4
                            }}>
                                <ListItemButton className='button'>
                                <FiberManualRecordIcon className='icon'/>
                                <Typography className='typo'>
                                    Menu Item
                                </Typography>
                                </ListItemButton>
                            </CustomListItem>
                        </List>
                    </Collapse>
                <CustomListItem>
                    <ListItemButton className='button' onClick={()=>{SetFocus('')}}>
                    <ContactSupportRoundedIcon className='icon'/>
                    <Typography className='typo'>
                        Help
                    </Typography>
                    </ListItemButton>
                </CustomListItem>
            </List>
        </AppBar>    
    </Collapse>
    <Collapse in={!expand} unmountOnExit orientation="horizontal">
        <AppBar
        position='sticky'
        sx={{
        minWidth:'80px',
        boxShadow: 'none',
        backgroundColor: 'white'
        }}
        
        >
        <Box sx={{
            marginTop: '10px',
            marginBottom: '10px'
        }}>
        <Badge
        badgeContent={<Avatar src="./sweet.png"
        sx={{
            width: 22,
            height: 22,
        }}
        />}
        overlap="circular"
        >
            <Avatar 
                sx={{
                    backgroundColor: 'rgba(234, 106, 18, 0.32)',
                    width: 60,
                    height: 60,
                    color: 'black'
                }}
                
            >
                <Typography variant="h2" sx={{
                    fontFamily: 'Playfair Display, serif',
                    fontWeight: 'bold',
                    fontSize: 48,
                    lineHeight: 120
                }}>
                    A
                </Typography>
            </Avatar>
        </Badge>
        </Box>
        <Divider light/>
        <Stack
            spacing={2}
            sx={{
                marginTop: '10px',
                alignItems: 'center'
            }}
        >
            <CustomIconButton>
            <DashboardRoundedIcon className='icon'/>
            </CustomIconButton>
            <CustomIconButton>
            <HomeRoundedIcon className='icon'/>
            </CustomIconButton>
            <CustomIconButton>
            <VerifiedUserRoundedIcon className='icon'/>
            </CustomIconButton>
            <CustomIconButton>
            <AccountCircleRoundedIcon className='icon'/>
            </CustomIconButton>
            <CustomIconButton>
            <ContactSupportRoundedIcon className='icon'/>
            </CustomIconButton>
        </Stack>
    </AppBar>
    </Collapse>
    </Box>
    )
}