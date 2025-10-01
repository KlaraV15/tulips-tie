import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Button } from "../Components/ui/Button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../Components/ui/Card"
import { Trophy, Crown, Medal, Award, ArrowLeft, Star, Zap, Target } from "lucide-react"
import logo from "../assets/logo-rose.png"

export default function Quiz() {
  const [searchParams] = useSearchParams()
  const selectedCategory = searchParams.get('category')
  const [transitioning, setTransitioning] = useState(false)
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)

  // Category mapping for display
  const categoryMap = {
    culture: { name: "Culture", emoji: "🎨" },
    geography: { name: "Geography", emoji: "🌍" },
    history: { name: "History", emoji: "📜" },
    politics: { name: "Politics", emoji: "🏛️" }
  }

  const currentCategory = categoryMap[selectedCategory] || { name: "General", emoji: "🌟" }

  const difficultyLevels = [
    {
      level: "easy",
      title: "🌱 Easy Mode",
      description: "Perfect for beginners! Gentle questions to build your confidence.",
      color: "from-green-400 to-green-600",
      border: "border-green-300",
      bg: "from-green-50 to-green-100",
      icon: <Medal className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />,
      points: "1x Points",
      questions: "10 questions",
      time: "Unlimited time"
    },
    {
      level: "medium",
      title: "⚡ Medium Mode",
      description: "Challenge yourself with balanced questions that test your knowledge!",
      color: "from-yellow-400 to-yellow-600",
      border: "border-yellow-300",
      bg: "from-yellow-50 to-yellow-100",
      icon: <Target className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />,
      points: "2x Points",
      questions: "15 questions",
      time: "30s per question"
    },
    {
      level: "hard",
      title: "🔥 Hard Mode",
      description: "Face the toughest questions and prove your mastery!",
      color: "from-red-400 to-red-600",
      border: "border-red-400",
      bg: "from-red-50 to-red-100",
      icon: <Crown className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />,
      points: "3x Points",
      questions: "20 questions",
      time: "15s per question"
    }
  ]

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty)
    setTransitioning(true)

    setTimeout(() => {
      // Use dynamic routing instead of hardcoded routes
      window.location.href = `/quiz/${selectedCategory}/${difficulty.level}`
    }, 800)
  }

  // Redirect if no category is selected
  useEffect(() => {
    if (!selectedCategory) {
      window.location.href = "/categories"
    }
  }, [selectedCategory])

  if (transitioning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300 flex items-center justify-center">
        {/* Transition Overlay */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-b-4 border-white mx-auto mb-4 sm:mb-8"></div>
            <h2 className="text-xl sm:text-4xl font-black text-white mb-2 sm:mb-4">
              Starting {selectedDifficulty?.title}...
            </h2>
            <p className="text-sm sm:text-xl text-white/80 font-bold">
              Get ready for {currentCategory.name} challenge! 🚀
            </p>
          </div>
        </div>

        {/* Animated background elements during transition */}
        <div className="fixed top-10 sm:top-20 left-4 sm:left-10 w-10 h-10 sm:w-20 sm:h-20 bg-yellow-300 rounded-full opacity-20 animate-ping"></div>
        <div className="fixed bottom-16 sm:bottom-32 right-8 sm:right-20 w-8 h-8 sm:w-16 sm:h-16 bg-green-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="fixed top-20 sm:top-40 right-16 sm:right-32 w-6 h-6 sm:w-12 sm:h-12 bg-purple-300 rounded-full opacity-20 animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300 overflow-x-hidden">
      {/* Floating decorative elements */}
      <div className="fixed top-10 sm:top-20 left-4 sm:left-10 w-10 h-10 sm:w-20 sm:h-20 bg-yellow-300 rounded-full opacity-20 animate-float"></div>
      <div className="fixed bottom-16 sm:bottom-32 right-8 sm:right-20 w-8 h-8 sm:w-16 sm:h-16 bg-green-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="fixed top-20 sm:top-40 right-16 sm:right-32 w-6 h-6 sm:w-12 sm:h-12 bg-purple-300 rounded-full opacity-20 animate-ping"></div>
      <div className="fixed bottom-10 sm:bottom-20 left-16 sm:left-32 w-7 h-7 sm:w-14 sm:h-14 bg-pink-300 rounded-full opacity-20 animate-bounce"></div>

      {/* Navigation */}
      <nav className="border-b-4 border-red-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-3 sm:px-4 py-3 flex items-center justify-between">
          <Link
            to="/categories"
            className="inline-flex items-center text-red-600 hover:text-red-800 transition-all duration-300 font-bold text-sm sm:text-lg hover:scale-105 bg-red-50 px-3 sm:px-4 py-1 sm:py-2 rounded-full border-2 border-red-200 hover:border-red-400 whitespace-nowrap"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 animate-bounce" />📚 Categories
          </Link>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <img src={logo || "/placeholder.svg"} className="h-8 w-6 sm:h-12 sm:w-8 text-red-600" />
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-lg sm:text-2xl font-black bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              Tulips & Ties
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Link to="/leaderboard">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold px-3 sm:px-6 py-1 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-blue-400 text-xs sm:text-base whitespace-nowrap">
                🏆 Leaders
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="container mx-auto px-3 sm:px-4 py-8 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="relative">
              <Trophy className="h-12 w-12 sm:h-20 sm:w-20 text-yellow-500 animate-bounce" />
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-red-500 rounded-full animate-ping"></div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-blue-500 text-white border-0 text-sm sm:text-lg font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full inline-block mb-4 sm:mb-6 animate-bounce shadow-xl whitespace-nowrap overflow-hidden">
            🎯 CHOOSE YOUR CHALLENGE
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 text-balance leading-tight">
            {currentCategory.emoji} {currentCategory.name}{" "}
            <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
              Challenge
            </span>
          </h1>
          <p className="text-base sm:text-xl lg:text-2xl font-bold text-gray-700 max-w-3xl mx-auto text-pretty leading-relaxed px-2">
            🚀 Test your {currentCategory.name.toLowerCase()} knowledge across different difficulty levels and climb the global leaderboard! 🌍
          </p>

          {/* Category Info Card */}
          <div className="max-w-md mx-auto mt-6 sm:mt-8">
            <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-2xl">{currentCategory.emoji}</span>
                  <div>
                    <h3 className="font-black text-lg text-purple-700">Category: {currentCategory.name}</h3>
                    <p className="text-sm text-purple-600 font-bold">
                      Croatia vs Netherlands 🇭🇷🇳🇱
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Difficulty Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {difficultyLevels.map((difficulty) => (
            <Card
              key={difficulty.level}
              className={`bg-white py-0 border-2 sm:border-4 ${difficulty.border} shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-300 hover:scale-105 card-3d cursor-pointer group`}
            >
              <CardHeader className={`bg-gradient-to-r ${difficulty.color} text-white rounded-t-lg relative overflow-hidden p-4 sm:p-6`}>
                {/* Floating decorative elements */}
                <div className="absolute top-1 sm:top-2 right-2 sm:right-4 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full opacity-40 animate-bounce"></div>
                <div className="absolute bottom-1 sm:bottom-2 left-3 sm:left-6 w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full opacity-40 animate-pulse"></div>

                <CardTitle className="flex items-center justify-center space-x-2 sm:space-x-3 text-lg sm:text-2xl font-black text-center">
                  {difficulty.icon}
                  <span className="text-white drop-shadow-lg text-sm sm:text-xl">{difficulty.title}</span>
                </CardTitle>
                <CardDescription className="text-center text-white/90 font-bold text-sm sm:text-lg mt-1 sm:mt-2">
                  {difficulty.points}
                </CardDescription>
              </CardHeader>
              <CardContent className={`p-4 sm:p-6 bg-gradient-to-br ${difficulty.bg}`}>
                <div className="text-center space-y-3 sm:space-y-4">
                  <p className="text-gray-700 font-bold text-sm sm:text-lg leading-relaxed">
                    {difficulty.description}
                  </p>

                  <div className="space-y-2 sm:space-y-3 mt-4 sm:mt-6">
                    <div className="flex items-center justify-center space-x-2 sm:space-x-3 bg-white/80 px-3 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl border-2 border-white">
                      <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                      <span className="font-black text-gray-800 text-xs sm:text-base">{difficulty.questions}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 sm:space-x-3 bg-white/80 px-3 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl border-2 border-white">
                      <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                      <span className="font-black text-gray-800 text-xs sm:text-base">{difficulty.time}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleDifficultySelect(difficulty)}
                    className={`w-full bg-gradient-to-r ${difficulty.color} hover:scale-105 text-white font-black text-sm sm:text-lg py-2 sm:py-4 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 transform border-2 border-white/50`}
                  >
                    🚀 Start {difficulty.level.charAt(0).toUpperCase() + difficulty.level.slice(1)}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-20 text-center">
          <Card className="bg-gradient-to-r from-red-100 to-blue-100 border-2 sm:border-4 border-gradient-to-r from-red-400 to-blue-400 max-w-4xl mx-auto shadow-xl sm:shadow-3xl hover:shadow-2xl sm:hover:shadow-4xl transition-all duration-300 hover:scale-105 card-3d relative overflow-hidden">
            {/* Floating decorative elements */}
            <div className="absolute top-2 sm:top-4 left-4 sm:left-8 w-4 h-4 sm:w-6 sm:h-6 bg-yellow-300 rounded-full opacity-60 animate-bounce"></div>
            <div className="absolute bottom-3 sm:bottom-6 right-6 sm:right-10 w-3 h-3 sm:w-4 sm:h-4 bg-green-300 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute top-4 sm:top-8 right-8 sm:right-16 w-3 h-3 sm:w-5 sm:h-5 bg-purple-300 rounded-full opacity-60 animate-ping"></div>

            <CardContent className="pt-8 sm:pt-12 pb-8 sm:pb-12 relative z-10">
              <div className="flex justify-center mb-4 sm:mb-6">
                <Award className="h-12 w-12 sm:h-20 sm:w-20 text-yellow-500 animate-spin" />
              </div>
              <h3 className="text-xl sm:text-3xl lg:text-4xl font-black mb-4 sm:mb-6 py-3 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                🏆 Ready to Earn Your Badges?
              </h3>
              <p className="text-sm sm:text-xl font-bold text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
                Complete {currentCategory.name.toLowerCase()} quizzes, earn points, and unlock exclusive achievements! Compete with players worldwide and show off your {currentCategory.name.toLowerCase()} expertise!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center">
                <Link to="/leaderboard">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-base sm:text-xl font-black px-6 sm:px-10 py-3 sm:py-6 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-2 sm:border-4 border-blue-400">
                    👑 View Leaderboard
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button
                    variant="outline"
                    className="border-2 sm:border-4 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700 hover:border-green-600 text-base sm:text-xl font-black px-6 sm:px-10 py-3 sm:py-6 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-transparent"
                  >
                    📚 Change Category
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="mt-6 sm:mt-8 border-t border-red-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-600 text-xs sm:text-sm font-medium text-center md:text-right">
              © 2025 Tulips & Ties • The Ultimate Croatia vs Netherlands Quiz Battle!
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}