import React from "react";
import {Stack, Typography, Rating, Divider} from "@mui/material";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
export const Comment = (props) =>{
    const comment = props.comment;
    let date = new Date(comment.comment_time * 1000)
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
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
            <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '16px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start'
                    }}
                    >{comment.user_name}
            </Typography>
            <Stack direction = "row" spacing={5}>
            <Rating value={comment.user_rating} readOnly
                sx={{
                    color: '#EA6A12',
                }}
                icon={<StarRoundedIcon/>}
            emptyIcon={<StarRoundedIcon/>}
            />
                <Typography variant="subtitle1"
                sx={{
                    fontFamily: 'be Vietnam',
                    fontWeight: 600,
                    fontSize: '13px',
                    lineHeight: '175%',
                    color: 'black',
                    textAlign: 'start',
                    marginBottom: '10px'
                }}
                >
                    {
                        'Thời gian: '+year+'/'+month+'/'+day+'-'+hour+':'+minute+':'+second
                    }
                </Typography>
            </Stack>
            <Divider sx={{width: '50%'}}/>
            <Typography
                    style={{
                        fontFamily: 'be Vietnam',
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