import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginPage.css';
import Logo from '../../assets/Logo/finnPlay.png';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import icons for visibility toggle
import { loginPage } from '../../axiosStore.js'; // Import the login function

const LoginPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
    const [loading, setLoading] = useState(false); // State for loading
    const [error, setError] = useState(''); // State for error messages

    const navigate = useNavigate(); // Initialize useNavigate

    const handleLoginChange = (e) => setLogin(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handlePasswordVisibilityToggle = () => {
        setPasswordVisible(!passwordVisible); // Toggle password visibility
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setError(''); // Clear any previous error

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            // Call the login function from axiosStore
            const response = await loginPage(login, password);
            console.log('Login successful:', response);

            // Handle success - store tokens, redirect, etc.
            // Example: localStorage.setItem('accessToken', response.accessToken);

            navigate('/game-list'); // Redirect to GameList component

        } catch (error) {
            console.error('Login error:', error.message);
            setError(error.message); // Set error message
        }

        setLoading(false); // End loading
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <img src={Logo} alt="Logo" className="logo" /> {/* Add the correct path to your logo */}
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label className="custom-field one">
                            <input
                                type="text"
                                value={login}
                                onChange={handleLoginChange}
                                className={login ? 'dirty' : ''}
                                placeholder=" "
                            />
                            <span className="placeholder">Login</span>
                        </label>
                    </div>
                    <div className="form-group">
                        <label style={{ borderTop: '0px' }} className="custom-field one">
                            <input
                                type={passwordVisible ? 'text' : 'password'} // Toggle input type based on state
                                value={password}
                                onChange={handlePasswordChange}
                                className={password ? 'dirty' : ''}
                                placeholder=" "
                            />
                            <span className="placeholder">Password</span>
                            <span
                                className="toggle-password"
                                onClick={handlePasswordVisibilityToggle}
                            >
                                {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />} {/* Toggle icon */}
                            </span>
                        </label>
                    </div>
                    {error && <div className="error-message">{error}</div>} {/* Show error message */}
                    <button type="submit" className="login-button">
                        {loading ? <i className="fa fa-spinner fa-spin"></i> : 'Login'} {/* Show spinner or text */}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
