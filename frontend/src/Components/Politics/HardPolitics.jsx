"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "../ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card"
import { Progress } from "../ui/Progress"
import { Badge } from "../ui/Badge"
import { Heart, Clock, Trophy, ArrowLeft, Flag, Zap, Check, X, Star, Users, Award } from "lucide-react"

// Mock quiz data
const mockQuestions = [
  {
    id: 1,
    country: "Croatia",
    question: "Which Croatian politician co-founded the Croatian Democratic Union (HDZ) together with Franjo Tuđman?",
    options: ["Stipe Mesić", "Vladimir Šeks", "Ivica Račan", "Gojko Šušak"],
    correctAnswer: 1,
    difficulty: "Hard",
  },
  {
    id: 2,
    country: "Netherlands",
    question: "The 'Pacification of 1917' in Dutch politics introduced which major reforms?",
    options: ["Universal male suffrage and equal funding for religious schools", "Proportional representation and abolition of monarchy", "Direct election of the Senate", "Decentralization of provinces"],
    correctAnswer: 0,
    difficulty: "Hard",
  },
  {
    id: 3,
    country: "Croatia",
    question: "Which Croatian politician served as the last president of the Presidency of Yugoslavia before independence?",
    options: ["Stjepan Radić", "Franjo Tuđman", "Stipe Mesić", "Ante Marković"],
    correctAnswer: 2,
    difficulty: "Hard",
  },
  {
    id: 4,
    country: "Netherlands",
    question: "Which Dutch political party was historically known as the 'pillar' of Catholic politics in the 20th century?",
    options: ["PvdA", "ARP", "KVP", "CDA"],
    correctAnswer: 2,
    difficulty: "Hard",
  },
  {
    id: 5,
    country: "Croatia",
    question: "Who was the Croatian foreign minister during the international recognition of Croatia in 1992?",
    options: ["Mate Granić", "Gordan Jandroković", "Davor Ivo Stier", "Tonino Picula"],
    correctAnswer: 0,
    difficulty: "Hard",
  },
  {
    id: 6,
    country: "Netherlands",
    question: "Which Dutch politician became known for the 'Night of Schmelzer' that brought down the cabinet in 1966?",
    options: ["Joop den Uyl", "Carl Romme", "Norbert Schmelzer", "Ruud Lubbers"],
    correctAnswer: 2,
    difficulty: "Hard",
  },
  {
    id: 7,
    country: "Croatia",
    question: "In which year was the Croatian constitution adopted after independence?",
    options: ["1991", "1992", "1990", "1993"],
    correctAnswer: 0,
    difficulty: "Hard",
  },
  {
    id: 8,
    country: "Netherlands",
    question: "Which Dutch prime minister led the country during the oil crisis of the 1970s?",
    options: ["Wim Kok", "Mark Rutte", "Dries van Agt", "Joop den Uyl"],
    correctAnswer: 3,
    difficulty: "Hard",
  },
  {
    id: 9,
    country: "Croatia",
    question: "Which Croatian politician was the first female president of Croatia?",
    options: ["Jadranka Kosor", "Kolinda Grabar-Kitarović", "Vesna Pusić", "Milanka Opačić"],
    correctAnswer: 1,
    difficulty: "Hard",
  },
  {
    id: 10,
    country: "Netherlands",
    question: "Which political philosophy strongly influenced Dutch politics during the 19th century?",
    options: ["Calvinism and liberalism", "Marxism and socialism", "Anarchism", "Conservatism only"],
    correctAnswer: 0,
    difficulty: "Hard",
  }
]

export default function HardPolitics() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [lives, setLives] = useState(3)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const [quizStarted, setQuizStarted] = useState(true)
  const [showResult, setShowResult] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

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
    if (showAnswerFeedback) return;

    setSelectedAnswer(answerIndex)
    const correct = answerIndex === question.correctAnswer
    setIsCorrect(correct)
    setShowAnswerFeedback(true)

    if (correct) {
      setScore(score + 20)
    } else {
      setLives(lives - 1)
    }
  }

  const handleNextQuestion = () => {
    setSelectedAnswer(null)
    setShowAnswerFeedback(false)

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

  // Show transition screen - UPDATED DESIGN
  if (isTransitioning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-bounce mb-8">
            <Zap className="h-24 w-24 mx-auto" />
          </div>
          <h1 className="text-5xl font-black mb-4">Starting Politics Quiz!</h1>
          <p className="text-xl font-bold">Brace yourself for the ultimate political challenge! 🔥</p>
        </div>
      </div>
    )
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300">
        {/* Navigation */}
        <nav className="border-b-4 border-red-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors font-bold"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-2">
              <Flag className="h-6 w-6 text-red-600" />
              <span className="font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent text-xl">
                Tulips & Ties
              </span>
            </div>
          </div>
        </nav>

        {/* Results Card */}
        <div className="container mx-auto px-4 py-20 flex items-center justify-center">
          <Card className="max-w-2xl w-full bg-white/90 backdrop-blur-sm border-2 border-red-200 shadow-2xl rounded-2xl">
            <CardHeader className="text-center p-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-full">
                  <Trophy className="h-12 w-12 text-white" />
                </div>
              </div>
              <CardTitle className="text-4xl font-black mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Quiz Complete!
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 font-medium">
                Here are your results from the Politics Quiz
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              {/* Stats Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-red-50 rounded-2xl border-2 border-red-200 shadow-lg">
                  <p className="text-4xl font-black text-red-600 mb-2">{score}</p>
                  <p className="font-bold text-gray-800">Total Score</p>
                </div>
                <div className="text-center p-6 bg-pink-50 rounded-2xl border-2 border-pink-200 shadow-lg">
                  <p className="text-4xl font-black text-pink-600 mb-2">{Math.round(score / 20)}</p>
                  <p className="font-bold text-gray-800">Correct Answers</p>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-2xl border-2 border-purple-200 shadow-lg">
                  <div className="flex justify-center space-x-1 mb-2">
                    {[...Array(3)].map((_, i) => (
                      <Heart
                        key={i}
                        className={`h-8 w-8 ${i < lives ? "text-red-500 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="font-bold text-gray-800">Lives Remaining</p>
                </div>
              </div>

              {/* Performance Message */}
              <div className="text-center space-y-4">
                <p className="text-gray-700 text-lg font-medium bg-white/50 p-4 rounded-xl border border-gray-200">
                  {score >= 160
                    ? "🏆 Legendary! You're a political expert!"
                    : score >= 120
                      ? "🎯 Incredible! You've mastered political history!"
                      : score >= 80
                        ? "💪 Impressive! You handled the political challenge well!"
                        : "🌟 Tough political questions! Keep learning and try again!"}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link to="/quiz" className="w-full sm:w-auto">
                    <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      Play Again
                    </Button>
                  </Link>
                  <Link to="/leaderboard" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full border-2 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-400 font-bold py-4 px-8 rounded-2xl transition-all duration-300">
                      View Leaderboard
                    </Button>
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300">
      {/* Header with progress and stats */}
      <nav className="border-b-4 border-red-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors font-bold"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit Quiz
            </Link>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full border-2 border-red-200 shadow-md">
                <Clock className="h-5 w-5 text-red-600" />
                <span className="font-bold text-red-600 text-lg">{timeLeft}s</span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(3)].map((_, i) => (
                  <Heart
                    key={i}
                    className={`h-6 w-6 ${i < lives ? "text-red-500 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full border-2 border-purple-200 shadow-md">
                <Trophy className="h-5 w-5 text-purple-600" />
                <span className="font-bold text-purple-600 text-lg">{score}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600 font-medium">
              <span>Question {currentQuestion + 1} of 10</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Quiz Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-red-200 shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="p-8">
              <div className="flex items-center justify-between">
                <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 px-4 py-2 text-sm font-bold">
                  {question.country}
                </Badge>
                <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 px-4 py-2 text-sm font-bold">
                  {question.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-2xl font-black text-gray-800 text-balance mt-6 leading-relaxed">
                {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="grid gap-4">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index
                  const isCorrectAnswer = index === question.correctAnswer
                  const showCorrect = showAnswerFeedback && isCorrectAnswer
                  const showIncorrect = showAnswerFeedback && isSelected && !isCorrectAnswer

                  return (
                    <Button
                      key={index}
                      variant={isSelected ? "default" : "outline"}
                      className={`
                        h-auto p-6 text-left justify-start text-wrap relative transition-all duration-300
                        rounded-2xl border-2 font-medium text-lg
                        ${showCorrect
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white border-green-600 shadow-lg"
                          : showIncorrect
                            ? "bg-gradient-to-r from-red-500 to-red-600 text-white border-red-600 shadow-lg"
                            : isSelected
                              ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white border-purple-600 shadow-lg"
                              : "border-red-200 hover:border-red-400 hover:bg-red-50 text-gray-800"
                        }
                      `}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showAnswerFeedback}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`
                            w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-300
                            ${showCorrect
                              ? "bg-white text-green-600 border-white"
                              : showIncorrect
                                ? "bg-white text-red-600 border-white"
                                : isSelected
                                  ? "bg-white text-purple-600 border-white"
                                  : "border-red-300 bg-red-100 text-red-700"
                            }
                          `}
                        >
                          {showCorrect ? (
                            <Check className="h-5 w-5" />
                          ) : showIncorrect ? (
                            <X className="h-5 w-5" />
                          ) : (
                            String.fromCharCode(65 + index)
                          )}
                        </div>
                        <span className="text-base font-medium">{option}</span>
                      </div>
                    </Button>
                  )
                })}
              </div>

              {/* Feedback Message */}
              {showAnswerFeedback && (
                <div className={`p-6 rounded-2xl border-2 text-center font-bold text-lg transition-all duration-300 shadow-lg ${isCorrect
                  ? "bg-green-100 border-green-400 text-green-800"
                  : "bg-red-100 border-red-400 text-red-800"
                  }`}>
                  {isCorrect ? (
                    <div className="flex items-center justify-center space-x-3">
                      <Check className="h-6 w-6" />
                      <span>Correct! +20 points 🎉</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <X className="h-6 w-6" />
                      <span>Incorrect! -1 life 💔</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <p className="text-gray-600 font-medium">
                  {showAnswerFeedback
                    ? (isCorrect ? "Great job! Continue to next question" : "Don't worry! Keep going")
                    : "Select an answer to continue"
                  }
                </p>
                <Button
                  onClick={handleNextQuestion}
                  disabled={!showAnswerFeedback}
                  className={`
                    bg-gradient-to-r font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105
                    ${isCorrect
                      ? "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                      : "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                    }
                  `}
                >
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