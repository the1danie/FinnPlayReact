import React from 'react';
import './NavBarGame.css'
import Logo from '../../../assets/Logo/finnPlay.png'
import ImgLogo from '../../../assets/Logo/imgLogo.png'

const NavBarGame = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img className="image-logo" src={Logo} alt="Logo"/>
            </div>
            <ul className="navbar-links">
                <li><a href="#" style={{color: 'black'}}>Player 1</a></li>
                <li>
                    <img className="image-avatar" src={ImgLogo} alt="Avatar"/>
                    <a href="#" style={{color:'#EC4466'}}>Logout</a>
                </li>
            </ul>
        </nav>
    );
};

export default NavBarGame;
