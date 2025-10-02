import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import HttpClient from '../../helpers/HttpClient.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const client = new HttpClient();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('auth_token'));
  const [loading, setLoading] = useState(true);

  // Clear auth data utility function
  const clearAuthData = useCallback(() => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
    client.setToken(null);
  }, []);

  // Initialize auth state on app load
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          // Set token in HttpClient
          client.setToken(token);

          // Try to get user profile
          const response = await client.newRequest('/user');
          setUser(response.data);
        } catch (error) {
          console.error('Auth initialization failed:', error);
          // Token is invalid, clear auth data
          clearAuthData();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token, clearAuthData]);

  const login = async (email, password) => {
    try {
      const response = await client.newPostRequest('/login', { email, password });

      if (response.data.access_token) {
        const authToken = response.data.access_token;

        // Save token to localStorage
        localStorage.setItem('auth_token', authToken);

        // Set token in HttpClient
        client.setToken(authToken);

        // Get user profile
        const userResponse = await client.newRequest('/user');
        setToken(authToken);
        setUser(userResponse.data);

        return { success: true, message: 'Login successful' };
      }
    } catch (error) {
      console.error('Login failed:', error);
      const errorMsg = error.message || 'Login failed. Please try again.';
      return { success: false, message: errorMsg };
    }
  };

  const register = async (username, email, password) => {
    try {
      const registrationData = { username, email, password };
      console.log('Registration data being sent:', registrationData);

      const response = await client.newPostRequest('/register', registrationData);

      console.log('Registration response:', response);

      if (response.data.user) {
        return { success: true, message: 'Registration successful! Please login.' };
      }
    } catch (error) {
      console.error('Registration failed:', error);
      console.error('Full error object:', JSON.stringify(error, null, 2));

      // Handle validation errors from Laravel
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        let errorMessage = 'Please correct the following errors:\n';
        Object.keys(errors).forEach((field) => {
          errors[field].forEach((msg) => {
            errorMessage += `• ${field}: ${msg}\n`;
          });
        });
        return { success: false, message: errorMessage };
      }

      const errorMsg = error.message || 'Registration failed. Please try again.';
      return { success: false, message: errorMsg };
    }
  };

  const performLogout = useCallback(async () => {
    try {
      if (token) {
        await client.newRequest('/logout', {
          method: 'POST',
        });
      }
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      // Clear auth data regardless of server response
      clearAuthData();
    }
  }, [token, clearAuthData]);

  const resetPassword = async (email, password) => {
    try {
      const response = await client.newPostRequest('/resetpassword', {
        email,
        password,
        password_confirmation: password,
      });

      if (response.data.message) {
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      console.error('Password reset failed:', error);
      const errorMsg = error.message || 'Password reset failed. Please try again.';
      return { success: false, message: errorMsg };
    }
  };

  const value = {
    user,
    token,
    login,
    register,
    logout: performLogout,
    resetPassword,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
