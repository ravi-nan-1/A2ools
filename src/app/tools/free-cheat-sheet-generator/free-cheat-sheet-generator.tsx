'use client';

import { useState } from 'react';

const FreeCheatSheetGenerator = () => {
  const [topic, setTopic] = useState('');
  const [cheatSheet, setCheatSheet] = useState('');

  const handleGenerate = async () => {
    if (!topic) {
      alert('Please enter a topic.');
      return;
    }

    // Replace with your actual cheat sheet generation logic
    const generatedCheatSheet = `Cheat sheet for ${topic}`;
    setCheatSheet(generatedCheatSheet);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Free Cheat Sheet Generator</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic"
          className="flex-grow p-2 border rounded-l-md"
        />
        <button onClick={handleGenerate} className="bg-blue-500 text-white p-2 rounded-r-md">
          Generate
        </button>
      </div>
      {cheatSheet && (
        <div className="p-4 border rounded-md bg-gray-100">
          <h2 className="text-2xl font-bold mb-2">Your Cheat Sheet</h2>
          <pre>{cheatSheet}</pre>
        </div>
      )}
    </div>
  );
};

export default FreeCheatSheetGenerator;
