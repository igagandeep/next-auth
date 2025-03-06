"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(true);
      toast.error(error.response.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? token : "no token"}
      </h2>
      {verified && (
        <div>
          {" "}
          Verified <Link href="/login">Login</Link>
        </div>
      )}

      {error && <h2>Error: {error}</h2>}
    </div>
  );
};

export default VerifyEmail;
