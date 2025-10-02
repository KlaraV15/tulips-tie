import { Link } from 'react-router-dom';
import { Button } from '../Components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../Components/ui/Card';
import { Badge } from '../Components/ui/Badge';
import { Trophy, Medal, Award, Crown, ArrowLeft } from 'lucide-react';
import logo from '../assets/logo-rose.png';
import { useState, useEffect } from 'react';
import HttpClient from '../../helpers/HttpClient.js';

const client = new HttpClient();

function getRankIcon(rank) {
  switch (rank) {
    case 1:
      return <Crown className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-500 animate-pulse" />;
    case 2:
      return <Medal className="h-4 w-4 sm:h-6 sm:w-6 text-gray-400 animate-pulse" />;
    case 3:
      return <Award className="h-4 sm:h-6 sm:w-6 text-amber-600 animate-pulse" />;
    default:
      return (
        <span className="text-white font-bold bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm">
          #{rank}
        </span>
      );
  }
}

function LeaderboardTable({ data, title }) {
  return (
    <Card className="bg-white/95 backdrop-blur-sm border-4 border-red-300 shadow-xl sm:shadow-2xl hover:shadow-3xl transition-all duration-300 animate-fadeIn">
      <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-t-lg p-4 sm:p-6">
        <CardTitle className="flex items-center justify-center space-x-2 text-lg sm:text-xl font-black">
          <Trophy className="h-5 w-5 sm:h-7 sm:w-7 text-yellow-300 animate-pulse" />
          <span className="gradient-text-primary text-sm sm:text-xl">{title}</span>
        </CardTitle>
        <CardDescription className="text-center text-white/90 font-bold text-xs sm:text-base">
          🏆 Champions of the Quiz Battle! 🏆
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-red-50 to-blue-50">
        <div className="space-y-3 sm:space-y-4">
          {data.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 font-medium">No data available</p>
            </div>
          ) : (
            data.map((player, index) => (
              <div
                key={player.user_id || `player-${index}`}
                className={`flex items-center justify-between p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                  index < 3
                    ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-400 shadow-md animate-glow'
                    : 'bg-white border-purple-300 hover:border-purple-500'
                }`}>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg">
                    {getRankIcon(index + 1)}
                  </div>
                  <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {(player.user?.username || 'UN').slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-black text-sm sm:text-base bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent truncate">
                      {player.user?.username || 'Anonymous'}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs font-bold text-gray-600 bg-green-100 px-2 py-1 rounded-full">
                        🎮 {player.games_played || 0} games
                      </span>
                      <span className="text-xs font-bold text-gray-600 bg-blue-100 px-2 py-1 rounded-full">
                        📅{' '}
                        {player.last_played
                          ? new Date(player.last_played).toLocaleDateString()
                          : 'Never'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="text-lg sm:text-xl font-black bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                    {(player.total_score || 0).toLocaleString()}
                  </p>
                  <p className="text-xs font-bold text-gray-600 bg-yellow-100 px-2 py-1 rounded-full">
                    💎 points
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await client.newRequest('/leaderboard');
        setLeaderboard(response.data);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
        setError('Failed to load leaderboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-red-700 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300">
      {/* Navigation */}
      <nav className="border-b-4 border-red-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-3 sm:px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center text-red-600 hover:text-red-800 transition-all duration-300 font-bold text-sm sm:text-lg hover:scale-105 bg-red-50 px-3 sm:px-4 py-1 sm:py-2 rounded-full border-2 border-red-200 hover:border-red-400 whitespace-nowrap">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 animate-bounce" />
            🏠 Back
          </Link>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <img
                src={logo || '/placeholder.svg'}
                className="h-8 w-6 sm:h-12 sm:w-8 text-red-600"
              />
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-lg sm:text-2xl font-black bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              Tulips & Ties Leaderboard
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Link to="/quiz">
              <Button className="bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 rounded-xl sm:rounded-2xl text-white font-bold transition-all duration-300 transform hover:brightness-110">
                Play Now
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
            🏆 Leaderboard
          </h1>
          <p className="text-gray-700 text-sm sm:text-lg">
            🚀 Fight for your place among the quiz masters! See who's dominating the leaderboard
            today!
          </p>
        </div>

        {/* Leaderboard */}
        <LeaderboardTable
          data={leaderboard.map((player, index) => ({ ...player, rank: index + 1 }))}
          title="👑 All-Time Champions"
        />

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <Card className="bg-gradient-to-r from-red-100 to-blue-100 border-4 border-red-400 max-w-4xl mx-auto shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-3xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                🎯 Ready to Join the Battle?
              </h2>
              <p className="text-gray-700 mb-6 sm:mb-8 text-sm sm:text-lg">
                💡 Think you have what it takes to climb the leaderboard? Start your quiz journey
                now!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link to="/quiz">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 font-bold rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:brightness-110">
                    🎮 Start Playing Now!
                  </Button>
                </Link>
                <Link to="/quizzes">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto text-red-600 border-red-300 hover:bg-red-50">
                    📚 Browse Quizzes
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
