import {useEffect, useState, memo} from 'react';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Shield,
    Plus,
    Search,
    Filter,
    Eye,
    Edit,
    Trash2,
    Check,
    X,
    ArrowLeft,
    AlertCircle,
    Save,
} from 'lucide-react';
import HttpClient from '../../../helpers/HttpClient.js';
import {FormControl} from '@/Components/ui/form.jsx';
import CreateQuestionPopup from '@/Components/admin/CreateQuestionPopup.jsx';
import {toast} from 'sonner';

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

// This function will be defined inside the component

const QuestionsCard = memo(function QuestionsCard({
                                                      onQuestionSelect,
                                                      showAddButton = false,
                                                      addedQuestions = [],
                                                  }) {
    const [countries, setCountries] = useState([]);
    const [difficulties, setDifficulties] = useState([]);
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [popupProps, setPopupProps] = useState({
        isPopupOpen: false,
        formValues: {
            text: '',
            options: [
                {text: '', is_correct: false},
                {text: '', is_correct: false},
                {text: '', is_correct: false},
                {text: '', is_correct: false},
            ],
            country_id: '',
            difficulty_id: '',
            category_id: '',
        },
    });

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
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterCountry, setFilterCountry] = useState('all'); // Updated default value
    const [filterDifficulty, setFilterDifficulty] = useState('all'); // Updated default value
    const [filterCategory, setFilterCategory] = useState('all');
    

    function resetFilters() {
        setSearchTerm('');
        setFilterCountry('all');
        setFilterCategory('all');
        setFilterDifficulty('all');
    }

    async function editQuestion(question) {
        // Convert old format to new format if needed

        const response = await client.newRequest(`/questions/${question.id}`);

        question = response.data;

        let options = question.options;
        /*  if (Array.isArray(options) && options.length > 0 && typeof options[0] === 'string') {
              // Convert from old format [text1, text2, ...] to new format [{text, is_correct}, ...]
              options = options.map((text, index) => ({
                  text: text || '',
                  is_correct: question.correctAnswer === index,
              }));
          }

          // Ensure we have at least 4 options
          while (options.length < 4) {
              options.push({text: '', is_correct: false});
          }*/

        setPopupProps({
            isPopupOpen: true,
            questionId: question.id,
            formValues: {
                text: question.text,
                options: options,
                country_id: String(question.country_id) || '',
                difficulty_id: String(question.difficulty_id) || '',
                category_id: String(question.category_id) || '',
            },
        });
    }

    function refreshQuestions() {
        getQuestions().then((response) => setQuestions(response));
    }

    function openCreateQuestion() {
        setPopupProps({
            isPopupOpen: true,
            questionId: null,
            formValues: {
                text: '',
                options: [
                    {text: '', is_correct: false},
                    {text: '', is_correct: false},
                    {text: '', is_correct: false},
                    {text: '', is_correct: false},
                ],
                country_id: '',
                difficulty_id: '',
                category_id: '',
            },
        });
    }

    async function deleteQuestion(question) {
        try {
            const response = await client.newDeleteRequest(`/questions/${question.id}`);
            if (response.status === 200) {
                toast('Question deleted!');
                refreshQuestions();
            }
        } catch (e) {
            console.log(e);
        }
    }

    const filteredQuestions = questions.filter((q) => {
        const matchesSearch =
            searchTerm === '' || q.text.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCountry =
            filterCountry === 'all' || String(q.country?.id) === String(filterCountry);
        const matchesDifficulty =
            filterDifficulty === 'all' || String(q.difficulty?.id) === String(filterDifficulty);
        const matchesCategory =
            filterCategory === 'all' || String(q.category?.id) === String(filterCategory);

        return matchesSearch && matchesCountry && matchesDifficulty && matchesCategory;
    });

    return (
        <>
            {' '}
            <Card className="bg-card border-border mb-8">
                <CardHeader>
                    <CardTitle className="flex flex-wrap items-center space-y-3 space-x-2">
                        <div className="flex w-full items-center justify-between space-x-4 ">
                            <div className="flex">
                                <Filter className="h-5 w-5"/>
                                <span>Filters & Search</span>
                            </div>
                            <CreateQuestionPopup
                                isPopupOpen={popupProps.isPopupOpen}
                                questionId={popupProps.questionId}
                                formValues={popupProps.formValues}
                                onCreateClick={openCreateQuestion}
                                onClose={() =>
                                    setPopupProps((prev) => ({...prev, isPopupOpen: false, questionId: null}))
                                }
                                onSuccess={refreshQuestions}
                            />
                        </div>
                        <div className="space-y-2 w-full">
                            <Label htmlFor="search">Search Questions</Label>
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                                <Input
                                    id="search"
                                    placeholder="Search questions..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div className="flex items-end gap-4 w-full">
                            <div>
                                <Label>Country</Label>
                                <Select
                                    value={filterCountry}
                                    onValueChange={setFilterCountry}>
                                    <SelectTrigger>
                                        <SelectValue/>
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

                            {/*Difficulty select*/}
                            <div>
                                <Label>Difficulty</Label>
                                <Select
                                    onValueChange={setFilterDifficulty}
                                    value={filterDifficulty}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select difficulty"/>
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="all">All difficulties</SelectItem>
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

                            {/*Category select*/}
                            <div>
                                <Label>Category</Label>
                                <Select
                                    onValueChange={setFilterCategory}
                                    value={filterCategory}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category"/>
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="all">All categories</SelectItem>
                                        {categories &&
                                            categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={String(category.id)}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/*Clear filters button*/}
                            <div className=" w-full self-end">
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
                <CardContent className=" flex flex-col">
                    <div className="flex flex-col gap-3.5">
                        {filteredQuestions.map((question) => (
                            <div
                                key={question.id}
                                className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/30 transition-colors">
                                <div className="flex items-center space-x-4">
                                    <span className="text-2xl">{question?.country?.name}</span>
                                    <div className="flex-1">
                                        <p className="font-semibold">{question?.text}</p>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <Badge
                                                variant="outline"
                                                className="text-xs">
                                                {question?.difficulty?.level}
                                            </Badge>
                                            <span className="text-sm text-muted-foreground">
                        by {question?.createdBy || 'no name'} •{' '}
                                                {new Date(question.created_at)?.toISOString()?.split('T')[0] ||
                                                    '0000-00-00'}
                      </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="flex space-x-2">
                                        {showAddButton ? (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                type="button"
                                                onClick={() => onQuestionSelect && onQuestionSelect(question)}>
                                                {/*<Plus className="h-4 w-4"/>*/}
                                                {addedQuestions.includes(question.id) ? (
                                                    'Remove from quiz'
                                                ) : (
                                                    <>
                                                        <Plus className="h-4 w-4"/>
                                                        <span>Add to quiz</span>
                                                    </>
                                                )}
                                            </Button>
                                        ) : (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    size="sm">
                                                    <Eye className="h-4 w-4"/>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => editQuestion(question)}>
                                                    <Edit className="h-4 w-4"/>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => deleteQuestion(question)}
                                                    size="sm">
                                                    <Trash2 className="h-4 w-4"/>
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    );
});

export default QuestionsCard;
