import './App.css'
import {BrowserRouter as Router ,Routes,Route,Link} from 'react-router-dom'
import HomePage from "./Components/HomePage"
import QuizPage from "./Components/Quiz"
import LoginPage from "./Components/Login"
import RegisterPage from "./Components/Register"
import LeaderboardPage from "./Components/Leaderboard"
import AdminDashboardPage from "@/Components/admin/AdminDashboardPage.jsx";
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
          <Route path="/admin/dashboard" element={<AdminDashboardPage/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
