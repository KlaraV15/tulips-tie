import { Link } from "react-router-dom"
import { Button } from "../Components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Components/ui/Card"
import { Badge } from "../Components/ui/Badge"
import { Trophy, Users, Brain, Shield, Globe, Star, Zap, Heart, Award } from "lucide-react"
import logo from '../assets/logo-rose.png'
import nl1 from '../assets/n1.png'
import nl2 from '../assets/n2.png'
import nl3 from '../assets/n3.png'
import nl4 from '../assets/n4.png'
import cro1 from '../assets/h1.png'
import cro2 from '../assets/h2.jpeg'
import cro3 from '../assets/h3.jpeg'
import cro4 from '../assets/h4.jpg'

export default function HomePage() {
  const images = [
    { src: nl1, country: 'nl', alt: 'Amsterdam Canals' },
    { src: cro1, country: 'cro', alt: 'Dubrovnik Old Town' },
    { src: nl2, country: 'nl', alt: 'Tulip Fields' },
    { src: cro2, country: 'cro', alt: 'Plitvice Lakes' },
    { src: nl3, country: 'nl', alt: 'Dutch Windmills' },
    { src: cro3, country: 'cro', alt: 'Hvar Island' },
    { src: nl4, country: 'nl', alt: 'Rotterdam Architecture' },
    { src: cro4, country: 'cro', alt: 'Rovinj Colorful Houses' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300">
      {/* Navigation */}
      <nav className="border-b-4 border-red-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img src={logo} className="h-12 w-8 text-red-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              Tulips & Ties
            </span>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/login">
              <Button
                variant="outline"
                className="px-7 py-4 text-lg text-red-600 border-2 border-red-400 
                 hover:bg-red-50 hover:text-red-700 hover:border-red-500 
                 font-semibold rounded-2xl transition-all duration-300 ease-out
                 shadow-sm hover:shadow-md"
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button
                className="px-10 py-4 text-lg font-semibold text-white 
             bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600
             hover:from-rose-700 hover:via-rose-600 hover:to-rose-700
             rounded-2xl shadow-xl hover:shadow-2xl
             border border-rose-500
             transition-all duration-300 ease-out
             transform hover:scale-110 hover:brightness-110
             focus:ring-4 focus:ring-rose-400"
              >
                🌸 Play Now!
              </Button>




            </Link>
          </div>


        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <Badge className="mb-6 bg-red-100 text-red-700 border-red-200 text-sm font-bold py-2 px-4 animate-bounce">
              🎯 LIVE QUIZ • 🇭🇷 CROATIA vs NETHERLANDS 🇳🇱
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black mb-6 text-balance leading-tight">
              Can You Master <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">Both Nations?</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 text-pretty leading-relaxed">
              🚀 Challenge your knowledge in this exciting quiz battle! Earn points, unlock achievements, and prove you're the ultimate geography champion!
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md border">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="font-bold text-gray-800">1,234 Players</span>
              </div>
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md border">
                <Zap className="h-5 w-5 text-red-500" />
                <span className="font-bold text-gray-800">20s Per Question</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/quiz">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-red-500 
             text-white text-lg px-8 py-6 
             shadow-xl border-2 border-red-400 rounded-2xl font-bold
             transition-all duration-500 transform
             animate-slowpulse"
                >
                  🎮 Start Quiz Challenge
                </Button>

                <style jsx>{`
                  @keyframes slowpulse {
                    0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(220, 38, 38, 0.5); }
                    50% { transform: scale(1.05); box-shadow: 0 0 35px rgba(220, 38, 38, 0.7); }
                  }
                  .animate-slowpulse {
                  animation: slowpulse 4s ease-in-out infinite;
                  }
                `}</style>

              </Link>
              <Link to="/leaderboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 hover:border-red-400 text-lg px-8 py-6 font-bold rounded-2xl transition-all duration-200 shadow-md"
                >
                  🏆 View Champions
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Transition Gallery */}
          <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === 0 ? 'opacity-100' : 'opacity-0'
                  }`}
                style={{
                  animation: `slideInOut 8s infinite ${index * 2}s`
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 right-4">
                  <Badge className={
                    image.country === 'nl'
                      ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg font-bold'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg font-bold'
                  }>
                    {image.country === 'nl' ? '🇳🇱 Netherlands' : '🇭🇷 Croatia'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes slideInOut {
            0%, 100% { opacity: 0; transform: scale(1.1); }
            10%, 90% { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </section>

      {/* Features Grid - Updated */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
            Quiz Features
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
            Designed for maximum fun and competition!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Life System */}
          <Card className="bg-white border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-2xl hover:scale-105 cursor-pointer">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-gray-800 text-xl">❤️ 3 Lives System</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Start with 3 hearts! Wrong answers cost lives. Game over at zero!
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Points System */}
          <Card className="bg-white border-2 border-yellow-200 hover:border-yellow-400 transition-all hover:shadow-2xl hover:scale-105 cursor-pointer">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <CardTitle className="text-gray-800 text-xl">⭐ 10 Points Each</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Score 10 points per correct answer! Climb the leaderboard fast!
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Leaderboard */}
          <Card className="bg-white border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-2xl hover:scale-105 cursor-pointer">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Trophy className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-gray-800 text-xl">🏆 Global Ranking</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Compete worldwide! Real-time leaderboard with live updates!
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Questions */}
          <Card className="bg-white border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-2xl hover:scale-105 cursor-pointer">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-gray-800 text-xl">🧠 10 Random Q's</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Fresh questions every game! Never the same quiz twice!
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Profiles */}
          <Card className="bg-white border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-2xl hover:scale-105 cursor-pointer">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-gray-800 text-xl">📊 Progress Tracking</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Track stats, achievements, and improvement over time!
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Timer */}
          <Card className="bg-white border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-2xl hover:scale-105 cursor-pointer">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-gray-800 text-xl">⏱️ Quick Rounds</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Fast-paced gameplay! Perfect for quick brain exercises!
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Game Rules - Updated */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-red-50 to-blue-50 rounded-3xl border-2 border-white shadow-xl relative overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-16 right-20 w-16 h-16 bg-green-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-32 w-12 h-12 bg-purple-300 rounded-full opacity-20 animate-ping"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4  px-1 py-2 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              How To Play
            </h2>
            <p className="text-gray-700 text-lg font-medium">Simple rules, maximum excitement!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Game Rules Card */}
            <Card className="bg-white border-2 border-red-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg relative">
                {/* Animated heart icon */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Heart className="h-6 w-6 text-white" fill="white" />
                  </div>
                </div>
                <CardTitle className="text-white text-2xl flex items-center justify-center pt-4">
                  Game Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {[
                  { text: "🎯 Each player starts with 3 lives", icon: "❤️❤️❤️" },
                  { text: "💥 Wrong answer = lose 1 life", icon: "💔" },
                  { text: "💀 Game ends at 0 lives", icon: "☠️" },
                  { text: "🔀 10 random questions per game", icon: "🎲" },
                  { text: "⏱️ Answer quickly for bonus points!", icon: "⚡" }
                ].map((rule, index) => (
                  <div key={index} className="flex items-start space-x-3 group hover:bg-red-50 p-2 rounded-lg transition-all duration-200">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-sm font-bold text-red-600 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200 border border-red-200">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 font-medium">{rule.text}</p>
                      <p className="text-sm text-gray-500 mt-1">{rule.icon}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Scoring System Card */}
            <Card className="bg-white border-2 border-blue-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg relative">
                {/* Animated trophy icon */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardTitle className="text-white text-2xl flex items-center justify-center pt-4">
                  Scoring System
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {[
                  { text: "✅ +10 points per correct answer", points: "💎 +10" },
                  { text: "⚡ +2 bonus for quick answers", points: "🚀 +2" },
                  { text: "🏆 Top scores on global leaderboard", points: "👑 #1" },
                  { text: "📈 Track your progress over time", points: "📊 Stats" },
                  { text: "🎖️ Unlock achievements and badges!", points: "🛡️ Badges" }
                ].map((rule, index) => (
                  <div key={index} className="flex items-start space-x-3 group hover:bg-blue-50 p-2 rounded-lg transition-all duration-200">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200 border border-blue-200">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 font-medium">{rule.text}</p>
                      <p className="text-sm font-bold text-blue-600 mt-1">{rule.points}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Fun Progress Bar Illustration */}
          <div className="mt-12 bg-white rounded-2xl p-6 border-2 border-yellow-200 shadow-lg">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">🎯 Your Progress Journey</h3>
              <p className="text-gray-600">From beginner to quiz master!</p>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">🥚 Beginner</div>
              <div className="text-sm font-medium text-gray-600">🐣 Intermediate</div>
              <div className="text-sm font-medium text-gray-600">🐥 Advanced</div>
              <div className="text-sm font-medium text-gray-600">🐔 Expert</div>
              <div className="text-sm font-medium text-gray-600">🦅 Master</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className="bg-gradient-to-r from-green-400 to-yellow-500 h-4 rounded-full animate-pulse"
                style={{ width: '65%' }}
              ></div>
            </div>
            <div className="flex justify-center">
              <div className="bg-yellow-100 border border-yellow-300 rounded-full px-4 py-2 text-yellow-800 font-bold text-sm animate-bounce">
                🚀 You're on your way to becoming a Quiz Master!
              </div>
            </div>
          </div>

          {/* Fun Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white rounded-xl p-4 text-center border-2 border-green-200 shadow-md hover:shadow-lg transition-all duration-200">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-bold text-gray-800">90%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border-2 border-blue-200 shadow-md hover:shadow-lg transition-all duration-200">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-bold text-gray-800">2.3s</div>
              <div className="text-sm text-gray-600">Avg. Speed</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border-2 border-purple-200 shadow-md hover:shadow-lg transition-all duration-200">
              <div className="text-2xl mb-2">🏆</div>
              <div className="font-bold text-gray-800">#42</div>
              <div className="text-sm text-gray-600">Rank</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border-2 border-red-200 shadow-md hover:shadow-lg transition-all duration-200">
              <div className="text-2xl mb-2">🎮</div>
              <div className="font-bold text-gray-800">156</div>
              <div className="text-sm text-gray-600">Games</div>
            </div>
          </div>
        </div>

        {/* Bottom decorative wave */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-transparent via-red-200 to-transparent opacity-50"></div>
      </section>


      {/* Footer */}
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