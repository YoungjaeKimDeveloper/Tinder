import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import { useAuthStore } from "./store/useAuthStore.js";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { checkAuth, authUser, checkingAuth } = useAuthStore();
  // Check the User Authentication
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return null;
  }
  return (
    <div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        {/* Protect the pages */}
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/auth"
            element={!authUser ? <AuthPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/chat/:id"
            element={authUser ? <ChatPage /> : <Navigate to={"/auth"} />}
          />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
};

export default App;
