import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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
import { toast } from 'sonner';

// API functions for fetching data
async function getCountries() {
  const response = await client.newRequest('/countries');
  console.log('countries', response.data);
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

// Form validation schema
const formSchema = z.object({
  text: z.string().min(1, 'Question is required'),
  //.min(10, 'Question must be at least 10 characters'),
  // Optional database fields that come from existing questions
  id: z.number().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  options: z
    .array(
      z.object({
        text: z.string().min(1, 'Option cannot be empty'),
        is_correct: z.boolean().or(z.number().transform((val) => val === 1)),
        // Optional database fields that come from existing questions
        id: z.number().optional(),
        question_id: z.number().optional(),
        created_at: z.string().optional(),
        updated_at: z.string().optional(),
      })
    )
    .min(2, 'At least 2 options required')
    .refine((options) => options.some((option) => option.is_correct), {
      message: 'At least one option must be marked as correct',
    }),
  country_id: z.string().min(1, 'Country is required'),
  difficulty_id: z.string().min(1, 'Difficulty is required'),
  category_id: z.string().min(1, 'Category is required'),
});

const client = new HttpClient();

export default function CreateQuestionPopup(props) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [categories, setCategories] = useState([]);

  // Determine if we're in edit mode
  const isEditMode = props.questionId && props.questionId !== null;
  const dialogTitle = isEditMode ? 'Edit Question' : 'Add New Question';
  const submitButtonText = isEditMode ? 'Update Question' : 'Add Question';

  // Fetch data on component mount
  useEffect(() => {
    getCountries().then((response) => setCountries(response));
  }, []);

  useEffect(() => {
    getCategories().then((response) => setCategories(response));
  }, []);

  useEffect(() => {
    getDifficulties().then((response) => setDifficulties(response));
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: props?.formValues ?? {
      text: '',
      options: [
        { text: '', is_correct: false },
        { text: '', is_correct: false },
        { text: '', is_correct: false },
        { text: '', is_correct: false },
      ],
      country_id: '',
      difficulty_id: '',
      category_id: '',
    },
  });

  useEffect(() => {
    setIsAddDialogOpen(props.isPopupOpen);
  }, [props.isPopupOpen]);

  // Reset form when formValues change (for edit mode)
  useEffect(() => {
    if (props.formValues) {
      // Reset form with new values and trigger validation
      form.reset(props.formValues);
      console.log(form.getValues());
    }
  }, [props.formValues, form]);

  const handleClose = () => {
    setIsAddDialogOpen(false);
    form.reset();
    if (props.onClose) {
      props.onClose();
    }
  };

  const handleOptionChange = (index, value) => {
    const currentOptions = form.getValues('options');
    const newOptions = [...currentOptions];
    newOptions[index] = { ...newOptions[index], text: value };
    form.setValue('options', newOptions);
  };

  const handleCorrectAnswerChange = (index) => {
    const currentOptions = form.getValues('options');
    const newOptions = [...currentOptions];
    const currentValue = newOptions[index].is_correct;
    // Handle both boolean and number (1/0) values
    const newValue =
      typeof currentValue === 'number' ? (currentValue === 1 ? 0 : 1) : !currentValue;
    newOptions[index] = { ...newOptions[index], is_correct: newValue };
    form.setValue('options', newOptions);
  };

  async function handleSubmitQuestion(data) {
    try {
      // Convert string IDs to numbers for API submission
      const submitData = {
        ...data,
        country_id: parseInt(data.country_id),
        difficulty_id: parseInt(data.difficulty_id),
        category_id: parseInt(data.category_id),
      };

      console.log(submitData);
      let response;
      if (isEditMode) {
        // Update existing question
        response = await client.newPutRequest(`/questions/${props.questionId}`, submitData);
        console.log('Update Response:', response);

        if (response.status === 200) {
          toast('Question updated successfully.');
          handleClose();
          if (props.onSuccess) {
            props.onSuccess();
          }
        }
      } else {
        // Create new question
        response = await client.newPostRequest('/questions', submitData);
        console.log('Create Response:', response);

        if (response.status === 201) {
          toast('Question created successfully.');
          handleClose();
          if (props.onSuccess) {
            props.onSuccess();
          }
        }
      }
    } catch (e) {
      console.log('error', e);
      toast(`Error ${isEditMode ? 'updating' : 'creating'} question. Please try again.`);
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
        <Plus className="h-4 w-4 mr-2" />
        Add Question
      </Button>

      <Dialog
        open={isAddDialogOpen}
        onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>
              {isEditMode
                ? 'Update the question information below'
                : 'Create a new quiz question for Croatia or Netherlands'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitQuestion)}
              className="space-y-6 py-4">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your question here..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <Label>Answer Options</Label>
                {form.watch('options').map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={option.is_correct === true || option.is_correct === 1}
                        onChange={() => handleCorrectAnswerChange(index)}
                        className="text-primary"
                      />
                      <Label className="text-sm font-medium">
                        {String.fromCharCode(65 + index)}
                      </Label>
                    </div>
                    <Input
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      value={option.text}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="flex-1"
                    />
                  </div>
                ))}
                <p className="text-sm text-muted-foreground">
                  Check the boxes next to the correct answers (multiple answers allowed)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="country_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries &&
                            countries.map((country) => (
                              <SelectItem
                                key={country.id}
                                value={String(country.id)}>
                                {country.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="difficulty_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                  <Save className="h-4 w-4 mr-2" />
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
