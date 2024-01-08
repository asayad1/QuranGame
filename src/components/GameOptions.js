import React from "react";
import Toggle from 'react-toggle'
import "react-toggle/style.css" // for ES6 modules
import "./GameOptions.css"

function GameOptions(props) {
    return (
        <div className="options">
            <div className="option">
                <span className="option-text">Guess Ayah Number </span>
                <Toggle className="toggle" icons={false} defaultChecked={false} onChange={props.handleAyahToggle} />
            </div>

            <div className="option">
                <span className="option-text">Hard Mode </span>
                <Toggle className="toggle" icons={false} defaultChecked={false} onChange={props.handleHardToggle} />
            </div>
            <hr></hr>
        </div>
    )
}

export default GameOptions;
