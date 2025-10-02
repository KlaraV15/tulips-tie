import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Heart, Clock, Trophy, ArrowLeft, Flag, Zap, Check, X } from 'lucide-react';
import HttpClient from '../../helpers/HttpClient.js';
import { useAuth } from '../contexts/AuthContext';

export default function UnifiedQuiz() {
  const { user, isAuthenticated, token } = useAuth();

  // Create HttpClient instance with token
  const client = React.useMemo(() => {
    const httpClient = new HttpClient();
    if (token) {
      httpClient.setToken(token);
    }
    return httpClient;
  }, [token]);

  // Quiz configuration based on difficulty
  const QUIZ_CONFIG = {
    1: {
      // Easy
      theme: {
        gradient: 'from-green-400 to-green-600',
        border: 'border-green-200',
        cardBorder: 'border-green-200',
        progressBar: 'from-green-400 to-green-600',
        badge: 'from-green-400 to-green-600',
        timerBg: 'from-green-500 to-green-600',
        timerBorder: 'border-green-300',
        scoreBg: 'from-green-500 to-green-600',
        scoreBorder: 'border-green-300',
      },
      timeLimit: null, // No timer for easy
      pointsPerCorrect: 10,
      difficulty: 'Easy',
    },
    2: {
      // Medium
      theme: {
        gradient: 'from-yellow-400 to-yellow-600',
        border: 'border-yellow-200',
        cardBorder: 'border-yellow-200',
        progressBar: 'from-yellow-400 to-yellow-600',
        badge: 'from-yellow-400 to-yellow-600',
        timerBg: 'from-green-500 to-green-600',
        timerBorder: 'border-green-300',
        scoreBg: 'from-green-500 to-green-600',
        scoreBorder: 'border-green-300',
      },
      timeLimit: 30,
      pointsPerCorrect: 15,
      difficulty: 'Medium',
    },
    3: {
      // Hard
      theme: {
        gradient: 'from-red-400 to-red-600',
        border: 'border-red-200',
        cardBorder: 'border-red-200',
        progressBar: 'from-red-500 to-red-600',
        badge: 'from-red-500 to-red-600',
        timerBg: 'from-green-500 to-green-600',
        timerBorder: 'border-green-300',
        scoreBg: 'from-green-500 to-green-600',
        scoreBorder: 'border-green-300',
      },
      timeLimit: 15,
      pointsPerCorrect: 20,
      difficulty: 'Hard',
    },
  };

  async function getQuiz(quizId) {
    const response = await client.newRequest(`/quizzes/${quizId}`);
    return response?.data ?? null;
  }

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resultSaved, setResultSaved] = useState(false);
  const [savingResult, setSavingResult] = useState(false);

  // Get quiz ID from URL params
  const quizId = window.location.pathname.split('/').pop();

  const config = quiz
    ? QUIZ_CONFIG[quiz.questions[currentQuestion]?.difficulty?.id] || QUIZ_CONFIG[1]
    : QUIZ_CONFIG[1];
  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;

  useEffect(() => {
    if (quizId && quizId !== 'undefined') {
      fetchQuiz();
    } else {
      setError('Quiz ID not found');
      setLoading(false);
    }
  }, [quizId]);

  useEffect(() => {
    if (!quizStarted || showResult || !config.timeLimit) return;
    setTimeLeft(config.timeLimit);
  }, [currentQuestion, quizStarted, showResult, config.timeLimit]);

  useEffect(() => {
    if (!quizStarted || showResult || !config.timeLimit) return;

    if (timeLeft === 0) {
      if (lives <= 1 || currentQuestion === totalQuestions - 1) {
        setLives((prev) => prev - 1);
        setShowResult(true);
      } else {
        setLives((prev) => prev - 1);
        setCurrentQuestion(currentQuestion + 1);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizStarted, showResult, currentQuestion, lives, totalQuestions]);

  useEffect(() => {
    if (lives <= 0) {
      setShowResult(true);
    }
  }, [lives]);

  // Save quiz result when quiz is completed
  useEffect(() => {
    if (showResult && quiz && isAuthenticated && !resultSaved && !savingResult) {
      saveQuizResult();
    }
  }, [showResult, quiz, isAuthenticated, resultSaved, savingResult]);

  useEffect(() => {
    // Auto-start quiz after initial load
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      setQuizStarted(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  async function fetchQuiz() {
    try {
      setLoading(true);
      const quizData = await getQuiz(quizId);
      if (!quizData) {
        setError('Quiz not found');
        return;
      }
      setQuiz(quizData);
      setQuestions(quizData.questions || []);
      if (config.timeLimit) {
        setTimeLeft(config.timeLimit);
      }
    } catch (err) {
      console.error('Error fetching quiz:', err);
      setError('Failed to load quiz');
    } finally {
      setLoading(false);
    }
  }

  async function saveQuizResult() {
    if (!isAuthenticated || resultSaved || savingResult) {
      return;
    }

    try {
      setSavingResult(true);
      const response = await client.newPostRequest(`/results`, {
        score: score,
        quiz_id: quizId,
      });

      if (response.data) {
        setResultSaved(true);
        console.log('Quiz result saved successfully:', response.data);
      }
    } catch (err) {
      console.error('Error saving quiz result:', err);
      // Don't show error to user, just log it
    } finally {
      setSavingResult(false);
    }
  }

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    if (showAnswerFeedback) return;

    const question = questions[currentQuestion];
    const isCorrectAnswer = question.options.find((opt) => opt.is_correct)?.id === optionIndex;

    setSelectedAnswer(optionIndex);
    setIsCorrect(isCorrectAnswer);
    setShowAnswerFeedback(true);

    if (isCorrectAnswer) {
      setScore(score + config.pointsPerCorrect);
    } else {
      setLives(lives - 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowAnswerFeedback(false);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-8"></div>
          <h2 className="text-4xl font-black text-white mb-4">Loading Quiz...</h2>
          <p className="text-xl text-white/80 font-bold">Get ready for the challenge! 🌍</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <X className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-gray-800 mb-4">Error Loading Quiz</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link to="/quizzes">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600">
                Back to Quizzes
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300 flex items-center justify-center">
        <div className="text-center text-white">
          <Trophy className="h-24 w-24 mx-auto mb-8 opacity-50" />
          <h2 className="text-4xl font-black mb-4">No Questions Available</h2>
          <p className="text-xl text-white/80">This quiz doesn't have any questions yet.</p>
        </div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];
  const configForCurrentQuestion =
    QUIZ_CONFIG[currentQuestionData?.difficulty?.id] || QUIZ_CONFIG[1];

  // Show transition screen
  if (isTransitioning) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br ${configForCurrentQuestion.theme.gradient} flex items-center justify-center`}>
        <div className="text-center text-white">
          <div className="animate-bounce mb-8">
            <Zap className="h-24 w-24 mx-auto" />
          </div>
          <h1 className="text-5xl font-black mb-4">
            Starting {configForCurrentQuestion.difficulty} Quiz!
          </h1>
          <p className="text-xl font-bold">
            {configForCurrentQuestion.difficulty === 'Easy' &&
              '🌱 Get ready to test your knowledge!'}
            {configForCurrentQuestion.difficulty === 'Medium' &&
              '⚡ Get ready for a real challenge!'}
            {configForCurrentQuestion.difficulty === 'Hard' &&
              '🔥 Brace yourself for the ultimate challenge!'}
          </p>
          {quiz.title && <p className="text-lg mt-4 opacity-90">📚 {quiz.title}</p>}
        </div>
      </div>
    );
  }

  // Show results screen
  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300">
        {/* Navigation */}
        <nav className="border-b-4 border-red-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link
              to="/quizzes"
              className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors font-bold">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Quizzes
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
          <Card
            className="max-w-2xl w-full bg-white/90 backdrop-blur-sm border-2 shadow-2xl rounded-2xl"
            style={{
              borderColor: configForCurrentQuestion.theme.cardBorder
                .replace('border-', '')
                .replace('-200', '-300'),
            }}>
            <CardHeader className="text-center p-8">
              <div className="flex items-center justify-center mb-4">
                <div
                  className={`bg-gradient-to-r ${configForCurrentQuestion.theme.gradient} p-4 rounded-full`}>
                  <Trophy className="h-12 w-12 text-white" />
                </div>
              </div>
              <CardTitle className="text-4xl font-black mb-4 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                Quiz Complete!
              </CardTitle>
              <p className="text-lg text-gray-600 font-medium">
                Here are your results for "{quiz.title}"
              </p>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              {/* Stats Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                <div
                  className={`text-center p-6 bg-gradient-to-r ${configForCurrentQuestion.theme.gradient} bg-opacity-20 rounded-2xl border-2 shadow-lg`}>
                  <p
                    className="text-4xl font-black mb-2"
                    style={{
                      color: configForCurrentQuestion.theme.gradient.includes('green')
                        ? '#16a34a'
                        : configForCurrentQuestion.theme.gradient.includes('yellow')
                        ? '#ca8a04'
                        : '#dc2626',
                    }}>
                    {score}
                  </p>
                  <p className="font-bold text-gray-800">Total Score</p>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-2xl border-2 border-blue-200 shadow-lg">
                  <p className="text-4xl font-black text-blue-600 mb-2">
                    {Math.round(score / configForCurrentQuestion.pointsPerCorrect)}
                  </p>
                  <p className="font-bold text-gray-800">Correct Answers</p>
                </div>
                <div className="text-center p-6 bg-red-50 rounded-2xl border-2 border-red-200 shadow-lg">
                  <div className="flex justify-center space-x-1 mb-2">
                    {[...Array(3)].map((_, i) => (
                      <Heart
                        key={i}
                        className={`h-8 w-8 ${
                          i < lives ? 'text-red-500 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="font-bold text-gray-800">Lives Remaining</p>
                </div>
              </div>

              {/* Performance Message */}
              <div className="text-center space-y-4">
                <p className="text-gray-700 text-lg font-medium bg-white/50 p-4 rounded-xl border border-gray-200">
                  {score >= totalQuestions * configForCurrentQuestion.pointsPerCorrect * 0.8
                    ? "🎉 Outstanding performance! You're a true expert!"
                    : score >= totalQuestions * configForCurrentQuestion.pointsPerCorrect * 0.6
                    ? '👍 Great job! Solid knowledge demonstrated!'
                    : score >= totalQuestions * configForCurrentQuestion.pointsPerCorrect * 0.4
                    ? '💪 Good effort! Keep practicing to improve!'
                    : "🌟 Keep learning! You'll get better with time!"}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link
                    to="/quizzes"
                    className="w-full sm:w-auto">
                    <Button
                      className={`w-full bg-gradient-to-r ${configForCurrentQuestion.theme.gradient} hover:shadow-xl text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                      Browse More Quizzes
                    </Button>
                  </Link>
                  <Link
                    to="/leaderboard"
                    className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="w-full border-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 font-bold py-4 px-8 rounded-2xl transition-all duration-300">
                      View Leaderboard
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300">
      {/* Header with progress and stats */}
      <nav className="border-b-4 border-red-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/quizzes"
              className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors font-bold">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit Quiz
            </Link>
            <div className="flex items-center space-x-6">
              {configForCurrentQuestion.timeLimit && (
                <div
                  className={`flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full border-2 ${configForCurrentQuestion.theme.timerBorder} shadow-md`}>
                  <Clock
                    className={`h-5 w-5 ${
                      configForCurrentQuestion.theme.timerBg.includes('green')
                        ? 'text-yellow-600'
                        : configForCurrentQuestion.theme.timerBg.includes('yellow')
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  />
                  <span
                    className={`font-bold ${
                      configForCurrentQuestion.theme.timerBg.includes('green')
                        ? 'text-yellow-600'
                        : configForCurrentQuestion.theme.timerBg.includes('yellow')
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    } text-lg`}>
                    {timeLeft}s
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                {[...Array(3)].map((_, i) => (
                  <Heart
                    key={i}
                    className={`h-6 w-6 ${
                      i < lives ? 'text-red-500 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div
                className={`flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full border-2 ${configForCurrentQuestion.theme.scoreBorder} shadow-md`}>
                <Trophy
                  className={`h-5 w-5 ${
                    configForCurrentQuestion.theme.scoreBg.includes('green')
                      ? 'text-green-600'
                      : configForCurrentQuestion.theme.scoreBg.includes('yellow')
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                />
                <span
                  className={`font-bold ${
                    configForCurrentQuestion.theme.scoreBg.includes('green')
                      ? 'text-green-600'
                      : configForCurrentQuestion.theme.scoreBg.includes('yellow')
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  } text-lg`}>
                  {score}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600 font-medium">
              <span>
                Question {currentQuestion + 1} of {totalQuestions}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`bg-gradient-to-r ${configForCurrentQuestion.theme.progressBar} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Quiz Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card
            className={`bg-white/90 backdrop-blur-sm border-2 ${configForCurrentQuestion.theme.cardBorder} shadow-2xl rounded-2xl overflow-hidden`}>
            <CardHeader className="p-8">
              <div className="flex items-center justify-between">
                {currentQuestionData.country && (
                  <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 px-4 py-2 text-sm font-bold">
                    {currentQuestionData.country.name}
                  </Badge>
                )}
                {currentQuestionData.difficulty && (
                  <Badge
                    className={`bg-gradient-to-r ${configForCurrentQuestion.theme.badge} text-white border-0 px-4 py-2 text-sm font-bold`}>
                    {currentQuestionData.difficulty.level}
                  </Badge>
                )}
                {currentQuestionData.category && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 px-4 py-2 text-sm font-bold">
                    {currentQuestionData.category.name}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-2xl font-black text-gray-800 text-balance mt-6 leading-relaxed">
                {currentQuestionData.text}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="grid gap-4">
                {currentQuestionData.options?.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrectAnswer = option.is_correct;
                  const showCorrect = showAnswerFeedback && isCorrectAnswer;
                  const showIncorrect = showAnswerFeedback && isSelected && !isCorrectAnswer;

                  return (
                    <Button
                      key={index}
                      variant={isSelected ? 'default' : 'outline'}
                      className={`
                                                h-auto p-6 text-left justify-start text-wrap relative transition-all duration-300
                                                rounded-2xl border-2 font-medium text-lg 
                                                ${
                                                  showCorrect
                                                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white border-green-600 shadow-lg '
                                                    : showIncorrect
                                                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-600 shadow-lg'
                                                    : isSelected
                                                    ? `bg-gradient-to-r ${
                                                        configForCurrentQuestion.theme.gradient
                                                      } text-white ${configForCurrentQuestion.theme.border
                                                        .replace('border-', 'border-')
                                                        .replace('-200', '-600')} shadow-lg`
                                                    : `${configForCurrentQuestion.theme.border.replace(
                                                        'border-',
                                                        'border-'
                                                      )} hover:${configForCurrentQuestion.theme.border
                                                        .replace('border-', 'border-')
                                                        .replace(
                                                          '-200',
                                                          '-400'
                                                        )} hover:bg-blue-50 text-gray-800`
                                                }
                                            `}
                      onClick={() => handleAnswerSelect(currentQuestion, option.id)}
                      disabled={showAnswerFeedback}>
                      <div className="flex items-center space-x-4">
                        <div
                          className={`
                                                    w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-300
                                                    ${
                                                      showCorrect
                                                        ? 'bg-white text-green-600 border-white'
                                                        : showIncorrect
                                                        ? 'bg-white text-red-600 border-white'
                                                        : isSelected
                                                        ? 'bg-white text-blue-600 border-white'
                                                        : `${configForCurrentQuestion.theme.border
                                                            .replace('border-', 'border-')
                                                            .replace(
                                                              '-200',
                                                              '-300'
                                                            )} bg-gray-100 text-gray-700`
                                                    }
                                                `}>
                          {showCorrect ? (
                            <Check className="h-5 w-5" />
                          ) : showIncorrect ? (
                            <X className="h-5 w-5" />
                          ) : (
                            String.fromCharCode(65 + index)
                          )}
                        </div>
                        <span className="text-base font-medium">{option.text}</span>
                      </div>
                    </Button>
                  );
                })}
              </div>

              {/* Feedback Message */}
              {showAnswerFeedback && (
                <div
                  className={`p-6 rounded-2xl border-2 text-center font-bold text-lg transition-all duration-300 shadow-lg ${
                    isCorrect
                      ? 'bg-green-100 border-green-400 text-green-800'
                      : 'bg-red-100 border-red-400 text-red-800'
                  }`}>
                  {isCorrect ? (
                    <div className="flex items-center justify-center space-x-3">
                      <Check className="h-6 w-6" />
                      <span>Correct! +{configForCurrentQuestion.pointsPerCorrect} points 🎉</span>
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
                    ? isCorrect
                      ? 'Great job! Continue to next question'
                      : "Don't worry! Keep going"
                    : 'Select an answer to continue'}
                </p>
                <Button
                  onClick={handleNextQuestion}
                  disabled={!showAnswerFeedback}
                  className={`
                                        bg-gradient-to-r font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105
                                        ${
                                          isCorrect
                                            ? 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                                            : 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                                        }
                                    `}>
                  {currentQuestion === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
