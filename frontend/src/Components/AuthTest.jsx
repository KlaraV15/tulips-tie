import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function AuthTest() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-8 shadow-xl max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
          Auth Status
        </h1>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium">Authenticated:</span>
            <span
              className={`px-2 py-1 rounded text-sm font-bold ${
                isAuthenticated ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
              {isAuthenticated ? 'Yes' : 'No'}
            </span>
          </div>

          {isAuthenticated && user && (
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Username:</span>
                <span className="font-bold text-gray-700">{user.username}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Email:</span>
                <span className="font-bold text-gray-700">{user.email}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">User ID:</span>
                <span className="font-bold text-gray-700">{user.id}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
