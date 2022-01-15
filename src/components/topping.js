import React, { useState } from "react";
import {Box, IconButton, Typography} from "@mui/material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
export const ToppingCard = (props) =>{
    const name = props.name;
    const handleAdd = props.handleAdd;
    const price = props.price;
    const _id = props._id;
    const [added, setAdded] = useState(props.added);
    return (
            <Box
            sx={{
                display: 'flex',
                borderRadius: '100px',
                justifyContent: 'space-between',
                width: {md: '45%', sm: '80%', xs:'90%'},
                alignItems: 'center',
                padding: '5px 10px 5px 20px',
                boxSizing: 'border-box',
                zIndex: 1,
                backgroundColor: added ? '#EA6A12':'rgba(252, 237, 227, 0.3)',
                marginRight: {md: '30px', sm: '0', xs:'0'},
                marginBottom: '20px'
            }}
            >
                <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: '18px',
                        lineHeight: '175%',
                        color: added?'white':'black',
                        textAlign: 'start',
                        marginBottom: '10px'
                    }}
                    >{name}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    alignItems:'center'
                }}>
                <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 600,
                        fontSize: '16px',
                        lineHeight: '175%',
                        color: added? 'white': '#EA6A12',
                        textAlign: 'start',
                        marginRight:'20px'
                    }}
                    > {price} VND
                </Typography>
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