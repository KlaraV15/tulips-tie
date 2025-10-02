"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card"
import { Globe, Code, BookOpen, Landmark, ArrowLeft, Trophy, Award, Star, Zap, Map, Leaf, PawPrint, TrendingUp, Volleyball } from "lucide-react"
import logo from "../assets/logo-rose.png"

export default function CategorySelection({ onSelectCategory, onBack }) {
    const [transitioning, setTransitioning] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)

    const categories = [
        {
            id: "culture",
            name: "Culture",
            description: "Explore traditions, arts, and cultural heritage of both nations",
            icon: <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />,
            color: "from-purple-400 to-purple-600",
            border: "border-purple-300",
            bg: "from-purple-50 to-purple-100",
            points: "Cultural Insights",
            questions: "10 questions",
            time: "Adaptive timing"
        },
        {
            id: "geography",
            name: "Geography",
            description: "Explore the diverse landscapes, regions, and natural wonders of Croatia and the Netherlands",
            icon: <Map className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />,
            color: "from-green-400 to-green-600",
            border: "border-green-300",
            bg: "from-green-50 to-green-100",
            points: "World Explorer",
            questions: "10 questions",
            time: "Adaptive timing"
        },
        {
            id: "history",
            name: "History",
            description: "Journey through time and explore historical events and figures",
            icon: <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-amber-500" />,
            color: "from-amber-400 to-amber-600",
            border: "border-amber-300",
            bg: "from-amber-50 to-amber-100",
            points: "Historical Facts",
            questions: "10 questions",
            time: "Adaptive timing"
        },
        {
            id: "politics",
            name: "Politics",
            description: "Test your knowledge of political systems, laws and governance     ",
            icon: <Landmark className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />,
            color: "from-red-400 to-red-600",
            border: "border-red-300",
            bg: "from-red-50 to-red-100",
            points: "Political Systems",
            questions: "10 questions",
            time: "Adaptive timing"
        },
        {
            id: "funFacts",
            name: "Fun Facts",
            description: "Discover surprising and entertaining facts about both countries",
            icon: <Award className="h-6 w-6 sm:h-8 sm:w-8 text-pink-500" />,
            color: "from-pink-400 to-pink-600",
            border: "border-pink-300",
            bg: "from-pink-50 to-pink-100",
            points: "Surprising Trivia",
            questions: "10 questions",
            time: "Adaptive timing"
        },
        {
            id: "natureWildlife",
            name: "Nature & Wildlife",
            description: "Explore national parks, wildlife, and popular natural wonders",
            icon: <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500" />,
            color: "from-emerald-400 to-emerald-600",
            border: "border-emerald-300",
            bg: "from-emerald-50 to-emerald-100",
            points: "Natural Wonders",
            questions: "10 questions",
            time: "Adaptive timing"
        },
        {
            id: "economy",
            name: "Economy & Innovation",
            description: "Learn about economic systems, industries, and innovations",
            icon: <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />,
            color: "from-blue-400 to-blue-600",
            border: "border-blue-300",
            bg: "from-blue-50 to-blue-100",
            points: "Economic Insights",
            questions: "10 questions",
            time: "Adaptive timing"
        },
        {
            id: "sports",
            name: "Sports",
            description: "Test your knowledge of sports achievements and traditions",
            icon: <Volleyball className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />,
            color: "from-orange-400 to-orange-600",
            border: "border-orange-300",
            bg: "from-orange-50 to-orange-100",
            points: "Sports Excellence",
            questions: "10 questions",
            time: "Adaptive timing"
        }
    ]

    const handleCategorySelect = (category) => {
        setSelectedCategory(category)
        setTransitioning(true)

        // Store the selected category and navigate to quiz page
        setTimeout(() => {
            window.location.href = `/quiz?category=${category.id}`
        }, 800)
    }

    if (transitioning) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300 flex items-center justify-center">
                {/* Transition Overlay */}
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-b-4 border-white mx-auto mb-4 sm:mb-8"></div>
                        <h2 className="text-xl sm:text-4xl font-black text-white mb-2 sm:mb-4">
                            Loading {selectedCategory?.name}...
                        </h2>
                        <p className="text-sm sm:text-xl text-white/80 font-bold">
                            Get ready for {selectedCategory?.name.toLowerCase()} discovery! 🌍
                        </p>
                    </div>
                </div>

                {/* Animated background elements during transition */}
                <div className="fixed top-10 sm:top-20 left-4 sm:left-10 w-10 h-10 sm:w-20 sm:h-20 bg-yellow-300 rounded-full opacity-20 animate-ping"></div>
                <div className="fixed bottom-16 sm:bottom-32 right-8 sm:right-20 w-8 h-8 sm:w-16 sm:h-16 bg-green-300 rounded-full opacity-20 animate-bounce"></div>
                <div className="fixed top-20 sm:top-40 right-16 sm:right-32 w-6 h-6 sm:w-12 sm:h-12 bg-purple-300 rounded-full opacity-20 animate-pulse"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300">
            {/* Floating decorative elements */}
            <div className="fixed top-10 sm:top-20 left-4 sm:left-10 w-10 h-10 sm:w-20 sm:h-20 bg-yellow-300 rounded-full opacity-20 animate-float"></div>
            <div className="fixed bottom-16 sm:bottom-32 right-8 sm:right-20 w-8 h-8 sm:w-16 sm:h-16 bg-green-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="fixed top-20 sm:top-40 right-16 sm:right-32 w-6 h-6 sm:w-12 sm:h-12 bg-purple-300 rounded-full opacity-20 animate-ping"></div>
            <div className="fixed bottom-10 sm:bottom-20 left-16 sm:left-32 w-7 h-7 sm:w-14 sm:h-14 bg-pink-300 rounded-full opacity-20 animate-bounce"></div>
            <div className="fixed top-32 sm:top-64 left-20 sm:left-40 w-5 h-5 sm:w-10 sm:h-10 bg-blue-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="fixed bottom-40 sm:bottom-80 right-24 sm:right-48 w-6 h-6 sm:w-12 sm:h-12 bg-orange-300 rounded-full opacity-20 animate-bounce"></div>

            {/* Navigation */}
            <nav className="border-b-4 border-red-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-xl">
                <div className="container mx-auto px-3 sm:px-4 py-3 flex items-center justify-between">
                    <Link
                        to="/"
                        className="inline-flex items-center text-red-600 hover:text-red-800 transition-all duration-300 font-bold text-sm sm:text-lg hover:scale-105 bg-red-50 px-3 sm:px-4 py-1 sm:py-2 rounded-full border-2 border-red-200 hover:border-red-400 whitespace-nowrap"
                    >
                        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />🏠 Back
                    </Link>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <img src={logo || "/placeholder.svg"} className="h-8 w-6 sm:h-12 sm:w-8 text-red-600" />
                            <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
                        </div>
                        <span className="text-lg sm:text-2xl font-black bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                            Tulips & Ties
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link to="/leaderboard">
                            <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold px-3 sm:px-6 py-1 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-blue-400 text-xs sm:text-base whitespace-nowrap cursor-pointer">
                                🏆 <div className="hidden-mobile">Leaders</div>
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Header Section */}
            <section className="container mx-auto px-3 sm:px-4 py-8 sm:py-16">
                <div className="text-center mb-8 sm:mb-12">
                    <div className="flex items-center justify-center mb-4 sm:mb-6">
                        <div className="relative">
                            <Trophy className="h-12 w-12 sm:h-20 sm:w-20 text-yellow-500 animate-bounce" />
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-red-500 to-blue-500 text-white border-0 text-sm sm:text-lg font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full inline-block mb-4 sm:mb-6 animate-bounce shadow-xl whitespace-nowrap overflow-hidden">
                        🎯 CHOOSE YOUR TOPIC
                    </div>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 text-balance leading-tight">
                        Quiz{" "}
                        <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
                            Categories
                        </span>
                    </h1>
                    <p className="text-base sm:text-xl lg:text-2xl font-bold text-gray-700 max-w-3xl mx-auto text-pretty leading-relaxed px-2">
                        🌍 Explore Croatia vs Netherlands across 8 exciting topics! Choose your category and test your knowledge! 🇭🇷🇳🇱
                    </p>
                </div>

                {/* Quick Stats Section */}
                <div className="mt-12 mb-5 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center border-2 border-yellow-200 shadow-lg">
                        <div className="text-2xl sm:text-4xl font-black text-yellow-600 mb-2">8</div>
                        <div className="text-sm sm:text-lg font-bold text-gray-700">Categories</div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center border-2 border-green-200 shadow-lg">
                        <div className="text-2xl sm:text-4xl font-black text-green-600 mb-2">80+</div>
                        <div className="text-sm sm:text-lg font-bold text-gray-700">Questions</div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center border-2 border-blue-200 shadow-lg">
                        <div className="text-2xl sm:text-4xl font-black text-blue-600 mb-2">3</div>
                        <div className="text-sm sm:text-lg font-bold text-gray-700">Difficulties</div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center border-2 border-purple-200 shadow-lg">
                        <div className="text-2xl sm:text-4xl font-black text-purple-600 mb-2">2</div>
                        <div className="text-sm sm:text-lg font-bold text-gray-700">Countries</div>
                    </div>
                </div>

                {/* Category Selection Cards - ORIGINAL RESPONSIVE LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {categories.map((category) => (
                        <Card
                            key={category.id}
                            className={`bg-white py-0 border-2 sm:border-4 ${category.border} shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-300 hover:scale-105 card-3d group`}
                            onClick={() => handleCategorySelect(category)}
                        >
                            <CardHeader className={`bg-gradient-to-r ${category.color} text-white rounded-t-lg relative overflow-hidden p-4 sm:p-6`}>
                                {/* Floating decorative elements */}
                                <div className="absolute top-1 sm:top-2 right-2 sm:right-4 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full opacity-40 animate-bounce"></div>
                                <div className="absolute bottom-1 sm:bottom-2 left-3 sm:left-6 w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full opacity-40 animate-pulse"></div>

                                <CardTitle className="flex items-center justify-center space-x-2 sm:space-x-3 text-lg sm:text-2xl font-black text-center">
                                    {category.icon}
                                    <span className="text-white drop-shadow-lg text-sm sm:text-xl">{category.name}</span>
                                </CardTitle>
                                <CardDescription className="text-center text-white/90 font-bold text-sm sm:text-lg mt-1 sm:mt-2">
                                    {category.points}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className={`p-4 sm:p-6 bg-gradient-to-br ${category.bg}`}>
                                <div className="text-center space-y-3 sm:space-y-4">
                                    <p className="text-gray-700 font-bold text-sm sm:text-lg leading-relaxed">
                                        {category.description}
                                    </p>

                                    <div className="space-y-2 sm:space-y-3 mt-4 sm:mt-6">
                                        <div className="flex items-center justify-center space-x-2 sm:space-x-3 bg-white/80 px-3 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl border-2 border-white">
                                            <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                                            <span className="font-black text-gray-800 text-xs sm:text-base">{category.questions}</span>
                                        </div>
                                        <div className="flex items-center justify-center space-x-2 sm:space-x-3 bg-white/80 px-3 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl border-2 border-white">
                                            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                                            <span className="font-black text-gray-800 text-xs sm:text-base">{category.time}</span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => handleCategorySelect(category)}
                                        className={`w-full bg-gradient-to-r ${category.color} hover:scale-105 text-white font-black text-sm sm:text-lg py-2 sm:py-4 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 transform border-2 border-white/50 cursor-pointer`}
                                    >
                                        🚀 Explore {category.name}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                
            </section>

            <footer className="mt-6 sm:mt-8 border-t border-red-200 bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <p className="text-gray-600 text-xs sm:text-sm font-medium text-center md:text-right">
                            © 2025 Tulips & Ties • The Ultimate Croatia vs Netherlands Quiz Battle!
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}