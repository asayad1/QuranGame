import React, { useState } from 'react';
import './Button.css';

function Button(props) {
    // Initial state is the original color, assuming it's transparent
    const [bgColor, setBgColor] = useState('transparent');
    
    // Toggle the background color between original and green
    const handleClick = () => {
        setBgColor(prevColor => prevColor === 'transparent' ? '#efe2cd' : 'transparent');
        
        if (props.juz_number) {
            console.log(props.juz_number)
            if (props.selectedJuzs.includes(props.juz_number)) {
                // Remove item from array
                props.setSelectedJuzs(props.selectedJuzs.filter(item => item !== props.juz_number));
              } else {
                // Add item to array
                props.setSelectedJuzs([...props.selectedJuzs, props.juz_number]);
              }
        } else {
            // Surah
            if (props.selectedSurahs.includes(props.surah_number)) {
                // Remove item from array
                props.setSelectedSurahs(props.selectedSurahs.filter(item => item !== props.surah_number));
              } else {
                // Add item to array
                props.setSelectedSurahs([...props.selectedSurahs, props.surah_number]);
              }
        }
    };

    return (
        <div>
            <button className='button' style={{ backgroundColor: bgColor }} onClick={handleClick}>
                {props.text}
            </button>
        </div>
    );
}

export default Button;
