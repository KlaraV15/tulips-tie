"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Progress } from "../components/ui/Progress"
import { Badge } from "../components/ui/Badge"
import { Heart, Clock, Trophy, ArrowLeft, Flag } from "lucide-react"

// Mock quiz data
const mockQuestions = [
  {
    id: 1,
    country: "Croatia",
    question: "What is the capital city of Croatia?",
    options: ["Zagreb", "Split", "Dubrovnik", "Rijeka"],
    correctAnswer: 0,
    difficulty: "Easy",
  },
  {
    id: 2,
    country: "Netherlands",
    question: "What is the capital city of Netherlands?",
    options: ["Rotterdam", "The Hague", "Amsterdam", "Utrecht"],
    correctAnswer: 2,
    difficulty: "Easy",
  },
  {
    id: 3,
    country: "Croatia",
    question: "Witch sea borders the Croatian coastline?",
    options: ["Mediterranean Sea", "Adriatic Sea", "Baltic Sea", "Black Sea"],
    correctAnswer: 1,
    difficulty: "Easy",
  },
  {
    id: 4,
    country: "Netherlands",
    question: "Which flower is a symbol of the Netherlands and is strongly associated with the country?",
    options: ["Lily", "Rose", "Sunflower", "Tulip"],
    correctAnswer: 3,
    difficulty: "Easy",
  },
  {
    id: 5,
    country: "Croatia",
    question: "Which currency has been used in Croatia since 2023?",
    options: ["Dollar", "Kuna", "Euro", "Pound"],
    correctAnswer: 2,
    difficulty: "Easy",
  },
  {
    id: 6,
    country: "Netherlands",
    question: "What is the name of the famous Dutch cheese that comes in round wheels, often covered in red wax?",
    options: ["Edam", "Feta", "Brie", "Cheddar"],
    correctAnswer: 0,
    difficulty: "Easy",
  },
  {
    id: 7,
    country: "Croatia",
    question: "Which sport is the most popular in Croatia?",
    options: ["Handball", "Water polo", "Football", "Basketball"],
    correctAnswer: 2,
    difficulty: "Easy",
  },
  {
    id: 8,
    country: "Netherlands",
    question: "What type of building is famous in the Netherlands and uses wind to generate power?",
    options: ["Castle", "Windmill", "Tower", "Manor house"],
    correctAnswer: 1,
    difficulty: "Easy",
  },
  {
    id: 9,
    country: "Croatia",
    question: "Which is the largest island in Croatia?",
    options: ["Krk", "Hvar", "Pag", "Brač"],
    correctAnswer: 0,
    difficulty: "Easy",
  },
  {
    id: 10,
    country: "Netherlands",
    question: "Which major river flows through the Netherlands and empties into the North Sea?",
    options: ["Sava", "Volga", "Danube", "Rhine"],
    correctAnswer: 3,
    difficulty: "Easy",
  }
]

export default function Easy() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(20)
  const [quizStarted, setQuizStarted] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const question = mockQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / 10) * 100

  const handleStartQuiz = () => {
    setQuizStarted(true)
  }

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 10)
    } else {
      setLives(lives - 1)
    }

    setSelectedAnswer(null)
    if (currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  useEffect(() => {
    if (!quizStarted || showResult) return;
    setTimeLeft(20);
  
  }, [currentQuestion, quizStarted, showResult]);
  
  useEffect(() => {
    if (!quizStarted || showResult) return;
  
    if (timeLeft === 0) {
      if (lives <= 1 || currentQuestion === mockQuestions.length - 1) {
        setLives(prev => prev - 1);
        setShowResult(true);
      } else {
        setLives(prev => prev - 1);
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(20);
      }
      return;
    }
  
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
  
    return () => clearInterval(timer);
  }, [timeLeft, quizStarted, showResult, currentQuestion, lives]);
  
  

  useEffect(() => {
    if (lives <= 0) {
      setShowResult(true);
    }
  }, [lives]);
  
  
  

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-2">
              <Flag className="h-6 w-6 text-primary" />
              <span className="font-bold gradient-text">Tulips & Ties</span>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-20 flex items-center justify-center">
          <Card className="max-w-2xl w-full bg-card border-border glow-effect">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="flex space-x-2">
                  <div className="w-8 h-5 bg-red-500 rounded-sm"></div>
                  <div className="w-1 h-5 bg-white rounded-sm"></div>
                  <div className="w-8 h-5 bg-blue-500 rounded-sm"></div>
                </div>
                <span className="mx-4 text-2xl">🇭🇷</span>
                <div className="flex space-x-2">
                  <div className="w-8 h-5 bg-red-500 rounded-sm"></div>
                  <div className="w-8 h-5 bg-white rounded-sm"></div>
                  <div className="w-8 h-5 bg-blue-500 rounded-sm"></div>
                </div>
                <span className="mx-4 text-2xl">🇳🇱</span>
              </div>
              <CardTitle className="text-3xl font-bold mb-4">Ready to Start?</CardTitle>
              <CardDescription className="text-lg">
                Test your knowledge about Croatia and the Netherlands with 10 challenging questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="font-semibold">3 Lives</p>
                  <p className="text-sm text-muted-foreground">Lose one per wrong answer</p>
                </div>
                <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <Trophy className="h-8 w-8 text-accent mx-auto mb-2" />
                  <p className="font-semibold">10 Points</p>
                  <p className="text-sm text-muted-foreground">Per correct answer</p>
                </div>
                <div className="text-center p-4 bg-chart-3/10 rounded-lg border border-chart-3/20">
                  <Clock className="h-8 w-8 text-chart-3 mx-auto mb-2" />
                  <p className="font-semibold">20 Seconds</p>
                  <p className="text-sm text-muted-foreground">Per question</p>
                </div>
              </div>

              <Button onClick={handleStartQuiz} className="w-full glow-effect text-lg py-6">
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-2">
              <Flag className="h-6 w-6 text-primary" />
              <span className="font-bold gradient-text">Tulips & Ties</span>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-20 flex items-center justify-center">
          <Card className="max-w-2xl w-full bg-card border-border glow-effect">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Trophy className="h-12 w-12 text-chart-3" />
              </div>
              <CardTitle className="text-3xl font-bold mb-4">Quiz Complete!</CardTitle>
              <CardDescription className="text-lg">Here are your results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-6 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-3xl font-bold text-primary mb-2">{score}</p>
                  <p className="font-semibold">Total Score</p>
                </div>
                <div className="text-center p-6 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-3xl font-bold text-accent mb-2">{score / 10}</p>
                  <p className="font-semibold">Correct Answers</p>
                </div>
                <div className="text-center p-6 bg-chart-3/10 rounded-lg border border-chart-3/20">
                  <div className="flex justify-center space-x-1 mb-2">
                    {[...Array(3)].map((_, i) => (
                      <Heart
                        key={i}
                        className={`h-6 w-6 ${i < lives ? "text-chart-3 fill-current" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <p className="font-semibold">Lives Remaining</p>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  {score >= 80
                    ? "Excellent work! You're a geography expert!"
                    : score >= 60
                      ? "Good job! You know your countries well."
                      : score >= 40
                        ? "Not bad! Keep studying to improve."
                        : "Keep practicing! You'll get better with time."}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/quiz">
                    <Button className="glow-effect">Play Again</Button>
                  </Link>
                  <Link to="/leaderboard">
                    <Button variant="outline">View Leaderboard</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with progress and stats */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit Quiz
            </Link>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-chart-3" />
                <span className="font-mono text-lg font-bold text-chart-3">{timeLeft}s</span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(3)].map((_, i) => (
                  <Heart
                    key={i}
                    className={`h-5 w-5 ${i < lives ? "text-destructive fill-current" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="font-bold text-primary">{score}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestion + 1} of 10</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </nav>

      {/* Quiz Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border-border glow-effect">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {question.country}
                </Badge>
                <Badge
                  variant="outline"
                  className={`
                  ${
                    question.difficulty === "Easy"
                      ? "bg-chart-3/10 text-chart-3 border-chart-3/20"
                      : question.difficulty === "Medium"
                        ? "bg-chart-2/10 text-chart-2 border-chart-2/20"
                        : "bg-destructive/10 text-destructive border-destructive/20"
                  }
                `}
                >
                  {question.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold text-balance mt-4">{question.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "default" : "outline"}
                    className={`
                      h-auto p-4 text-left justify-start text-wrap
                      ${selectedAnswer === index ? "glow-effect" : "hover:border-primary/50"}
                    `}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`
                        w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold
                        ${selectedAnswer === index ? "bg-primary-foreground text-primary border-primary" : "border-muted-foreground"}
                      `}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-base">{option}</span>
                    </div>
                  </Button>
                ))}
              </div>

              <div className="flex justify-between items-center pt-6">
                <p className="text-sm text-muted-foreground">Select an answer to continue</p>
                <Button onClick={handleNextQuestion} disabled={selectedAnswer === null} className="glow-effect">
                  {currentQuestion === 9 ? "Finish Quiz" : "Next Question"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
