'use client';

import { useState } from 'react';
import { format } from 'date-fns';

export default function SuggestionForm() {
  const [name, setName] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/save-suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          suggestion: suggestion.trim(),
          timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Thank you! Your suggestion has been submitted successfully.');
        setName('');
        setSuggestion('');
      } else {
        setMessage(data.error || 'Failed to submit suggestion. Please try again.');
      }
    } catch (error) {
      setMessage('Error submitting suggestion. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Suggestion Box</h2>
      <p className="text-sm text-gray-600 mb-4">
        Share your ideas about environment, renewable energy, or workplace improvements!
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>
        
        <div>
          <label htmlFor="suggestion" className="block text-sm font-medium text-gray-700 mb-1">
            Your Suggestion
          </label>
          <textarea
            id="suggestion"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share your suggestion here..."
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
        </button>
        
        {message && (
          <div className={`p-3 rounded-md text-sm ${
            message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
