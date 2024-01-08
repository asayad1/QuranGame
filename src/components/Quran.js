import React, { useState, useEffect } from "react";


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function Quran(props) {
    const [ayahText, setAyahText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
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
    }, [props.selectedJuzs]); // Dependency array includes props.selectedJuzs

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>{ayahText}</h1>
        </div>
    );
}

export default Quran;
