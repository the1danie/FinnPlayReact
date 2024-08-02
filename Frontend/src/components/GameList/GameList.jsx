import React from 'react';
import './GameList.css'
import NavBarGame from "./SubCategory/NavBarGame.jsx";
import MainGame from "./SubCategory/MainGame.jsx";

const GameList = () => {
    return (
        <>
            <NavBarGame/>
            <MainGame/>
        </>
    );
};

export default GameList;
