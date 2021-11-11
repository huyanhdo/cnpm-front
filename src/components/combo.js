import { Button, Card, CardMedia, Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export const Combo = () =>{
    return (
        <Grid container spacing={3} columns={{xs: 1, sm: 1, md: 12}}
        sx={{
            p: 2,
            alignItems: 'end',
            paddingRight: '20px'
        }}
        >
            <Grid item xs={1} sm={1} md={8}
            sx={{
                maxHeight: '1600px'
            }}
            >
                <Card 
                sx={{position: 'relative',
                    boxShadow: 'none',
                    maxWidth: '1052.23px',
                    maxHeight: '1577.3px'
                }}
                >
                    <CardMedia component="img" image="./banner.png"/>
                    <Stack 
                    sx={{
                        position: 'absolute',
                        top: {md: '20%', sm: 0},
                        left: {md: '10%', sm: 0},
                        textAlign: 'start'
                    }}
                    spacing={2}
                    >
                    <Typography variant="subtitle1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        color: '#EA6A12',
                        textAlign: 'start'
                    }}
                    >👑 Deal of the weekend
                    </Typography>
                    <Typography variant="h3"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '40px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start'
                    }}
                    >Hello, Tran Duy Nhat
                    </Typography>
                    <Typography variant="body1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        color: '#EA6A12',
                        textAlign: 'start'
                    }}
                    >Get Free delivery every weekend 
                    </Typography>
                    <Button variant="contained" 
                    sx={{
                        backgroundColor: '#EA6A12',
                        borderRadius: '100px',
                        maxWidth: '150px',
                        fontFamily: 'Poppins',
                        fontWeight: 'normal',
                        fontSize: '13px',
                        lineHeight: '175%',
                        color: 'white',
                        '&:hover, &:active':{
                            backgroundColor: '#f57c00'
                        }
                    }}
                    >
                        Check menu
                    </Button>
                    </Stack>
                </Card>
            </Grid>
            <Grid item xs={0} sm={0} md={4}
            sx={{
                display: {md: 'flex', sm: 'none', xs: 'none'},
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center'
            }}
            >   
                <Box
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    boxShadow: '0px 20px 45px rgba(151, 151, 151, 0.05)',
                    borderRadius: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    maxHeight: '250px',
                    width: '100%',
                    boxSizing: 'border-box',
                    zIndex: -1
                }}
                >
                    <img
                    src="./burger.png"
                    alt="burger"
                    style={{
                        width: '75%',
                        transform: 'translateY(10%)'
                    }}
                    />
                    <Typography variant="h3"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '40px',
                        lineHeight: '52px',
                        color: '#07143B',
                        marginBottom: '10px'
                    }}
                    >50% off
                    </Typography>
                    <Typography variant="body1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        color: '#EA6A12',
                        marginBottom: '20px'
                    }}
                    >The full peace of burger                     
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
}