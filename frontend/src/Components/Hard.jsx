"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Progress } from "../components/ui/Progress"
import { Badge } from "../components/ui/Badge"
import { Heart, Clock, Trophy, ArrowLeft, Flag, Zap } from "lucide-react"

// Mock quiz data
const mockQuestions = [
  {
    id: 1,
    country: "Croatia",
    question: "Which Croatian king was known for creating one of the first legal codes in medieval Europe?",
    options: ["King Tomislav", "King Petar Krešimir IV", "King Dmitar Zvonimir", "King Stephen Držislav"],
    correctAnswer: 1,
    difficulty: "Hard",
  },
  {
    id: 2,
    country: "Netherlands",
    question: "Which Dutch city was the European Capital of Culture in 2018?",
    options: ["Leeuwarden", "Groningen", "Maastricht", "Eindhoven"],
    correctAnswer: 0,
    difficulty: "Hard",
  },
  {
    id: 3,
    country: "Croatia",
    question: "What is the name of the traditional Croatian folk music that is protected by UNESCO?",
    options: ["Klapa", "Tamburica", "Ganga", "Bećarac"],
    correctAnswer: 0,
    difficulty: "Hard",
  },
  {
    id: 4,
    country: "Netherlands",
    question: "Which Dutch engineer is famous for the Delta Works, one of the Seven Wonders of the Modern World?",
    options: ["Johan van Veen", "Cornelis Lely", "Andries Vierlingh", "Simon Stevin"],
    correctAnswer: 1,
    difficulty: "Hard",
  },
  {
    id: 5,
    country: "Croatia",
    question: "Which Croatian island is known for its unique white wine called 'Vugava'?",
    options: ["Vis", "Hvar", "Korčula", "Brač"],
    correctAnswer: 0,
    difficulty: "Hard",
  },
  {
    id: 6,
    country: "Netherlands",
    question: "What was the original name of New York City when it was a Dutch colony?",
    options: ["New Rotterdam", "New Utrecht", "New Amsterdam", "New Hague"],
    correctAnswer: 2,
    difficulty: "Hard",
  },
  {
    id: 7,
    country: "Croatia",
    question: "Which Croatian scientist won the Nobel Prize in Chemistry in 1975?",
    options: ["Vladimir Prelog", "Lavoslav Ružička", "Ivo Andrić", "Miroslav Radman"],
    correctAnswer: 0,
    difficulty: "Hard",
  },
  {
    id: 8,
    country: "Netherlands",
    question: "Which Dutch company invented the CD, DVD, and Blu-ray technologies?",
    options: ["ASML", "Philips", "Shell", "Unilever"],
    correctAnswer: 1,
    difficulty: "Hard",
  },
  {
    id: 9,
    country: "Croatia",
    question: "What is the name of the ancient Roman palace in Split that was built for Emperor Diocletian?",
    options: ["Diocletian's Palace", "Roman Forum", "Imperial Villa", "Caesar's Retreat"],
    correctAnswer: 0,
    difficulty: "Hard",
  },
  {
    id: 10,
    country: "Netherlands",
    question: "Which Dutch painter created 'The Night Watch' and is considered one of the greatest painters in European history?",
    options: ["Johannes Vermeer", "Rembrandt van Rijn", "Vincent van Gogh", "Frans Hals"],
    correctAnswer: 1,
    difficulty: "Hard",
  }
]

export default function Hard() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const [quizStarted, setQuizStarted] = useState(true) // Changed to true to start immediately
  const [showResult, setShowResult] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(true)

  const question = mockQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / 10) * 100

  // Auto-start the quiz with a brief transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 20)
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
    setTimeLeft(15);
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
        setTimeLeft(15);
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

  // Show transition screen
  if (isTransitioning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-bounce mb-8">
            <Zap className="h-24 w-24 mx-auto" />
          </div>
          <h1 className="text-5xl font-black mb-4">Starting Hard Quiz!</h1>
          <p className="text-xl font-bold">Brace yourself for the ultimate challenge! 🔥</p>
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
                  <p className="text-3xl font-bold text-accent mb-2">{Math.round(score / 20)}</p>
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
                  {score >= 160
                    ? "Legendary! You're a Croatia-Netherlands expert!"
                    : score >= 120
                      ? "Incredible! You've mastered the hard questions!"
                      : score >= 80
                        ? "Impressive! You handled the challenge well!"
                        : "Tough questions! Keep learning and try again!"}
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