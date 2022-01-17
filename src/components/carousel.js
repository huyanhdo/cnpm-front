
import {React, useState} from "react";
import { Carousel } from "react-bootstrap";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const ComboCarousel = function(){
    const [index, setIndex] = useState(0);
    const ids = useSelector(state => state.combos.ids);
    const combos = useSelector(state => state.combos.entities);
    const fetchingStatus = useSelector(state => state.combos.fetchingStatus);
    const navigate = useNavigate();
    const handleSelect = (selectedIndex, e)=>{
        setIndex(selectedIndex);
    }
    const handleSlid = (slidIndex, direction)=>{
        setIndex(slidIndex);
    }
    return fetchingStatus === 'SUCCESS' &&(
        
        <Box>

        <Box 

            sx ={{
            flexWrap: 'nowrap',
            p: {md: 5, sm: 0, xs: 0},
            alignItems: 'center',
            display: {md: 'flex', sm: 'none', xs: 'none'}
        }}>
        <Carousel indicators={false} variant="dark" activeIndex={index} onSelect={handleSelect} onSlid={handleSlid}
        style={{
            height: '100%',
            width: '72%',
        }}
        >
            {
                ids.map(id =>{
                    return(
                        <Carousel.Item interval={3000}>
                            <img src={combos[id].banner} className="d-block w-100" alt="img" 
                            style={{
                                borderRadius: "24px",
                                height: '350px',
                                objectFit: 'cover'
                            }}
                            onClick = {()=>{navigate('/combo/'+id)}}
                            />
                        </Carousel.Item>
                    )
                })
            }
            
            
        </Carousel>
        <Carousel controls={false} activeIndex={index} fade variant="dark" indicators = {false} className="ms-3"
        style={{
            height: '100%',
            width: '28%'
        }}
        >
            {
                ids.map(id =>{
                    return(
                        <Carousel.Item >
                <Box
                onClick = {()=>{navigate('/combo')}}
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    boxShadow: '0px 20px 45px rgba(151, 151, 151, 0.05)',
                    borderRadius: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    //maxHeight: '250px',
                    width: '100%',
                    height: '100%',
                    boxSizing: 'border-box',
                }}
                >
                    <img
                    src={combos[id].image}
                    alt="combo"
                    style={{
                        width: '200px',
                        height: '200px',
                        objectFit: 'cover',
                        //transform: 'translateY(10%)'
                        maxWidth: '250px',
                        borderRadius: '150px'
                        //height: '300px'
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
                    >{combos[id].off > 0 ? combos[id].off + " % Off": "Tặng kèm" }
                    </Typography>
                    <Typography variant="body1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        color: '#EA6A12',
                        marginBottom: '20px'
                    }}
                    >{combos[id].description}            
                    </Typography>
                </Box>
            </Carousel.Item>
                    )
                })
            }
            
        </Carousel>
        </Box>
        <Box
        sx={{
            display: {md: 'none', sm: 'block', xs: 'block'}
        }}
        >

        <Carousel controls={true} fade variant="dark" indicators = {false} className="ms-3"
        style={{
            height: '100%',
            width: '90%'
        }}
        >
            {
                ids.map(id =>{
                    return(
                        <Carousel.Item >
                <Box
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    boxShadow: '0px 20px 45px rgba(151, 151, 151, 0.05)',
                    borderRadius: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    //maxHeight: '250px',
                    width: '100%',
                    height: '100%',
                    boxSizing: 'border-box',
                }}
                >
                    <img
                    src={combos[id].image}
                    alt="combo"
                    style={{
                        width: '200px',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '150px',
                        maxWidth: '250px',
                        //height: '300px'
                    }}
                    onClick = {()=>{navigate('/combo')}}
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
                    >{combos[id].off > 0 ? combos[id].off + " % Off": "Tặng kèm" }
                    </Typography>
                    <Typography variant="body1"
                    sx={{
                        fontFamily: 'be Vietnam',
                        fontWeight: 400,
                        fontSize: '13px',
                        lineHeight: '22.75px',
                        color: '#EA6A12',
                        marginBottom: '20px'
                    }}
                    >{combos[id].description}             
                    </Typography>
                </Box>
            </Carousel.Item>
                    )
                })
            }
            
        </Carousel>
                    
        </Box>
        </Box>
    )
}