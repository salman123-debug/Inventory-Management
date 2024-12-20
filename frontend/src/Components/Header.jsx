import React, { useContext } from 'react'
import './Header.css'
import logo_light from '../assets/logo-black.png'
// import logo_dark from '../assets/logo-white.png'
import search_icon_light from '../assets/search-w.png'
// import icon_icon_dark from '../assets/search-b.png'
import toggle_light from '../assets/night.png'
// import toggle_dark from '../assets/day.png'
import {Link} from "react-router-dom"

function Header() {

    return (
        <div className="header">
            <div className="navbar">
                <img src={logo_light} alt="" className='logo' />
                <ul className='nav-list'>
                    <li className='list' >Home</li>
                    <li className='list' >Products</li>
                    <li className='list'>Features</li>
                    <li className='list'>About</li>

                </ul>
                <div className="search-box">
                    <input type="text" placeholder='search' />
                    <img src={search_icon_light} alt="" />
                </div>

                <div className="btn">
                    <button className='signin-btn'><Link to="/login" className="signin-btn"> SignIn</Link></button>
                    <button className='login-btn'>Login</button>
                </div>
                <img src={toggle_light}  alt="" className='toggle-icon' />

            </div>
        </div>
    )
}

export default Header
