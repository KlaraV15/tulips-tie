import './App.css'
import {BrowserRouter as Router ,Routes,Route,Link} from 'react-router-dom'
import HomePage from "./Components/HomePage"
import QuizPage from "./Components/Quiz"
import LoginPage from "./Components/Login"
import RegisterPage from "./Components/Register"
import LeaderboardPage from "./Components/Leaderboard"
import Easy from './Components/Easy'
import Medium from './Components/Medium'
import Hard from './Components/Hard'
import ForgotPassword from "./Components/ForgotPassword"
function App() {

  return (
    <>
    <Router>
      <Routes>
       <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage/>} />
          <Route path="/easy" element={<Easy />} />
          <Route path="/medium" element={<Medium />} />
          <Route path="/hard" element={<Hard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
