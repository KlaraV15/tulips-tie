
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import HttpClient from "../../../helpers/HttpClient.js";

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
import {useEffect, useState} from "react";
import CreateQuizPopup from "@/Components/admin/CreateQuizPopup.jsx";


async function getQuizzes() {
const client = new HttpClient();

const quizzes = await client.newRequest('/quizzes');

console.log(quizzes.data);

return quizzes.data;

}



export default function QuizManagementSection () {

    const [quizzes,setQuizzes] = useState([]);

    useEffect(() => {
        getQuizzes().then((quizzes) => {setQuizzes(quizzes)});
    },[])

    return(
        <>

            <Card className="bg-card border-border">
                <CardHeader>
                    <div className="flex items-center justify-end">
                        <div className="flex items-center space-x-4"><CreateQuizPopup></CreateQuizPopup></div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">

                            { quizzes.map((quiz) => {
                                return (
                                    <div key={quiz.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/30 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-2xl">🇭🇷</span>
                                        <div className="flex-1">
                                            <p className="font-semibold">{quiz?.title}</p>
                                            <div className="flex items-center space-x-2 mt-1">

                                                <span className="text-sm text-muted-foreground">{quiz.questions_count} questions</span>
                                            </div>
                                        </div>
                                    </div>
                                <div className="flex space-x-2">
                                    <Button variant="outline" size="sm">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </div>
                                    </div>
                                )
                            })}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

