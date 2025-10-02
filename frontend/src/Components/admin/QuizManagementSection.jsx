import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import HttpClient from '../../../helpers/HttpClient.js';

import { Eye, Edit } from 'lucide-react';
import { useEffect, useState } from 'react';
import CreateQuizPopup from '@/Components/admin/CreateQuizPopup.jsx';
import { Link } from 'react-router-dom';

async function getQuizzes() {
  const client = new HttpClient();

  const response = await client.newRequest('/quizzes');

  console.log(response.data);

  return response.data;
}

export default function QuizManagementSection() {
  const [quizzes, setQuizzes] = useState([]);
  const [popupProps, setPopupProps] = useState({
    isPopupOpen: false,
    formValues: {
      title: '',
      description: '',
    },
  });

  useEffect(() => {
    getQuizzes().then((quizzes) => {
      setQuizzes(quizzes);
    });
  }, []);

  function editQuiz(quiz) {
    setPopupProps({
      isPopupOpen: true,
      quizId: quiz.id,
      formValues: {
        title: quiz.title,
        description: quiz.description,
      },
    });
  }

  function refreshQuizzes() {
    getQuizzes().then((quizzes) => {
      setQuizzes(quizzes);
    });
  }

  function openCreateQuiz() {
    setPopupProps({
      isPopupOpen: true,
      quizId: null,
      formValues: { title: '', description: '' },
    });
  }

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-end">
            <div className="flex items-center space-x-4">
              <CreateQuizPopup
                isPopupOpen={popupProps.isPopupOpen}
                quizId={popupProps.quizId}
                formValues={popupProps.formValues}
                onCreateClick={openCreateQuiz}
                onClose={() =>
                  setPopupProps((prev) => ({ ...prev, isPopupOpen: false, quizId: null }))
                }
                onSuccess={refreshQuizzes}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {quizzes.map((quiz) => {
              return (
                <div
                  key={quiz.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/30 transition-colors">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">🇭🇷</span>
                    <div className="flex-1">
                      <p className="font-semibold">{quiz?.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-muted-foreground">
                          {quiz?.questions_count ?? 0} questions
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => editQuiz(quiz)}
                      variant="outline"
                      size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
