import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Logo from '../../assets/Logo/finnPlay.png';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { loginPage } from '../../axiosStore.js';

const LoginPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLoginChange = (e) => setLogin(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handlePasswordVisibilityToggle = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const response = await loginPage(login, password);
            console.log('Login successful:', response);
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            navigate('/game-list');

        } catch (error) {
            console.error('Login error:', error.message);
            setError(error.message);
        }

        setLoading(false);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <img src={Logo} alt="Logo" className="logo" />
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
                                type={passwordVisible ? 'text' : 'password'}
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
                                {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </span>
                        </label>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="login-button">
                        {loading ? <i className="fa fa-spinner fa-spin"></i> : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
