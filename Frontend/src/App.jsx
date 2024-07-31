import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import GameList from './components/GameList/GameList'; // Import GameList

const App = () => (
    <Router>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/game-list" element={<GameList />} /> {/* Add route for GameList */}
            {/* Add other routes here */}
        </Routes>
    </Router>
);

export default App;
