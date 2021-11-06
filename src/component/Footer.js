import React from "react"
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

import './Footer.css';


function Footer() {

    return(
    <div className="footer">
        
        <div className="about">
            <h2>About Us</h2>
            <hr></hr>
            <div className="about-content">
                <p>Domino's Pizza, Inc. is an American multinational pizza restaurant chain founded in 1960 and 
                    led by CEO Richard Allison. The corporation is Delaware domiciled and headquartered at the Domino's 
                    Farms Office Park in Ann Arbor, Michigan. As of 2018,</p>
                <div className="social">
                    <div><a href="#"><InstagramIcon /></a></div>
                    <div><a href="#"><FacebookIcon /></a></div>
                    <div><a href="#"><TwitterIcon /></a></div>
                    <div><a href="#"><LinkedInIcon /></a></div>
                </div>
            </div>
        </div>

        <div className="wrapper">
            <div className="address box">
                <h2>Address</h2>
                <hr></hr>
                <div className="address-content">
                    <p><LocationOnIcon /> Han Noi</p>
                    <p><PhoneIcon /> 01234567890</p>
                    <p><EmailIcon /> @abababsnndnd</p>
                    
                </div>
            </div>


            <div className="contact box">
                <h2>Contact</h2>
                <hr></hr>
                <div className="contact-content">
                    <form action="#">
                        <div className="email mb-16 ">
                            <div className="text mb-8">Email*</div>
                            <input type="email" required></input>
                        </div>
                        <div className="msg mb-16 ">
                            <div className="text mb-8">Message*</div>
                            <textarea required></textarea>
                        </div>
                        <div className="button">
                            <button type="submit">SEND</button>
                        </div>
                    </form>

                </div>
            </div>

        </div>
        <p className="copyright"> &copy;2021 pizzahust.com | Privacy policy </p>
    </div>);

}

export default Footer