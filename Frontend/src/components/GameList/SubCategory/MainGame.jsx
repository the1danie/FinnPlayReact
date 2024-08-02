import React, {useState} from 'react';
import './MainGame.css';
import { Photo1, Photo2, Photo3, Photo4, Photo5, Photo6, Photo7, Photo8 } from '../../GamesPhoto.js'
import RangeSlider from "./RangeSlider.jsx";


const MainGame = () => {
    const [activeProvider, setActiveProvider] = useState('Play n\' Go');
    const [activeGroup, setActiveGroup] = useState('Slots');
    const [activeSortOption, setActiveSortOption] = useState('A-Z');

    const handleProviderClick = (provider) => {
        setActiveProvider(provider);
    };

    const handleGroupClick = (group) => {
        setActiveGroup(group);
    };

    const handleSortOptionClick = (sortOption) => {
        setActiveSortOption(sortOption);
    };

    const providers = [
        'Play n\' Go', 'Yggdrasil', 'Pragmatic', 'Microgaming', 'NetEnt',
        'Altenar', 'Ezugi', 'GameArt', 'Red Tiger', 'Evolution',
        'Relax Gaming', 'Evoplay'
    ];

    const gameGroups = [
        'Slots', 'Blackjack', 'Jackpot', 'Live', 'Bingo', 'Baccarat', 'Roulette', 'Poker'
    ];

    const sortOptions = ['A-Z', 'Z-A', 'Newest'];

    // Array of photos for the game cards
    const gamePhotos = [
        { src: Photo1, alt: 'Game 1' },
        { src: Photo2, alt: 'Game 2' },
        { src: Photo3, alt: 'Game 3' },
        { src: Photo4, alt: 'Game 4' },
        { src: Photo5, alt: 'Game 5' },
        { src: Photo6, alt: 'Game 6' },
        { src: Photo7, alt: 'Game 7' },
        { src: Photo8, alt: 'Game 8' }
    ];
    return (
        <div className="main-game-container">
            <div className="block_left_info">
                <div className="game-cards-wrapper"> {/* New wrapper div */}
                    <div className="game-cards">
                        {gamePhotos.map((photo, index) => (
                            <div className="game-card" key={index}>
                                <img src={photo.src} alt={photo.alt} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="block_right_info">
                <div className="filter-sidebar">
                    <div className="search-container">
                        <input type="text" placeholder="Search" className="search-input"/>
                        <i className="fas fa-search search-icon"></i>
                    </div>
                    <div className="providers">
                        <p>Providers</p>
                        <div className="provider-list">
                            {providers.map((provider, index) => (
                                <div
                                    key={index}
                                    className={`provider ${activeProvider === provider ? 'active' : ''}`}
                                    onClick={() => handleProviderClick(provider)}
                                >
                                    {provider}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="game-groups">
                        <p>Game Groups</p>
                        <div className="group-list">
                            {gameGroups.map((group, index) => (
                                <div
                                    key={index}
                                    className={`group ${activeGroup === group ? 'active' : ''}`}
                                    onClick={() => handleGroupClick(group)}
                                >
                                    {group}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="sorting">
                        <p>Sorting</p>
                        <div className="sort-list">
                            {sortOptions.map((sortOption, index) => (
                                <div
                                    key={index}
                                    className={`sort-option ${activeSortOption === sortOption ? 'active' : ''}`}
                                    onClick={() => handleSortOptionClick(sortOption)}
                                >
                                    {sortOption}
                                </div>
                            ))}
                        </div>
                    </div>
                    <RangeSlider/>

                    <div className="game-amount">
                        <p>Games amount: 3800</p>
                    </div>
                    <button className="reset-button">Reset</button>
                </div>
            </div>
        </div>
    );
};

export default MainGame;
