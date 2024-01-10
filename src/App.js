import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar'; // Import the Sidebar component
import SurahButtons from './components/SurahButtons';
import Quran from './components/Quran';
import './App.css'; // Importing the App styles

const SurahTable = ({ score, setScore, surahData, ayahID, setIncorrect, setSkipped}) => {
    if (!surahData || !surahData.chapters) {
        return <p>Loading...</p>;
    }

    // Function to log a message to the console
    const handleCellClick = (surahNumber, surahName) => {
        if (Number(ayahID.split(":")[0]) === surahNumber){
            setScore(score + 1)
            setIncorrect(false);
        } else {
            setIncorrect(true);
        }
        setSkipped(0);
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
    const [mode, setMode] = useState('left')    
    const [hard, setHard] = useState(false);
    const [guessAyah, setGuessAyah] = useState(false);
    const [selectedSurahs, setSelectedSurahs] = useState([]);
    const [selectedJuzs, setSelectedJuzs] = useState([]);
    const [ayahID, setAyahID] = useState();
    const [score, setScore] = useState(1);
    const [incorrect, setIncorrect] = useState(false);
    const [skipped, setSkipped] = useState(0);
    const [prevSurahID, setPrevSurahID] = useState();


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

    const handleAyahToggle = () => {
        setGuessAyah(!guessAyah);
    };
    
    const handleHardToggle = () => {
        setHard(!hard);
    };

    const handleSkip = () => {
        setSkipped(skipped + 1);
        setPrevSurahID(ayahID);
    }

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
                <h1>Selected Verse: {ayahID}</h1>    
                
                <h1><b>Guess the surah:</b></h1>
                <Quran
                    ayahID={ayahID}
                    setAyahID={setAyahID}
                    surahData={surahData}
                    selectedSurahs={selectedSurahs}
                    selectedJuzs={selectedJuzs}  
                    score={score}  
                    skipped={skipped}
                />
                <div className="parent-div">
                    <button className='top-button'>Hint</button>
                    <button className='top-button' onClick={handleSkip}>Skip</button>
                </div>
                <h1>Score: {score - 1}</h1>
                {incorrect && <h1>Incorrect. Try again!</h1>}
                {skipped > 0 && <h1>The previous verse was <a target="_blank" rel="noopener noreferrer" href={`https://quran.com/en/${prevSurahID}`}>{prevSurahID}</a></h1>}
                <SurahTable setSkipped={setSkipped} setIncorrect={setIncorrect} score={score} setScore={setScore} surahData={surahData} ayahID={ayahID}/>
                <h2>Made by Ahmad Sayad. For any bug reports / feature suggestions please email ahmadksayad@gmail.com</h2>
            </div>
        </div>
    );
};

export default App;
