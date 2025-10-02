import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Filter,
  Trophy,
  ArrowLeft,
  Flag,
  Users,
  BookOpen,
  Clock,
  Globe,
} from 'lucide-react';
import logo from '../assets/logo-rose.png';
import HttpClient from '../../helpers/HttpClient.js';

const client = new HttpClient();

async function getCountries() {
  const response = await client.newRequest('/countries');
  console.log('countries', response.data);
  return response?.data ?? [];
}

async function getDifficulties() {
  const response = await client.newRequest('/difficulties');
  console.log('difficulties', response.data);
  return response?.data ?? [];
}

async function getCategories() {
  const response = await client.newRequest('/categories');
  console.log('categories', response.data);
  return response?.data ?? [];
}

async function getQuizzes(filters = {}) {
  const params = new URLSearchParams();

  if (filters.country_id && filters.country_id !== 'all') {
    params.append('country_id', filters.country_id);
  }
  if (filters.difficulty_id && filters.difficulty_id !== 'all') {
    params.append('difficulty_id', filters.difficulty_id);
  }
  if (filters.category_id && filters.category_id !== 'all') {
    params.append('category_id', filters.category_id);
  }
  if (filters.title) {
    params.append('title', filters.title);
  }

  const url = `/quizzes${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await client.newRequest(url);
  console.log('quizzes response', response);
  console.log('quizzes', response.data);
  return response.data ?? [];
}

export default function Quizzes() {
  const [countries, setCountries] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchQuizzes();
  }, [searchTerm, filterCountry, filterDifficulty, filterCategory]); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchData() {
    try {
      setLoading(true);
      const [countriesData, difficultiesData, categoriesData] = await Promise.all([
        getCountries(),
        getDifficulties(),
        getCategories(),
      ]);
      setCountries(countriesData);
      setDifficulties(difficultiesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchQuizzes() {
    try {
      const filters = {
        country_id: filterCountry,
        difficulty_id: filterDifficulty,
        category_id: filterCategory,
        title: searchTerm,
      };
      const quizData = await getQuizzes(filters);
      setQuizzes(quizData);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  }

  function resetFilters() {
    setSearchTerm('');
    setFilterCountry('all');
    setFilterCategory('all');
    setFilterDifficulty('all');
  }

  function handleQuizClick(quiz) {
    // Navigate to quiz with ID parameter
    window.location.href = `/quiz/${quiz.id}`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300">
      {/* Header with progress and stats */}
      <nav className="border-b-4 border-red-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-xl">
        <div className="container mx-auto px-3 sm:px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center text-red-600 hover:text-red-800 transition-all duration-300 font-bold text-sm sm:text-lg hover:scale-105 bg-red-50 px-3 sm:px-4 py-1 sm:py-2 rounded-full border-2 border-red-200 hover:border-red-400 whitespace-nowrap">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
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
              Tulips & Ties
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Link to="/leaderboard">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold px-3 sm:px-6 py-1 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-blue-400 text-xs sm:text-base whitespace-nowrap cursor-pointer">
                🏆 <div className="hidden sm:inline">Leaders</div>
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-3 sm:px-4 py-8">
        <div className="sm:mb-12">
          {/* Header Section */}
          <section className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="relative">
                <Trophy className="h-12 w-12 sm:h-20 sm:w-20 text-yellow-500 animate-bounce" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-blue-500 text-white border-0 text-sm sm:text-lg font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full inline-block mb-4 sm:mb-6 animate-bounce shadow-xl whitespace-nowrap overflow-hidden">
              🎯 BROWSE ALL QUIZZES
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 text-balance leading-tight">
              Available{' '}
              <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
                Quizzes
              </span>
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl font-bold text-gray-700 max-w-3xl mx-auto text-pretty leading-relaxed px-2">
              🌍 Explore quizzes by creator, difficulty, category, and country! Choose your quiz and
              start playing! 🇭🇷🇳🇱
            </p>
          </section>

          {/* Filters Section */}
          <Card className="bg-card border-border mb-8">
            <CardHeader>
              <CardTitle className="flex flex-wrap items-center space-y-3 space-x-2">
                <div className="flex w-full items-center justify-between space-x-4">
                  <div className="flex">
                    <Filter className="h-5 w-5" />
                    <span>Filters & Search</span>
                  </div>
                </div>
                <div className="space-y-2 w-full">
                  <Label htmlFor="search">Search Quizzes</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search quiz titles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-end gap-4 w-full">
                  <div>
                    <Label>Category</Label>
                    <Select
                      value={filterCategory}
                      onValueChange={setFilterCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories &&
                          categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Country</Label>
                    <Select
                      value={filterCountry}
                      onValueChange={setFilterCountry}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Countries</SelectItem>
                        {countries &&
                          countries.map((country) => (
                            <SelectItem
                              key={country.id}
                              value={country.id}>
                              {country.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Difficulty</Label>
                    <Select
                      value={filterDifficulty}
                      onValueChange={setFilterDifficulty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Difficulties</SelectItem>
                        {difficulties &&
                          difficulties.map((difficulty) => (
                            <SelectItem
                              key={difficulty.id}
                              value={String(difficulty.id)}>
                              {difficulty.level}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full self-end">
                    <Button
                      variant="outline"
                      onClick={resetFilters}
                      className="w-full">
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Quizzes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
                <p className="mt-4 font-bold text-gray-700">Loading quizzes...</p>
              </div>
            ) : quizzes.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl font-bold text-gray-700 mb-2">No quizzes found</p>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              quizzes.map((quiz) => (
                <Card
                  key={quiz.id}
                  className="bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group overflow-hidden rounded-2xl relative"
                  onClick={() => handleQuizClick(quiz)}>
                  {/* Header with gradient background */}
                  <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-red-500 p-6 relative overflow-hidden">
                    {/* Decorative pattern */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-white/20 text-white border-0 px-4 py-2 text-sm font-bold backdrop-blur-sm">
                          🎯 Quiz
                        </Badge>
                        <Badge className="bg-white/20 text-white border-0 px-4 py-2 text-sm font-bold backdrop-blur-sm flex items-center">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {quiz.questions_count}
                        </Badge>
                      </div>

                      <h3 className="text-white font-black text-xl mb-2 leading-tight">
                        {quiz.title}
                      </h3>

                      {quiz.description && (
                        <p className="text-white/90 font-medium text-sm leading-relaxed">
                          {quiz.description.length > 80
                            ? quiz.description.substring(0, 80) + '...'
                            : quiz.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Quiz stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                            Creator
                          </p>
                          <p className="text-sm font-bold text-gray-800">
                            {quiz?.creator?.username || 'Unknown'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl border border-green-100">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Clock className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-green-600 uppercase tracking-wide">
                            Created
                          </p>
                          <p className="text-sm font-bold text-gray-800">
                            {new Date(quiz.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Quiz Characteristics */}
                    <div className="mb-6 space-y-3">
                      {/* Difficulty Section */}
                      {quiz.predominant_difficulty && (
                        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <Trophy className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-purple-600 uppercase tracking-wide">
                              Difficulty
                            </p>
                            <p className="text-sm font-bold text-gray-800">
                              {quiz.predominant_difficulty}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Category Section */}
                      {quiz.predominant_category && (
                        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                            <BookOpen className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                              Category
                            </p>
                            <p className="text-sm font-bold text-gray-800">
                              {quiz.predominant_category}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Country Section */}
                      {quiz.predominant_country && (
                        <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                            <Flag className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-green-600 uppercase tracking-wide">
                              Country
                            </p>
                            <p className="text-sm font-bold text-gray-800">
                              {quiz.predominant_country}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-3">
                      <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                        🚀 Start Quiz Now
                      </Button>

                      <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                        <Trophy className="h-3 w-3" />
                        <span className="font-medium">Click to begin your challenge</span>
                      </div>
                    </div>
                  </CardContent>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      <footer className="mt-6 sm:mt-8 border-t border-red-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-600 text-xs sm:text-sm font-medium text-center md:text-right">
              © 2025 Tulips & Ties • Discover and play amazing quizzes! 🎮
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
