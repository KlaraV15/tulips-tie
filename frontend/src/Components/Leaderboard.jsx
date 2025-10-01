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
        date: "2025-09-28"
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
        date: "2025-09-25"
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
        date: "2025-09-22"
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



getWeeklyEntries(Leaderboard); // ➡️ only this week's entries
getMonthlyEntries(Leaderboard); // ➡️ only this month's entries

// Parse a "YYYY-MM-DD" string into a Date object
function parseDate(dateStr) {
    return new Date(dateStr + "T00:00:00");
}

// Return all entries for the current week (Sunday to Saturday)
function getWeeklyEntries(data) {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return data.filter(entry => {
        const entryDate = parseDate(entry.date);
        return entryDate >= startOfWeek && entryDate <= endOfWeek;
    });
}

// Return all entries for the current month
function getMonthlyEntries(data) {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    return data.filter(entry => {
        const entryDate = parseDate(entry.date);
        return (
            entryDate.getMonth() === currentMonth &&
            entryDate.getFullYear() === currentYear
        );
    });
}



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

const weeklyLeaderboard = getWeeklyEntries(Leaderboard).sort((a, b) => b.score - a.score);
const monthlyLeaderboard = getMonthlyEntries(Leaderboard).sort((a, b) => b.score - a.score);
const globalLeaderboard = Leaderboard;
function getRankIcon(rank) {
    switch (rank) {
        case 1:
            return <Crown className="h-6 w-6 text-yellow-500 animate-bounce" />
        case 2:
            return <Medal className="h-6 w-6 text-gray-400 animate-pulse" />
        case 3:
            return <Award className="h-6 w-6 text-amber-600 animate-spin" />
        default:
            return (
                <span className="text-white font-bold bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                    #{rank}
                </span>
            )
    }
}


function getCountryFlag(country) {
    return country === "Croatia" ? "🇭🇷" : "🇳🇱"
}

function LeaderboardTable({ data, title }) {
    return (
        <Card className="bg-white border-4 border-gradient-to-r from-red-300 to-blue-300 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 card-3d">
            <CardHeader className="bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-t-lg relative overflow-hidden">
                {/* Floating decorative elements */}
                <div className="absolute top-2 right-4 w-4 h-4 bg-yellow-300 rounded-full opacity-60 animate-bounce"></div>
                <div className="absolute bottom-2 left-6 w-3 h-3 bg-green-300 rounded-full opacity-60 animate-pulse"></div>

                <CardTitle className="flex items-center justify-center space-x-3 text-2xl font-black">
                    <Trophy className="h-8 w-8 text-yellow-300 animate-spin" />
                    <span className="gradient-text-primary">{title}</span>
                </CardTitle>
                <CardDescription className="text-center text-white/90 font-bold text-lg">
                    🏆 Champions of the Quiz Battle! 🏆
                </CardDescription>
            </CardHeader>
            <CardContent className="p-6 bg-gradient-to-br from-red-50 to-blue-50">
                <div className="space-y-4">
                    {data.map((player, index) => (
                        <div
                            key={player.username}
                            className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${index < 3
                                ? "bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-400 shadow-lg animate-glow"
                                : "bg-white border-purple-300 hover:border-purple-500 hover:bg-purple-50"
                                }`}
                        >
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg">
                                    {getRankIcon(index + 1)}
                                </div>
                                <Avatar
                                    src={player.avatar}
                                    alt={player.username}
                                    fallback={player.username.slice(0, 2).toUpperCase()}
                                    className="h-14 w-14 border-4 border-white shadow-lg hover:scale-110 transition-transform duration-200"
                                />
                                <div>
                                    <div className="flex items-center space-x-3">
                                        <p className="font-black text-xl bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                                            {player.username}
                                        </p>
                                        <span className="text-2xl animate-bounce">{getCountryFlag(player.country)}</span>
                                        {index < 3 && (
                                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold animate-pulse">
                                                🌟 TOP 3
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <p className="text-sm font-bold text-gray-700 bg-green-100 px-3 py-1 rounded-full">
                                            🎮 {player.gamesPlayed} games
                                        </p>
                                        <p className="text-sm font-bold text-gray-700 bg-blue-100 px-3 py-1 rounded-full">
                                            🎯 {player.accuracy}% accuracy
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-black bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                                    {player.score.toLocaleString()}
                                </p>
                                <p className="text-sm font-bold text-gray-600 bg-yellow-100 px-2 py-1 rounded-full">💎 points</p>
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
            <div className="fixed top-20 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-float"></div>
            <div className="fixed bottom-32 right-20 w-16 h-16 bg-green-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="fixed top-40 right-32 w-12 h-12 bg-purple-300 rounded-full opacity-20 animate-ping"></div>
            <div className="fixed bottom-20 left-32 w-14 h-14 bg-pink-300 rounded-full opacity-20 animate-bounce"></div>

            {/* Navigation */}
            <nav className="border-b-4 border-red-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-xl">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link
                        to="/"
                        className="inline-flex items-center text-red-600 hover:text-red-800 transition-all duration-300 font-bold text-lg hover:scale-110 bg-red-50 px-4 py-2 rounded-full border-2 border-red-200 hover:border-red-400"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2 animate-bounce" />🏠 Back to Home
                    </Link>
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <img src={logo || "/placeholder.svg"} className="h-12 w-8 text-red-600" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        </div>
                        <span className="text-2xl font-black bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                            Tulips & Ties
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/quiz">
                            <Button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold px-6 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border-2 border-red-400">
                                🎮 Start Quiz!
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-6">
                        <div className="relative">
                            <Trophy className="h-20 w-20 text-yellow-500 animate-bounce" />
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
                        </div>
                    </div>
                    <Badge className="mb-6 bg-gradient-to-r from-red-500 to-blue-500 text-white border-0 text-lg font-bold py-3 px-6 animate-bounce shadow-xl">
                        🏆 LIVE LEADERBOARD • 🇭🇷 vs 🇳🇱 BATTLE
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 text-balance leading-tight">
                        Global{" "}
                        <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
                            Champions
                        </span>
                    </h1>
                    <p className="text-2xl font-bold text-gray-700 max-w-3xl mx-auto text-pretty leading-relaxed">
                        🚀 See how you rank against quiz masters from around the world! 🌍
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <Card className="bg-white border-4 border-green-300 hover:border-green-500 transition-all duration-300 hover:scale-105 shadow-2xl card-3d py-0">
                        <CardHeader className="pb-3 bg-gradient-to-r from-green-400 to-green-500 rounded-t-lg p-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg font-black">🎯 Total Players</CardTitle>
                                <TrendingUp className="h-6 w-6 text-white animate-bounce" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 bg-gradient-to-br from-green-50 to-green-100">
                            <div className="text-4xl font-black bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                                12,847
                            </div>
                            <p className="text-sm font-bold text-green-700 bg-green-200 px-2 py-1 rounded-full inline-block mt-2">
                                📈 +2.1% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-4 border-blue-300 hover:border-blue-500 transition-all duration-300 hover:scale-105 shadow-2xl card-3d py-0">
                        <CardHeader className="pb-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-t-lg p-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg font-black">🎮 Quizzes Completed</CardTitle>
                                <Calendar className="h-6 w-6 text-white animate-spin" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
                            <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                                89,234
                            </div>
                            <p className="text-sm font-bold text-blue-700 bg-blue-200 px-2 py-1 rounded-full inline-block mt-2">
                                🚀 +15.3% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-4 border-purple-300 hover:border-purple-500 transition-all duration-300 hover:scale-105 shadow-2xl card-3d py-0">
                        <CardHeader className="pb-3 bg-gradient-to-r from-purple-400 to-purple-500 rounded-t-lg p-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg font-black">⭐ Average Score</CardTitle>
                                <Trophy className="h-6 w-6 text-white animate-pulse" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
                            <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                                67.8
                            </div>
                            <p className="text-sm font-bold text-purple-700 bg-purple-200 px-2 py-1 rounded-full inline-block mt-2">
                                ⚡ +3.2% from last month
                            </p>
                        </CardContent>
                    </Card>
                </div>

            </section>

            {/* Leaderboard Tabs */}
            <section className="container mx-auto px-4 pb-20">
                <Tabs defaultValue="all-time">
                    <div className="flex justify-center mb-12">
                        <TabsList className="w-full max-w-lg grid grid-cols-3 bg-white/90 border-4 border-red-300 p-2 rounded-2xl shadow-2xl backdrop-blur-sm">
                            <TabsTrigger
                                value="weekly"
                                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white text-gray-700 font-bold text-lg py-3 rounded-xl transition-all duration-300 hover:scale-105"
                            >
                                📅 Weekly
                            </TabsTrigger>
                            <TabsTrigger
                                value="monthly"
                                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white text-gray-700 font-bold text-lg py-3 rounded-xl transition-all duration-300 hover:scale-105"
                            >
                                🗓️ Monthly
                            </TabsTrigger>
                            <TabsTrigger
                                value="all-time"
                                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white text-gray-700 font-bold text-lg py-3 rounded-xl transition-all duration-300 hover:scale-105"
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
                <div className="mt-20">
                    <h2 className="text-4xl font-black text-center mb-12 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                        🌍 Country Performance Battle
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="bg-white border-4 border-red-300 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 card-3d">
                            <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
                                <CardTitle className="flex items-center justify-center space-x-3 text-2xl font-black">
                                    <span className="text-3xl animate-bounce">🇭🇷</span>
                                    <span>Croatia Champions</span>
                                </CardTitle>
                                <CardDescription className="text-center text-white/90 font-bold">
                                    🏆 Top Croatian Quiz Masters
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 bg-gradient-to-br from-red-50 to-orange-50">
                                <div className="space-y-4">
                                    {globalLeaderboard
                                        .filter((p) => p.country === "Croatia")
                                        .slice(0, 5)
                                        .map((player, index) => (
                                            <div
                                                key={player.username}
                                                className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-red-200 hover:border-red-400 transition-all duration-200 hover:scale-105 shadow-md"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                                                        <span className="text-white font-black">#{index + 1}</span>
                                                    </div>
                                                    <Avatar
                                                        src={player.avatar}
                                                        alt={player.username}
                                                        fallback={player.username.slice(0, 2).toUpperCase()}
                                                        className="h-10 w-10 border-2 border-white shadow-lg"
                                                    />
                                                    <span className="font-black text-gray-800 text-lg">{player.username}</span>
                                                </div>
                                                <span className="font-black text-2xl bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                                                    {player.score.toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white border-4 border-blue-300 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 card-3d">
                            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                                <CardTitle className="flex items-center justify-center space-x-3 text-2xl font-black">
                                    <span className="text-3xl animate-bounce">🇳🇱</span>
                                    <span>Netherlands Champions</span>
                                </CardTitle>
                                <CardDescription className="text-center text-white/90 font-bold">
                                    🏆 Top Dutch Quiz Masters
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
                                <div className="space-y-4">
                                    {globalLeaderboard
                                        .filter((p) => p.country === "Netherlands")
                                        .slice(0, 5)
                                        .map((player, index) => (
                                            <div
                                                key={player.username}
                                                className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-200 hover:scale-105 shadow-md"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                                        <span className="text-white font-black">#{index + 1}</span>
                                                    </div>
                                                    <Avatar
                                                        src={player.avatar}
                                                        alt={player.username}
                                                        fallback={player.username.slice(0, 2).toUpperCase()}
                                                        className="h-10 w-10 border-2 border-white shadow-lg"
                                                    />
                                                    <span className="font-black text-gray-800 text-lg">{player.username}</span>
                                                </div>
                                                <span className="font-black text-2xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
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
                <div className="mt-20 text-center">
                    <Card className="bg-gradient-to-r from-red-100 to-blue-100 border-4 border-gradient-to-r from-red-400 to-blue-400 max-w-4xl mx-auto shadow-3xl hover:shadow-4xl transition-all duration-300 hover:scale-105 card-3d relative overflow-hidden">
                        {/* Floating decorative elements */}
                        <div className="absolute top-4 left-8 w-6 h-6 bg-yellow-300 rounded-full opacity-60 animate-bounce"></div>
                        <div className="absolute bottom-6 right-10 w-4 h-4 bg-green-300 rounded-full opacity-60 animate-pulse"></div>
                        <div className="absolute top-8 right-16 w-5 h-5 bg-purple-300 rounded-full opacity-60 animate-ping"></div>

                        <CardContent className="pt-12 pb-12 relative z-10">
                            <div className="flex justify-center mb-6">
                                <Trophy className="h-20 w-20 text-yellow-500 animate-spin" />
                            </div>
                            <h3 className="text-4xl font-black mb-6 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                                🚀 Ready to Climb the Ranks?
                            </h3>
                            <p className="text-xl font-bold text-gray-700 mb-8 max-w-2xl mx-auto">
                                🎯 Test your knowledge and see if you can make it to the top of the leaderboard! Join thousands of
                                players in the ultimate quiz battle!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Link to="/quiz">
                                    <Button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white text-xl font-black px-10 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 border-4 border-red-400">
                                        🎮 Start Quiz Challenge!
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button
                                        variant="outline"
                                        className="border-4 border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600 text-xl font-black px-10 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 bg-transparent"
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
