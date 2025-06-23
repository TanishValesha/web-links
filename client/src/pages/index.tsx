import LoginForm from "../components/LoginForm";
import CreativeVisual from "../components/CreativeVisual";
import { useState } from "react";
import SignUp from "../components/SignUp";

const Index = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-indigo-200/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-300/10 to-blue-300/10 rounded-full blur-2xl animate-float"></div>
      </div>

      <div className="w-full h-screen grid lg:grid-cols-2 items-center">
        <div className="block lg:px-8 px-0">
          <CreativeVisual />
        </div>
        {isLogin && (
          <div className="flex justify-center lg:justify-end px-8">
            <LoginForm setIsLogin={setIsLogin} />
          </div>
        )}
        {!isLogin && (
          <div className="flex justify-center lg:justify-end px-8">
            <SignUp setIsLogin={setIsLogin} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
