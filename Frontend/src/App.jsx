import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import GameList from './components/GameList/GameList';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/game-list" element={<GameList />} />
        </Routes>
    </Router>
);

export default App;
