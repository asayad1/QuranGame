import React, { useState, useEffect } from "react";
import './Quran.css'

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function Quran(props) {
    const [ayahText, setAyahText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);



    useEffect(() => {
        // juz 
        if (props.selectedJuzs.length !== 0) {
            setIsLoading(true);
            setError(null);
            const selectedJuz = props.selectedJuzs[getRandomInt(props.selectedJuzs.length)];
            fetch(`https://api.quran.com/api/v4/verses/random?words=true&word_fields=text_uthmani&juz_number=${selectedJuz}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    const sortedWords = data.verse.words.sort((a, b) => a.position - b.position);
                    // Remove the last entry from the array
                    const wordsWithoutLast = sortedWords.slice(0, -1);
                    const ayah = wordsWithoutLast.map(word => word.text_uthmani).join(" ");
                    setAyahText(ayah);
                    setIsLoading(false);;
                })
                .catch(error => {
                    setError(error.message);
                    setIsLoading(false);
                });
        } 
        
        // Surahs
        else if (props.selectedSurahs.length !== 0) {
            setIsLoading(true);
            setError(null);
            console.log(props.surahData);
    
            // Calculating total verses in selected Surahs
            const totalVerses = props.selectedSurahs.reduce((sum, surahId) => {
                const surahData = props.surahData.chapters.find(surah => surah.id === surahId);
                return surahData ? sum + surahData.verses_count : sum;
            }, 0);
    
            const randomVerseNumber = getRandomInt(totalVerses);
            let cumulativeSum = 0;
            let selectedSurahData = null;
            let selectedVerseIndex = 0;
    
            for (const surahId of props.selectedSurahs) {
                const surahData = props.surahData.chapters.find(surah => surah.id === surahId);
                if (surahData && cumulativeSum + surahData.verses_count > randomVerseNumber) {
                    selectedSurahData = surahData;
                    selectedVerseIndex = randomVerseNumber - cumulativeSum + 1; // Local verse index within the Surah
                    break;
                }
                cumulativeSum += surahData ? surahData.verses_count : 0;
            }
            console.log(selectedSurahData)
            console.log(selectedVerseIndex)
            
    
            if (selectedSurahData && selectedVerseIndex <= selectedSurahData.verses_count) {
                fetch(`https://api.quran.com/api/v4/verses/by_key/${selectedSurahData.id + ':' + selectedVerseIndex}?words=true&word_fields=text_uthmani`)
                .then(response => {
                    console.log(response)
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    const sortedWords = data.verse.words.sort((a, b) => a.position - b.position);
                    // Remove the last entry from the array
                    const wordsWithoutLast = sortedWords.slice(0, -1);
                    const ayah = wordsWithoutLast.map(word => word.text_uthmani).join(" ");
                    setAyahText(ayah);
                    setIsLoading(false);;
                })
                .catch(error => {
                    setError(error.message);
                    setIsLoading(false);
                });
            } else {
                setError("Could not find the selected verse");
            }
            setIsLoading(false);
        }
    }, [props.selectedJuzs, props.selectedSurahs, props.surahData]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1 className="ayah">{ayahText}</h1>
        </div>
    );
}

export default Quran;