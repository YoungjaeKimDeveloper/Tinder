import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
  const { logout } = useAuthStore();
  return (
    <div>
      <button className="bg-blue-300" onClick={logout}>
        LogOut
      </button>
    </div>
  );
};

export default HomePage;
