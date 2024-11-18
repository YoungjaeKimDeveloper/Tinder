import React, { useState } from "react";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import { useAuthStore } from "../store/useAuthStore";
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-500 to-pink-500 p-4">
      <div className="w-full max-w-md">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-white">
          {isLogin ? "Sign in to Swipe" : "Create a Swipe account"}
        </h2>
        <div className="rounded-lg bg-white p-8 shadow-xl">
          {isLogin ? <LoginForm /> : <SignupForm />}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "New to Swipe?" : "Already have an account?"}
            </p>
            <button
              className="mt-2 font-medium text-red-600 transition-colors duration-300 hover:text-red-800"
              onClick={() => setIsLogin((prev) => !prev)}
            >
              {isLogin ? (
                <p>Create a new account</p>
              ) : (
                <p>Sign in to your account</p>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
