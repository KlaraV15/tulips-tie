import { Link } from "react-router-dom"
import { Button } from "./Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Components/ui/Card"
import { Input } from "../Components/ui/Input"
import { Label } from "../Components/ui/Label"
import { Globe, Mail, Lock, User, ArrowLeft } from "lucide-react"

export default function Register() {
  return (
    <>
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold gradient-text">Tulips & Ties</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="glow-effect">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <Card className="bg-card border-border glow-effect">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Join Tulips & Ties</CardTitle>
            <CardDescription>
              Create your account and start testing your knowledge today
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form className="space-y-4">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="username" type="text" placeholder="Choose a username" className="pl-10" />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="Enter your email" className="pl-10" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type="password" placeholder="Create a password" className="pl-10" />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="confirmPassword" type="password" placeholder="Confirm your password" className="pl-10" />
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="terms" className="rounded" />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full glow-effect">
                Create Account
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  )
}
