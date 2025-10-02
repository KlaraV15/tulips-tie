import { Link } from "react-router-dom"
import { Button } from "../Components/ui/Button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../Components/ui/Card"
import { Avatar } from "../Components/Avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../Components/Tabs"
import { Badge } from "../Components/ui/Badge"
import { Trophy, Medal, Award, Crown, ArrowLeft, Calendar, TrendingUp } from "lucide-react"
import logo from "../assets/logo-rose.png"
import { date } from "zod"

const Leaderboard = [
    {
        username: "GeographyMaster",
        score: 2450,
        country: "Croatia",
        avatar: "/abstract-geometric-shapes.png",
        gamesPlayed: 245,
        accuracy: 98,
        date: "2025-09-30"
    },
    {
        username: "QuizChampion",
        score: 2380,
        country: "Netherlands",
        avatar: "/abstract-geometric-shapes.png",
        gamesPlayed: 238,
        accuracy: 95,
        date: "2025-09-29"
    },
    {
        username: "KnowledgeSeeker",
        score: 2290,
        country: "Croatia",
        avatar: "/diverse-group-collaborating.png",
        gamesPlayed: 229,
        accuracy: 92,
        date: "2025-10-28"
    },
    {
        username: "EuroExpert",
        score: 2180,
        country: "Netherlands",
        avatar: "/abstract-geometric-shapes.png",
        gamesPlayed: 218,
        accuracy: 89,
        date: "2025-09-27"
    },
    {
        username: "BalkanBrain",
        score: 2050,
        country: "Croatia",
        avatar: "/abstract-geometric-shapes.png",
        gamesPlayed: 205,
        accuracy: 87,
        date: "2025-09-26"
    },
    {
        username: "DutchDynamo",
        score: 1980,
        country: "Netherlands",
        avatar: "/abstract-geometric-shapes.png",
        gamesPlayed: 198,
        accuracy: 85,
        date: "2025-10-25"
    },
    {
        username: "AdriaSage",
        score: 1890,
        country: "Croatia",
        avatar: "/abstract-geometric-shapes.png",
        gamesPlayed: 189,
        accuracy: 83,
        date: "2025-09-24"
    },
    {
        username: "TulipTrivia",
        score: 1820,
        country: "Netherlands",
        avatar: "/abstract-geometric-shapes.png",
        gamesPlayed: 182,
        accuracy: 81,
        date: "2025-09-23"
    },
    {
        username: "ZagrebZealot",
        score: 1750,
        country: "Croatia",
        avatar: "/abstract-geometric-shapes.png",
        gamesPlayed: 175,
        accuracy: 79,
        date: "2025-10-22"
    },
    {
        username: "AmsterdamAce",
        score: 1680,
        country: "Netherlands",
        avatar: "/abstract-geometric-shapes.png",
        gamesPlayed: 168,
        accuracy: 77,
        date: "2025-09-21"
    },
];




// const weeklyLeaderboard = globalLeaderboard.slice(0, 5).map((player, index) => ({
//     ...player,
//     rank: index + 1,
//     score: Math.floor(player.score * 0.3),
// }))

// const monthlyLeaderboard = globalLeaderboard.slice(0, 8).map((player, index) => ({
//     ...player,
//     rank: index + 1,
//     score: Math.floor(player.score * 0.7),
// }))

const globalLeaderboard = Leaderboard;
function getRankIcon(rank) {
    switch (rank) {
        case 1:
            return <Crown className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-500 animate-pulse" />
        case 2:
            return <Medal className="h-4 w-4 sm:h-6 sm:w-6 text-gray-400 animate-pulse" />
        case 3:
            return <Award className="h-4 w-4 sm:h-6 sm:w-6 text-amber-600 animate-pulse" />
        default:
            return (
                <span className="text-white font-bold bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm">
                    #{rank}
                </span>
            )
    }
}

function isThisWeek(dateStr) {
    const now = new Date();
    const inputDate = new Date(dateStr);

    const firstDayOfWeek = new Date(now);
    firstDayOfWeek.setDate(now.getDate() - now.getDay()); // Sunday

    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); // Saturday

    return inputDate >= firstDayOfWeek && inputDate <= lastDayOfWeek;
}

// Utility to check if a date is in the current month
function isThisMonth(dateStr) {
    const now = new Date();
    const inputDate = new Date(dateStr);
    return (
        inputDate.getFullYear() === now.getFullYear() &&
        inputDate.getMonth() === now.getMonth()
    );
}

// Filter and sort the weekly leaderboard
const weeklyLeaderboard = globalLeaderboard
    .filter(player => isThisWeek(player.date))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((player, index) => ({
        ...player,
        rank: index + 1
    }));

// Filter and sort the monthly leaderboard
const monthlyLeaderboard = globalLeaderboard
    .filter(player => isThisMonth(player.date))
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((player, index) => ({
        ...player,
        rank: index + 1
    }));



function getCountryFlag(country) {
    return country === "Croatia" ? "🇭🇷" : "🇳🇱"
}
function WeeklyLead() {

}
function LeaderboardTable({ data, title }) {
    return (
        <Card className="bg-white border-2 sm:border-4 border-gradient-to-r from-red-300 to-blue-300 shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-300 hover:scale-105 card-3d py-0">
            <CardHeader className="bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-t-lg relative overflow-hidden p-4 sm:p-6 lg:p-7">
                {/* Floating decorative elements */}
                <div className="absolute top-1 sm:top-2 right-2 sm:right-4 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-300 rounded-full opacity-60 animate-bounce"></div>
                <div className="absolute bottom-1 sm:bottom-2 left-3 sm:left-6 w-2 h-2 sm:w-3 sm:h-3 bg-green-300 rounded-full opacity-60 animate-pulse"></div>

                <CardTitle className="flex items-center justify-center space-x-2 sm:space-x-3 text-lg sm:text-xl lg:text-2xl font-black">
                    <Trophy className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-yellow-300 animate-pulse" />
                    <span className="gradient-text-primary text-sm sm:text-xl">{title}</span>
                </CardTitle>
                <CardDescription className="text-center text-white/90 font-bold text-xs sm:text-base lg:text-lg">
                    🏆 Champions of the Quiz Battle! 🏆
                </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-red-50 to-blue-50">
                <div className="space-y-3 sm:space-y-4">
                    {data.map((player, index) => (
                        <div
                            key={player.username}
                            className={`flex items-center justify-between p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl lg:rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg sm:hover:shadow-xl ${index < 3
                                ? "bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-400 shadow-md sm:shadow-lg animate-glow"
                                : "bg-white border-purple-300 hover:border-purple-500 hover:bg-purple-50"
                                }`}
                        >
                            <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
                                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg">
                                    {getRankIcon(index + 1)}
                                </div>
                                <Avatar
                                    src={player.avatar}
                                    alt={player.username}
                                    fallback={player.username.slice(0, 2).toUpperCase()}
                                    className="h-8 w-8 sm:h-10 sm:w-10 lg:h-14 lg:w-14 border-2 sm:border-4 border-white shadow-lg hover:scale-110 transition-transform duration-200"
                                />
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center space-x-2 sm:space-x-3 flex-wrap">
                                        <span className="text-lg sm:text-xl lg:text-2xl animate-bounce flex-shrink-0">{getCountryFlag(player.country)}</span>
                                        <p className="font-black text-sm sm:text-base lg:text-xl bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent truncate">
                                            {player.username}
                                        </p>
                                        {index < 3 && (
                                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold animate-pulse text-xs sm:text-sm">
                                                🌟 TOP 3
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 mt-1 sm:mt-2 flex-wrap">
                                        <p className="text-xs sm:text-sm font-bold text-gray-700 bg-green-100 px-2 py-1 rounded-full whitespace-nowrap">
                                            🎮 {player.gamesPlayed} games
                                        </p>
                                        <p className="text-xs sm:text-sm font-bold text-gray-700 bg-blue-100 px-2 py-1 rounded-full whitespace-nowrap">
                                            🎯 {player.accuracy}% accuracy
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right ml-2 sm:ml-4">
                                <p className="text-lg sm:text-xl lg:text-3xl font-black bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                                    {player.score.toLocaleString()}
                                </p>
                                <p className="text-xs sm:text-sm font-bold text-gray-600 bg-yellow-100 px-1 sm:px-2 py-1 rounded-full whitespace-nowrap">💎 points</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default function LeaderboardPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300">
            {/* Floating decorative elements */}
            <div className="fixed top-10 sm:top-20 left-4 sm:left-10 w-10 h-10 sm:w-20 sm:h-20 bg-yellow-300 rounded-full opacity-20 animate-float"></div>
            <div className="fixed bottom-16 sm:bottom-32 right-8 sm:right-20 w-8 h-8 sm:w-16 sm:h-16 bg-green-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="fixed top-20 sm:top-40 right-16 sm:right-32 w-6 h-6 sm:w-12 sm:h-12 bg-purple-300 rounded-full opacity-20 animate-ping"></div>
            <div className="fixed bottom-10 sm:bottom-20 left-16 sm:left-32 w-7 h-7 sm:w-14 sm:h-14 bg-pink-300 rounded-full opacity-20 animate-bounce"></div>

            {/* Navigation */}
            <nav className="border-b-4 border-red-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-xl">
                <div className="container mx-auto px-3 sm:px-4 py-3 flex items-center justify-between">
                    <Link
                        to="/"
                        className="inline-flex items-center text-red-600 hover:text-red-800 transition-all duration-300 font-bold text-sm sm:text-lg hover:scale-105 bg-red-50 px-3 sm:px-4 py-1 sm:py-2 rounded-full border-2 border-red-200 hover:border-red-400 whitespace-nowrap"
                    >
                        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 animate-bounce" />🏠 Back
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
                        <Link to="/quiz">
                            <Button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold px-3 sm:px-6 py-1 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-red-400 text-xs sm:text-base whitespace-nowrap">
                                🎮 <span className="hidden sm:inline">Start Quiz!</span>
                            </Button>

                        </Link>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <section className="container mx-auto px-3 sm:px-4 py-8 sm:py-16">
                <div className="text-center mb-8 sm:mb-12">
                    <div className="flex items-center justify-center mb-4 sm:mb-6">
                        <div className="relative">
                            <Trophy className="h-12 w-12 sm:h-20 sm:w-20 text-yellow-500 animate-bounce" />
                            {/* <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-red-500 rounded-full animate-ping"></div> */}
                        </div>
                    </div>
                    <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-red-500 to-blue-500 text-white border-0 text-sm sm:text-lg font-bold py-2 sm:py-3 px-4 sm:px-6 animate-bounce shadow-xl whitespace-nowrap overflow-hidden">
                        🏆 LIVE LEADERBOARD • 🇭🇷 vs 🇳🇱
                    </Badge>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 text-balance leading-tight">
                        Global{" "}
                        <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
                            Champions
                        </span>
                    </h1>
                    <p className="text-base sm:text-xl lg:text-2xl font-bold text-gray-700 max-w-3xl mx-auto text-pretty leading-relaxed px-2">
                        🚀 See how you rank against quiz masters from around the world! 🌍
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
                    <Card className="bg-white border-2 sm:border-4 border-green-300 hover:border-green-500 transition-all duration-300 hover:scale-105 shadow-xl sm:shadow-2xl card-3d py-0">
                        <CardHeader className="pb-2 sm:pb-3 bg-gradient-to-r from-green-400 to-green-500 rounded-t-lg p-3 sm:p-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm sm:text-lg font-black">🎯 Total Players</CardTitle>
                                <TrendingUp className="h-4 w-4 sm:h-6 sm:w-6 text-white animate-bounce" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100">
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                                12,847
                            </div>
                            <p className="text-xs sm:text-sm font-bold text-green-700 bg-green-200 px-2 py-1 rounded-full inline-block mt-2">
                                📈 +2.1% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-2 sm:border-4 border-blue-300 hover:border-blue-500 transition-all duration-300 hover:scale-105 shadow-xl sm:shadow-2xl card-3d py-0">
                        <CardHeader className="pb-2 sm:pb-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-t-lg p-3 sm:p-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm sm:text-lg font-black">🎮 Quizzes Completed</CardTitle>
                                <Calendar className="h-4 w-4 sm:h-6 sm:w-6 text-white animate-bounce" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100">
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                                89,234
                            </div>
                            <p className="text-xs sm:text-sm font-bold text-blue-700 bg-blue-200 px-2 py-1 rounded-full inline-block mt-2">
                                🚀 +15.3% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-2 sm:border-4 border-purple-300 hover:border-purple-500 transition-all duration-300 hover:scale-105 shadow-xl sm:shadow-2xl card-3d py-0">
                        <CardHeader className="pb-2 sm:pb-3 bg-gradient-to-r from-purple-400 to-purple-500 rounded-t-lg p-3 sm:p-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm sm:text-lg font-black">⭐ Average Score</CardTitle>
                                <Trophy className="h-4 w-4 sm:h-6 sm:w-6 text-white animate-bounce" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100">
                            <div className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                                67.8
                            </div>
                            <p className="text-xs sm:text-sm font-bold text-purple-700 bg-purple-200 px-2 py-1 rounded-full inline-block mt-2">
                                ⚡ +3.2% from last month
                            </p>
                        </CardContent>
                    </Card>
                </div>

            </section>

            {/* Leaderboard Tabs */}
            <section className="container mx-auto px-3 sm:px-4 pb-12 sm:pb-20">
                <Tabs defaultValue="all-time">
                    <div className="flex justify-center mb-8 sm:mb-12">
                        <TabsList className="w-full max-w-lg grid grid-cols-3 bg-white/90 border-2 sm:border-4 border-red-300 p-1 sm:p-2 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl backdrop-blur-sm">
                            <TabsTrigger
                                value="weekly"
                                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white text-gray-700 font-bold text-xs sm:text-base lg:text-lg py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105"
                                onclick="WeeklyLead">
                                📅 Weekly
                            </TabsTrigger>
                            <TabsTrigger
                                value="monthly"
                                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white text-gray-700 font-bold text-xs sm:text-base lg:text-lg py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105"
                                onclick="MonthlyLead">
                                🗓️ Monthly
                            </TabsTrigger>
                            <TabsTrigger
                                value="all-time"
                                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white text-gray-700 font-bold text-xs sm:text-base lg:text-lg py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105"
                            >
                                🏆 All Time
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="weekly">
                        <LeaderboardTable data={weeklyLeaderboard} title="🔥 Weekly Champions" />

                    </TabsContent>

                    <TabsContent value="monthly">
                        <LeaderboardTable data={monthlyLeaderboard} title="⭐ Monthly Leaders" />
                    </TabsContent>

                    <TabsContent value="all-time">
                        <LeaderboardTable data={globalLeaderboard} title="👑 All-Time Champions" />
                    </TabsContent>
                </Tabs>

                {/* Country Breakdown */}
                <div className="mt-12 sm:mt-20">
                    <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-center mb-8  py-3 sm:mb-12 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                        🌍 Country Performance Battle
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                        <Card className="bg-white border-2 sm:border-4 border-red-300 shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-300 hover:scale-105 card-3d py-0">
                            <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg p-4 sm:p-6 lg:p-7">
                                <CardTitle className="flex items-center justify-center space-x-2 sm:space-x-3 text-lg sm:text-xl lg:text-2xl font-black">
                                    <span className="text-xl sm:text-2xl lg:text-3xl animate-bounce">🇭🇷</span>
                                    <span className="text-sm sm:text-xl">Croatia Champions</span>
                                </CardTitle>
                                <CardDescription className="text-center text-white/90 font-bold text-xs sm:text-base">
                                    🏆 Top Croatian Quiz Masters
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-red-50 to-orange-50">
                                <div className="space-y-3 sm:space-y-4">
                                    {globalLeaderboard
                                        .filter((p) => p.country === "Croatia")
                                        .slice(0, 5)
                                        .map((player, index) => (
                                            <div
                                                key={player.username}
                                                className="flex items-center justify-between p-2 sm:p-3 lg:p-4 bg-white rounded-lg sm:rounded-xl border-2 border-red-200 hover:border-red-400 transition-all duration-200 hover:scale-105 shadow-md"
                                            >
                                                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                                                    <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                                                        <span className="text-white font-black text-xs sm:text-sm">#{index + 1}</span>
                                                    </div>
                                                    <Avatar
                                                        src={player.avatar}
                                                        alt={player.username}
                                                        fallback={player.username.slice(0, 2).toUpperCase()}
                                                        className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 border-2 border-white shadow-lg"
                                                    />
                                                    <span className="font-black text-gray-800 text-sm sm:text-base lg:text-lg truncate">{player.username}</span>
                                                </div>
                                                <span className="font-black text-lg sm:text-xl lg:text-2xl bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                                                    {player.score.toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white border-2 sm:border-4 border-blue-300 shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-300 hover:scale-105 card-3d py-0">
                            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg p-4 sm:p-6 lg:p-7">
                                <CardTitle className="flex items-center justify-center space-x-2 sm:space-x-3 text-lg sm:text-xl lg:text-2xl font-black">
                                    <span className="text-xl sm:text-2xl lg:text-3xl animate-bounce">🇳🇱</span>
                                    <span className="text-sm sm:text-xl">Netherlands Champions</span>
                                </CardTitle>
                                <CardDescription className="text-center text-white/90 font-bold text-xs sm:text-base">
                                    🏆 Top Dutch Quiz Masters
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
                                <div className="space-y-3 sm:space-y-4">
                                    {globalLeaderboard
                                        .filter((p) => p.country === "Netherlands")
                                        .slice(0, 5)
                                        .map((player, index) => (
                                            <div
                                                key={player.username}
                                                className="flex items-center justify-between p-2 sm:p-3 lg:p-4 bg-white rounded-lg sm:rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-200 hover:scale-105 shadow-md"
                                            >
                                                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                                                    <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                                        <span className="text-white font-black text-xs sm:text-sm">#{index + 1}</span>
                                                    </div>
                                                    <Avatar
                                                        src={player.avatar}
                                                        alt={player.username}
                                                        fallback={player.username.slice(0, 2).toUpperCase()}
                                                        className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 border-2 border-white shadow-lg"
                                                    />
                                                    <span className="font-black text-gray-800 text-sm sm:text-base lg:text-lg truncate">{player.username}</span>
                                                </div>
                                                <span className="font-black text-lg sm:text-xl lg:text-2xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                                    {player.score.toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-12 sm:mt-20 text-center">
                    <Card className="bg-gradient-to-r from-red-100 to-blue-100 border-2 sm:border-4 border-gradient-to-r from-red-400 to-blue-400 max-w-4xl mx-auto shadow-xl sm:shadow-3xl hover:shadow-2xl sm:hover:shadow-4xl transition-all duration-300 hover:scale-105 card-3d relative overflow-hidden">
                        {/* Floating decorative elements */}
                        <div className="absolute top-2 sm:top-4 left-4 sm:left-8 w-4 h-4 sm:w-6 sm:h-6 bg-yellow-300 rounded-full opacity-60 animate-bounce"></div>
                        <div className="absolute bottom-3 sm:bottom-6 right-6 sm:right-10 w-3 h-3 sm:w-4 sm:h-4 bg-green-300 rounded-full opacity-60 animate-pulse"></div>
                        <div className="absolute top-4 sm:top-8 right-8 sm:right-16 w-3 h-3 sm:w-5 sm:h-5 bg-purple-300 rounded-full opacity-60 animate-ping"></div>

                        <CardContent className="pt-8 sm:pt-12 pb-8 sm:pb-12 relative z-10">
                            <div className="flex justify-center mb-4 sm:mb-6">
                                <Trophy className="h-12 w-12 sm:h-20 sm:w-20 text-yellow-500" />
                            </div>
                            <h3 className="text-xl sm:text-3xl lg:text-4xl font-black mb-4 sm:mb-6  py-3  bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                                🚀 Ready to Climb the Ranks?
                            </h3>
                            <p className="text-sm sm:text-xl font-bold text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
                                🎯 Test your knowledge and see if you can make it to the top of the leaderboard! Join thousands of
                                players in the ultimate quiz battle!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center">
                                <Link to="/quiz">
                                    <Button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white text-base sm:text-xl font-black px-6 sm:px-10 py-3 sm:py-6 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-2 sm:border-4 border-red-400">
                                        🎮 Start Quiz Challenge!
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button
                                        variant="outline"
                                        className="border-2 sm:border-4 border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600 text-base sm:text-xl font-black px-6 sm:px-10 py-3 sm:py-6 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-transparent"
                                    >
                                        🌟 Create Account
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    )
}