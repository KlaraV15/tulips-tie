import {useEffect, useState} from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Shield, Plus, Search, Filter, Eye, Edit, Trash2, Check, X, ArrowLeft, AlertCircle, Save } from "lucide-react"
import HttpClient from "../../../helpers/HttpClient.js";


const client = new HttpClient();




async function getCountries() {
    const response = await client.newRequest('/countries');
    console.log('countries', response.data);
    return response?.data ?? [];
}

async function getQuestions() {
    const response = await client.newRequest('/questions');
    console.log('questions', response.data);
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

export default function QuestionsCard() {

    const [countries, setCountries] = useState([]);
    const [difficulties, setDifficulties] = useState([]);
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getCountries().then((response) => setCountries(response));
    }, []);

    useEffect(() => {
        getCategories().then((response) => setCategories(response));
    }, []);

    useEffect(() => {
        getDifficulties().then((response) => setDifficulties(response));
    }, []);

    useEffect(() => {
        getQuestions().then((response) => setQuestions(response));
    },[])

    const [searchTerm, setSearchTerm] = useState("")
    const [filterCountry, setFilterCountry] = useState(countries[0]) // Updated default value
    const [filterDifficulty, setFilterDifficulty] = useState(difficulties[0]) // Updated default value


    const filteredQuestions = questions.filter((q) => {
        const matchesSearch = q.text.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCountry = filterCountry === "all" || q.country === filterCountry
        const matchesDifficulty = filterDifficulty === "all" || q.difficulty === filterDifficulty
        return matchesSearch && matchesCountry  && matchesDifficulty
    })

    return(
        <> <Card className="bg-card border-border mb-8">
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Filter className="h-5 w-5" />
                    <span>Filters & Search</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="search">Search Questions</Label>
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="search"
                                placeholder="Search questions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Country</Label>
                        <Select value={filterCountry} onValueChange={setFilterCountry}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Countries</SelectItem>
                                <SelectItem value="Croatia">🇭🇷 Croatia</SelectItem>
                                <SelectItem value="Netherlands">🇳🇱 Netherlands</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>


                    <div className="space-y-2">
                        <Label>Difficulty</Label>
                        <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Difficulties</SelectItem>
                                <SelectItem value="Easy">Easy</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Hard">Hard</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-end">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchTerm("")
                                setFilterCountry("all")

                                setFilterDifficulty("all")
                            }}
                            className="w-full"
                        >
                            Clear Filters
                        </Button>
                    </div>
                </div>


            </CardContent>

        </Card>
            <div>
                {
                    filteredQuestions.map(question => (
                        <div
                            key={question.id}
                            className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/30 transition-colors"
                        >
                            <div className="flex items-center space-x-4">
                                <span className="text-2xl">{question?.country?.name}</span>
                                <div className="flex-1">
                                    <p className="font-semibold">{question?.text}</p>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <Badge variant="outline" className="text-xs">
                                            {question?.difficulty?.level}
                                        </Badge>
                                        {/*                <span className="text-sm text-muted-foreground">*/}
                                        {/*  by {question.createdBy} • {question.createdDate}*/}
                                        {/*</span>*/}
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))
                }
            </div>
        </>
    )

}