import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Users, FileQuestion, BarChart3, Activity } from 'lucide-react';
import QuizManagementSection from '@/Components/admin/QuizManagementSection.jsx';
import QuestionsCard from '@/Components/admin/QuestionsCard.jsx';
import UsersSection from '@/Components/admin/UsersSection.jsx';

function AdminPanel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header Section */}
      <header className="border-b bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Manage your quiz application</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className="flex items-center space-x-1">
                <Activity className="h-3 w-3" />
                <span>Admin Panel</span>
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8 pb-20">
        <Tabs
          defaultValue="users"
          className="w-full">
          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-2xl grid-cols-3">
              <TabsTrigger
                value="users"
                className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Users</span>
              </TabsTrigger>
              <TabsTrigger
                value="quizzes"
                className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Quizzes</span>
              </TabsTrigger>
              <TabsTrigger
                value="questions"
                className="flex items-center space-x-2">
                <FileQuestion className="h-4 w-4" />
                <span>Questions</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="users"
            className="space-y-6">
            <UsersSection />
          </TabsContent>

          {/*Quizzes*/}
          <TabsContent
            value="quizzes"
            className="space-y-6">
            <QuizManagementSection> </QuizManagementSection>
          </TabsContent>

          {/*Questions*/}
          <TabsContent
            value="questions"
            className="space-y-6">
            <QuestionsCard></QuestionsCard>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}

export default AdminPanel;
