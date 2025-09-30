import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../Components/ui/Button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../Components/ui/Card"
import { Trophy, Crown, Medal, Award, ArrowLeft, Star, Zap, Target } from "lucide-react"
import logo from "../assets/logo-rose.png"

export default function Quiz() {
  const [transitioning, setTransitioning] = useState(false)
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)

  const difficultyLevels = [
    {
      level: "easy",
      title: "🌱 Easy Mode",
      description: "Perfect for beginners! Gentle questions to build your confidence.",
      color: "from-green-400 to-green-600",
      border: "border-green-300",
      bg: "from-green-50 to-green-100",
      icon: <Medal className="h-8 w-8 text-green-500" />,
      points: "1x Points",
      questions: "10 points",
      time: "Unlimited time"
    },
    {
      level: "medium",
      title: "⚡ Medium Mode",
      description: "Challenge yourself with balanced questions that test your knowledge!",
      color: "from-yellow-400 to-yellow-600",
      border: "border-yellow-300",
      bg: "from-yellow-50 to-yellow-100",
      icon: <Target className="h-8 w-8 text-yellow-500" />,
      points: "2x Points",
      questions: "15 points",
      time: "30s per question"
    },
    {
      level: "hard",
      title: "🔥 Hard Mode",
      description: "Face the toughest questions and prove your mastery!",
      color: "from-red-400 to-red-600",
      border: "border-red-400",
      bg: "from-red-50 to-red-100",
      icon: <Crown className="h-8 w-8 text-red-500" />,
      points: "3x Points",
      questions: "20 points",
      time: "15s per question"
    }
  ]

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty)
    setTransitioning(true)
    
    // Navigate to the quiz page after a brief transition animation
    setTimeout(() => {
      window.location.href = `/${difficulty.level}`
    }, 800) // Match this duration with CSS transition
  }

  if (transitioning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300 flex items-center justify-center">
        {/* Transition Overlay */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-white mx-auto mb-8"></div>
            <h2 className="text-4xl font-black text-white mb-4">
              Starting {selectedDifficulty?.title}...
            </h2>
            <p className="text-xl text-white/80 font-bold">
              Get ready for the challenge! 🚀
            </p>
          </div>
        </div>

        {/* Animated background elements during transition */}
        <div className="fixed top-20 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-ping"></div>
        <div className="fixed bottom-32 right-20 w-16 h-16 bg-green-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="fixed top-40 right-32 w-12 h-12 bg-purple-300 rounded-full opacity-20 animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300">
      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-float"></div>
      <div className="fixed bottom-32 right-20 w-16 h-16 bg-green-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="fixed top-40 right-32 w-12 h-12 bg-purple-300 rounded-full opacity-20 animate-ping"></div>
      <div className="fixed bottom-20 left-32 w-14 h-14 bg-pink-300 rounded-full opacity-20 animate-bounce"></div>

      {/* Navigation */}
      <nav className="border-b-4 border-red-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center text-red-600 hover:text-red-800 transition-all duration-300 font-bold text-lg hover:scale-110 bg-red-50 px-4 py-2 rounded-full border-2 border-red-200 hover:border-red-400"
          >
            <ArrowLeft className="h-5 w-5 mr-2 animate-bounce" />🏠 Back to Home
          </Link>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img src={logo || "/placeholder.svg"} className="h-12 w-8 text-red-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              Tulips & Ties
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/leaderboard">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold px-6 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border-2 border-blue-400">
                🏆 View Leaderboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Trophy className="h-20 w-20 text-yellow-500 animate-bounce" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-blue-500 text-white border-0 text-lg font-bold py-3 px-6 rounded-full inline-block mb-6 animate-bounce shadow-xl">
            🎯 CHOOSE YOUR CHALLENGE • PROVE YOUR SKILLS
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-balance leading-tight">
            Quiz{" "}
            <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
              Battle Arena
            </span>
          </h1>
          <p className="text-2xl font-bold text-gray-700 max-w-3xl mx-auto text-pretty leading-relaxed">
            🚀 Test your knowledge across different difficulty levels and climb the global leaderboard! 🌍
          </p>
        </div>

        

        {/* Difficulty Selection Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {difficultyLevels.map((difficulty) => (
            <Card 
              key={difficulty.level}
              className={`bg-white py-0 border-4 ${difficulty.border} shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 card-3d cursor-pointer group`}
            >
              <CardHeader className={`bg-gradient-to-r ${difficulty.color} text-white rounded-t-lg relative overflow-hidden p-6`}>
                {/* Floating decorative elements */}
                <div className="absolute top-2 right-4 w-4 h-4 bg-white rounded-full opacity-40 animate-bounce"></div>
                <div className="absolute bottom-2 left-6 w-3 h-3 bg-white rounded-full opacity-40 animate-pulse"></div>

                <CardTitle className="flex items-center justify-center space-x-3 text-2xl font-black text-center">
                  {difficulty.icon}
                  <span className="text-white drop-shadow-lg">{difficulty.title}</span>
                </CardTitle>
                <CardDescription className="text-center text-white/90 font-bold text-lg mt-2">
                  {difficulty.points}
                </CardDescription>
              </CardHeader>
              <CardContent className={`p-6 bg-gradient-to-br ${difficulty.bg}`}>
                <div className="text-center space-y-4">
                  <p className="text-gray-700 font-bold text-lg leading-relaxed">
                    {difficulty.description}
                  </p>
                  
                  <div className="space-y-3 mt-6">
                    <div className="flex items-center justify-center space-x-3 bg-white/80 px-4 py-2 rounded-xl border-2 border-white">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="font-black text-gray-800">{difficulty.questions}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3 bg-white/80 px-4 py-2 rounded-xl border-2 border-white">
                      <Zap className="h-5 w-5 text-blue-500" />
                      <span className="font-black text-gray-800">{difficulty.time}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleDifficultySelect(difficulty)}
                    className={`w-full bg-gradient-to-r ${difficulty.color} hover:scale-105 text-white font-black text-lg py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform border-2 border-white/50`}
                  >
                    🚀 Start {difficulty.level.charAt(0).toUpperCase() + difficulty.level.slice(1)} Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="bg-gradient-to-r from-red-100 to-blue-100 border-4 border-gradient-to-r from-red-400 to-blue-400 max-w-4xl mx-auto shadow-3xl hover:shadow-4xl transition-all duration-300 hover:scale-105 card-3d relative overflow-hidden">
            {/* Floating decorative elements */}
            <div className="absolute top-4 left-8 w-6 h-6 bg-yellow-300 rounded-full opacity-60 animate-bounce"></div>
            <div className="absolute bottom-6 right-10 w-4 h-4 bg-green-300 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute top-8 right-16 w-5 h-5 bg-purple-300 rounded-full opacity-60 animate-ping"></div>

            <CardContent className="pt-12 pb-12 relative z-10">
              <div className="flex justify-center mb-6">
                <Award className="h-20 w-20 text-yellow-500 animate-spin" />
              </div>
              <h3 className="text-4xl font-black mb-6 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                🏆 Ready to Earn Your Badges?
              </h3>
              <p className="text-xl font-bold text-gray-700 mb-8 max-w-2xl mx-auto">
                Complete quizzes, earn points, and unlock exclusive achievements! Compete with players worldwide and show off your ranking!
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/leaderboard">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-xl font-black px-10 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 border-4 border-blue-400">
                    👑 View Leaderboard
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    variant="outline"
                    className="border-4 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700 hover:border-green-600 text-xl font-black px-10 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 bg-transparent"
                  >
                    🌟 Create Account
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <footer className="mt-8 border-t border-red-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
            </div>
            <p className="text-gray-600 text-sm font-medium">
              © 2025 Tulips & Ties • The Ultimate Croatia vs Netherlands Quiz Battle!
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}