import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar'; // Import the Sidebar component
import Button from './components/Button';
import SurahButtons from './components/SurahButtons';
import Quran from './components/Quran';
import './App.css'; // Importing the App styles

const SurahTable = ({ surahData }) => {
    if (!surahData || !surahData.chapters) {
        return <p>Loading...</p>;
    }

    // Function to log a message to the console
    const handleCellClick = (surahNumber, surahName) => {
        console.log(`Surah clicked: ${surahName} (Number: ${surahNumber})`);
    };
    
    const rows = [];
    for (let i = 0; i < 19; i++) {
        const cells = [];
        for (let j = 0; j < 6; j++) {
            const surahIndex = i + j * 19;
            if (surahIndex < surahData.chapters.length) {
                cells.push(
                <td key={j} onClick={() => handleCellClick(surahIndex + 1, surahData.chapters[surahIndex].name_simple)}>
                    <SurahButtons surahName={surahData.chapters[surahIndex].name_simple} surahNumber={surahIndex + 1} nameTranslation={surahData.chapters[surahIndex].translated_name.name} />
                </td>
                );
            } else {
                cells.push(<td key={j}></td>);
            }
        }
        rows.push(<tr key={i}>{cells}</tr>);
    }

    return (
        <table className="surah-table">
            <tbody>{rows}</tbody>
        </table>
    );
};

const App = () => {
    // Fetch surah and juz data
    const [surahData, setSurahData] = useState(null);
    const [juzData, setJuzData] = useState(null);

    // Function to fetch Surah data from API
    const fetchSurahData = async () => {
        try {
            const response = await fetch('https://api.quran.com/api/v4/chapters');
            const jsonData = await response.json();
            setSurahData(jsonData);
        } catch (error) {
            console.error('Error fetching surah data:', error);
        }
    };
    
    // Function to fetch Juz data from API
    const fetchJuzData = async () => {
        try {
            const response = await fetch('https://api.quran.com/api/v4/juzs');
            const jsonData = await response.json();
            setJuzData(jsonData);
        } catch (error) {
            console.error('Error fetching juz data:', error);
        }
    };
    
    // useEffect to run fetch functions on component mount
    useEffect(() => {
        fetchSurahData();
        fetchJuzData();
    }, []);

    // Game Options
    const [mode, setMode] = useState('left')    
    const [hard, setHard] = useState(false);
    const [guessAyah, setGuessAyah] = useState(false);

    const handleAyahToggle = () => {
        setGuessAyah(!guessAyah);
    };
    
    const handleHardToggle = () => {
        setHard(!hard);
    };

    const [selectedSurahs, setSelectedSurahs] = useState([]);
    const [selectedJuzs, setSelectedJuzs] = useState([]);

    return (
        <div className="app-container">
            <Sidebar 
                mode={mode} 
                surahData={surahData} 
                juzData={juzData} 
                selectedSurahs={selectedSurahs}
                selectedJuzs={selectedJuzs}

                setMode={setMode} 
                handleHardToggle={handleHardToggle} 
                handleAyahToggle={handleAyahToggle}
                setSelectedSurahs={setSelectedSurahs}
                setSelectedJuzs={setSelectedJuzs}
            />

            <div className="main-content">
                <h1>Guess Ayah: {guessAyah && "True"} {!guessAyah && "False"}</h1>
                <h1>Hard mode: {hard && "True"} {!hard && "False"}</h1>    
                <h1>Selected Surahs: {selectedSurahs}</h1>
                <h1>Selected Juzs: {selectedJuzs}</h1>
                <h1><b>Guess the surah:</b></h1>
                <Quran 
                    selectedSurahs={selectedSurahs}
                    selectedJuzs={selectedJuzs}    
                />
                <SurahTable surahData={surahData}/>
                <SurahButtons surahName={'Al-Fatiha'} surahNumber={1} nameTranslation={'The Opening'}/>
            </div>
        </div>
    );
};

export default App;
