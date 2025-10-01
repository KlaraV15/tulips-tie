import { Link } from "react-router-dom"
import { Button } from "../Components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Components/ui/Card"
import { Input } from "../Components/ui/Input"
import { Label } from "../Components/ui/Label"
import { Mail, ArrowLeft } from "lucide-react"
import logo from '../assets/logo-rose.png'

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-300 via-red-300 to-red-300">
      {/* Navbar */}
      <nav className="border-b border-red-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img src={logo} className="h-12 w-8 text-red-600 transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent group-hover:brightness-110">
              Tulips & Ties
            </span>
          </Link>
          <div className="flex items-center gap-5">
            <Link to="/login">
              <Button
                variant="outline"
                className="px-7 py-3 text-lg text-red-600 border-2 border-red-400 
                  hover:bg-red-50 hover:text-red-700 hover:border-red-500 
                  font-semibold rounded-2xl transition-all duration-300 ease-out
                  shadow-sm hover:shadow-md cursor-pointer"
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button
                className="px-8 py-3 text-lg font-semibold text-white 
                  bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600
                  hover:from-rose-700 hover:via-rose-600 hover:to-rose-700
                  rounded-2xl shadow-xl hover:shadow-2xl
                  border border-rose-500
                  transition-all duration-300 ease-out
                  transform hover:scale-110 hover:brightness-110
                  focus:ring-4 focus:ring-rose-400 cursor-pointer"
              >
                🌸 Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md mt-10">
          {/* Back to Login */}
          <Link
            to="/login"
            className="inline-flex items-center text-gray-700 hover:text-red-600 mb-8 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>

          <Card className="bg-white border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-2xl hover:scale-105 cursor-pointer shadow-lg rounded-2xl">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <img src={logo} className="h-12 w-8 text-red-600" />
              </div>
              <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                Forgot Password
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2 text-lg font-medium">
                Enter your email to reset your password
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 p-6">
              <form className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-red-600 font-semibold">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-300 transition-all"
                    />
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full py-3 text-lg font-semibold text-white 
                    bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600
                    hover:from-rose-700 hover:via-rose-600 hover:to-rose-700
                    rounded-2xl shadow-xl hover:shadow-2xl
                    border border-rose-500
                    transition-all duration-300 ease-out
                    transform hover:scale-105 hover:brightness-110
                    focus:ring-4 focus:ring-rose-400"
                >
                  ✉️ Send Reset Link
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-700">
                  Remember your password?{" "}
                  <Link to="/login" className="font-semibold hover:underline text-red-600">
                    Login
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
