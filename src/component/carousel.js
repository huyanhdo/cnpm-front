
import {React, useState} from "react";
import { Carousel } from "react-bootstrap";
export const CarouselExample = function(){
    const [index, setIndex] = useState(0);
    
    const handleSelect = (selectedIndex, e)=>{
        setIndex(selectedIndex);
    }
    const handleSlid = (slidIndex, direction)=>{
        setIndex(slidIndex);
    }
    return(
        <div className="row">
        <Carousel indicators={false} variant="dark" activeIndex={index} onSelect={handleSelect} onSlid={handleSlid} 
        className="col-lg-8 ms-lg-3"
            style={{
                maxHeight: "355px"
            }}
        >
            <Carousel.Item interval={2000}>
                <img src="/image/combo.png" className="d-block w-100" alt="img" style={{borderRadius: "24px"}}/>
                <Carousel.Caption className="text-start">
                    <h1 className="text-strong">First Slide</h1>
                    <p className="text-small">This is 1st slide</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <img src="/image/combo.png" className="d-block w-100" alt="img" style={{borderRadius: "24px"}}/>
                <Carousel.Caption className="text-start">
                    <h1 className="text-strong">Second Slide</h1>
                    <p className="text-small">This is 2nd slide</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
                <img src="/image/combo.png" className="d-block w-100" alt="img" style={{borderRadius: "24px"}}/>
                <Carousel.Caption className="text-start">
                    <h1 className="text-strong">Third Slide</h1>
                    <p className="text-small">This is 3rd slide</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        <Carousel controls={false} activeIndex={index} fade variant="dark" indicators = {false} className="col-lg-3 mx-5 d-none d-lg-block">
            <Carousel.Item>
            <img src="image/burger.png" alt="burger" style={{
                    width: "90%", zIndex: "100"
                }}/>
                <div
            style={{backgroundColor: "rgba(255, 255, 255, 0.4)", boxShadow: "0px 20px 45px rgba(151, 151, 151, 0.05);",
            borderRadius: "24px", boxSizing: "border-box",height:"250px", position: "relative", top: "-150px", zIndex:"-1",
            display: "flex", flexDirection:"column", justifyContent: "flex-end"
            }}>
                    <p className="text-strong">
                        50% off
                    </p>
                    <p className="text-small">
                        This is combo 1
                    </p>
                </div>
            </Carousel.Item>
            <Carousel.Item>
            <img src="image/burger.png" alt="burger" style={{
                    width: "90%", zIndex: "100"
                }}/>
                <div
            style={{backgroundColor: "rgba(255, 255, 255, 0.4)", boxShadow: "0px 20px 45px rgba(151, 151, 151, 0.05);",
            borderRadius: "24px", boxSizing: "border-box",height:"250px", position: "relative", top: "-150px", zIndex:"-1",
            display: "flex", flexDirection:"column", justifyContent: "flex-end"
            }}>
                    <p className="text-strong">
                        20% off
                    </p>
                    <p className="text-small">
                        This is combo 2
                    </p>
                </div>
            </Carousel.Item>
            <Carousel.Item>
            <img src="image/burger.png" alt="burger" style={{
                    width: "90%", zIndex: "100"
                }}/>
                <div
            style={{backgroundColor: "rgba(255, 255, 255, 0.4)", boxShadow: "0px 20px 45px rgba(151, 151, 151, 0.05);",
            borderRadius: "24px", boxSizing: "border-box",height:"250px", position: "relative", top: "-150px", zIndex:"-1",
            display: "flex", flexDirection:"column", justifyContent: "flex-end"
            }}>
                    <p className="text-strong">
                        10% off
                    </p>
                    <p className="text-small">
                        This is combo 3
                    </p>
                </div>
            </Carousel.Item>
        </Carousel>
        </div>
    )
}