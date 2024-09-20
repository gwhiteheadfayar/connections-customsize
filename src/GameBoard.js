import React, { useState, useEffect } from 'react';
import Button from './components/Button';
import { playClickSound, playSubmitSound, playMistakeSound, playSuccessSound, playLoseSound, playWinSound } from './utils/soundEffects';

const GameBoard = ({ gameData, onGameEnd }) => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [solvedCategories, setSolvedCategories] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [remainingWords, setRemainingWords] = useState([]);

  const wordsPerCategory = gameData.categories[0].words.length;
  const maxMistakes = gameData.gridSize.rows;

  useEffect(() => {
    shuffleBoard();
  }, [gameData]);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const shuffleBoard = () => {
    const words = gameData.categories.flatMap(category => 
      category.words.map(word => ({ word, category: category.title }))
    );
    setRemainingWords(shuffleArray(words));
  };

  const handleCategorySolved = (category) => {
    setSolvedCategories(prev => [...prev, category]);
    setRemainingWords(prev => prev.filter(wordObj => !category.words.includes(wordObj.word)));
    setSelectedWords([]);
    playSuccessSound();
  };

  const handleWordClick = (word) => {
    playClickSound();
    if (selectedWords.includes(word)) {
      setSelectedWords(prev => prev.filter(w => w !== word));
    } else if (selectedWords.length < wordsPerCategory) {
      setSelectedWords(prev => [...prev, word]);
    }
  };

  const handleSubmitAnswer = () => {
    playSubmitSound();
    if (selectedWords.length === wordsPerCategory) {
      const category = gameData.categories.find(cat =>
        cat.words.every(w => selectedWords.includes(w))
      );

      if (category) {
        handleCategorySolved(category);
        if (solvedCategories.length + 1 === gameData.categories.length) {
          playWinSound();
          onGameEnd(true);
        }
      } else {
        playMistakeSound();
        setMistakes(prev => prev + 1);
        setSelectedWords([]);
        if (mistakes + 1 >= maxMistakes) {
          playLoseSound();
          onGameEnd(false);
        }
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="w-full max-w-screen-sm">
          <div className="grid gap-2" style={{ 
            gridTemplateColumns: `repeat(${gameData.gridSize.cols}, minmax(0, 1fr))`,
            gridAutoRows: '1fr'
          }}>
            {remainingWords.map((wordObj, index) => (
              <div key={index} className="aspect-square">
                <Button
                  onClick={() => handleWordClick(wordObj.word)}
                  className={`
                    ${selectedWords.includes(wordObj.word) ? 'bg-blue-700' : 'bg-blue-500'}
                    hover:bg-blue-600 text-white w-full h-full flex items-center justify-center text-center
                    text-xs sm:text-sm md:text-base
                  `}
                >
                  <span className="break-words p-1">{wordObj.word}</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>Mistakes: {mistakes} / {maxMistakes}</div>
      <div className="flex space-x-2">
        <Button 
          onClick={handleSubmitAnswer} 
          disabled={selectedWords.length !== wordsPerCategory}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit Answer
        </Button>
        <Button 
          onClick={shuffleBoard}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
        >
          Shuffle Board
        </Button>
      </div>
      <div className="space-y-2">
        {solvedCategories.map((category, index) => (
          <div key={index} className="bg-green-100 p-2 rounded">
            <h3 className="font-bold">{category.title}</h3>
            <div className="flex flex-wrap gap-1">
              {category.words.map((word, wordIndex) => (
                <span key={wordIndex} className="bg-green-200 px-2 py-1 rounded">{word}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
