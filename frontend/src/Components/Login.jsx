import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import logo from '../assets/logo-rose.png';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        setMessage(result.message);
        // Navigate to home page after successful login
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <img
                src={logo}
                className="h-12 w-8 text-red-600"
                alt="Tulips & Ties Logo"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
            Welcome Back!
          </h1>
          <p className="text-gray-700 mt-2 font-medium">Sign in to continue your quiz journey</p>
        </div>

        {/* Login Form */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center">
              <LogIn className="h-6 w-6 mr-2 text-red-600" />
              Sign In
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <form
              onSubmit={handleSubmit}
              className="space-y-4">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pl-12 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 ${
                      errors.email
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="text-red-500 mr-1">⚠</span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pl-12 pr-12 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 ${
                      errors.password
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    disabled={loading}>
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="text-red-500 mr-1">⚠</span>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign In
                  </>
                )}
              </Button>

              {/* Success/Error Message */}
              {message && (
                <div
                  className={`text-center p-3 rounded-xl ${
                    message.includes('success')
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                  <p className="font-medium">{message}</p>
                </div>
              )}
            </form>

            {/* Forgot Password Link */}
            <div className="text-center mt-6">
              <Link
                to="/forgot-password"
                className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200">
                Forgot your password?
              </Link>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home Link */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-700 font-medium transition-colors duration-200">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
