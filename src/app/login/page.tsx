"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user?.email?.length > 0 && user.password?.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`/api/users/login`, user);
      console.log("Login success", res.data);
      toast.success("Login successful! Please verify your email.");
      router.push("/profile");
    } catch (err: any) {
      toast.error("Login failed: " + err.response?.data?.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : " Login"}</h1>
      <hr />

      <label htmlFor="email">email</label>
      <input
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        type="text"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />

      <label htmlFor="password">password</label>
      <input
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        type="text"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />
      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "No Login" : "Login"}
      </button>
      <Link href="/login">Visit Signup</Link>
    </div>
  );
};

export default Login;
