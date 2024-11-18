import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = false;
  
  return (
    <form className="flex flex-col justify-start">
      <label htmlFor="email" className="pl-1">
        Email Address
      </label>
      <input
        type="email"
        id="email"
        placeholder="Email.."
        className="w-full rounded-xl border border-black p-2"
        onChange={(e) => setEmail(e.target.value)}
        required
        value={email}
      />
      <label htmlFor="email" className="mt-4 pl-1">
        Password
      </label>
      <input
        type="password"
        id="password"
        placeholder="Password.."
        className="w-full rounded-xl border border-black p-2"
        onChange={(e) => setPassword(e.target.value)}
        required
        value={password}
      />
      <button
        type="submit"
        className={`mt-2 cursor-pointer rounded-xl bg-pink-200 py-2 font-bold text-white hover:bg-red-500 ${loading ? "cursor-not-allowed bg-pink-400" : "bg-pink-400"}`}
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;
