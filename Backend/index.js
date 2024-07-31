import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const app = express();
app.use(express.json());

// Secret keys for JWT
const ACCESS_TOKEN_SECRET = crypto.randomBytes(64).toString('hex');
const REFRESH_TOKEN_SECRET = crypto.randomBytes(64).toString('hex');

// Dummy user data for demonstration
const dummyUser = {
    email: 'user@example.com',
    password: 'password123', // In practice, hash passwords and use secure storage
};

// Issue tokens on login
app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;

    // Validate credentials
    if (email === dummyUser.email && password === dummyUser.password) {
        // Generate JWT access token
        const accessToken = jwt.sign(
            { email: email },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' } // Access token expires in 15 minutes
        );

        // Generate JWT refresh token
        const refreshToken = jwt.sign(
            { email: email },
            REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' } // Refresh token expires in 7 days
        );

        res.json({
            success: true,
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid email or password',
        });
    }
});

// Refresh token endpoint
app.post('/auth/refresh', (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ success: false, message: 'Refresh token required' });
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: 'Invalid refresh token' });

        // Generate new access token
        const accessToken = jwt.sign(
            { email: user.email },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        res.json({ success: true, accessToken: accessToken });
    });
});

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
