// Install necessary packages before starting
// npm install axios react-icons

// App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [description, setDescription] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchSummary = async () => {
    if (!description) {
      alert('Please enter a valid description');
      return;
    }

    setLoading(true);
    const options = {
      method: 'POST',
      url: 'https://text-summariser2.p.rapidapi.com/summariser',
      headers: {
        'x-rapidapi-key': '6dfff8a15dmsh50fe9ab52054b5dp1dd8cejsn6fffd706b566',
        'x-rapidapi-host': 'text-summariser2.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        job_description: description
      }
    };

    try {
      const response = await axios.request(options);
      setSummary(JSON.stringify(response.data, null, 2)); // Displaying raw data as summary
    } catch (error) {
      console.error('Error fetching summary:', error);
      setSummary('Failed to retrieve summary. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">Job Description Summarizer</h1>
        <div>
          <textarea
            placeholder="Enter job description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            rows="5"
          />
        </div>
        <button
          onClick={fetchSummary}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg focus:outline-none"
        >
          {loading ? 'Summarizing...' : 'Get Summary'}
        </button>
        {summary && (
          <div className="h-full w-full mt-6 p-4 bg-gray-50 border rounded-lg text-sm text-gray-800">
            <strong>Summary : </strong>
            <pre className="text-wrap">{summary}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

// App.css
// Include TailwindCSS via a CDN or configured in your project

// Tailwind Setup
// Add Tailwind by installing it (npm install -D tailwindcss) and configuring it in your project.
