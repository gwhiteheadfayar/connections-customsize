import React, { useState, useEffect } from 'react';
import Button from './components/Button';
import Input from './components/Input';
import Label from './components/Label';

const GameCreator = ({ onCreateGame }) => {
  const [gridSize, setGridSize] = useState({ rows: 4, cols: 4 });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    updateCategories(gridSize.rows, gridSize.cols);
  }, [gridSize]);

  const updateCategories = (rows, cols) => {
    setCategories(prevCategories => {
      const newCategories = Array(cols).fill(null).map((_, index) => ({
        title: prevCategories[index]?.title || '',
        words: Array(rows).fill('').map((_, wordIndex) => 
          prevCategories[index]?.words[wordIndex] || ''
        )
      }));
      return newCategories;
    });
  };

  const handleGridSizeChange = (dimension, value) => {
    const newValue = Math.max(1, Math.min(10, value)); // Limit between 1 and 10
    setGridSize(prev => ({ ...prev, [dimension]: newValue }));
  };

  const handleCategoryChange = (index, field, value) => {
    setCategories(prevCategories => {
      const newCategories = [...prevCategories];
      newCategories[index] = { ...newCategories[index], [field]: value };
      return newCategories;
    });
  };

  const handleWordChange = (categoryIndex, wordIndex, value) => {
    setCategories(prevCategories => {
      const newCategories = [...prevCategories];
      newCategories[categoryIndex].words[wordIndex] = value;
      return newCategories;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateGame({ gridSize, categories });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-2">
        <div>
          <Label htmlFor="rows">Words per Category</Label>
          <Input
            id="rows"
            type="number"
            min="1"
            max="10"
            value={gridSize.rows}
            onChange={(e) => handleGridSizeChange('rows', parseInt(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="cols">Number of Categories</Label>
          <Input
            id="cols"
            type="number"
            min="1"
            max="10"
            value={gridSize.cols}
            onChange={(e) => handleGridSizeChange('cols', parseInt(e.target.value))}
          />
        </div>
      </div>
      
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-2">
          <Input
            value={category.title}
            onChange={(e) => handleCategoryChange(categoryIndex, 'title', e.target.value)}
            placeholder={`Category ${categoryIndex + 1} Title`}
          />
          {category.words.map((word, wordIndex) => (
            <Input
              key={wordIndex}
              value={word}
              onChange={(e) => handleWordChange(categoryIndex, wordIndex, e.target.value)}
              placeholder={`Word ${wordIndex + 1}`}
            />
          ))}
        </div>
      ))}
      
      <Button type="submit">Create Game</Button>
    </form>
  );
};

export default GameCreator;