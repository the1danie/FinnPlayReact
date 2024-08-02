import React, {useEffect, useState} from 'react';
import './NavBarGame.css'
import Logo from '../../../assets/Logo/finnPlay.png'
import ImgLogo from '../../../assets/Logo/imgLogo.png'
import {getPlayerDetails} from "../../../axiosStore.js";

const NavBarGame = () => {
    const [playerName, setPlayerName] = useState('Loading...');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayerDetails = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');

                if (!accessToken || !refreshToken) {
                    throw new Error('No tokens found');
                }

                const response = await getPlayerDetails(accessToken, refreshToken);
                setPlayerName(response.player); // or response.details.email, depending on your API response structure
            } catch (err) {
                console.error('Failed to fetch player details:', err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayerDetails();
    }, []);

    const handleLogout = () => {
        // Clear tokens and redirect to login page
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // Adjust based on your routing setup
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img className="image-logo" src={Logo} alt="Logo" />
            </div>
            <ul className="navbar-links">
                <li>
                    {loading ? (
                        <span>Loading...</span>
                    ) : error ? (
                        <span>Error: {error}</span>
                    ) : (
                        <a style={{ color: 'black' }}>{playerName}</a>
                    )}
                </li>
                <li>
                    <img className="image-avatar" src={ImgLogo} alt="Avatar" />
                    <a href="#" onClick={handleLogout} style={{ color: '#EC4466' }}>Logout</a>
                </li>
            </ul>
        </nav>
    );
};

export default NavBarGame;
