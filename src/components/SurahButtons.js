import React from 'react';
import './SurahButtons.css'

function SurahButtons(props) {
    return (
        <div className='surah-button-container'>
            <div className='number-container'>
                <h1>{props.surahNumber}</h1>
            </div>

            <div className='text-container'>
                <h1 className='name'>{props.surahName}</h1>
                <h2 className='nameTranslation'>{props.nameTranslation} </h2>
            </div>
        </div>
    )
}

export default SurahButtons;
