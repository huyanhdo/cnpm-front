import React, { useState } from "react";
import {Box, Divider, IconButton, Stack, Typography} from "@mui/material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
export const ToppingCard = (props) =>{
    const name = props.name;
    const image = props.image;
    const handleAdd = props.handleAdd;
    const price = props.price;
    const _id = props._id;
    const [added, setAdded] = useState(props.added);
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            maxHeight: '80px',
            width: {md: '45%', sm: '95%', xs: '100%'},
            m: 3,
        }}>
            <img
            src={image}
            alt={name}
            style={{
                borderRadius: '100px',
                width: '100px',
                height: '100px',
                boxShadow: '5px 0px 20px rgba(0, 0, 0, 0.1)',
                zIndex: 2,
                transform: 'translateX(40px)',
            }}
            />
            <Box
            sx={{
                display: 'flex',
                borderRadius: '100px',
                justifyContent: 'space-between',
                width: '90%',
                alignItems: 'center',
                padding: '5px 20px 5px 100px',
                boxSizing: 'border-box',
                transform: 'translateX(-40px)',
                zIndex: 1,
                backgroundColor: added ? '#EA6A12':'rgba(252, 237, 227, 0.3)'
            }}
            >
                <Stack>
                <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 600,
                        fontSize: '16px',
                        lineHeight: '175%',
                        color: added?'white':'black',
                        textAlign: 'start',
                        marginBottom: '10px'
                    }}
                    >{name}
                </Typography>
                <Divider sx={{width: '50%',
                }}/>
                <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 600,
                        fontSize: '16px',
                        lineHeight: '175%',
                        color: added? 'white': '#EA6A12',
                        textAlign: 'start'
                    }}
                    >$ {price}
                </Typography>
                </Stack>
                <IconButton
                sx={{
                width: '40px',
                height: '40px',
                '&:hover, &:active':{
                    color: 'white'
                }
                }}
                onClick={
                    ()=>{
                        setAdded(prev => !prev);
                        handleAdd(_id, !added);
                    }
                }
                >
                {
                    added ? <RemoveRoundedIcon
                    sx={{
                        color: 'white',
                        width: '40px',
                        height: '40px'
                    }}
                    />:
                    <AddCircleRoundedIcon
                    sx={{
                        color: 'rgba(234, 106, 18, 0.7)',
                        width: '40px',
                        height: '40px'
                    }}
                />
                }
                
                </IconButton>
            </Box>
        </Box>
    )
}