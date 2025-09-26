
    <Card className="bg-card border-border">
        <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle>Quiz Management</CardTitle>
                    <CardDescription>Create and manage quiz collections</CardDescription>
                </div>
                <Link href="/admin/quizzes">
                    <Button className="glow-effect">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Quiz
                    </Button>
                </Link>
            </div>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/30 transition-colors">
                    <div className="flex items-center space-x-4">
                        <span className="text-2xl">🇭🇷</span>
                        <div className="flex-1">
                            <p className="font-semibold">Croatian Geography Basics</p>
                            <div className="flex items-center space-x-2 mt-1">
                                <Badge className="bg-chart-3/10 text-chart-3 border-chart-3/20">Published</Badge>
                                <span className="text-sm text-muted-foreground">15 questions • 1,247 plays</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/30 transition-colors">
                    <div className="flex items-center space-x-4">
                        <span className="text-2xl">🇳🇱</span>
                        <div className="flex-1">
                            <p className="font-semibold">Dutch Culture & Traditions</p>
                            <div className="flex items-center space-x-2 mt-1">
                                <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20">Draft</Badge>
                                <span className="text-sm text-muted-foreground">20 questions • 0 plays</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button className="bg-chart-3 hover:bg-chart-3/90 text-white" size="sm">
                            Publish
                        </Button>
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/30 transition-colors">
                    <div className="flex items-center space-x-4">
                        <span className="text-2xl">🇭🇷</span>
                        <div className="flex-1">
                            <p className="font-semibold">Croatian History Challenge</p>
                            <div className="flex items-center space-x-2 mt-1">
                                <Badge className="bg-chart-3/10 text-chart-3 border-chart-3/20">Published</Badge>
                                <span className="text-sm text-muted-foreground">25 questions • 892 plays</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
