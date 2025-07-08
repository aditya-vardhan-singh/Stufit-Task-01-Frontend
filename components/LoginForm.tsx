"use client";
import React from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
// import dotenv from "dotenv";
// dotenv.config();

// const BACKEND_URL = process.env.BACKEND_URL;
// if (!BACKEND_URL) {
//   console.error("BACKEND_URL is not defined in the environment variables.");
// }

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const submit = await axios.post(
        `https://stufit-task-01-backend.onrender/api/v1/auth/login`,
        // "http://localhost:4000/api/v1/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (submit.status === 200) {
        localStorage.setItem("isLoggedIn", "true");
        setLoggedIn(true);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.msg ||
          err?.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-5 w-full px-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div className="text-sm text-red-600 text-center">{error}</div>}
      <Button
        className="mt-2 w-full"
        size="lg"
        type="submit"
        variant="solid"
        isDisabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
