import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className="footer-content-left">
                <img src={assets.logo2} alt="" />
                <p>Welcome to ABC Restaurant, where culinary excellence meets unforgettable dining experiences. Our commitment to fresh ingredients and exceptional service ensures every meal is a delight. Whether you're joining us for a casual lunch or a special dinner, our menu features a diverse range of dishes crafted with care and passion. From savory appetizers to delectable desserts, we strive to offer something for everyone. Thank you for choosing ABC Restaurant – we look forward to serving you!</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Quick Links</h2>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get in Touch</h2>
                <ul>
                    <li>Address: 123 Main St, Colombo, Srilanka</li>
                    <li>Phone: 555-555-5555</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer-copyright'>
            &copy; 2024 All Rights Reserved. 
        </p>
    </div>
  )
}

export default Footer