import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './Components/HomePage';
import QuizPage from './Components/Quiz';
import LoginPage from './Components/Login';
import RegisterPage from './Components/Register';
import LeaderboardPage from './Components/Leaderboard';
import Easy from './Components/Easy';
import Medium from './Components/Medium';
import Hard from './Components/Hard';
import ForgotPassword from './Components/ForgotPassword';
import CategorySelection from './Components/CategorySelection';
import QuizWrapper from './Components/QuizWrapper'; // New component
import Terms from './Components/TermsPage';
import NotFound from './Components/NotFound';
import AdminDashboardPage from '@/Components/admin/AdminDashboardPage.jsx';
import Quizzes from './Components/Quizzes';
import UnifiedQuiz from './Components/UnifiedQuiz';
import AuthTest from './Components/AuthTest';
import AuthDebug from './Components/AuthDebug';
import { AuthProvider } from './contexts/AuthContext';

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
            path="/quiz"
            element={<QuizPage />}
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
          <Route
            path="/easy"
            element={<Easy />}
          />
          <Route
            path="/medium"
            element={<Medium />}
          />
          <Route
            path="/hard"
            element={<Hard />}
          />
          {/* Dynamic route for all category quizzes */}
          <Route
            path="/quiz/:category/:difficulty"
            element={<QuizWrapper />}
          />
          {/* Dynamic route for quiz by ID */}
          <Route
            path="/quiz/:id"
            element={<UnifiedQuiz />}
          />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
          <Route
            path="/terms"
            element={<Terms />}
          />
          <Route
            path="/admin/dashboard"
            element={<AdminDashboardPage />}></Route>
          <Route
            path="/auth-test"
            element={<AuthTest />}
          />
          <Route
            path="/auth-debug"
            element={<AuthDebug />}
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
