import './index.css';
import React, { useState } from 'react';
import GameCreator from './GameCreator';
import GameBoard from './GameBoard';
import { generateGameCode, parseGameCode } from './gameCodeUtils';
import Button from './components/Button';
import Input from './components/Input';

const App = () => {
  const [gameState, setGameState] = useState('create');
  const [gameData, setGameData] = useState(null);
  const [gameCode, setGameCode] = useState('');
  const [gameResult, setGameResult] = useState(null);
  const [copyButtonText, setCopyButtonText] = useState('Copy Game Code');

  const handleCreateGame = (data) => {
    const code = generateGameCode(data);
    setGameCode(code);
    setGameData(data);
    setGameState('play');
  };

  const handleJoinGame = () => {
    const data = parseGameCode(gameCode);
    if (data) {
      setGameData(data);
      setGameState('play');
    } else {
      alert('Invalid game code');
    }
  };

  const handleGameEnd = (isWin) => {
    setGameResult(isWin);
    setGameState('end');
  };

  const copyGameCode = () => {
    navigator.clipboard.writeText(gameCode).then(() => {
      setCopyButtonText('Copied Game Code!');
      //setTimeout(() => setCopyButtonText('Copy Game Code'), 10000);
    });
  };

  return (
    <div className="container mx-auto p-4">
      {gameState === 'create' && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Create or Join a Game</h1>
          <GameCreator onCreateGame={handleCreateGame} />
          <div className="mt-4">
            <Input
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value)}
              placeholder="Enter game code"
            />
            <Button onClick={handleJoinGame} className="mt-2">Join Game</Button>
          </div>
        </div>
      )}

      {gameState === 'play' && gameData && (
        <div>
          <Button onClick={copyGameCode} className="mb-4">{copyButtonText}</Button>
          <GameBoard gameData={gameData} onGameEnd={handleGameEnd} />
        </div>
      )}

      {gameState === 'end' && (
        <div>
          <h2 className="text-xl font-bold mb-4">
            {gameResult ? 'Congratulations! You won!' : 'Game Over. Try again!'}
          </h2>
          <Button onClick={() => setGameState('create')}>New Game</Button>
        </div>
      )}
    </div>
  );
};

export default App;
