import { useState } from 'react';
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
import QuestionsCard from '@/Components/admin/QuestionsCard.jsx';

// Form validation schema
const formSchema = z.object({
  title: z.string().min(1, 'Quiz title is required').min(3, 'Title must be at least 3 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters'),

});

export default function CreateQuizPopup() {
  const [showQuestionsSection, setShowQuestionsSection] = useState(false);

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

            <div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowQuestionsSection(true)}>
                Add questions
              </Button>
            </div>

            {showQuestionsSection && (
              <div className="mt-4">
                <QuestionsCard />
              </div>
            )}

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
