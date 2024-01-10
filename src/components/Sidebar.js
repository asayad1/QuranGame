import React from 'react';
import TripleToggleSwitch from './TripleToggleSwitch';
import GameOptions from './GameOptions';
import Button from './Button';
import './Sidebar.css';

const TriSwitch = (props) => {
    const labels = {
        left: {
            title: "Surah",
            value: "surah"
        },
        right: {
            title: "Page",
            value: "page"
        },
        center: {
            title: "Juz",
            value: "juz"
        }
    };

    const onChange = (value) => {
        props.setMode(value);
        props.setSelectedJuzs([]);
        props.setSelectedSurahs([]);
    }

    return (
        <TripleToggleSwitch labels={labels} onChange={onChange} />
    );
};

const Sidebar = (props) => {
    const { surahData, juzData } = props; // Extract surahData from props

    return (
        <div className="sidebar">
            <div className="tri-switch-container">
                <TriSwitch 
                    setMode={props.setMode} 
                    setSelectedJuzs={props.setSelectedJuzs}
                    setSelectedSurahs={props.setSelectedSurahs}
                />
            </div>

            <div className='game-options'>
                <GameOptions handleHardToggle={props.handleHardToggle} handleAyahToggle={props.handleAyahToggle} />
            </div>

            <nav className='nav-down'>
                {props.mode === 'left' && 
                <ul>
                    {surahData && surahData.chapters.map((surah, index) => (
                        // Check if surahData exists and then map over the chapters
                        <li key={index}><Button getRandomAyah={props.getRandomAyah} text={surah.name_simple} surah_number={surah.id} selectedSurahs={props.selectedSurahs} setSelectedSurahs={props.setSelectedSurahs}/> </li>
                    ))}
                </ul>
                }

                {props.mode === 'center' && 
                <ul>
                    {juzData && juzData.juzs.map((juz, index) => (
                        // Check if surahData exists and then map over the chapters
                        <li key={index}><Button getRandomAyah={props.getRandomAyah} text={juz.juz_number} juz_number={juz.juz_number} selectedJuzs={props.selectedJuzs} setSelectedJuzs={props.setSelectedJuzs}/> </li>
                    ))}
                </ul>
                }

                {props.mode === 'right' &&
                <ul>
                    <div>
                    <label>From: </label>
                    <input className='page-input' />
                    </div>
                    
                    <div>
                    <label>To: </label>
                    <input className='page-input' />
                    </div>
                </ul>
                
                
                }

            </nav>
        </div>
    );
};

export default Sidebar;
