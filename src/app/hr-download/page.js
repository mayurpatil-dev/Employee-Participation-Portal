'use client';

import { useState } from 'react';

export default function HRDownload() {
  const [passcode, setPasscode] = useState('');
  const [message, setMessage] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();
    setIsDownloading(true);
    setMessage('');

    if (passcode !== '1001') {
      setMessage('Invalid passcode. Please try again.');
      setIsDownloading(false);
      return;
    }

    try {
      const response = await fetch('/api/download-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passcode }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `suggestions-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        setMessage('File downloaded successfully!');
      } else {
        const data = await response.json();
        setMessage(data.error || 'Failed to download file.');
      }
    } catch (error) {
      setMessage('Error downloading file. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">HR Download Portal</h1>
      <p className="text-sm text-gray-600 mb-4">
        Enter the passcode to download all suggestions.
      </p>
      
      <form onSubmit={handleDownload} className="space-y-4">
        <div>
          <label htmlFor="passcode" className="block text-sm font-medium text-gray-700 mb-1">
            Passcode
          </label>
          <input
            type="password"
            id="passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter passcode"
          />
        </div>
        
        <button
          type="submit"
          disabled={isDownloading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
        >
          {isDownloading ? 'Downloading...' : 'Download Suggestions'}
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
