import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
    Shield,
    Users,
    FileQuestion,
    BarChart3,
    AlertTriangle,
    Settings,
    Plus,
    Eye,
    Edit,
    Trash2,
    Activity,
    ArrowLeft,
} from "lucide-react"
import QuizManagementSection from "@/Components/admin/QuizManagementSection.jsx";
import QuestionsCard from "@/Components/admin/QuestionsCard.jsx";

function AdminPanel() {
    const adminStats = {
        totalUsers: 12847,
        totalQuestions: 486,
        totalQuizzes: 89234,
        averageScore: 67.8,
        activeUsers: 3421,
        newUsersToday: 127,
        questionsNeedingReview: 8,
        reportedIssues: 3,
    }

    const recentUsers = [
        {
            id: 1,
            username: "NewPlayer123",
            email: "newplayer@example.com",
            joinDate: "2024-01-15",
            gamesPlayed: 3,
            score: 180,
            status: "active",
        },
        {
            id: 2,
            username: "QuizLover",
            email: "quizlover@example.com",
            joinDate: "2024-01-14",
            gamesPlayed: 12,
            score: 840,
            status: "active",
        },
        {
            id: 3,
            username: "GeographyFan",
            email: "geofan@example.com",
            joinDate: "2024-01-13",
            gamesPlayed: 8,
            score: 560,
            status: "inactive",
        },
        {
            id: 4,
            username: "KnowledgeSeeker",
            email: "knowledge@example.com",
            joinDate: "2024-01-12",
            gamesPlayed: 25,
            score: 1750,
            status: "active",
        },
    ]

    const recentQuestions = [
        {
            id: 1,
            question: "What is the capital of Croatia?",
            country: "Croatia",
            difficulty: "Easy",
            status: "approved",
            createdBy: "admin",
            createdDate: "2024-01-15",
        },
        {
            id: 2,
            question: "Which Dutch city is famous for its canals?",
            country: "Netherlands",
            difficulty: "Medium",
            status: "pending",
            createdBy: "admin",
            createdDate: "2024-01-14",
        },
        {
            id: 3,
            question: "What is the currency of the Netherlands?",
            country: "Netherlands",
            difficulty: "Easy",
            status: "approved",
            createdBy: "admin",
            createdDate: "2024-01-13",
        },
        {
            id: 4,
            question: "Which Croatian island is the largest?",
            country: "Croatia",
            difficulty: "Hard",
            status: "review",
            createdBy: "admin",
            createdDate: "2024-01-12",
        },
    ]

    function getStatusBadge(status) {
        switch (status) {
            case "approved":
                return <Badge className="bg-chart-3/10 text-chart-3 border-chart-3/20">Approved</Badge>
            case "pending":
                return <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20">Pending</Badge>
            case "review":
                return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Review</Badge>
            case "active":
                return <Badge className="bg-chart-3/10 text-chart-3 border-chart-3/20">Active</Badge>
            case "inactive":
                return <Badge className="bg-muted/20 text-muted-foreground border-muted">Inactive</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    function getCountryFlag(country) {
        return country === "Croatia" ? "🇭🇷" : "🇳🇱"
    }

    return (
        <section className="container mx-auto px-4 pb-20">
            <Tabs defaultValue="users" className="w-full">
                <div className="flex justify-center mb-8">
                    <TabsList className="grid w-full max-w-2xl grid-cols-3">
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
                        <TabsTrigger value="questions">Questions</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="users" className="space-y-6">
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle>Recent Users</CardTitle>
                            <CardDescription>Newly registered users and their activity</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/30 transition-colors"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <Avatar className="h-10 w-10">
                                                <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold">{user.username}</p>
                                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                                <p className="text-sm text-muted-foreground">Joined {user.joinDate}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="text-center">
                                                <p className="font-bold">{user.gamesPlayed}</p>
                                                <p className="text-sm text-muted-foreground">Games</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="font-bold text-primary">{user.score}</p>
                                                <p className="text-sm text-muted-foreground">Score</p>
                                            </div>
                                            {getStatusBadge(user.status)}
                                            <div className="flex space-x-2">
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/*Quizzes*/}
                <TabsContent value="quizzes" className="space-y-6">
                    <QuizManagementSection> </QuizManagementSection>
                </TabsContent>

                {/*Questions*/}
                <TabsContent value="questions" className="space-y-6">
                    {/*<Card className="bg-card border-border">*/}
                    {/*    <CardHeader>*/}
                    {/*        <div className="flex items-center justify-between">*/}
                    {/*            <div>*/}
                    {/*                <CardTitle>Question Management</CardTitle>*/}
                    {/*                <CardDescription>Review and manage quiz questions</CardDescription>*/}
                    {/*            </div>*/}
                    {/*            <button href="/admin/questions">*/}
                    {/*                <Button className="glow-effect">*/}
                    {/*                    <Plus className="h-4 w-4 mr-2" />*/}
                    {/*                    Add Question*/}
                    {/*                </Button>*/}
                    {/*            </button>*/}
                    {/*        </div>*/}
                    {/*    </CardHeader>*/}
                    {/*    <CardContent>*/}
                    {/*        <div className="space-y-4">*/}
                    {/*            {recentQuestions.map((question) => (*/}
                    {/*                <div*/}
                    {/*                    key={question.id}*/}
                    {/*                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/30 transition-colors"*/}
                    {/*                >*/}
                    {/*                    <div className="flex items-center space-x-4">*/}
                    {/*                        <span className="text-2xl">{getCountryFlag(question.country)}</span>*/}
                    {/*                        <div className="flex-1">*/}
                    {/*                            <p className="font-semibold">{question.question}</p>*/}
                    {/*                            <div className="flex items-center space-x-2 mt-1">*/}
                    {/*                                <Badge variant="outline" className="text-xs">*/}
                    {/*                                    {question.difficulty}*/}
                    {/*                                </Badge>*/}
                    {/*                                <span className="text-sm text-muted-foreground">*/}
                    {/*                                    by {question.createdBy} • {question.createdDate}*/}
                    {/*                                </span>*/}
                    {/*                            </div>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="flex items-center space-x-4">*/}
                    {/*                        {getStatusBadge(question.status)}*/}
                    {/*                        <div className="flex space-x-2">*/}
                    {/*                            <Button variant="outline" size="sm">*/}
                    {/*                                <Eye className="h-4 w-4" />*/}
                    {/*                            </Button>*/}
                    {/*                            <Button variant="outline" size="sm">*/}
                    {/*                                <Edit className="h-4 w-4" />*/}
                    {/*                            </Button>*/}
                    {/*                            <Button variant="outline" size="sm">*/}
                    {/*                                <Trash2 className="h-4 w-4" />*/}
                    {/*                            </Button>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            ))}*/}
                    {/*        </div>*/}
                    {/*    </CardContent>*/}
                    {/*</Card>*/}

                    <QuestionsCard></QuestionsCard>
                </TabsContent>
            </Tabs>
        </section>
    )
}

export default AdminPanel;