import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { EyeIcon, EyeOffIcon, LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

const LoginForm = ({
  setIsLogin,
}: {
  setIsLogin: (isLogin: boolean) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // toast({
      //   title: "Welcome back! 🎉",
      //   description: "Ready to organize your links!",
      // });
    }, 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <Card className="backdrop-blur-xl bg-white/70 border-0 shadow-2xl shadow-blue-500/10 relative overflow-hidden">
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 rounded-lg blur-sm opacity-75 animate-gradient-x"></div>
        <div className="absolute inset-[1px] bg-white/90 rounded-lg backdrop-blur-xl"></div>

        <div className="relative z-10">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 animate-bounce-subtle">
              <LinkIcon className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Sign in to manage your link collection
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 group">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 group-focus-within:text-blue-600 transition-colors"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/70"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 group-focus-within:text-blue-600 transition-colors"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/70 focus:bg-white/90"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none outline-none p-1 text-gray-400 hover:text-blue-500 transition-colors focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to={"/"}
                onClick={() => setIsLogin(false)}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors hover:underline"
              >
                Sign up
              </Link>
            </p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
