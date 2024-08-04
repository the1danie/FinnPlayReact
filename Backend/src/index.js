import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Secret keys for JWT
const ACCESS_TOKEN_SECRET = crypto.randomBytes(64).toString('hex');
const REFRESH_TOKEN_SECRET = crypto.randomBytes(64).toString('hex');

// Dummy user data for demonstration
const users = {
    Player1: { email: 'user1@example.com', password: 'password1234' },
    Player2: { email: 'user2@example.com', password: 'password1234' },
};

// Issue tokens on login
app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;

    // Find the player by email
    const player = Object.keys(users).find(
        key => users[key].email === email && users[key].password === password
    );

    if (player) {
        // Generate JWT access token
        const accessToken = jwt.sign(
            { email: email },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        // Generate JWT refresh token
        const refreshToken = jwt.sign(
            { email: email },
            REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            player: player,
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

app.post('/players/details', (req, res) => {
    const { accessToken, refreshToken } = req.body;

    if (!accessToken || !refreshToken) {
        return res.status(401).json({ success: false, message: 'Access token and refresh token required' });
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: 'Invalid refresh token' });

        jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, accessUser) => {
            if (err) return res.status(403).json({ success: false, message: 'Invalid access token' });

            if (accessUser.email !== user.email) {
                return res.status(403).json({ success: false, message: 'Token mismatch' });
            }

            const player = Object.keys(users).find(
                key => users[key].email === accessUser.email
            );

            if (player) {
                res.json({
                    success: true,
                    player: player,
                });
            } else {
                res.status(404).json({ success: false, message: 'Player not found' });
            }
        });
    });
});


// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
