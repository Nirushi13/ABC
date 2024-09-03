import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className="footer-content-left">
                <img src={assets.logo2} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, voluptatum magni. Eveniet vitae amet officiis, ducimus sequi recusandae repellendus similique expedita reprehenderit placeat debitis repellat autem, necessitatibus, nisi animi quisquam!</p>
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
                    <li>Address: 123 Main St, Anytown, USA</li>
                    <li>Phone: 555-555-5555</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer-copyright'>
            &copy; 2023 All Rights Reserved. 
        </p>
    </div>
  )
}

export default Footer