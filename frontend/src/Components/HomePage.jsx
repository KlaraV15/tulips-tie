import { Link } from "react-router-dom"
import { Button } from "../Components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Components/ui/Card"
import { Badge } from "../Components/ui/Badge"
import { Trophy, Users, Brain, Shield, Globe, Star } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold gradient-text">Tulips & Ties</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="glow-effect">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">🇭🇷 Croatia & Netherlands 🇳🇱</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Test Your Knowledge of <span className="gradient-text">Two Amazing Countries</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Challenge yourself with questions about Croatia and the Netherlands. Earn points, climb the leaderboard, and
            become the ultimate geography expert!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz">
              <Button size="lg" className="glow-effect text-lg px-8 py-6">
                Start Quiz Now
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                View Leaderboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Simple rules, engaging gameplay, and competitive scoring system
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>3 Lives System</CardTitle>
              <CardDescription>
                Start with 3 lives. Each wrong answer costs you one life. Game over when you lose all lives!
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card border-border hover:border-accent/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>10 Points Per Question</CardTitle>
              <CardDescription>
                Earn 10 points for each correct answer. Build your score and climb the global leaderboard!
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card border-border hover:border-chart-3/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-chart-3" />
              </div>
              <CardTitle>Global Leaderboard</CardTitle>
              <CardDescription>
                Compete with players worldwide. Track your progress and see how you rank against others!
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>10 Random Questions</CardTitle>
              <CardDescription>
                Each quiz session features 10 randomly selected questions about Croatia and the Netherlands.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card border-border hover:border-accent/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>User Profiles</CardTitle>
              <CardDescription>
                Track your quiz history, view your statistics, and monitor your improvement over time.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card border-border hover:border-chart-3/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-chart-3" />
              </div>
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Game Rules</h2>
            <p className="text-muted-foreground text-lg">Simple and straightforward rules for maximum fun</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-primary">Basic Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-white mt-0.5">
                    1
                  </div>
                  <p>Each user starts with 3 lives</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-white mt-0.5">
                    2
                  </div>
                  <p>Each incorrect answer removes 1 life</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-white mt-0.5">
                    3
                  </div>
                  <p>Game ends when you lose all 3 lives</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-white mt-0.5">
                    4
                  </div>
                  <p>Standard quiz has 10 random questions</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-accent">Scoring & Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-sm font-bold text-white mt-0.5">
                    1
                  </div>
                  <p>Each question has 4 possible answers</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-sm font-bold text-white mt-0.5">
                    2
                  </div>
                  <p>Earn 10 points per correct answer</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-sm font-bold text-white mt-0.5">
                    3
                  </div>
                  <p>View correct answers & remaining lives</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-sm font-bold text-white mt-0.5">
                    4
                  </div>
                  <p>Results saved to global leaderboard</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Test Your Knowledge?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands of players competing for the top spot on our global leaderboard.
          </p>
          <Link to="/register">
            <Button size="lg" className="glow-effect text-lg px-12 py-6">
              Start Playing Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Globe className="h-6 w-6 text-primary" />
              <span className="font-bold gradient-text">Tulips & Ties</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2025 Tulips & Ties. Test your knowledge of Croatia and the Netherlands.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
