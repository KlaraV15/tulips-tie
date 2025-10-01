import { useEffect, useState, memo } from 'react';

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
import { FormControl } from '@/Components/ui/form.jsx';

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

const QuestionsCard = memo(function QuestionsCard() {
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

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = searchTerm === '' || q.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = filterCountry === 'all' || String(q.country?.id) === String(filterCountry);
    const matchesDifficulty = filterDifficulty === 'all' || String(q.difficulty?.id) === String(filterDifficulty);
    const matchesCategory = filterCategory === 'all' || String(q.category?.id) === String(filterCategory);

    return matchesSearch && matchesCountry && matchesDifficulty && matchesCategory;
  });

  return (
    <>
      {' '}
      <Card className="bg-card border-border mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters & Search</span>
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
                <Select
                  value={filterCountry}
                  onValueChange={setFilterCountry}>
                  <SelectTrigger>
                    <SelectValue />
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
              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select
                  onValueChange={setFilterDifficulty}
                  value={filterDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
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
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  onValueChange={setFilterCategory}
                  value={filterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
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
              <div className="flex items-end">
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
        <CardContent>
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
                        by {question?.createdBy || 'no name'} • {new Date(question.created_at)?.toISOString()?.split("T")[0] || "0000-00-00"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
