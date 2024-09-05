import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';

export const generateGameCode = (gameData) => {
  const jsonString = JSON.stringify(gameData);
  return compressToEncodedURIComponent(jsonString);
};

export const parseGameCode = (code) => {
  try {
    const jsonString = decompressFromEncodedURIComponent(code);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to parse game code:', error);
    return null;
  }
};