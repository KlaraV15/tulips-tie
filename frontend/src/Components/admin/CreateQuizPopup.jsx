import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
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
    ArrowLeft,
    Save,
    FileQuestion,
    Users,
    Calendar,
} from 'lucide-react';
import QuestionsCard from '@/Components/admin/QuestionsCard.jsx';
import HttpClient from '../../../helpers/HttpClient.js';
import {toast} from 'sonner';

// Form validation schema
const formSchema = z.object({
    title: z.string().min(1, 'Quiz title is required').min(3, 'Title must be at least 3 characters'),
    description: z
        .string()
        .min(1, 'Description is required')
        .min(10, 'Description must be at least 10 characters'),
});

const client = new HttpClient();

export default function CreateQuizPopup(props) {
    const [showQuestionsSection, setShowQuestionsSection] = useState(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState([]);

    const [quizDetails, setQuizDetails] = useState(null);

    function getQuizDetails() {
        console.log(props?.quizId);
        if (!props.quizId) return null;

        client.newRequest(`/quizzes/${props.quizId}`).then((response) => setQuizDetails(response.data));
    }

    // Determine if we're in edit mode
    const isEditMode = props.quizId && props.quizId !== null;
    const dialogTitle = isEditMode ? 'Edit Quiz' : 'Create New Quiz';
    const submitButtonText = isEditMode ? 'Update Quiz' : 'Create Quiz';

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: props?.formValues ?? {title: '', description: ''},
    });

    useEffect(() => {
        setIsCreateDialogOpen(props.isPopupOpen);
    }, [props.isPopupOpen]);

    // Reset form when formValues change (for edit mode)
    useEffect(() => {
        if (props.formValues) {
            form.reset(props.formValues);
            getQuizDetails();
            console.log(quizDetails);
            if (quizDetails !== null) {
                setSelectedQuestions(quizDetails.questions.map((question) => question.id));
                console.log(selectedQuestions);
            }
        }
    }, [props.formValues, form]);

    const handleClose = () => {
        setIsCreateDialogOpen(false);
        setShowQuestionsSection(false);
        setSelectedQuestions([]);
        form.reset();
        if (props.onClose) {
            props.onClose();
        }
    };

    const handleQuestionSelect = (question) => {
        setSelectedQuestions((prev) => {
            // Check if question is already selected
            const isAlreadySelected = prev.some((qId) => qId === question.id);
            if (isAlreadySelected) {
                // Remove if already selected
                return prev.filter((qId) => qId !== question.id);
            } else {
                // Add if not selected
                return [...prev, question.id];
            }
        });
    };

    async function handleCreateQuiz(data) {
        try {
            // Include selected questions in the data
            const submitData = {
                ...data,
                questions: selectedQuestions,
            };

            let response;
            if (isEditMode) {
                // Update existing quiz
                response = await client.newPutRequest(`/quizzes/${props.quizId}`, submitData);
                console.log('Update Response:', response);

                if (response.status === 200) {
                    toast('Quiz updated successfully.');
                    handleClose();
                    // Refresh the quiz list if callback is provided
                    if (props.onSuccess) {
                        props.onSuccess();
                    }
                }
            } else {
                // Create new quiz
                response = await client.newPostRequest('/quizzes', submitData);
                console.log('Create Response:', response);

                if (response.status === 201) {
                    toast('Quiz created successfully.');
                    handleClose();
                    // Refresh the quiz list if callback is provided
                    if (props.onSuccess) {
                        props.onSuccess();
                    }
                }
            }
        } catch (e) {
            console.log('error', e);
            toast(`Error ${isEditMode ? 'updating' : 'creating'} quiz. Please try again.`);
        }
    }

    return (
        <>
            <Button
                className="glow-effect"
                onClick={() => {
                    if (props.onCreateClick) {
                        props.onCreateClick();
                    }
                }}>
                <Plus className="h-4 w-4 mr-2"/>
                Create Quiz
            </Button>

            <Dialog
                open={isCreateDialogOpen}
                onOpenChange={handleClose}
                className="w-screen">
                <DialogContent
                    className={`${showQuestionsSection && 'max-w-7xl w-[95vw]'} max-h-[90vh] overflow-hidden`}>
                    <DialogHeader className={`${showQuestionsSection && 'w-100'} w-100`}>
                        <DialogTitle>{dialogTitle}</DialogTitle>
                        <DialogDescription>
                            {isEditMode
                                ? 'Update the quiz information below'
                                : 'Create a new quiz collection for Croatia or Netherlands'}
                        </DialogDescription>
                    </DialogHeader>

                    <div
                        className={`flex gap-6 ${showQuestionsSection ? 'min-h-[600px]' : 'min-h-[400px]'} w-full grow-2`}>
                        {/* Quiz Form Section */}
                        <div className={`flex-shrink-0   ${showQuestionsSection ? 'w-1/2' : 'grow-2'}`}>
                            <Form
                                {...form}
                            >
                                <form
                                    onSubmit={(e) => e.preventDefault()}
                                    className="gap-y-6 py-4 h-full flex flex-col">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Quiz Title</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        required
                                                        placeholder="Enter quiz title..."
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Describe what this quiz covers..."
                                                        className="min-h-[100px] h-auto"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    {!showQuestionsSection && (
                                        <div>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setShowQuestionsSection(true)}>
                                                Add questions
                                            </Button>
                                        </div>
                                    )}

                                    <div className="flex justify-end space-x-2 ">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleClose}>
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={form.handleSubmit(handleCreateQuiz)}
                                            type="submit"
                                            className="glow-effect"
                                            disabled={!form.formState.isValid}>
                                            <Save className="h-4 w-4 mr-2"/>
                                            {submitButtonText}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>

                        {/* Questions Section */}
                        {showQuestionsSection && (
                            <div className="flex-1 min-h-0 flex flex-col">
                                <div className="mb-4 px-1">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setShowQuestionsSection(false)}>
                                                <ArrowLeft className="h-4 w-4 mr-2"/>
                                                Back to form
                                            </Button>
                                            <p className="text-sm text-muted-foreground">
                                                Selected Questions: {selectedQuestions.length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grow-1 h-px overflow-y-auto">
                                    <QuestionsCard
                                        showAddButton={true}
                                        onQuestionSelect={handleQuestionSelect}
                                        addedQuestions={selectedQuestions}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
