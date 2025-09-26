import { Link } from "react-router-dom"
import { Button } from "../Components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Components/ui/Card"
import { Badge } from "../Components/ui/Badge"
import { Trophy, Users, Brain, Shield, Globe, Star } from "lucide-react"
import logo from '../assets/logo-rose.png'
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F3F2EC]">
      {/* Navigation */}
      <nav className="border-b border-[#DCDCDC] bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={logo} className="h-12 w-8 text-[#1E93AB]" />
            <span className="text-xl font-bold text-[#E62727]">Tulips & Ties</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-[#1E93AB] hover:text-[#1E93AB] hover:bg-[#1E93AB]/10">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-[#E62727] hover:bg-[#E62727]/90 text-white shadow-lg hover:shadow-xl transition-all">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-[#1E93AB]/10 text-[#1E93AB] border-[#1E93AB]/20">🇭🇷 Croatia & Netherlands 🇳🇱</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Test Your Knowledge of <span className="text-[#E62727]">Two Amazing Countries</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 text-pretty max-w-2xl mx-auto">
            Challenge yourself with questions about Croatia and the Netherlands. Earn points, climb the leaderboard, and
            become the ultimate geography expert!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz">
              <Button size="lg" className="bg-[#E62727] hover:bg-[#E62727]/90 text-white text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                Start Quiz Now
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button size="lg" variant="outline" className="text-[#1E93AB] border-[#1E93AB] hover:bg-[#1E93AB]/10 text-lg px-8 py-6">
                View Leaderboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">How It Works</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Simple rules, engaging gameplay, and competitive scoring system
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white border-[#DCDCDC] hover:border-[#1E93AB]/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-[#1E93AB]/10 rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-[#1E93AB]" />
              </div>
              <CardTitle className="text-gray-800">3 Lives System</CardTitle>
              <CardDescription className="text-gray-600">
                Start with 3 lives. Each wrong answer costs you one life. Game over when you lose all lives!
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white border-[#DCDCDC] hover:border-[#E62727]/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-[#E62727]/10 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-[#E62727]" />
              </div>
              <CardTitle className="text-gray-800">10 Points Per Question</CardTitle>
              <CardDescription className="text-gray-600">
                Earn 10 points for each correct answer. Build your score and climb the global leaderboard!
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white border-[#DCDCDC] hover:border-[#1E93AB]/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-[#1E93AB]/10 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-[#1E93AB]" />
              </div>
              <CardTitle className="text-gray-800">Global Leaderboard</CardTitle>
              <CardDescription className="text-gray-600">
                Compete with players worldwide. Track your progress and see how you rank against others!
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white border-[#DCDCDC] hover:border-[#1E93AB]/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-[#1E93AB]/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-[#1E93AB]" />
              </div>
              <CardTitle className="text-gray-800">10 Random Questions</CardTitle>
              <CardDescription className="text-gray-600">
                Each quiz session features 10 randomly selected questions about Croatia and the Netherlands.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white border-[#DCDCDC] hover:border-[#E62727]/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-[#E62727]/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-[#E62727]" />
              </div>
              <CardTitle className="text-gray-800">User Profiles</CardTitle>
              <CardDescription className="text-gray-600">
                Track your quiz history, view your statistics, and monitor your improvement over time.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white border-[#DCDCDC] hover:border-[#1E93AB]/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-[#1E93AB]/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-[#1E93AB]" />
              </div>
              <CardTitle className="text-gray-800">Admin Dashboard</CardTitle>
              <CardDescription className="text-gray-600">
                Admins can create, edit, and manage quiz questions to keep the content fresh and challenging.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Game Rules */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Game Rules</h2>
            <p className="text-gray-600 text-lg">Simple and straightforward rules for maximum fun</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white border-[#DCDCDC]">
              <CardHeader>
                <CardTitle className="text-[#1E93AB]">Basic Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#1E93AB] rounded-full flex items-center justify-center text-sm font-bold text-white mt-0.5">
                    1
                  </div>
                  <p className="text-gray-700">Each user starts with 3 lives</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#1E93AB] rounded-full flex items-center justify-center text-sm font-bold text-white mt-0.5">
                    2
                  </div>
                  <p className="text-gray-700">Each incorrect answer removes 1 life</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#1E93AB] rounded-full flex items-center justify-center text-sm font-bold text-white mt-0.5">
                    3
                  </div>
                  <p className="text-gray-700">Game ends when you lose all 3 lives</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#1E93AB] rounded-full flex items-center justify-center text-sm font-bold text-white mt-0.5">
                    4
                  </div>
                  <p className="text-gray-700">Standard quiz has 10 random questions</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#DCDCDC]">
              <CardHeader>
                <CardTitle className="text-[#E62727]">Scoring & Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#E62727] rounded-full flex items-center justify-center text-sm font-bold text-white mt-0.5">
                    1
                  </div>
                  <p className="text-gray-700">Each question has 4 possible answers</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#E62727] rounded-full flex items-center justify-center text-sm font-bold text-white mt-0.5">
                    2
                  </div>
                  <p className="text-gray-700">Earn 10 points per correct answer</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#E62727] rounded-full flex items-center justify-center text-sm font-bold text-white mt-0.5">
                    3
                  </div>
                  <p className="text-gray-700">View correct answers & remaining lives</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#E62727] rounded-full flex items-center justify-center text-sm font-bold text-white mt-0.5">
                    4
                  </div>
                  <p className="text-gray-700">Results saved to global leaderboard</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Ready to Test Your Knowledge?</h2>
          <p className="text-gray-600 text-lg mb-8">
            Join thousands of players competing for the top spot on our global leaderboard.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-[#E62727] hover:bg-[#E62727]/90 text-white text-lg px-12 py-6 shadow-lg hover:shadow-xl transition-all">
              Start Playing Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#DCDCDC] bg-white/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
               <img src={logo} className="h-12 w-8 text-[#1E93AB]" />
              <span className="font-bold text-[#E62727]">Tulips & Ties</span>
            </div>
            <p className="text-gray-600 text-sm">
              © 2025 Tulips & Ties. Test your knowledge of Croatia and the Netherlands.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}