import React from "react";
import {Box, Stack, Typography, Rating, Divider, Checkbox} from "@mui/material";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Favorite, FavoriteBorder } from "@mui/icons-material";
export const Comment = (props) =>{
    const comment = props.comment;
    return(
        <Stack
        spacing={1}
        sx={{
            p: 2,
            backgroundColor: 'white',
            boxShadow: '1px 1px 5px rgb(0,0,0,0.2)',
            borderRadius: '24px',
            width: '100%',
            margin: '10px 20px'
        }}
        >
            <Stack direction="row"
            sx={{
                
                justifyContent: 'space-between'
            }}
            >
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '16px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start'
                    }}
                    >{comment.name}
            </Typography>
            <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite sx= {{color: 'red'}}/>}/>
            </Stack>
            <Stack direction = "row" spacing={5}>
            <Rating value={comment.rate} readOnly
                sx={{
                    color: '#EA6A12',
                }}
                icon={<StarRoundedIcon/>}
            emptyIcon={<StarRoundedIcon/>}
            />
            {
                comment.share ? <Typography variant="subtitle1"
                sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 600,
                    fontSize: '13px',
                    lineHeight: '175%',
                    color: 'black',
                    textAlign: 'start',
                    marginBottom: '10px'
                }}
                > ❤ I will recommend this product to friends and family
                </Typography> : false
            }
            
            </Stack>
            <Divider sx={{width: '50%'}}/>
            <Typography
                    style={{
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        color: '#EA6A12',
                        textAlign: 'start',
                        textOverflow: 'ellipsis',
                        maxWidth: '80%',
                        maxHeight: '65px',
                        overflow: 'hidden'
                    }}
                    >{comment.content}
                </Typography>
        </Stack>
    )
}