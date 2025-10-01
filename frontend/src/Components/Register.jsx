import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../Components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Components/ui/Card"
import { Input } from "../Components/ui/Input"
import { Label } from "../Components/ui/Label"
import { Mail, Lock, User, ArrowLeft, Menu, X } from "lucide-react"
import logo from '../assets/logo-rose.png'

export default function Register() {
  const [menuOpen, setMenuOpen] = useState(false)

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

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-5">
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

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-red-600 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`md:hidden flex flex-col gap-4 px-4 pb-4 bg-white/90 border-t border-red-200 overflow-hidden transition-all duration-500 ease-in-out 
            ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            <Button
              variant="outline"
              className="w-full py-3 text-red-600 border-2 border-red-400 
                hover:bg-red-50 hover:text-red-700 hover:border-red-500 
                font-semibold rounded-xl transition-all"
            >
              Login
            </Button>
          </Link>
          <Link to="/register" onClick={() => setMenuOpen(false)}>
            <Button
              className="w-full py-3 font-semibold text-white 
                bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600
                hover:from-rose-700 hover:via-rose-600 hover:to-rose-700
                rounded-xl shadow-lg hover:shadow-xl
                border border-rose-500
                transition-all"
            >
              🌸 Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Page content */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md mt-10">
          {/* Back to Home */}
          <Link
            to="/"
            className="inline-flex items-center text-gray-700 hover:text-red-600 mb-8 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <Card className="bg-white border-2 border-red-200 hover:border-red-400 transition-all hover:shadow-2xl hover:scale-105 cursor-pointer shadow-lg rounded-2xl">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <img src={logo} className="h-12 w-8 text-red-600" />
              </div>
              <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                Join Tulips & Ties
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2 text-lg font-medium">
                Create your account and start testing your knowledge today
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 p-6">
              <form className="space-y-5">
                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-red-600 font-semibold">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Choose a username"
                      className="pl-10 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-300 transition-all"
                    />
                  </div>
                </div>

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

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-red-600 font-semibold">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      className="pl-10 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-300 transition-all"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-red-600 font-semibold">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-300 transition-all"
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="terms" className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-400" required />
                  <Label htmlFor="terms" className="text-sm text-gray-700">
                    I agree to the{" "}
                    <Link to="/terms" className="text-red-600 font-semibold hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/terms#toc" className="text-red-600 font-semibold hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

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
                  🚀 Create Account
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-700">
                  Already have an account?{" "}
                  <Link to="/login" className="font-semibold hover:underline text-red-600">
                    Sign in
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
