import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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
import HttpClient from '../../../helpers/HttpClient.js';

const client = new HttpClient();

// Form validation schema
const formSchema = z.object({
  title: z.string().min(1, 'Quiz title is required').min(3, 'Title must be at least 3 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters'),
  country_id: z.string().min(1, 'Please select a country'),
  difficulty_id: z.string().min(1, 'Please select a difficulty level'),
  category_id: z.string().min(1, 'Please select a category'),
});

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

export default function CreateQuizPopup(props) {
  const [countries, setCountries] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      country_id: '',
      difficulty_id: '',
      category_id: '',
    },
  });

  async function handleCreateQuiz(data) {
    console.log('Creating quiz with data:', data);
    console.log('Form values:', form.getValues());
    console.log('Form state:', form.formState);
    // TODO: Implement quiz creation logic
  }

  useEffect(() => {
    getCountries().then((response) => setCountries(response));
  }, []);

  useEffect(() => {
    getCategories().then((response) => setCategories(response));
  }, []);

  useEffect(() => {
    getDifficulties().then((response) => setDifficulties(response));
  }, []);

  return (
    <Dialog
      open={isCreateDialogOpen}
      onOpenChange={setIsCreateDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="glow-effect"
          onClick={() => setIsCreateDialogOpen(!isCreateDialogOpen)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Quiz
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Quiz</DialogTitle>
          <DialogDescription>
            Create a new quiz collection for Croatia or Netherlands
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateQuiz)}
            className="space-y-6 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz Title</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="Enter quiz title..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what this quiz covers..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="country_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}>
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
                      value={field.value}>
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
                    value={field.value}>
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
                onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="glow-effect"
                disabled={!form.formState.isValid}>
                <Save className="h-4 w-4 mr-2" />
                Create Quiz
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
