import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './Components/HomePage';
import LoginPage from './Components/Login';
import RegisterPage from './Components/Register';
import LeaderboardPage from './Components/LeaderboardNew';
import ForgotPassword from './Components/ForgotPassword';
import CategorySelection from './Components/CategorySelection';
import Terms from './Components/TermsPage';
import NotFound from './Components/NotFound';
import AdminDashboardPage from '@/Components/admin/AdminDashboardPage.jsx';
import Quizzes from './Components/Quizzes';
import UnifiedQuiz from './Components/UnifiedQuiz';
import { AuthProvider } from './contexts/AuthContext';
import AuthGuard from './Components/auth/AuthGuard';
import AdminGuard from './Components/auth/AdminGuard';
import UserGuard from './Components/auth/UserGuard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/categories"
            element={<CategorySelection />}
          />
          <Route
            path="/quizzes"
            element={<Quizzes />}
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/register"
            element={<RegisterPage />}
          />
          <Route
            path="/leaderboard"
            element={<LeaderboardPage />}
          />
          {/* Dynamic route for quiz by ID */}
          <Route
            path="/quiz/:id"
            element={
              <AuthGuard>
                <UnifiedQuiz />
              </AuthGuard>
            }
          />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
          <Route
            path="/terms"
            element={<Terms />}
          />
          {/* Admin dashboard - protected with AdminGuard */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminGuard>
                <AdminDashboardPage />
              </AdminGuard>
            }
          />
          <Route
            path="/*"
            element={<NotFound />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
