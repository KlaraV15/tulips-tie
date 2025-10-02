import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import HttpClient from '../../helpers/HttpClient.js';

const client = new HttpClient();

export default function AuthDebug() {
  const { login, register } = useAuth();
  const [debugResults, setDebugResults] = useState('');

  const testRegistration = async () => {
    try {
      const testData = {
        username: `testuser${Date.now()}`,
        email: `test${Date.now()}@example.com`,
        password: '123456789', // Min 8 characters as required
      };

      setDebugResults('Testing registration with:\n' + JSON.stringify(testData, null, 2) + '\n\n');

      const response = await client.newPostRequest('/register', testData);

      setDebugResults((prev) => prev + 'SUCCESS:\n' + JSON.stringify(response, null, 2));
    } catch (error) {
      setDebugResults(
        (prev) =>
          prev +
          '\nERROR:\n' +
          JSON.stringify(
            {
              message: error.message,
              response: error.response,
              status: error.response?.status,
              data: error.response?.data,
            },
            null,
            2
          )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Auth Debug Tool</h1>

        <button
          onClick={testRegistration}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-6">
          Test Registration
        </button>

        <pre className="bg-white p-4 rounded border whitespace-pre-wrap">
          {debugResults || 'Click "Test Registration" to see debug info...'}
        </pre>
      </div>
    </div>
  );
}
