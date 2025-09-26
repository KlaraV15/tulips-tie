import { Link } from "react-router-dom"
import { Button } from "./Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Components/ui/Card"
import { Input } from "../Components/ui/Input"
import { Label } from "../Components/ui/Label"
import { Mail, Lock, User, ArrowLeft } from "lucide-react"
import logo from '../assets/logo-rose.png'

export default function Register() {
  return (
    <>
      {/* Navbar */}
      <nav className="border-b border-[#DCDCDC] bg-[#F3F2EC]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={logo} className="h-12 w-8 text-[#1E93AB]" />
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
                <img src={logo} className="h-12 w-8 text-[#1E93AB]" />
              </div>
              <CardTitle className="text-2xl font-bold text-[#1E93AB]">Join Tulips & Ties</CardTitle>
              <CardDescription className="text-gray-600">
                Create your account and start testing your knowledge today
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form className="space-y-4">
                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-[#1E93AB]">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-[#DCDCDC]" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Choose a username"
                      className="pl-10 border-[#DCDCDC] focus:border-[#1E93AB]"
                    />
                  </div>
                </div>

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
                      placeholder="Create a password"
                      className="pl-10 border-[#DCDCDC] focus:border-[#1E93AB]"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-[#1E93AB]">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-[#DCDCDC]" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10 border-[#DCDCDC] focus:border-[#1E93AB]"
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="terms" className="rounded border-[#DCDCDC]" />
                  <Label htmlFor="terms" className="text-sm text-[#1E93AB]">
                    I agree to the{" "}
                    <Link to="/terms" className="text-[#E62727] hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-[#E62727] hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#E62727] hover:bg-[#E62727]/90 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  Create Account
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium hover:underline text-[#1E93AB]">
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