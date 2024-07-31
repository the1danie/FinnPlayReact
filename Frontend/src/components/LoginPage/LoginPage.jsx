import React, { useState } from 'react';
import './LoginPage.css';
import Logo from '../../assets/finnPlay.png';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import icons for visibility toggle

const LoginPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
    const [loading, setLoading] = useState(false); // State for loading

    const handleLoginChange = (e) => setLogin(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handlePasswordVisibilityToggle = () => {
        setPasswordVisible(!passwordVisible); // Toggle password visibility
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        // Simulate a login process
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

        // Handle login logic here
        console.log('Login:', login);
        console.log('Password:', password);

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
                    <button type="submit" className="login-button">
                        {loading ? <i className="fa fa-spinner fa-spin"></i> : 'Login'} {/* Show spinner or text */}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
