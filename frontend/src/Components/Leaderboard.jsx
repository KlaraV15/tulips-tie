import { Link } from "react-router-dom"
import { Button } from "./Button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./Card"
import { Avatar } from "./Avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs"
import { Trophy, Medal, Award, Crown, Globe, ArrowLeft, Calendar, TrendingUp } from "lucide-react"
import logo from '../assets/logo-rose.png'
const Leaderboard = [
    {
        username: "GeographyMaster",
        score: 2450,
        country: "Croatia",
        avatar: "/abstract-geometric-shapes.png",
        gamesPlayed: 245,
        accuracy: 98,
    },
    {
        username: "QuizChampion",
        score: 2380,
        country: "Netherlands",
        avatar: "/abstract-geometric-shapes.png",
        gamesPlayed: 238,
        accuracy: 95,
    },
    {
        username: "KnowledgeSeeker",
        score: 2290,
        country: "Croatia",
        avatar: "/diverse-group-collaborating.png",
        gamesPlayed: 229,
        accuracy: 92,
    },
    {
        username: "EuroExpert",
        score: 2180,
        country: "Netherlands",
        avatar: "/abstract-geometric-shapes.png",
        gamesPlayed: 218,
        accuracy: 89,
    },
    {
        username: "BalkanBrain",
        score: 2050,
        country: "Croatia",
        avatar: "/abstract-geometric-shapes.png",
        gamesPlayed: 205,
        accuracy: 87,
    },
    {
        username: "DutchDynamo",
        score: 1980,
        country: "Netherlands",
        avatar: "/abstract-geometric-shapes.png",
        gamesPlayed: 198,
        accuracy: 85,
    },
    {
        username: "AdriaSage",
        score: 1890,
        country: "Croatia",
        avatar: "/abstract-geometric-shapes.png",
        gamesPlayed: 189,
        accuracy: 83,
    },
    {
        username: "TulipTrivia",
        score: 1820,
        country: "Netherlands",
        avatar: "/abstract-geometric-shapes.png",
        gamesPlayed: 182,
        accuracy: 81,
    },
    {
        username: "ZagrebZealot",
        score: 1750,
        country: "Croatia",
        avatar: "/abstract-geometric-shapes.png",
        gamesPlayed: 175,
        accuracy: 79,
    },
    {
        username: "AmsterdamAce",
        score: 1680,
        country: "Netherlands",
        avatar: "/abstract-geometric-shapes.png",
        gamesPlayed: 168,
        accuracy: 77,
    },
]

const globalLeaderboard = Leaderboard.sort((a, b) => b.score - a.score);
//this will make it so leaderboard is automaticaly sorted by scores, fist the biggest, and last the smallest

const weeklyLeaderboard = globalLeaderboard.slice(0, 5).map((player, index) => ({
    ...player,
    rank: index + 1,
    score: Math.floor(player.score * 0.3),
}))
//!Needs change seince ranks are deleted and sholdn't exist!, everething after this should also be changed

const monthlyLeaderboard = globalLeaderboard.slice(0, 8).map((player, index) => ({
    ...player,
    rank: index + 1,
    score: Math.floor(player.score * 0.7),
}))

function getRankIcon(rank) {
    switch (rank) {
        case 1:
            return <Crown className="h-5 w-5 text-yellow-500" />
        case 2:
            return <Medal className="h-5 w-5 text-gray-400" />
        case 3:
            return <Award className="h-5 w-5 text-amber-600" />
        default:
            return <span className="text-gray-500 font-bold">#{rank}</span>
    }
}
//??This will just be broken once we put site up

function getCountryFlag(country) {
    return country === "Croatia" ? "🇭🇷" : "🇳🇱"
}
//May be changed since login doesn't require country?
function LeaderboardTable({ data, title }) {
    return (
        <Card className="border-[#DCDCDC] bg-white">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Trophy className="h-5 w-5 text-[#1E93AB]" />
                    <span>{title}</span>
                </CardTitle>
                <CardDescription className="text-gray-600">Top performers in the quiz competition</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {data.map((player, index) => (
                        <div
                            key={player.username}
                            className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${index < 3
                                ? "bg-[#1E93AB]/10 border-[#1E93AB]/30 shadow-sm"
                                : "bg-[#F3F2EC] border-[#DCDCDC] hover:border-[#1E93AB]/50"
                                }`}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center justify-center w-8">
                                    {getRankIcon(player.index)}
                                </div>
                                <Avatar
                                    src={player.avatar}
                                    alt={player.username}
                                    fallback={player.username.slice(0, 2).toUpperCase()}
                                    className="h-10 w-10"
                                />
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <p className="font-semibold text-gray-800">{player.username}</p>
                                        <span className="text-lg">{getCountryFlag(player.country)}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        {player.gamesPlayed} games • {player.accuracy}% accuracy
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-[#E62727]">{player.score.toLocaleString()}</p>
                                <p className="text-sm text-gray-600">points</p>
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
        <div className="min-h-screen bg-[#F3F2EC]">
            {/* Navigation */}
            <nav className="border-b border-[#DCDCDC] bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link
                        to="/"
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                    </Link>
                    <div className="flex items-center space-x-2">
                         <img src={logo} className="h-12 w-8 text-[#1E93AB]" />
                        <span className="font-bold text-[#E62727]">Tulips & Ties</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/quiz">
                            <Button className="bg-[#E62727] hover:bg-[#E62727]/90 text-white">
                                Start Quiz
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <section className="container mx-auto px-4 py-12">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <Trophy className="h-12 w-12 text-[#1E93AB]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                        Global <span className="text-[#E62727]">Leaderboard</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        See how you rank against quiz masters from around the world
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <Card className="border-[#DCDCDC] bg-white hover:border-[#1E93AB]/50 transition-colors">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium text-gray-800">Total Players</CardTitle>
                                <TrendingUp className="h-4 w-4 text-gray-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-[#E62727]">12,847</div>
                            <p className="text-xs text-gray-600">+2.1% from last month</p>
                        </CardContent>
                    </Card>

                    <Card className="border-[#DCDCDC] bg-white hover:border-[#1E93AB]/50 transition-colors">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium text-gray-800">Quizzes Completed</CardTitle>
                                <Calendar className="h-4 w-4 text-gray-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-[#E62727]">89,234</div>
                            <p className="text-xs text-gray-600">+15.3% from last month</p>
                        </CardContent>
                    </Card>

                    <Card className="border-[#DCDCDC] bg-white hover:border-[#1E93AB]/50 transition-colors">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium text-gray-800">Average Score</CardTitle>
                                <Trophy className="h-4 w-4 text-gray-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-[#E62727]">67.8</div>
                            <p className="text-xs text-gray-600">+3.2% from last month</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Leaderboard Tabs */}
            <section className="container mx-auto px-4 pb-20">
                <Tabs defaultValue="all-time">
                    <div className="flex justify-center mb-8">
                        <TabsList className="w-full max-w-md grid grid-cols-3 bg-[#F3F2EC] border border-[#DCDCDC] p-1 rounded-lg">
                            <TabsTrigger 
                                value="weekly" 
                                className="data-[state=active]:bg-[#E62727] data-[state=active]:text-white text-gray-700"
                            >
                                Weekly
                            </TabsTrigger>
                            <TabsTrigger 
                                value="monthly" 
                                className="data-[state=active]:bg-[#E62727] data-[state=active]:text-white text-gray-700"
                            >
                                Monthly
                            </TabsTrigger>
                            <TabsTrigger 
                                value="all-time" 
                                className="data-[state=active]:bg-[#E62727] data-[state=active]:text-white text-gray-700"
                            >
                                All Time
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="weekly">
                        <LeaderboardTable data={weeklyLeaderboard} title="Weekly Champions" />
                    </TabsContent>

                    <TabsContent value="monthly">
                        <LeaderboardTable data={monthlyLeaderboard} title="Monthly Leaders" />
                    </TabsContent>

                    <TabsContent value="all-time">
                        <LeaderboardTable data={globalLeaderboard} title="All-Time Champions" />
                    </TabsContent>
                </Tabs>

                {/* Country Breakdown */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Country Performance</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="border-[#DCDCDC] bg-white">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2 text-gray-800">
                                    <span className="text-2xl">🇭🇷</span>
                                    <span>Croatia</span>
                                </CardTitle>
                                <CardDescription className="text-gray-600">Top Croatian players</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {globalLeaderboard
                                        .filter((p) => p.country === "Croatia")
                                        .slice(0, 5)
                                        .map((player, index) => (
                                            <div key={player.username} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-sm font-bold text-gray-500">#{index + 1}</span>
                                                    <Avatar
                                                        src={player.avatar}
                                                        alt={player.username}
                                                        fallback={player.username.slice(0, 2).toUpperCase()}
                                                        className="h-8 w-8"
                                                    />
                                                    <span className="font-medium text-gray-800">{player.username}</span>
                                                </div>
                                                <span className="font-bold text-[#E62727]">{player.score.toLocaleString()}</span>
                                            </div>
                                        ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-[#DCDCDC] bg-white">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2 text-gray-800">
                                    <span className="text-2xl">🇳🇱</span>
                                    <span>Netherlands</span>
                                </CardTitle>
                                <CardDescription className="text-gray-600">Top Dutch players</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {globalLeaderboard
                                        .filter((p) => p.country === "Netherlands")
                                        .slice(0, 5)
                                        .map((player, index) => (
                                            <div key={player.username} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-sm font-bold text-gray-500">#{index + 1}</span>
                                                    <Avatar
                                                        src={player.avatar}
                                                        alt={player.username}
                                                        fallback={player.username.slice(0, 2).toUpperCase()}
                                                        className="h-8 w-8"
                                                    />
                                                    <span className="font-medium text-gray-800">{player.username}</span>
                                                </div>
                                                <span className="font-bold text-[#E62727]">{player.score.toLocaleString()}</span>
                                            </div>
                                        ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-16 text-center">
                    <Card className="border-[#1E93AB]/30 bg-[#1E93AB]/10 max-w-2xl mx-auto">
                        <CardContent className="pt-8">
                            <Trophy className="h-12 w-12 text-[#1E93AB] mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-4 text-gray-800">Ready to Climb the Ranks?</h3>
                            <p className="text-gray-600 mb-6">
                                Test your knowledge and see if you can make it to the top of the leaderboard!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/quiz">
                                    <Button className="bg-[#E62727] hover:bg-[#E62727]/90 text-white">
                                        Start Quiz
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="outline" className="border-[#1E93AB] text-[#1E93AB] hover:bg-[#1E93AB]/10">
                                        Create Account
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