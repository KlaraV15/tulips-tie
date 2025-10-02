import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users } from 'lucide-react';
import HttpClient from '../../../helpers/HttpClient.js';

const client = new HttpClient();

export default function UsersSection() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await client.newRequest('/users');
        setAllUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      {/* All Users Section */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>All Users</span>
            <Badge
              variant="outline"
              className="ml-2">
              {allUsers.length} Total
            </Badge>
          </CardTitle>
          <CardDescription>Complete list of all registered users</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-sm text-muted-foreground">Loading users...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {allUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/30 transition-colors bg-gray-50/50">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
                        {user.username?.slice(0, 2).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">{user.username}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-gray-580">
                        Joined {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    {/* User Status */}
                    <div className="text-center">
                      <Badge
                        variant="default"
                        className="text-xs">
                        User
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">ID: {user.id}</p>
                    </div>

                    {/* Registration Date */}
                    <div className="text-center">
                      <p className="font-bold text-lg text-blue-600">
                        {new Date(user.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Registered</p>
                    </div>

                    {/* Last Updated */}
                    <div className="text-center">
                      <p className="font-bold text-lg text-green-600">
                        {new Date(user.updated_at).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Last Updated</p>
                    </div>
                  </div>
                </div>
              ))}

              {allUsers.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No users found</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
