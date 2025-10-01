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
        }
    }, [props.formValues, form]);

    const handleClose = () => {
        setIsCreateDialogOpen(false);
        setShowQuestionsSection(false);
        form.reset();
        if (props.onClose) {
            props.onClose();
        }
    };

    async function handleCreateQuiz(data) {
        try {
            let response;
            if (isEditMode) {
                // Update existing quiz
                response = await client.newPutRequest(`/quizzes/${props.quizId}`, data);
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
                response = await client.newPostRequest('/quizzes', data);
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
                onOpenChange={handleClose}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{dialogTitle}</DialogTitle>
                        <DialogDescription>
                            {isEditMode
                                ? 'Update the quiz information below'
                                : 'Create a new quiz collection for Croatia or Netherlands'}
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleCreateQuiz)}
                            className="space-y-6 py-4">
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
                                                className="min-h-[80px]"
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

                            {showQuestionsSection && (
                                <div className="mt-4 max-h-50 overflow-auto">
                                    <QuestionsCard/>
                                </div>
                            )}

                            <div className="flex justify-end space-x-2 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="glow-effect"
                                    disabled={!form.formState.isValid}>
                                    <Save className="h-4 w-4 mr-2"/>
                                    {submitButtonText}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}
