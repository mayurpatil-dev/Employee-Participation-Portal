'use client';
import { useState } from 'react';

export default function SuggestionForm() {
  const [name, setName] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/save-suggestion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, suggestion }),
    });

    if (res.ok) {
      setMessage('✅ Suggestion saved!');
      setName('');
      setSuggestion('');
    } else {
      setMessage('❌ Failed to save. Try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 border rounded max-w-md mx-auto">
      <input
        type="text"
        value={name}
        placeholder="Your Name"
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border"
        required
      />
      <textarea
        value={suggestion}
        placeholder="Your Suggestion"
        onChange={(e) => setSuggestion(e.target.value)}
        className="w-full p-2 border"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
