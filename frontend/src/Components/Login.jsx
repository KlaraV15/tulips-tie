import { Link } from "react-router-dom"
import { Button } from "./Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Components/ui/Card"
import { Input } from "../Components/ui/Input"
import { Label } from "../Components/ui/Label"
import { Globe, Mail, Lock, ArrowLeft } from "lucide-react"

export default function Login() {
  return (
    <>
      {/* Navbar */}
      <nav className="border-b border-[#DCDCDC] bg-[#F3F2EC]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-[#E62727]" />
            <span className="text-xl font-bold text-[#1E93AB]">Tulips & Ties</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-[#1E93AB] hover:text-[#E62727]">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-[#E62727] hover:bg-[#E62727]/90 text-white shadow-md">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <div className="min-h-screen bg-[#F3F2EC] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Back to Home */}
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-[#1E93AB] mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <Card className="bg-white border border-[#DCDCDC] hover:border-[#1E93AB]/50 transition-colors shadow-md">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-[#E62727]" />
              </div>
              <CardTitle className="text-2xl font-bold text-[#1E93AB]">Welcome Back</CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to your Tulips & Ties account to continue your journey
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#1E93AB]">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-[#DCDCDC]" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 border-[#DCDCDC] focus:border-[#1E93AB]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#1E93AB]">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-[#DCDCDC]" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10 border-[#DCDCDC] focus:border-[#1E93AB]"
                    />
                  </div>
                </div>

                {/* Remember me + Forgot password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="remember" className="rounded border-[#DCDCDC]" />
                    <Label htmlFor="remember" className="text-sm text-[#1E93AB]">
                      Remember me
                    </Label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-[#E62727] hover:underline">
                    Forgot password?
                  </Link>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full bg-[#E62727] hover:bg-[#E62727]/90 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  Sign In
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="font-medium hover:underline text-[#1E93AB]">
                    Sign up
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
