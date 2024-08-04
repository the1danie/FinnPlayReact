import React, { useState, useEffect } from 'react';
import data from '../../../assets/data.json';
import './MainGame.css';
import RangeSlider from './StepIndicator.jsx';

const MainGame = () => {
    const [activeProvider, setActiveProvider] = useState('All');
    const [activeGroup, setActiveGroup] = useState('All');
    const [activeSortOption, setActiveSortOption] = useState('A-Z');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredGames, setFilteredGames] = useState(data.games);
    const [columns, setColumns] = useState(4);
    const [showFilters, setShowFilters] = useState(true);

    const handleStepChange = (step) => {
        setColumns(step);
    };

    useEffect(() => {
        filterGames();
    }, [activeProvider, activeGroup, activeSortOption, searchTerm]);

    const handleProviderClick = (provider) => {
        setActiveProvider(provider);
    };

    const handleGroupClick = (group) => {
        setActiveGroup(group);
    };

    const handleSortOptionClick = (sortOption) => {
        setActiveSortOption(sortOption);
        filterGames();
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        filterGames();
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const filterGames = () => {
        let games = data.games;

        if (activeProvider !== 'All') {
            const providerId = data.providers.find(provider => provider.name === activeProvider)?.id;
            games = games.filter(game => game.provider === providerId);
        }

        if (activeGroup !== 'All') {
            const groupId = data.groups.find(group => group.name === activeGroup)?.id;
            games = games.filter(game => groupId && data.groups.find(g => g.id === groupId)?.games.includes(game.id));
        }

        if (searchTerm) {
            games = games.filter(game => game.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        if (activeSortOption === 'Newest') {
            games.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (activeSortOption === 'A-Z') {
            games.sort((a, b) => a.name.localeCompare(b.name));
        } else if (activeSortOption === 'Z-A') {
            games.sort((a, b) => b.name.localeCompare(a.name));
        }

        setFilteredGames(games);
    };

    const providers = ['All', ...data.providers.map(provider => provider.name)];
    const gameGroups = ['All', ...data.groups.map(group => group.name)];
    const sortOptions = ['A-Z', 'Z-A', 'Newest'];

    const gamePhotos = filteredGames.map(game => ({
        src: game.cover,
        alt: game.name,
    }));

    return (
        <div className="main-game-container">
            <div className="block_left_info">
                <div className="game-cards-wrapper">
                    <div className="game-cards">
                        {gamePhotos.length > 0 ? (
                            gamePhotos.map((photo, index) => (
                                <div style={{ width: `calc(100% / ${columns} - 10px)` }} className="game-card" key={index}>
                                    <img src={photo.src} alt={photo.alt} />
                                </div>
                            ))
                        ) : (
                            <p>No games found</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="block_right_info">
                <div className="filter-sidebar">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search"
                            className="search-input"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <i className="fas fa-search search-icon"></i>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button className="toggle-button" onClick={toggleFilters}>
                            {showFilters ? 'Show Filters' : 'Hide Filters'}
                        </button>
                    </div>
                        <div className={`view-filter ${showFilters ? 'show' : ''}`}>
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

                            <div className={'slider'}>
                                <p>Columns</p>
                                <RangeSlider onStepChange={handleStepChange}/>
                            </div>

                            <div
                                className="game-amount"
                                style={{display: 'flex', justifyContent: 'space-between', margin: '0'}}
                            >
                                <p>Games amount: {filteredGames.length}</p>
                                <button className="reset-button" onClick={() => {
                                    setActiveProvider('All');
                                    setActiveGroup('All');
                                    setActiveSortOption('A-Z');
                                    setSearchTerm('');
                                    setFilteredGames(data.games);
                                }}>Reset
                                </button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default MainGame;
