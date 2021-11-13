import React, {useState} from "react";
import { MenuBar } from "../components/sidebar";
import {Box, Button, Typography, Modal, TextField, Fade, Stack} from '@mui/material';
import { Searchbar } from "../components/searchbar";
import { Footer } from "../components/footer";
import { PizzaCart } from "../components/mainCart";
export const CartPage = ()=>{
    const [pay, SetPay] = useState(false);
    return(
        <div style={{
            backgroundColor: 'rgba(252, 237, 227, 0.3)',
            display: 'flex',
            position: 'relative'
        }}>
            <MenuBar/>
            <Box style={{
                width: '100%',
                }}>
                <Searchbar/>
                <PizzaCart style={{zIndex: 0}}/>
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                }}
                >
                    <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '30px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start'
                    }}
                    >Total: $100.00
                    </Typography>
                    <Button variant="contained" 
                    onClick = {()=>{SetPay(true)}}
                    sx={{
                        zIndex: 10,
                        backgroundColor: '#EA6A12',
                        borderRadius: '50px',
                        fontFamily: 'Poppins',
                        fontWeight: 'normal',
                        fontSize: '16px',
                        width: '100px',
                        lineHeight: '175%',
                        color: 'white',
                        '&:hover, &:active':{
                            backgroundColor: '#f57c00'
                        },
                    }}
                >
                    Order
                </Button>
                </Box>
                <Modal open={pay} onClose = {() => {SetPay(false)}}>
            <Fade in={pay} timeout={500}>
            <Stack
            spacing = {1}
            sx={{
                borderRadius: '24px',
                backgroundColor: 'white',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                p: 4,
                boxShadow: 24,
                width: '500px'
            }}
            >
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontSize: '20px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'center',
                    }}
                    >Please fill this form
                </Typography>
                <Stack direction= "row" spacing={3}>
                <TextField
                required
                id="name-field"
                label="Name"
                multiline
                maxRows={1}
                color='warning'
                inputProps={{style: {fontFamily: 'Poppins'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                sx={{
                    width: '60%'
                }}
                />
                <TextField
                required
                id="name-field"
                label="Phone Number"
                multiline
                type="number"
                maxRows={1}
                color='warning'
                inputProps={{style: {fontFamily: 'Poppins'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                sx={{
                    width: '60%'
                }}
                />
                </Stack>
                
                <TextField
                required
                id="name-field"
                label="Email"
                multiline
                maxRows={1}
                color='warning'
                inputProps={{style: {fontFamily: 'Poppins'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                />
                <TextField
                required
                id="name-field"
                label="Address"
                multiline
                maxRows={1}
                color='warning'
                inputProps={{style: {fontFamily: 'Poppins'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                />
                <TextField
                color='warning'
                id="name-field"
                label="Note"
                multiline
                rows={2}
                maxRows = {2}
                inputProps={{style: {fontFamily: 'Poppins'}}} // font size of input text
                InputLabelProps={{style: {fontFamily: 'Poppins'}}} // font size of input label
                />
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: '15px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                    }}
                    >Shipping Fee: $1.00
                </Typography>
                <Typography variant="h6"
                    sx={{
                        fontFamily: 'Poppins',
                        fontWeight: 700,
                        fontSize: '20px',
                        lineHeight: '52px',
                        color: '#07143B',
                        textAlign: 'start',
                    }}
                    >Total Pay: $101.00
                </Typography>
                <Button variant="contained" 
                    onClick={()=>{SetPay(false)}}
                    sx={{
                        backgroundColor: '#EA6A12',
                        borderRadius: '100px',
                        alignSelf: 'center',
                        fontFamily: 'Poppins',
                        fontWeight: 'normal',
                        fontSize: '15px',
                        lineHeight: '175%',
                        color: 'white',
                        '&:hover, &:active':{
                            backgroundColor: '#f57c00'
                        },
                        marginBottom: 2,
                        width: '150px'
                    }}
                    >
                    Order
                </Button>
            </Stack>
            </Fade>
            </Modal>
                <Footer/>
            </Box>
        </div>
    )
}