import { Link } from "react-router-dom"
import { Button } from "../Components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Components/ui/Card"
import { Badge } from "../Components/ui/Badge"
import { Home, Search, ArrowRight, Compass, MapPin, Navigation } from "lucide-react"
import logo from '../assets/logo-rose.png'

export default function NotFound() {
  const quickLinks = [
    { path: "/", label: "🏠 Home", description: "Return to homepage" },
    { path: "/categories", label: "🎮 Quiz Categories", description: "Browse all quiz topics" },
    { path: "/leaderboard", label: "🏆 Leaderboard", description: "See top players" },
    { path: "/login", label: "🔐 Login", description: "Access your account" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300 flex flex-col">
      {/* Navigation - Same as homepage */}
      <nav className="border-b-4 border-red-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <img src={logo} className="h-8 w-6 sm:h-12 sm:w-8 text-red-600" alt="Tulips & Ties Logo" />
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              Tulips & Ties
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button
                variant="outline"
                className="px-2 sm:px-7 py-1 sm:py-4 text-xs sm:text-lg text-red-600 border-2 border-red-400 
                 hover:bg-red-50 hover:text-red-700 hover:border-red-500 
                 font-semibold rounded-lg sm:rounded-2xl transition-all duration-300 ease-out
                 shadow-sm hover:shadow-md whitespace-nowrap cursor-pointer"
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button
                className="px-3 sm:px-10 py-1 sm:py-4 text-xs sm:text-lg font-semibold text-white 
             bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600
             hover:from-rose-700 hover:via-rose-600 hover:to-rose-700
             rounded-lg sm:rounded-2xl shadow-sm sm:shadow-xl hover:shadow-2xl
             border border-rose-500
             transition-all duration-300 ease-out
             transform  hover:brightness-110
             focus:ring-2 sm:focus:ring-4 focus:ring-rose-400 whitespace-nowrap cursor-pointer"
              >
                <span className="sm:hidden">🌸</span>
                <span className="hidden sm:inline">🌸 Play Now!</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main 404 Content */}
      <div className="flex-1 container mx-auto px-3 sm:px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Animated 404 Number */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="relative inline-block">
              <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-black bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent leading-none animate-pulse">
                404
              </h1>
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
                  <Compass className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
              </div>
            </div>
            <Badge className="mt-4 bg-red-100 text-red-700 border-red-200 text-sm sm:text-base font-bold py-2 px-4 animate-pulse">
              🗺️ Page Not Found • Lost in the Quiz Universe!
            </Badge>
          </div>

          {/* Main Message Card */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-red-200 shadow-2xl hover:shadow-3xl transition-all duration-300 mb-8 sm:mb-12">
            <CardHeader className="text-center p-6 sm:p-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-2xl flex items-center justify-center mb-4 mx-auto animate-pulse">
                <MapPin className="h-8 w-8 sm:h-10 sm:w-10 text-red-600" />
              </div>
              <CardTitle className="text-2xl sm:text-4xl font-black text-gray-800 mb-4">
                Oops! Lost Your Way?
              </CardTitle>
              <CardDescription className="text-lg sm:text-xl text-gray-600 font-medium max-w-2xl mx-auto">
                Looks like this page went on a quiz adventure without us! 
                Don't worry - even the best explorers get lost sometimes. 
                Let's get you back to the fun! 🧭
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center p-6 sm:p-8 pt-0">
              <Link to="/">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-red-500 
                   text-white text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 
                   shadow-2xl border-2 border-red-400 rounded-2xl font-bold
                   transition-all duration-500 transform hover:scale-105
                   animate-slowpulse cursor-pointer mb-4 sm:mb-6"
                >
                  🏠 Back to Homepage
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-gray-500 text-sm sm:text-base">
                Or explore one of these popular destinations below
              </p>
            </CardContent>
          </Card>

          {/* Quick Navigation Grid */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {quickLinks.map((link, index) => (
              <Link key={index} to={link.path}>
                <Card className="bg-white border-2 border-red-200 hover:border-red-400 hover:shadow-xl transition-all duration-300 hover:scale-105 h-full cursor-pointer group">
                  <CardContent className="p-4 sm:p-6 flex items-center space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Navigation className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg sm:text-xl mb-1">
                        {link.label}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        {link.description}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all duration-300" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Fun Stats & Search Suggestion */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Search Card */}
            <Card className="bg-white border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-xl p-4 sm:p-6">
                <CardTitle className="text-white text-lg sm:text-xl flex items-center">
                  <Search className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                  Can't Find Something?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  Try checking the URL for typos. 
                  Our quiz masters are constantly adding new content!
                </p>
                <div className="flex space-x-3">                
                  <Button variant="outline" className="flex-1 border-green-300 text-green-600 hover:bg-green-50">
                     <Link to="/" className="flex-1 border-green-300 text-green-600 hover:bg-green-50">📚 Back to home</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Fun Facts Card */}
            <Card className="bg-white border-2 border-green-200 hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-xl p-4 sm:p-6">
                <CardTitle className="text-white text-lg sm:text-xl flex items-center">
                  🎯 Did You Know?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3">
                  {[
                    "🌷 Netherlands has over 1,000 windmills still standing",
                    "🇭🇷 Croatia has 1,244 islands and islets",
                    "⚽ Both nations love football!",
                    "🎮 Our players are non-existent!"
                  ].map((fact, index) => (
                    <div key={index} className="flex items-start space-x-2 group hover:bg-green-50 p-2 rounded-lg transition-all duration-200">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-bold text-green-600 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 text-sm sm:text-base group-hover:text-green-800 transition-colors duration-200">
                        {fact}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Floating decorative elements */}
          <div className="fixed bottom-10 right-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-bounce hidden lg:block"></div>
          <div className="fixed top-20 left-10 w-16 h-16 bg-red-300 rounded-full opacity-20 animate-pulse hidden lg:block"></div>
          <div className="fixed bottom-20 left-20 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-ping hidden lg:block"></div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-red-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-600 text-xs sm:text-sm font-medium text-center md:text-right">
              © 2025 Tulips & Ties • The Ultimate Croatia vs Netherlands Quiz Battle!
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slowpulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(220, 38, 38, 0.5); }
          50% { transform: scale(1.05); box-shadow: 0 0 35px rgba(220, 38, 38, 0.7); }
        }
        .animate-slowpulse {
          animation: slowpulse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}